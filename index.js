'use strict';

const path = require('path');
const Funnel = require('broccoli-funnel');
const mergeTrees = require('broccoli-merge-trees');

const jodaPath = path.join(
  path.dirname(require.resolve('js-joda/package.json')),
  'src'
);

const vendorPath = path.join(__dirname, 'vendor');

module.exports = {
  name: 'ember-joda',

  options: {
    babel: {
      plugins: ['transform-class-properties']
    }
  },

  treeForAddon() {
    const addonTree = this._super.treeForAddon.apply(this, arguments);

    // const babelAddon = this.findAddonByName('ember-cli-babel');
    const babelAddon = this.addons.find(
      addon => addon.name === 'ember-cli-babel'
    );

    const jodaTree = mergeTrees([
      new Funnel(jodaPath, {
        destDir: 'js-joda'
      }),
      new Funnel(`${vendorPath}/js-joda`, { destDir: 'js-joda' })
    ]);

    const babelOptions = {
      babel: {
        plugins: [[require('./lib/transform-joda-to-ember'), {}]]
      }
    };

    const transpiledJodaTree = babelAddon.transpileTree(jodaTree, babelOptions);

    return mergeTrees([addonTree, transpiledJodaTree]);
  }
};
