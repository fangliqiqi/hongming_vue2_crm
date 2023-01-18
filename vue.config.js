'use strict'
const path = require('path')
const defaultSettings = require('./src/settings.js')

function resolve(dir) {
    return path.join(__dirname, dir)
}

const name = defaultSettings.title || '泓铭管理系统' // 标题

const port = process.env.port || process.env.npm_config_port || 80 // 端口

// 解决富文本使用过程中quill-image-resize-module发生imports错误
const webpack = require('webpack')

module.exports = {
    // 部署生产环境和开发环境下的URL。
    // 默认情况下，Vue CLI 会假设你的应用是被部署在一个域名的根路径上
    publicPath: process.env.NODE_ENV === "production" ? "/" : "/",
    // 在npm run build 或 yarn build 时 ，生成文件的目录名称（要和baseUrl的生产环境路径一致）（默认dist）
    outputDir: 'dist',
    // 用于放置生成的静态资源 (js、css、img、fonts) 的；（项目打包之后，静态资源会放在这个文件夹下）
    assetsDir: 'static',
    // 是否开启eslint保存检测，有效值：ture | false | 'error'
    lintOnSave: process.env.NODE_ENV === 'development',
    // 如果你不需要生产环境的 source map，可以将其设置为 false 以加速生产环境构建。
    productionSourceMap: false,
    // webpack-dev-server 相关配置
    devServer: {
        host: '0.0.0.0',
        port: port,
        open: true,
        proxy: {
            "/api": {
                target: process.env.VUE_APP_SSO_HOST,
                changeOrigin: true,
                // pathRewrite: {
                //   "/api": "/"
                // }
            },
            "/guns-cloud-store": {
                target: process.env.VUE_APP_BASE_API,
                changeOrigin: true,
                // pathRewrite: {
                //   '/guns-cloud-store': '/guns-cloud-shop'
                // }
            },
            "/hmkj-workflow": {
                target: process.env.VUE_APP_WORKFLOW,
                changeOrigin: true
                    // pathRewrite: {
                    //   '/file': ''
                    // }
            },
            "/guns-cloud-system": {
                target: process.env.VUE_APP_BASE_API,
                changeOrigin: true,
                // pathRewrite: {
                //   '/guns-cloud-system': ''
                // }
            },
            "/guns-cloud-branch": {
                target: process.env.VUE_APP_BASE_API,
                changeOrigin: true
                    // pathRewrite: {
                    //   '/api': ''
                    // }
            },
            "/hmkj-crm": {
                target: process.env.VUE_APP_CRM_API,
                changeOrigin: true,
                // pathRewrite: {
                //   '/hmkj-crm': ''
                // }
            },
            "/hmkj-message": {
                target: process.env.VUE_APP_MASG_API,
                changeOrigin: true,
                // pathRewrite: {
                //   '^/hmkj-message': ''
                // }
            },
            "/guns-cloud-auth": {
                target: process.env.VUE_APP_AUTH_API,
                changeOrigin: true
                    // pathRewrite: {
                    //   '/file': ''
                    // }
            },
            "/contract/": {
                target: process.env.VUE_APP_CRMHT_API,
                changeOrigin: true,
                pathRewrite: {
                    '/contract': ''
                }
            },
            "/profile": {
                target: process.env.VUE_APP_CRM_API,
                changeOrigin: true,
                // pathRewrite: {
                //     '/hmkj-down': ''
                // }
            },
            "/hmkj-weixinwork-oa": {
                target: process.env.VUE_APP_CRM_API,
                changeOrigin: true
                    // pathRewrite: {
                    //   '/file': ''
                    // }
            },
            // "/guns-cloud-branchRule": {
            //   target: process.env.VUE_APP_BASE_API,
            //   changeOrigin: true
            //   // pathRewrite: {
            //   //   '/file': ''
            //   // }
            // },
            // "/guns-cloud-member": {
            //   target: process.env.VUE_APP_BASE_API,
            //   changeOrigin: true
            //   // pathRewrite: {
            //   //   '/file': ''
            //   // }
            // }
        },
        disableHostCheck: true
    },
    configureWebpack: {
        name: name,
        resolve: {
            alias: {
                '@': resolve('src')
            }
        }
    },
    //富文本拖拽报错
    // plugins: [
    //     new webpack.ProvidePlugin({
    //         'window.Quill': 'quill/dist/quill.js',
    //         'Quill': 'quill/dist/quill.js'
    //     })
    // ],
    chainWebpack(config) {
        // 解决富文本 
        config.plugin("provide").use(webpack.ProvidePlugin, [{
            "window.Quill": "quill/dist/quill.js",
            Quill: "quill/dist/quill.js"
        }]);
        config.plugins.delete('preload') // TODO: need test
        config.plugins.delete('prefetch') // TODO: need test

        // set svg-sprite-loader
        config.module
            .rule('svg')
            .exclude.add(resolve('src/assets/icons'))
            .end()
        config.module
            .rule('icons')
            .test(/\.svg$/)
            .include.add(resolve('src/assets/icons'))
            .end()
            .use('svg-sprite-loader')
            .loader('svg-sprite-loader')
            .options({
                symbolId: 'icon-[name]'
            })
            .end()
        config.resolve.alias
            .set('@', resolve('src'))
            .set('wx', resolve('http://res.wx.qq.com/open/js/jweixin-1.6.0.js'))
        config
            .when(process.env.NODE_ENV !== 'development',
                config => {
                    config
                        .plugin('ScriptExtHtmlWebpackPlugin')
                        .after('html')
                        .use('script-ext-html-webpack-plugin', [{
                            // `runtime` must same as runtimeChunk name. default is `runtime`
                            inline: /runtime\..*\.js$/
                        }])
                        .end()
                    config
                        .optimization.splitChunks({
                            chunks: 'all',
                            cacheGroups: {
                                libs: {
                                    name: 'chunk-libs',
                                    test: /[\\/]node_modules[\\/]/,
                                    priority: 10,
                                    chunks: 'initial' // only package third parties that are initially dependent
                                },
                                elementUI: {
                                    name: 'chunk-elementUI', // split elementUI into a single package
                                    priority: 20, // the weight needs to be larger than libs and app or it will be packaged into libs or app
                                    test: /[\\/]node_modules[\\/]_?element-ui(.*)/ // in order to adapt to cnpm
                                },
                                commons: {
                                    name: 'chunk-commons',
                                    test: resolve('src/components'), // can customize your rules
                                    minChunks: 3, //  minimum common number
                                    priority: 5,
                                    reuseExistingChunk: true
                                }
                            }
                        })
                    config.optimization.runtimeChunk('single')
                }
            )
    }
}