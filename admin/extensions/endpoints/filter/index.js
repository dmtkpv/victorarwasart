module.exports = function (router, { database, exceptions }) {



    // -------------------
    // Helpers
    // -------------------

    function select (collection) {
        return database.raw(`SELECT * FROM filters WHERE collection = '${collection}'`).then(data => data[0])
    }

    function choices2Table (choices) {
        const items = choices.split(',');
        const first = `SELECT '${items[0]}' as id `;
        const other = items.slice(1).map(item => `UNION ALL SELECT '${item}'`).join(' ');
        return first + other;
    }

    function count (record, filter = '') {
        const { collection, field, choices } = record;
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
    // Data normalization
    // -------------------

    function normalize (record, totals) {

        let filters = [];

        function add (title, value = title, total = totals[value]) {
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
    // Artworks
    // -------------------

    router.get('/artworks', (req, res, next) => {

        select('artworks')
            .then(records => {
                return Promise.all(records.map(record => {
                    return count(record, 'WHERE artworks.hidden_in_artworks = 0').then(count => normalize(record, count));
                }))
            })
            .then(data => {
                res.send({ data })
            })
            .catch(next);
    });



    // -------------------
    // Publications
    // -------------------

    router.get('/publications', (req, res, next) => {

        select('publications')
            .then(records => {
                return Promise.all(records.map(record => {
                    return count(record).then(count => normalize(record, count));
                }))
            })
            .then(data => {
                res.send({ data })
            })
            .catch(next)
    });



};