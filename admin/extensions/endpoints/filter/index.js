module.exports = function (router, { database, exceptions }) {



    // -------------------
    // Helpers
    // -------------------

    function select ({ table, table_title, tableCount, tableCount_field, tableCount_link, tableCheck }) {
        return database.raw(`
            SELECT ${tableCount}.${tableCount_link} as id, ${table}.${table_title}, COUNT(${tableCount_field}) as total
            FROM  ${tableCount}
            INNER JOIN ${table} ON ${tableCount}.${tableCount_link} = ${table}.id
            where exists (select id from ${tableCheck} where id = ${tableCount}.${tableCount_field})
            GROUP BY ${table}.id;
        `);
    }



    // -------------------
    // Artwork movements
    // -------------------

    router.get('/artwork_movements', (req, res, next) => {
        select({
            table: 'artwork_movements',
            table_title: 'title',
            tableCount: 'artworks_movements',
            tableCount_field: 'artworks_id',
            tableCount_link: 'artwork_movements_id',
            tableCheck: 'artworks'
        }).then(records => {
            res.send({ data: records[0] });
        }).catch(next);
    });



    // -------------------
    // Artwork types
    // -------------------

    router.get('/artwork_types', (req, res, next) => {
        select({
            table: 'artwork_types',
            table_title: 'title',
            tableCount: 'artworks_types',
            tableCount_field: 'artworks_id',
            tableCount_link: 'artwork_types_id',
            tableCheck: 'artworks'
        }).then(records => {
            res.send({ data: records[0] });
        }).catch(next);
    });



    // -------------------
    // Publication types
    // -------------------

    router.get('/publication_types', (req, res, next) => {
        select({
            table: 'publication_types',
            table_title: 'title',
            tableCount: 'publications_types',
            tableCount_field: 'publications_id',
            tableCount_link: 'publication_types_id',
            tableCheck: 'publications'
        }).then(records => {
            res.send({ data: records[0] });
        }).catch(next);
    });



};