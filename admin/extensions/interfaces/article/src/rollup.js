// ----------------------
// Modules
// ----------------------

import { terser } from 'rollup-plugin-terser';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import vue from 'rollup-plugin-vue';
import styles from "rollup-plugin-styles";



// ----------------------
// Exports
// ----------------------

export default {
    input: 'extensions/interfaces/article/src/index.js',
    output: {
        format: 'es',
        file: 'extensions/interfaces/article/index.js'
    },
    plugins: [
        terser(),
        resolve(),
        commonjs(),
        styles(),
        vue({ css: false })
    ]
};