const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    proxy: {
      '/api': {
        target: 'http://localhost:8081', // 跨域地址
        ws: true,
        changOrigin: true, //允许跨域
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  }
})
