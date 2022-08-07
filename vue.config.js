const { defineConfig } = require('@vue/cli-service');
const packageJson = require('./package.json');
process.env.VUE_APP_VERSION = packageJson.version;
process.env.VUE_APP_VUE_VERSION = packageJson.dependencies.vue;

let scssVariable = '';
for (let envKey in process.env) {
  if (/VUE_APP_/i.test(envKey)) {
    scssVariable += `$${envKey}: "${process.env[envKey]}";`;
    console.log('########', `$${envKey}: "${process.env[envKey]}";`);
  }
}

module.exports = defineConfig({
  transpileDependencies: true,
  runtimeCompiler: true,
  css: {
    loaderOptions: {
      scss: {
        // prependData: `${scssVariable}`,
      },
    },
  },
  configureWebpack: {
    devtool: 'source-map',
  },
});
