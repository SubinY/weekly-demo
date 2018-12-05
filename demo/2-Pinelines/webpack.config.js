const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    devtool: 'source-map',//配置生成Source Maps，选择合适的选项
    entry: __dirname + "/index.ts",//已多次提及的唯一入口文件
    output: {
        path: path.resolve(__dirname + "build"),//打包后的文件存放的地方
        filename: "[name].[hasg].js"//打包后输出文件的文件名
    },
    mode: 'development', // 设置mode
    module: {
        rules: [
            {
                test: /(\.jsx|\.js|\.ts)$/,
                use: {
                    loader: "babel-loader"
                },
                exclude: /node_modules/
            },
            // {
            //     test: /\.ts$/,
            //     use: [
            //         {
            //             loader: 'ts-loader'
            //         }
            //     ]
            // },
            {
                test: /\.html$/,
                loader: "html-loader",
            },
            {
                test: /\.css$/,
                use: [
                    {
                        loader: "style-loader"
                    }, {
                        loader: "css-loader",
                        options: {
                            modules: true, // 指定启用css modules
                        }
                    },
                    {
                        loader: "postcss-loader"
                    }
                ]
            },
            {
                test: /\.scss$/,
                loader: "style-loader!css-loader!sass-loader"
            }
        ]
    },
    plugins: [
        // new webpack.LoaderOptionsPlugin({
        //     options: {
        //         postcss: [
        //             require('autoprefixer') //调用 autoprefixer 插件
        //         ]
        //     }
        // }),
        new webpack.BannerPlugin('版权所有，翻版必究'),
        new HtmlWebpackPlugin({
            title: "subin webpack",
            template: path.resolve(__dirname + "/index.html")//new 一个这个插件的实例，并传入相关的参数
        }),
        // new CopyWebpackPlugin([
        //     { from: path.join(__dirname, 'app/assets'), to: 'assets' },
        // ]), // 手动移动静态资源
        new webpack.ProvidePlugin({
            // "$": "jquery",
            // "jQuery": "jquery",
            // "window.jQuery": "jquery"
        }),
        new webpack.HotModuleReplacementPlugin()//热加载插件
    ],
    optimization: {
        splitChunks: {
            cacheGroups: {
                commons: {
                    name: "subinHu",
                    chunks: "initial",
                    minChunks: 2
                }
            }
        }
    },
    devServer: {
        contentBase: "/",//本地服务器所加载的页面所在的目录
        // historyApiFallback: true,//不跳转
        // inline: true,//实时刷新
        // hot: true
    }
}
