const Scope = require('./scope');
const { literalFunction } = require('./literals');
const { setupGlobalScope } = require('./std_lib');
const { isLiteral } = require('./types');

const isSpecial = str => /^(num|str|list|obj|bool)$/.test(str);

module.exports = (initialContext, tokens) => {
  const scope = setupGlobalScope(Scope(initialContext));

  function processExpression(chain = []) {
    // NOTE: should also handle empty expressions
    if (chain.length === 0 || chain[0].value === 'stfu') {
      chain.shift();
      return {};
    }

    const funcName = chain.shift().value;
    const functionConfig = scope.getFunction(funcName);
    const { func } = functionConfig;
    let { arity } = functionConfig;
    let partial = func;

    // check for assignment
    if (funcName === 'assign' && arity === 2) {
      partial = partial.bind({}, chain.shift().value);
      arity--;
    }

    for (let i = 0; i < arity; i++) {
      const first = chain[0];
      if (scope.hasFunction(first.value)) {
        partial = partial.bind({}, processExpression(chain));
      } else if (isLiteral(first)) {
        partial = partial.bind({}, chain.shift().value);
      } else {
        partial = partial.bind({}, scope.lookup(chain.shift().value));
      }
    }


    return partial();
  }

  const textify = myTokens => myTokens.reduce((obj, current) => {
    const out = obj;

    if (typeof current === 'object') {
      out.list.push(literalFunction(out.func, current));
    } else if (!isSpecial(current)) {
      out.list.push({ type: 'identifier', value: current });
    }

    out.func = current;
    return out;
  }, { list: [], func: '' }).list;

  const code = textify(tokens);

  while (code.length > 0) {
    processExpression(code);
  }

  return scope.raw();
};
