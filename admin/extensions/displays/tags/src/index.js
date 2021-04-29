import component from './index.vue';

export default {
    id: 'tags',
    name: 'Tags',
    description: 'Displays colored tags',
    icon: 'bookmark_border',
    handler: component,
    types: ['alias', 'string', 'uuid', 'integer', 'bigInteger', 'json'],
    groups: ['m2m', 'm2o', 'o2m'],
    fields () {
        return [
            'artwork_tags_id.title',
            'artwork_tags_id.group',
            'artwork_tags_id.sort'
        ]
    }
};