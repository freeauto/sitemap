var webpack = require('webpack');
var path = require('path');
var comUtils = require('com-utils');

var IS_REAL_PROD = Boolean(process.env.COMMIT);
var IS_LIKE_PROD = Boolean(process.env.COMMIT || process.env.PRODUCTION);


var ENV = {
    IS_REAL_PROD: JSON.stringify(IS_REAL_PROD),
    IS_LIKE_PROD: JSON.stringify(IS_LIKE_PROD),
    'process.env': {
        NODE_ENV: IS_LIKE_PROD ? JSON.stringify('production') : JSON.stringify('development')
    }
};

module.exports = {
    entry: {
        // use multiple entries for multiple apps
        app: './assets/app/App'
        // blah: './assets/blah/Blah'
    },
    output: {
        path: path.join(__dirname, 'assets/compiled'),
        filename: '[name].jsx',
        publicPath: '/compiled/'
    },
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                include: [
                    path.join(__dirname, 'assets/app'),
                    comUtils.MVP_JS_PATH
                ],
                exclude: /node_modules/,
                loader: 'babel',
                // query: { presets:['react', 'es2015'] } // babel 6
                // babel 5
                query: {
                    stage: 1,
                    plugins: []
                }
            }
        ]
    },
    resolve: {
        root: [path.join(__dirname, 'node_modules'), comUtils.MVP_JS_PATH],
        modulesDirectories: ['node_modules'],
        extensions: ['', '.js', '.jsx']
    },
    resolveLoader: {
      modulesDirectories: [path.join(__dirname, 'node_modules')]
    },

    plugins: [new webpack.DefinePlugin(ENV)]
};
