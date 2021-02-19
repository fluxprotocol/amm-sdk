const path = require('path');

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
        libraryTarget: 'umd',
        filename: '[name].js',
        publicPath: '/dist/',
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx|ts|tsx)$/,
                exclude,
                loader: 'babel-loader',
                options: {
                    sourceType: "unambiguous",
                },
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
