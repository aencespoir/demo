const { defineConfig } = require('@vue/cli-service')
const path = require('path')
 
module.exports = defineConfig({
  transpileDependencies: true,
 
  configureWebpack: {
    resolve: {
      extensions: ['.js', '.vue', '.json'],
      alias: {
        vue$: 'vue/dist/vue.esm.js',
        '@': path.join(__dirname, '/', 'src'),
        '@assets': path.join(__dirname, '/', 'src/assets'),
        '@api': path.join(__dirname, '/', 'src/api'),
        '@common': path.join(__dirname, '/', 'src/common'),
        '@views': path.join(__dirname, '/', 'src/views'),
        '@pCom': path.join(__dirname, '/', 'src/views/PublicComp'),
        '@comp': path.join(__dirname, '/', 'src/components')
      }
    }
  }
})