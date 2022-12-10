module.exports = {
    transpileDependencies: ['swiper'],
    devServer: {
        host: "localhost",
        port: 8080,
        https: false,
        proxy: "http://localhost:8081"
    }
}

//设置代理解决跨域问题