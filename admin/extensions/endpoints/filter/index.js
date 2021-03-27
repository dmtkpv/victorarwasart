module.exports = function (router, { database, exceptions }) {



    // -------------------
    // Helpers
    // -------------------

    function choices2Table (choices) {
        const first = `SELECT '${choices[0].value}' as id, '${choices[0].text}' as title `;
        const other = choices.slice(1).map(item => `UNION ALL SELECT '${item.value}', '${item.text}'`).join(' ');
        return first + other;
    }

    function count (table, column, choices, filter = '') {
        return database.raw(`
            SELECT choices.id, ANY_VALUE(choices.title) as title, COUNT(choices.id) as total FROM (${choices2Table(choices)}) as choices
            INNER JOIN ${table}
            ON find_in_set(choices.id, ${table}.${column}) 
            ${filter}
            GROUP BY choices.id;
        `).then(data => {
            return data[0]
        })
    }

    function getChoices (id) {
        return database.raw(`
            SELECT options FROM directus_fields WHERE id = ${id} 
        `).then(data => {
            return JSON.parse(data[0][0].options).choices;
        })
    }



    // -------------------
    // Artwork movements
    // -------------------

    router.get('/artwork_movements', (req, res, next) => {
        getChoices(172)
            .then(choices => {
                return count('artworks', 'in_movements', choices, 'WHERE artworks.hidden_in_artworks = 0');
            })
            .then(records => {
                res.send({ data: records });
            })
            .catch(next);
    });



    // -------------------
    // Artwork types
    // -------------------

    router.get('/artwork_types', (req, res, next) => {
        getChoices(171)
            .then(choices => {
                return count('artworks', 'in_types', choices, 'WHERE artworks.hidden_in_artworks = 0');
            })
            .then(records => {
                res.send({ data: records });
            })
            .catch(next);
    });



    // -------------------
    // Publication types
    // -------------------

    router.get('/publication_types', (req, res, next) => {
        getChoices(173)
            .then(choices => {
                return count('publications', 'in_types', choices);
            })
            .then(records => {
                res.send({ data: records });
            })
            .catch(next);
    });



};