const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const PATHS = {
    source: path.join(__dirname, '../source'),
    build: path.join(__dirname, '../build'),
    assets: 'assets/',
}

module.exports = {
    externals: {
        paths: PATHS
    },
    entry: {
        app: PATHS.source
    },
    output: {
        filename: `${PATHS.assets}js/[name].js`,
        path: PATHS.build,
        publicPath: '/'
    },
    module: {
        rules: [{
            test: /\.js$/,
            loader: 'babel-loader',
            exclude: '/node_modules/'
        }, {
          test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
          loader: 'file-loader',
          options: {
            name: '[name].[ext]'
          }
        }, {
            test: /\.(png|jpg|gif|svg)$/,
            loader: 'file-loader',
            options: {
                name: '[name].[ext]'
        }
        }, {
            test: /\.scss$/,
            use: [
              'style-loader',
              MiniCssExtractPlugin.loader,
              {
                loader: 'css-loader',
                options: { sourceMap: true }
              }, {
                loader: 'postcss-loader',
                options: { sourceMap: true, config: {path: `${PATHS.source}./postcss.config.js`} }
              }, {
                loader: 'sass-loader',
                options: { sourceMap: true }
              }
            ]
        }, {
            test: /\.css$/,
            use: [
              'style-loader',
              MiniCssExtractPlugin.loader,
              {
                loader: 'css-loader',
                options: { sourceMap: true }
              }, {
                loader: 'postcss-loader',
                options: { sourceMap: true, config: { path: `${PATHS.source}./postcss.config.js` } }
              }
            ]
          }]
        },
    plugins: [
        new MiniCssExtractPlugin({
          filename: `${PATHS.assets}css/[name].css`,
        }),
        new CopyWebpackPlugin([
            {from: `${PATHS.source}/assets/img`, to: `${PATHS.assets}img`},
            {from: `${PATHS.source}/assets/fonts`, to: `${PATHS.assets}fonts`},
            {from: `${PATHS.source}/static`, to: ''}
        ]),
        new HtmlWebpackPlugin({
            hash: false,
            template: `${PATHS.source}/index.html`,
            filename: 'index.html',
        })
    ],
}
