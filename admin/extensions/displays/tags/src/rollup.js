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

function absPath (value) {
    return path.join(__dirname, value);
}



// ----------------------
// Exports
// ----------------------

export default {
    input: absPath('index.js'),
    output: {
        format: 'es',
        file: absPath('../index.js'),
    },
    plugins: [
        terser(),
        resolve(),
        commonjs(),
        styles(),
        vue({ css: false })
    ]
};