module.exports = function (router, { services }) {



    // -------------------
    // Helpers
    // -------------------

    const { ItemsService, MetaService } = services;

    function filter (fields, _contains) {
        return {
            _or: fields.split(',').map(field => {
                const fields = field.split('.');
                let result = {};
                let current = result;
                fields.forEach(field => {
                    current[field] = {};
                    current = current[field];
                })
                current._contains = _contains;
                return result;
            })
        }
    }



    // -------------------
    // Search
    // -------------------

    router.get('/', (req, res, next) => {
        const requests = req.query.options.map(async option => {
            const { collection, fields, searchIn } = JSON.parse(option);
            const service = new ItemsService(collection, { schema: req.schema });
            const data = await service.readByQuery({
                limit: req.sanitizedQuery.limit,
                offset: req.sanitizedQuery.offset,
                fields: fields.split(','),
                filter: filter(searchIn, req.query.text)
            })
            return {
                collection,
                data
            }
        })

        Promise.all(requests).then(data => {
            res.json({ data: data.filter(item => item.data.length) });
        }).catch(next);

    });



    // -------------------
    // Count
    // -------------------

    router.get('/count', (req, res, next) => {

        const { text, options } = req.query;

        const requests = options.map(async option => {
            const { collection, searchIn } = JSON.parse(option);
            const service = new MetaService({ schema: req.schema });
            const { filter_count } = await service.getMetaForQuery(collection, {
                filter: filter(searchIn, text),
                meta: ['filter_count']
            })
            return [
                collection,
                filter_count
            ]
        })

        Promise.all(requests).then(data => {
            res.json({ data: Object.fromEntries(data) });
        }).catch(next);

    });


};