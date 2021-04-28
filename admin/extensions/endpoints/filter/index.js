module.exports = function (router, { database }) {



    // -------------------
    // Controllers
    // -------------------

    const count = require('./count')(database);
    const items = require('./items')(database);



    // -------------------
    // Endpoints
    // -------------------

    router.get('/count', (req, res, next) => {
        count(req.query)
            .then(data => res.send({ data }))
            .catch(next);
    });

    router.get('/items', (req, res, next) => {
        items(req.query)
            .then(data => res.send({ data }))
            .catch(next);
    });


};