/* eslint-env node */
'use strict';

const path = require('path');
const Funnel = require('broccoli-funnel');
const mergeTrees = require('broccoli-merge-trees');

const jodaPath = path.join(
  path.dirname(require.resolve('js-joda/package.json')),
  'src'
);

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
        destDir: 'js-joda',

        getDestinationPath(relativePath) {
          switch (relativePath) {
            // case 'temporal/TemporalAccessor.js':
            //   return 'temporal/_TemporalAccessor.js';
            default:
              return relativePath;
          }
        }
      }),
      new Funnel('vendor/js-joda', { destDir: 'js-joda' })
    ]);
    const transpiledJodaTree = babelAddon.transpileTree(jodaTree);

    return mergeTrees([addonTree, transpiledJodaTree]);
  }
};
