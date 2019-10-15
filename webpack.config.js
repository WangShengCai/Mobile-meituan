// 单独抽离css文件
var MiniCssExtractPlugin = require('mini-css-extract-plugin');
// 清理前一次打包引入的残留html文件
var {CleanWebpackPlugin} = require('clean-webpack-plugin');
// 单独抽离html文件，并且自动引入css和js文件
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    // 入口
    entry: {
        index: './src/js/meituan-index.js',
        info: './src/js/meituan-info.js'
    },
    // 输出
    output: {
        filename: '[name]-[hash:5].js',
        path: __dirname + '/out'
    },
    // loader
    module: {
        rules: [
            // js
            { test: /(\.js)$/, use: ['babel-loader'] },
            // css
            { test: /(\.css)$/, use: [MiniCssExtractPlugin.loader,'css-loader'] },
            // 图片,字体图标
            {test: /(\.jpg|png|svg|eot|ttf|woff)$/,use: ['url-loader?limit=1000&name=./[name].[ext]']}
        ]
    },
    // 插件
    plugins: [
        new MiniCssExtractPlugin({              // 单独抽离css文件
            filename: '[name]-[hash:5].css'
        }),
        new CleanWebpackPlugin(),               // 清除上一次的打包文件
        new HtmlWebpackPlugin({                 // 自动引入打包之后的样式文件
            template: './meituan-index.html',   // 模板
            filename: 'index.html',             // 名称
            minify: {
                removeComments: true            // 清除注释
            },
            chunks: ['index']                   // 指定在此文件中引入的样式名称
        }),
        new HtmlWebpackPlugin({                 // 自动引入打包之后的样式文件
            template: './meituan-detail.html',  // 模板
            filename: 'detail.html',            // 名称
            minify: {
                removeComments: true            // 清除注释
            },
            chunks: ['info']                    // 指定在此文件中引入的样式名称
        })
    ],
    // 所处环境
    mode: 'production',
    // 开启本地服务器
    devServer: {
        port: '1111',
    }
}