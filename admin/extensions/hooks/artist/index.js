const { htmlToText } = require('html-to-text');

module.exports = function () {

    const max = 500;

    function hook (input, context) {
        if (context.collection !== 'artists') return;
        let data = {};
        if (context.event === 'items.create.before') data = input[0];
        if (context.event === 'items.update.before') data = input;
        if (data.biography === undefined) return input;
        data.note = htmlToText(data.biography, { wordwrap: false });
        if (data.note.length > max) data.note = data.note.slice(0, max) + '...';
        return input;
    }

    return {
        'items.create.before': hook,
        'items.update.before': hook
    }
};