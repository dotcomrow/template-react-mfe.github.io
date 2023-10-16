const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ProvidePlugin = require('webpack').ProvidePlugin;
const fs = require('fs');
const dotenv = require('dotenv');
const webpack = require('webpack');

module.exports = (env) => {
    return {
        output: {
            path: path.resolve(__dirname, '../build')
        },
        resolve: {
            extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
            fallback: {
                "stream": require.resolve("stream-browserify"),
                "buffer": require.resolve('buffer'),
                constants: false,
                fs: false,
                path: require.resolve('path-browserify'),
            }
        },
        module: {
            rules: [
                {
                    test: /\.(ts|tsx|js|jsx)$/,
                    exclude: /node_modules/,
                    use: {
                        loader: 'babel-loader',
                        options: {
                            presets: ["@babel/preset-env", "@babel/preset-react", "@babel/preset-typescript"],
                            plugins: ["@babel/plugin-transform-runtime"]
                        }
                    }
                },
                {
                    test: /\.(css|s[ac]ss)$/i,
                    use: ['style-loader', 'css-loader', 'sass-loader', 'postcss-loader'],
                },
                {
                    test: /\.(png|jpe?g|gif|svg|ico)$/i,
                    use: [
                        {
                            loader: 'file-loader',
                            options: {
                                name: '[path][name].[ext]?[hash]',
                            }
                        }
                    ]
                },
                {
                    test: /\.json$/,
                    loader: 'json-loader',
                },
                {
                    test: /\.m?js/,
                    type: 'javascript/auto',
                    resolve: {
                        fullySpecified: false,
                    },
                }
            ],
        },
        plugins: [
            new HtmlWebpackPlugin({
                template: path.resolve(__dirname, '../public/index.html'),
                publicPath: '/',
                favicon: path.resolve(__dirname, '../assets/favicon.ico'),
            }),
            new CopyWebpackPlugin({
                patterns: [
                    {
                        from: path.resolve(__dirname, '../assets'),
                        to: path.resolve(__dirname, '../build'),
                    }
                ]
            }),
            new ProvidePlugin({
                process: 'process/browser',
                Buffer: ['buffer', 'Buffer'],
            }),
        ]
    };
}
