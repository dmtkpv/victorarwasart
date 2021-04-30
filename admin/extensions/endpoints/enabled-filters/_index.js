module.exports = function (router, { services }) {



    // -------------------
    // Helpers
    // -------------------

    const { ItemsService } = services;

    function find (service, field, _query, callback) {
        let query = { ..._query };
        delete query[field];
        const _and = Object.values(query).map(value => JSON.parse(value));
        return service.readByQuery({
            filter: { _and },
            limit: -1,
            fields: [field]
        }).then(data => {
            return data.reduce((result, item) => {
                if (!item[field]) return result;
                callback(result, item[field]);
                return result;
            }, [])
        })
    }



    // -------------------
    // Route
    // -------------------

    router.get('/', async (req, res, next) => {

        const service = new ItemsService('artworks', { schema: req.schema });

        Promise.all([
            find(service, 'in_movements', req.query, (result, movements) => {
                movements.forEach(movement => !result.includes(movement) && result.push(movement));
            }),
            find(service, 'in_types', req.query, (result, types) => {
                types.forEach(type => !result.includes(type) && result.push(type));
            }),
            find(service, 'artist', req.query, (result, artist) => {
                !result.includes(artist) && result.push(artist);
            })
        ]).then(data => {
            res.send({
                data: {
                    in_movements: data[0],
                    in_types: data[1],
                    artist: data[2]
                }
            })
        }).catch(next);

    });



};