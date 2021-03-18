module.exports = function (router, { database, services }) {

    const { ItemsService } = services;



    // -------------------
    // Movements
    // -------------------

    function getMovements (service, _filter) {
        const { movements, ...filter } = _filter;
        return service.readByQuery({
            filter,
            limit: -1,
            fields: ['movements.artwork_movements_id']
        }).then(data => {
            return data.reduce((result, item) => {
                if (!item.movements) return result;
                item.movements.forEach(movement => {
                    const value = movement && movement.artwork_movements_id;
                    if (value && !result.includes(value)) result.push(value);
                })
                return result;
            }, [])
        })
    }



    // -------------------
    // Types
    // -------------------

    function getTypes (service, _filter) {
        const { types, ...filter } = _filter;
        return service.readByQuery({
            filter,
            limit: -1,
            fields: ['types.artwork_types_id']
        }).then(data => {
            return data.reduce((result, item) => {
                if (!item.types) return result;
                item.types.forEach(type => {
                    const value = type && type.artwork_types_id;
                    if (value && !result.includes(value)) result.push(value);
                })
                return result;
            }, [])
        })
    }



    // -------------------
    // Artists
    // -------------------

    function getArtists (service, _filter) {
        const { artist, ...filter } = _filter;
        return service.readByQuery({
            filter,
            limit: -1,
            fields: ['artist']
        }).then(data => {
            return data.reduce((result, item) => {
                const value = item.artist;
                if (value && !result.includes(value)) result.push(value);
                return result;
            }, [])
        })
    }



    // -------------------
    // Search
    // -------------------

    router.get('/', async (req, res, next) => {

        const service = new ItemsService('artworks', { schema: req.schema });
        const filter = req.sanitizedQuery.filter || {};

        Promise.all([
            getMovements(service, filter),
            getTypes(service, filter),
            getArtists(service, filter)
        ]).then(data => {
            res.send({
                data: {
                    movements: data[0],
                    types: data[1],
                    artists: data[2]
                }
            })
        }).catch(next);

    });



};