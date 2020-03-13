const proxy = require('http-proxy-middleware')
module.exports = function (app,res, next) {
    app.use(proxy('/api', {
        target: 'https://jiaoxueapi.yanuojiaoyu.com',
        secure: false,
        changeOrigin: true,
        pathRewrite: {
            "^/api": "/api"
        }
    }))
}