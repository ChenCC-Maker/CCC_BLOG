const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true
})

module.exports = {
  devServer: {
    proxy:{
      '/api': {
        target:'http://localhost:8080/',
        changeOrign:true,
        pathRewrite:{
          '^/api':''
        }
      }
    }
  },
  frontServer: {
    proxy:{
      '/api': {
        target:'http://localhost:8080/',
        changeOrign:true,
        pathRewrite:{
          '^/api':''
        }
      }
    }
  },

}
