var path = require('path');
var webpack = require('webpack'),
    ExtractTextPlugin = require("extract-text-webpack-plugin"),     //文件提取---把额外的数据加到编译好的文件中
    HtmlWebpackPlugin = require('html-webpack-plugin'),     //自动生成html插件
    autoprefixer = require('autoprefixer');
var srcPath = path.resolve(__dirname, 'src'), distPath = path.resolve(__dirname, 'dist');

/**** plugins start ****/
var plugins = [];
//压缩丑化js
// plugins.push(new webpack.optimize.UglifyJsPlugin());
//通过计算模块出现次数来分配模块 最短的id分配给使用频率高的模块
plugins.push(new webpack.optimize.OccurenceOrderPlugin());
//去除重复的依赖  查找相等或近似的模块，避免在最终生成的文件中出现重复的模块
plugins.push(new webpack.optimize.DedupePlugin());
//热替换 HMR
plugins.push(new webpack.HotModuleReplacementPlugin());
//自动生成html文件
plugins.push(new HtmlWebpackPlugin({
    title: 'react-mobx-es6-webpack',
    filename: 'index.html',
    template: path.resolve(srcPath, 'index.html'),
    inject: 'body',
    favicon: '',
    minify: {
        removeComments: true,
        collapseWhitespace: false,
        conservativeCollapse: true,
        collapseBooleanAttributes: true,
        removeRedundantAttributes: true,
        removeScriptTypeAttributes: true,
        removeStyleLinkTypeAttributes: true,
        minifyJS: false,
        minifyCSS: false,
        minifyURLs: true
    },
    hash: true,
    cache: false,
    showError: false,
}));
//文件提取插件
plugins.push(new ExtractTextPlugin("[name].[hash].css"));
//不显示错误插件
plugins.push(new webpack.NoErrorsPlugin());
/**** plugins end ****/

var config = {
    //入口文件
    entry: [
        'webpack-dev-server/client?http://0.0.0.0:8000', // WebpackDevServer host and port
        'webpack/hot/only-dev-server', // "only" prevents reload on syntax errors
        path.join(srcPath, 'index')
    ],
    //输出配置
    output: {
        path: distPath,
        // publicPath: '/asserts/',    //output.publicPath 表示资源的发布地址，当配置过该属性后，打包文件中所有通过相对路径引用的资源都会被配置的路径所替换。
        filename: 'bundle.js'
    },
    module: {
        //加载器
        loaders: [
            {
                //图片打包
                test: /\.(png|jpg|gif)$/,
                loader: 'url-loader?limit=8192'
                // loader: 'url-loader?limit=8192&name=images/[hash:8].[name].[ext]'   //包含打包之后的文件名及路径
            },
            {
                //less文件打包
                test: /\.less$/,
                // loader: 'style!css!less'            //less文件处理
                loader: ExtractTextPlugin.extract("style", "css!postcss!less")       //将css文件提取到单独的css文件中
            },
            {
                //css文件打包
                test: /\.css$/,
                // loader: "style-loader!css-loader!postcss-loader"
                loader: ExtractTextPlugin.extract("style", "css!postcss")            //将css文件提取到单独的css文件中
            },
            {
                //es6 to es5
                test: /\.js$/,
                loader: 'babel'
            }
        ]
    },
    //postcss设置
    postcss: [
        autoprefixer({
            browsers: ['last 5 versions']
        })
    ],
    //webpack dev server webpack热替换配置
    devServer: {
        contentBase: 'src',
        devtool: 'source-map',
        hot: true,
        inline: true,
        port: 8000,
        host: 'localhost'
    },
    //插件
    plugins: plugins,
    //source-map配置
    devtools: 'source-map',
    resolve: {
        //别名 请求重定向
        alias: {},
        //扩展名省略
        extensions: ['', '.js', '.jsx']
    },
};
module.exports = config;