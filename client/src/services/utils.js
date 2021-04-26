export default {

    sort (array, field) {
        return array.sort(item => {
            if (item[field] < item[field]) return -1;
            if (item[field] > item[field]) return 1;
            return 0;
        })
    },

    params (params) {
        if (!params) return [];
        return this.array(params).map(id => isNaN(id) ? id : +id).filter((id, i, self) => self.indexOf(id) === i);
    },

    state (key) {
        return typeof window !== 'undefined' && __INITIAL_STATE__[key] && Promise.resolve(__INITIAL_STATE__[key]);
    },

    noop (param) {
        return param
    },

    array (params) {
        if (!Array.isArray(params)) params = [params];
        else params = [...params];
        return params;
    },

    filter (config, query) {
        const available = config.items.map(item => item.value).flat();
        let values = this.array(query[config.id]);
        values = values.map(id => isNaN(id) ? id : +id);
        values = values.filter((value, i, self) => self.indexOf(value) === i);
        values = values.filter(value => available.indexOf(value) !== -1);
        return values;
    },

    filters (configs = [], query) {
        return configs.reduce((result, config) => {
            const values = this.filter(config, query);
            if (values.length) result[config.id] = values;
            return result;
        }, {});
    },

    get dehydrated () {
        if (NODE) return false;
        return !document.getElementById('app').getAttribute('data-server-rendered');
    }

}

