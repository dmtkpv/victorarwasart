const Axios = require('axios');
const axios = Axios.create({ baseURL: 'http://localhost:49012' });



// -------------------
// Hooks
// -------------------

const Hooks = {

}



// -------------------
// Exports
// -------------------

module.exports = function (context) {

    const hook = ({ collection }) => {
        if (Hooks[collection]) Hooks[collection](context);
    }

    return {
        'items.create': hook,
        'items.update': hook,
        'items.delete': hook
    }
};