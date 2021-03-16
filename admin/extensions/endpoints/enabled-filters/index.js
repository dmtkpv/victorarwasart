module.exports = function (router, { services }) {



    // -------------------
    // Helpers
    // -------------------

    const { ItemsService } = services;

    function unique (value, index, self) {
        return self.indexOf(value) === index;
    }



    // -------------------
    // Movements
    // -------------------

    async function getMovements (req) {

        const service = new ItemsService('artworks_movements', { schema: req.schema });
        const query = req.sanitizedQuery.filter;
        let filter = {};

        if (query) {
            if (query.types || query.artist) filter.artworks_id = {};
            if (query.types) filter.artworks_id.types = query.types;
            if (query.artist) filter.artworks_id.artist = query.artist;
        }

        return await service.readByQuery({
            filter,
            limit: -1
        }).then(data => {
            return data.map(item => item.artwork_movements_id).filter(unique);
        })
    }



    // -------------------
    // Types
    // -------------------

    async function getTypes (req) {

        const service = new ItemsService('artworks_types', { schema: req.schema });
        const query = req.sanitizedQuery.filter;
        let filter = {};

        if (query) {
            if (query.movements || query.artist) filter.artworks_id = {};
            if (query.movements) filter.artworks_id.movements = query.movements;
            if (query.artist) filter.artworks_id.artist = query.artist;
        }

        return await service.readByQuery({
            filter,
            limit: -1
        }).then(data => {
            return data.map(item => item.artwork_types_id).filter(unique);
        })
    }



    // -------------------
    // Artists
    // -------------------

    async function getArtists (req) {

        const service = new ItemsService('artists', { schema: req.schema });
        const query = req.sanitizedQuery.filter;
        let filter = {};

        if (query) {
            if (query.movements || query.types) filter.artworks = {};
            if (query.movements) filter.artworks.movements = query.movements;
            if (query.types) filter.artworks.types = query.types;
        }

        return await service.readByQuery({
            filter,
            limit: -1
        }).then(data => {
            return data.map(item => item.id);
        })
    }



    // -------------------
    // Search
    // -------------------

    router.get('/', async (req, res, next) => {
        Promise.all([
            getMovements(req),
            getTypes(req),
            getArtists(req)
        ]).then(([movements, types, artists]) => {
            res.json({ data: { movements, types, artists } })
        }).catch(next);
    });



};