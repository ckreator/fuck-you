const buildProgram = require('./fucking-parser');

const setupChain = (initialContext = {}) => {
  const chain = [];
  const handle = {
    get(from, what, prox) {
      const str = String(what);
      if (str === 'you') {
        return buildProgram(initialContext, chain);
      }

      if (!/^Symbol\(|^valueOf$/.test(str)) {
        chain.push(String(what));
      }

      return prox;
    },
  };

  const wrapped = new Proxy((...args) => {
    chain.push({ type: 'literal', args });
    return wrapped;
  }, handle);

  return wrapped;
};

module.exports = setupChain;
