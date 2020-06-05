const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserJSPlugin = require('terser-webpack-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')

isDev = process.env.NODE_ENV === 'development'
isProd = !isDev

const fileName = ext => isDev ? `[name].${ext}` : `[name].[hash].${ext}`

const cssLoader = pp => {
    const loaders = [
        {
            loader: MiniCssExtractPlugin.loader,
            options: {
                hmr: isDev,
                reloadAll: true,
            },
        },
        {
            loader:'css-loader',
            options: {
                modules: {
                    auto: true,
                },
            },
        },
        'postcss-loader',
    ]

    if (pp) {
        loaders.push(pp)
    }

    return loaders
}

const babelLoader = preset => {
    const options = {
        presets: ['@babel/preset-env'],
        plugins: [
            '@babel/plugin-proposal-class-properties'
        ]
    }

    if (preset) {
        if (Array.isArray(preset)) {
            options.presets.push(...preset)
        } else {
            options.presets.push(preset)
        }
    }

    return options
}

module.exports = {
    context: path.resolve(__dirname, 'src'),
    entry: ["@babel/polyfill", './index.jsx'],
    mode: 'development',
    output: {
        filename: fileName('js'),
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/'
    },
    resolve: {
        extensions: ['.tsx', '.jsx', '.js', '.ts', '.json']
    },
    optimization: {
        splitChunks: {
            chunks: 'all'
        },
        minimizer: [
            new TerserJSPlugin({}),
            new OptimizeCSSAssetsPlugin({})
        ],
    },
    devtool: isDev ? 'source-map' : '',
    devServer: {
        port: 3000,
        hot: isDev,
        historyApiFallback: true,
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./index.html"
        }),
        new CleanWebpackPlugin(),
        new CopyPlugin({
            patterns: [
                {
                    from: path.resolve(__dirname, 'src/favicon.ico'),
                    to: path.resolve(__dirname, 'dist')
                },
            ],
        }),
        new MiniCssExtractPlugin({
            filename: fileName('css'),
        }),
    ],
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: cssLoader(),
            },
            {
                test: /\.s[ac]ss$/i,
                use: cssLoader('sass-loader'),
            },
            {
                test: /\.(png|jpe?g|svg|gif)$/i,
                use: ['file-loader']
            },
            {
                test: /\.(ttf|woff|woff2|eot)$/i,
                use: ['file-loader']
            },
            {
                test: /\.xml$/,
                use: ['xml-loader']
            },
            {
                test: /\.m?js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: babelLoader()
                }
            },
            {
                test: /\.ts$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: babelLoader("@babel/preset-typescript")
                }
            },
            {
                test: /\.jsx$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: babelLoader("@babel/preset-react")
                }
            },
            {
                test: /\.tsx$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: babelLoader(["@babel/preset-react", "@babel/preset-typescript"])
                }
            },
        ],

    },
}
