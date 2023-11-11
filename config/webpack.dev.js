const { merge } = require('webpack-merge');
const commonConfig = require('./webpack.common.js');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const packageJson = require('../package.json');

const devConfig = {
    mode: 'development',
    output: {
        publicPath: 'auto',
    },
    devServer: {
        port: 8081,
        historyApiFallback: true,
    },
    optimization: {
        runtimeChunk: false,
        splitChunks: false
    },
    plugins: [
        { // anonymous plugin
            apply(compiler) {
              compiler.hooks.beforeRun.tapAsync('MyCustomBeforeRunPlugin', function(compiler, callback) {
                // debugger
                console.dir(compiler.options)
                callback()
              })
            },
        },
        new ModuleFederationPlugin({
            name: 'component',
            filename: 'remoteEntry.js',
            exposes: {
                './ComponentContent': './src/ComponentContent.jsx'
            },
            remotes: {
                dtk: 'storybook@https://dtk.suncoast.systems/dtk/remoteEntry.js',
                common: 'common@https://commonjs.suncoast.systems/remoteEntry.js',
            },
            shared: {
                ...packageJson.dependencies,
                react: {
                    singleton: true,
                    requiredVersion: packageJson.dependencies.react,
                },
                'react-dom': {
                    singleton: true,
                    requiredVersion: packageJson.dependencies['react-dom'],
                },
                'react-router-dom': {
                    singleton: true,
                    requiredVersion: packageJson.dependencies['react-router-dom'],
                },
                bootstrap: {
                    singleton: true,
                    requiredVersion: packageJson.dependencies.bootstrap,
                },
            }
        })
    ],
};

module.exports = (env) => merge(commonConfig(env), devConfig);