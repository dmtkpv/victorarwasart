module.exports = function (router, { database, exceptions }) {



    // -------------------
    // Helpers
    // -------------------

    function count (table) {
        return database(table).count('*', { as: 'count' }).then(records => {
            return records[0].count
        })
    }



    // -------------------
    // Tables
    // -------------------

    router.get('/', (req, res, next) => {

        Promise
            .all([
                count('artists'),
                count('artworks'),
                count('essays'),
                // count('exhibitions'),
                count('poems'),
                count('publications'),
                count('viewing_room')
            ])
            .then(count => res.json({
                data: {
                    artists: count[0],
                    artworks: count[1],
                    essays: count[2],
                    // exhibitions: count[3],
                    poems: count[4],
                    publications: count[5],
                    viewing_room: count[6]
                }
            }))
            .catch(next);

    });


};