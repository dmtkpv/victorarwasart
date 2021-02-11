// -------------------
// Modules
// -------------------

const vm = require('vm');
const fs = require('fs');
const path = require('path');
const express = require('express');
const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const { createRenderer } = require('vue-server-renderer');
const webpackConfig = require('./webpack.config.js');



// -------------------
// Constants
// -------------------

const mode = process.env.NODE_ENV;
const port = 49011;



// ----------------------
// Helpers
// ----------------------

function defer (data = {}) {
    data.promise = new Promise((resolve, reject) => {
        data.resolve = resolve;
        data.reject = reject;
    })
    return data;
}

function listen (server) {
    server.listen(port, () => {
        console.log('listening on port', port);
    });
}



// -------------------
// SSR
// -------------------

const SSR = {

    bundle: null,
    renderer: null,
    loader: defer(),

    async render (path) {
        await this.loader.promise;
        const { bundle, renderer } = this;
        const { app, store, router } = bundle();
        await router.push(path);
        return renderer.renderToString(app, {
            state: store.state.api.response
        });
    },

    update ({ bundle, template, manifest }) {
        this.bundle = vm.runInNewContext(bundle, { exports, require, module, __filename, __dirname, console, setTimeout });
        this.renderer = createRenderer({ template, clientManifest: JSON.parse(manifest) });
        this.loader.resolve();
    },

    init (app) {
        app.get('*', async (req, res, next) => {
            SSR.render(req.url).then(html => res.send(html)).catch(next);
        });
    }

}



// -----------------------
// After webpack's build
// -----------------------

function afterBuild (compiler, stats) {

    const client = 0;
    const server = 1;
    const dist = webpackConfig[0].output.path;


    // clean dist (??? it's dev server)

    const assets = stats.toJson().children.map(child => child.assets).flat().map(asset => asset.name);

    fs.readdirSync(dist).forEach(file => {
        if (!assets.includes(file)) fs.unlinkSync(path.join(dist, file));
    });


    // update SSR

    function read (type, filename) {
        const filepath = path.join(dist, filename);
        if (mode === 'development') return compiler.compilers[type].outputFileSystem.readFileSync(filepath, 'utf8');
        else return fs.readFileSync(filepath, 'utf8');
    }

    SSR.update({
        bundle: read(server, webpackConfig[server].output.filename),
        template: read(client, 'index.html'),
        manifest: read(client, 'vue-ssr-client-manifest.json')
    });

}



// -------------------
// Development
// -------------------

if (mode === 'development') {

    const compiler = webpack(webpackConfig);

    compiler.hooks.watchRun.tap('victorarwas:client', () => {
        SSR.loader = defer();
    });

    compiler.hooks.done.tap('victorarwas:client', stats => {
        try {afterBuild(compiler, stats)}
        catch (e) {console.log(e)}
    });

    listen(new WebpackDevServer(compiler, {
        contentBase: path.join(__dirname, 'www'),
        publicPath: '/dist/',
        serveIndex: false,
        stats: 'errors-only',
        after: SSR.init
    }))

}



// -------------------
// Production
// -------------------

else {
    // run webpack compiler
    // run afterBuild
    const app = express();
    app.use(express.static('www'));
    SSR.init(app);
    listen(app);
}


