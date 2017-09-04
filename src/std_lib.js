const assignFunc = (scope) => scope.add;
const addFunc = (a, b) => a + b;
const subFunc = (a, b) => a - b;
const multFunc = (a, b) => a * b;
const divFunc = (a, b) => a / b;
const modFunc = (a, b) => a % b;

const setupGlobalScope = (scope) => {
  scope.add('assign', { func: assignFunc(scope), arity: 2 });
  scope.add('add', { func: addFunc, arity: 2 });
  scope.add('sub', { func: subFunc, arity: 2 });
  scope.add('mult', { func: multFunc, arity: 2 });
  scope.add('div', { func: divFunc, arity: 2 });
  scope.add('mod', { func: modFunc, arity: 2 });

  return scope;
};

module.exports = { setupGlobalScope };
