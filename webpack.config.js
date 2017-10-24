/**
 * Created with JetBrains WebStorm
 * User:Administrator
 * Date: 2017/10/24
 * Time:11:23
 * To change this template use File | Settings | File Templates.
 */
'use strict';
var webpack=require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var HtmlWebpackPlugin = require('html-webpack-plugin');
//获取html-webpack-plugin参数的方法
var getHtmlConfig=function(name){
    return{
        template:'./src/view/'+name+'.html',
        filename:'view/'+name+'.html',
        inject:true,
        hash:true,
        chunks:['common',name]
    }
};
//环境变量的配置，dev/online
var WEBPACK_ENV=process.env.WEBPACK_ENV || 'dev';
console.log(WEBPACK_ENV);

//webpack config
var config={
    entry:{
        'common':['./src/page/common/index.js'],
        'index':['./src/page/index/index.js'],
        'login':['./src/page/login/index.js']
    },
    output:{
        //存放路径
        path:'./dist',
        filename:'/js/[name].js',
        //访问路径
        publicPath:'/dist'
    },
    externals:{
        'jquery':'window.jQuery'
    },
    module:{
        loaders:[
            { test: /\.css$/, loader: ExtractTextPlugin.extract("style-loader","css-loader") },
            { test: /\.(gif|png|jpg|woff|svg|eot|ttf)\??.*$/, loader: 'url-loader?limit=100&name=resource/[name].[ext]' },
        ]
    },
    plugins:[
        //独立通用模块到js/base.js
        new webpack.optimize.CommonsChunkPlugin({
            name:'common',
            filename:'js/base.js'
        }),
        //把css单独打包到文件里
        new ExtractTextPlugin("css/[name].css"),
        //html模板的处理
        //new HtmlWebpackPlugin({
        //    template:'./src/view/index.html',
        //    filename:'view/index.html',
        //    inject:true,
        //    hash:true,
        //    chunks:['common','index']
        //}),
        new HtmlWebpackPlugin(getHtmlConfig('index')),
        new HtmlWebpackPlugin(getHtmlConfig('login')),
    ],
};
//配置前启动服务：webpack-dev-server
//配置后启动服务：webpack-dev-server --inline --port 8088
if('dev'===WEBPACK_ENV){
    config.entry.common.push('webpack-dev-server/client?http://localhost:8088/');
}
module.exports=config;
