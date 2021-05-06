const { htmlToText } = require('html-to-text');

module.exports = function () {

    const max = 500;

    function hook (input, context) {
        if (context.collection !== 'artists') return input;
        if (input.biography === undefined) return input;
        input.note = htmlToText(input.biography, { wordwrap: false });
        if (input.note.length > max) input.note = input.note.slice(0, max) + '...';
        return input;
    }

    return {
        'items.create.before': hook,
        'items.update.before': hook
    }
};