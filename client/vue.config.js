const path = require('path');

module.exports = {
  assetsDir: '../static',
  baseUrl: '',
  outputDir: path.resolve(__dirname, '../backend/templates'),
  transpileDependencies: ["vuetify"]
};
