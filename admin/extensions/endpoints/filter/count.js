module.exports = database => {



    // -------------------
    // Select
    // -------------------

    function select (collection) {
        return database.raw(`SELECT * FROM filters WHERE collection = '${collection}'`).then(data => data[0])
    }



    // -------------------
    // Count
    // -------------------

    const filters = {
        artworks: 'WHERE artworks.hidden_in_artworks = 0'
    }

    function choices2Table (choices) {
        const items = choices.split(',');
        const first = `SELECT '${items[0]}' as id `;
        const other = items.slice(1).map(item => `UNION ALL SELECT '${item}'`).join(' ');
        return first + other;
    }

    function count (record) {
        const { collection, field, choices } = record;
        const filter = filters[collection] || '';
        return database.raw(`
            SELECT choices.id, COUNT(choices.id) as total FROM (${choices2Table(choices)}) as choices
            INNER JOIN ${collection}
            ON find_in_set(choices.id, ${collection}.${field}) 
            ${filter}
            GROUP BY choices.id;
        `).then(data => {
            const totals = data[0].map(item => [item.id, item.total]);
            return Object.fromEntries(totals)
        })
    }



    // -------------------
    // Normalize
    // -------------------

    function normalize (record, totals) {

        let filters = [];

        function add (title, value = [title], total = totals[value]) {
            if (total) filters.push({ title, value, total })
        }

        JSON.parse(record.filters).forEach(({ filter }) => {
            const grouped = filter.includes(':');
            if (grouped) {
                const data = filter.split(':');
                const group = data[0].trim();
                const items = data[1].split(',').map(value => value.trim()).filter(value => totals[value]);
                const total = items.reduce((total, value) => total + (totals[value] || 0), 0)
                add(group, items, total);
                items.forEach(item => add(item));
            }
            else {
                add(filter);
            }
        })

        return {
            title: record.title,
            field: record.field,
            filters
        };

    }



    // -------------------
    // Exports
    // -------------------

    return async ({ collection }) => {
        const records = await select(collection);
        const counts = records.map(record => count(record))
        const totals = await Promise.all(counts);
        return records.map((_, i) => normalize(records[i], totals[i]));
    }



}