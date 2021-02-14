// ----------------------
// Modules
// ----------------------

const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const nodeExternals = require('webpack-node-externals');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const VueSSRClientPlugin = require('vue-server-renderer/client-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');



// ----------------------
// Helpers
// ----------------------

function absPath (value) {
    return path.join(__dirname, value);
}



// --------------------------
// Common config
// --------------------------

const Common = {

    mode: process.env.NODE_ENV,

    module: {
        rules: [
            {
                test: /\.svg$/,
                use: ['vue-loader', absPath('lib/svg')]
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader',
            },
            {
                test: /\.scss$/,
                use: [
                    {
                        loader: 'css-loader',
                        options: {
                            modules: 'global'
                        }
                    },
                    {
                        loader: 'sass-loader',
                        options: {
                            additionalData (content, context) {
                                if (/abstract.+\.scss/.test(context.resourcePath)) return content;
                                return '@import "$styles/abstract/vars"; @import "$styles/abstract/mixins"; @import "$styles/abstract/extends";' + content;
                            }
                        }
                    }
                ]
            }
        ]
    },

    plugins: [
        new VueLoaderPlugin()
    ],

    resolve: {
        extensions: [
            '.js',
            '.json',
            '.scss',
            '.vue',
            '.svg'
        ],
        alias: {
            $: absPath('src'),
            $config: absPath('src/config'),
            $layout: absPath('src/layout'),
            $mixins: absPath('src/mixins'),
            $routes: absPath('src/routes'),
            $services: absPath('src/services'),
            $store: absPath('src/store'),
            $styles: absPath('src/styles'),
            $svg: absPath('src/svg'),
            $tiles: absPath('src/tiles')
        }
    },

    resolveLoader: {
        alias: {
            'unitless': absPath('lib/unitless')
        }
    },

    output: {
        path: absPath('www/dist'),
        publicPath: '/dist/'
    },

    entry: [
        absPath('src/index.js')
    ]

};



// --------------------------
// Client config
// --------------------------

const Client = {

    module: {
        rules: [
            {
                test: /\.scss$/,
                use: [MiniCssExtractPlugin.loader]
            }
        ],
    },

    plugins: [
        new CopyPlugin({
            patterns: ['src/index.html']
        }),
        new MiniCssExtractPlugin({
            filename: '[hash].css'
        }),
        new webpack.DefinePlugin({
            NODE: JSON.stringify(false)
        }),
        new VueSSRClientPlugin()
    ],

    output: {
        filename: '[hash].js'
    },

    devtool: 'source-map'

}



// --------------------------
// Server config
// --------------------------

const Server = {

    target: 'node',

    plugins: [
        new webpack.DefinePlugin({
            NODE: JSON.stringify(true),
            __INITIAL_STATE__: JSON.stringify({})
        })
    ],

    output: {
        libraryTarget: 'commonjs2',
        libraryExport: 'default',
        filename: 'ssr.bundle.js'
    },

    externals: nodeExternals()

}



// --------------------------
// Exports
// --------------------------

module.exports = [
    merge.smart(Client, Common),
    merge.smart(Server, Common)
]