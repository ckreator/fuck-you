const rootScope = require('./scope')();

module.exports = (initialContext, ast = []) => {
  ast.map(expr => {
    if (expr.type === 'Assignment') {
      rootScope.add(expr.var, expr.value);
    } else if (expr.type === 'Expression') {
      console.log('Ran into expression:', expr);
    }

    return expr;
  });

  return rootScope.scope;
};
