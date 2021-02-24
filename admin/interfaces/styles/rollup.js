// ----------------------
// Modules
// ----------------------

import path from 'path'
import { terser } from 'rollup-plugin-terser';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import vue from 'rollup-plugin-vue';
import styles from "rollup-plugin-styles";



// ----------------------
// Helpers
// ----------------------

function rootPath (value) {
    return path.join(__dirname, '../../', value);
}



// ----------------------
// Exports
// ----------------------

export default {
    input: rootPath('interfaces/styles/index.js'),
    output: {
        format: 'es',
        file: rootPath('extensions/interfaces/styles/index.js'),
    },
    plugins: [
        terser(),
        resolve(),
        commonjs(),
        styles(),
        vue({ css: false })
    ]
};