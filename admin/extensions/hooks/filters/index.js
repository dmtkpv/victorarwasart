module.exports = function () {

    return {
        'items.update.before' (input, context) {
            if (context.collection !== 'filters') return;
            if (!input.filters) return;

            input.choices = [];
            input.filters.forEach(({ filter }) => {
                const group = filter.includes(':');
                if (group) {
                    const choices = filter.split(':')[1].split(',').map(value => value.trim())
                    input.choices = input.choices.concat(choices)
                }
                else {
                    input.choices.push(filter);
                }
            })
            input.choices = input.choices.join(',')
            return input;
        }
    }
};