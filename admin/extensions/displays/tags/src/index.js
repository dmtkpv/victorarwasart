import component from './index.vue';

export default {
    id: 'tags',
    name: 'Tags',
    description: 'Displays colored tags',
    icon: 'bookmark_border',
    handler: component,
    types: ['alias'],
    groups: ['m2m'],
    options: [
        {
            field: 'keyField',
            name: 'Many field',
            type: 'string',
            meta: {
                width: 'half',
                interface: 'text-input'
            },
        },
        {
            field: 'groupField',
            name: 'Group field',
            type: 'string',
            meta: {
                width: 'half',
                interface: 'text-input'
            },
        },
        {
            field: 'titleField',
            name: 'Title field',
            type: 'string',
            meta: {
                interface: 'text-input'
            },
        },
        {
            field: 'colors',
            type: 'json',
            name: 'Colors',
            meta: {
                interface: 'repeater',
                options: {
                    template: '{{ background }} / {{ foreground }}',
                    fields: [
                        {
                            field: 'background',
                            type: 'string',
                            name: 'Background',
                            meta: {
                                width: 'half',
                                interface: 'color'
                            },
                        },
                        {
                            field: 'foreground',
                            type: 'string',
                            name: 'Foreground',
                            meta: {
                                width: 'half',
                                interface: 'color'
                            },
                        }
                    ],
                },
            },
        },
    ],
    fields (options = {}) {
        return [
            `${options.keyField}.${options.titleField}`,
            `${options.keyField}.${options.groupField}`,
            `${options.keyField}.sort`
        ]
    }
};