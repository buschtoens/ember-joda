/* eslint-env node */

const GetterRegex = /^(?:chronology|dayOf(?:Month|Week|Year)|hashCode|hour|instant|millis|minute|month|monthValue|name|nano|lengthOf(?:Month|Year)|offset|ordinal|second|value|year)$/;

module.exports = function({ types: t }) {
  const idEmber = t.identifier('Ember');
  const idEmberObject = t.identifier('EmberObject');
  const idGet = t.identifier('get');
  const ComparableMixin = t.memberExpression(
    idEmber,
    t.identifier('Comparable')
  );

  return {
    visitor: {
      Program(path) {
        path.unshiftContainer(
          'body',
          t.importDeclaration(
            [
              t.importDefaultSpecifier(idEmberObject),
              t.importSpecifier(idGet, idGet)
            ],
            t.stringLiteral('@ember/object')
          ),
          t.importDeclaration(
            [t.importDefaultSpecifier(idEmber)],
            t.stringLiteral('ember')
          )
        );
      },
      ClassDeclaration(path) {
        let didExtend = false;
        if (!path.node.superClass) {
          if (
            ![
              'OffsetIdPrinterParser',
              'ValueRange',
              'DateTimeFormatter',
              'FractionPrinterParser'
            ].includes(path.node.id.name) // FIXME: this is stupid
          ) {
            // extend leaf super classes from EmberObject
            path.node.superClass = idEmberObject;
            didExtend = true;
          }
        }

        for (const methodPath of path.get('body.body')) {
          if (
            methodPath.node.type === 'ClassMethod' &&
            !methodPath.node.static
          ) {
            if (didExtend && methodPath.node.kind === 'constructor') {
              // insert missing super call
              methodPath
                .get('body')
                .unshiftContainer('body', t.callExpression(t.super(), []));
            } else if (methodPath.node.kind == 'method') {
              if (methodPath.node.key.name === 'compareTo') {
                // add compare method
                methodPath.insertAfter(
                  t.classMethod(
                    'method',
                    t.identifier('compare'),
                    methodPath.node.params,
                    t.blockStatement([
                      t.returnStatement(
                        t.callExpression(
                          t.memberExpression(
                            t.thisExpression(),
                            methodPath.node.key
                          ),
                          methodPath.node.params
                        )
                      )
                    ])
                  )
                );

                // mixin Comparable mixin for comparable classes
                path
                  .getStatementParent()
                  .insertAfter(
                    t.expressionStatement(
                      t.callExpression(
                        t.memberExpression(
                          path.node.id,
                          t.identifier('reopen')
                        ),
                        [ComparableMixin]
                      )
                    )
                  );
              } else if (methodPath.node.key.name === 'get') {
                // re-wrap Ember get method
                const bodyPath = methodPath.get('body');

                bodyPath.replaceWith(
                  t.blockStatement([
                    t.ifStatement(
                      t.binaryExpression(
                        '===',
                        t.unaryExpression('typeof', methodPath.node.params[0]),
                        t.stringLiteral('string')
                      ),
                      t.blockStatement([
                        t.returnStatement(
                          t.callExpression(idGet, [
                            t.thisExpression(),
                            methodPath.node.params[0]
                          ])
                        )
                      ]),
                      bodyPath.node
                    )
                  ])
                // );
              } else if (
                methodPath.node.params.length === 0 &&
                GetterRegex.test(methodPath.node.key.name)
              ) {
                // turn all getter methods into real getters
                methodPath.node.kind = 'get';
              }
            }
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
