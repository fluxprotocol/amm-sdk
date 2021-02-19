const path = require('path');
const DeclarationBundlerPlugin = require('declaration-bundler-webpack-plugin');

const exclude = '/node_modules';

module.exports = {
    mode: 'development',
    devtool: false,
    target: 'web',
    resolve: {
        extensions: ['.ts', '.js'],
        aliasFields: ['browser'],
    },
    entry: {
        FluxSdk: ['./src/FluxSdk.ts'],
    },
    output: {
        path: path.resolve(__dirname, './dist/'),
        libraryTarget: 'commonjs',
        filename: '[name].js',
        publicPath: '/dist/',
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
        ],
    },
    node: {
        module: 'empty',
        dgram: 'empty',
        dns: 'mock',
        fs: 'empty',
        http2: 'empty',
        net: 'empty',
        tls: 'empty',
        child_process: 'empty',
    },
};
