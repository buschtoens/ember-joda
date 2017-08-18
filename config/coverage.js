/* eslint-env node */

module.exports = {
  useBabelInstrumenter: true,
  babelPlugins: require('../').options.babel.plugins
};
