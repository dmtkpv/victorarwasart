module.exports = function (router) {

    router.get('/', (req, res) => {

        setTimeout(() => {
            res.send({
                data: []
            })
        }, req.query.ms || 1000)
    });


};