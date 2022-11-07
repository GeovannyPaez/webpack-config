const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const miniCssExtractPlugin= require('mini-css-extract-plugin');
const copyWebpackPlugin= require('copy-webpack-plugin');
const cssMinimizerWebpackPlugin= require('css-minimizer-webpack-plugin');
const terserWebpackPlugin= require('terser-webpack-plugin');
const DotenvWebpack= require('dotenv-webpack');
module.exports= {
    entry: './src/index.js',
    output: {
        path:path.resolve(__dirname, 'dist'),
        // se le configura para que se sele coloque hass al archivo js
        filename: '[name].[contenthash].js',
        clean:true
    },
    resolve :{
        extensions: ['.js'],
        // creacion de alias.
        // alias:{
        //     '@utils':path.resolve(__dirname, 'src/utils/'),
        //     '@templates':path.resolve(__dirname, 'src/templates/'),
        //     '@images':path.resolve(__dirname, 'src/images/'),
        // }
    },
    module:{
        rules :[
            {
                test: /\.m?js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }
            },
            {
                test: /\.css|.s[ac]ss$/i,
                use:[
                    miniCssExtractPlugin.loader,
                    'css-loader',
                    'sass-loader'
                ],
            },
            {
                test : /\.png/,
                type: 'asset/resource'
            },
            {
                test: /\.(woff|woff2)$/i,
                type: 'asset/resource',
                generator: {
                    filename: 'static/fonts/[hash][ext][query]',
                },
            },

        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            inject: true,
            template: './public/index.html',
            filename:'./index.html'
        }),
        // se configura para que  den hashses al los nombre de los archivos css
        new miniCssExtractPlugin({
            filename:'assets/[name].[contenthash].css'
        }),
        new copyWebpackPlugin({
            patterns:[
                {
                    from: path.resolve(__dirname,'src','assets/images'),
                    to: 'assets/images'
                }
            ]
        }),
        new DotenvWebpack(),
    ],
    optimization:{
        minimize:true,
        minimizer: [
            new cssMinimizerWebpackPlugin(),
            new terserWebpackPlugin(),
        ]
    }
}