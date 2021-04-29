import component from './styles.vue';

export default {
    component,
    id: 'styles',
    name: 'Styles',
    description: 'Custom CSS',
    icon: 'code',
    types: ['text'],
    options: [
        {
            field: 'styles',
            name: 'Styles',
            type: 'text',
            meta: {
                width: 'full',
                interface: 'textarea'
            }
        }
    ],
};