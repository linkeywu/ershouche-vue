const path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin');

module.exports = {
    //程序的入口文件
    entry: "./www/app/main.js",

    //程序的出口（打包的文件）
    output: {
        //打包文件输出的路径
        path: path.resolve(__dirname, "./www/dist"),
        //打包文件的名称
        filename: 'all.js',
        publicPath: "/public" //这是对webpack-dev-server的配置，配置虚拟路径
    },
    //监听文件的变化（自动打包）
    watch: true,
    mode: "development",
    //配置webpack模块插件
    module: {
        //关于模块的配置规则
        rules: [{
                // 模块规则（配置 loader、解析器等选项）
                test: /\.js?$/, //解析的时候匹配js文件
                //翻译什么文件夹中的文件
                include: [path.resolve(__dirname, "www/app")],
                //不翻译什么文件夹中的文件
                exclude: [path.resolve(__dirname, "node_modules")],
                // loader:"babel-loader",
                //配置翻译语法
                // options:{
                //     presets:["es2015","es2016"]
                // }
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                include: [path.resolve(__dirname, "www/app")],
                exclude: [path.resolve(__dirname, "node_modules")],
                options: {
                    loaders: {
                        js: 'babel-loader!eslint-loader'
                    }
                }
            },
            {
                test: /\.css$/,
                include: [path.resolve(__dirname, "www/app")],
                exclude: [path.resolve(__dirname, "node_modules")],
                use: ['vue-style-loader', 'css-loader'],
            },
            {
              test: /\.styl(us)?$/,
              use: [
                'vue-style-loader',
                'css-loader',
                'stylus-loader'
              ]
            }
        ]
    },
    resolve: {
        alias: {
            'vue$': 'vue/dist/vue.esm.js' // 用 webpack 1 时需用 'vue/dist/vue.common.js'
        }
    },
    //最新版webpack需要引入此插件
    plugins: [
        new VueLoaderPlugin()
    ],
    //webpack设置代理跨越
    devServer: {
        proxy: {
            '/api': {
                target: 'http://127.0.0.1:3000', //设置你调用的接口域名和端口
                //这里理解成/api代理target中的地址，后面组件中调用接口要使用/api代替
                pathRewrite: { '^/api': '' }
            }
        }
    }
}