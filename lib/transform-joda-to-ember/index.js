/* eslint-env node */

const GetterRegex = /^(?:chronology|dayOf(?:Month|Week|Year)|hashCode|hour|instant|millis|minute|month|monthValue|name|nano|lengthOf(?:Month|Year)|offset|ordinal|second|value|year)$/;

module.exports = function({ types: t }) {
  return {
    visitor: {
      Class({ node }) {
        // turn all getter methods into real getters
        for (const methodNode of node.body.body) {
          if (
            methodNode.type === 'ClassMethod' &&
            methodNode.kind === 'method' &&
            !methodNode.static &&
            methodNode.params.length === 0 &&
            GetterRegex.test(methodNode.key.name)
          ) {
            methodNode.kind = 'get';
          }
        }
      },
      CallExpression(path) {
        // turn all getter call expressions into member expressions
        if (
          path.node.arguments.length === 0 &&
          t.isMemberExpression(path.node.callee) &&
          t.isIdentifier(path.node.callee.property) &&
          GetterRegex.test(path.node.callee.property.name)
        ) {
          path.replaceWith(path.node.callee);
        }
      }
    }
  };
};

module.exports.baseDir = function() {
  return __dirname;
};
