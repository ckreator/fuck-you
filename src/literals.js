const {
  STRING,
  NUMBER,
  BOOL,
  OBJECT,
  ARRAY,
} = require('./types');

// Makers for types
const defaultReducer = x => x;
const objectWrapper = () => ({ type: OBJECT });
const arrayWrapper = () => ({ type: ARRAY });

const stringMaker = s => `${s}`;
const stringWrapper = () => ({ type: STRING });

const numberMaker = n => Number(n);
const numberWrapper = () => ({ type: NUMBER });

const booleanMaker = b => Boolean(b);
const booleanWrapper = () => ({ type: BOOL });

const buildShort = (ary, applyFunc, wrapperFunc) => {
  const wrapped = wrapperFunc();
  if (ary.length === 1) {
    wrapped.value = applyFunc(ary[0]);
  } else {
    wrapped.value = ary.map(applyFunc);
  }

  return wrapped;
};

const LITERAL_FUNCTIONS = {
  str: (args) => buildShort(args, stringMaker, stringWrapper),
  num: (args) => buildShort(args, numberMaker, numberWrapper),
  obj: (args) => buildShort(args, defaultReducer, objectWrapper),
  list: (args) => buildShort(args, defaultReducer, arrayWrapper),
  bool: (args) => buildShort(args, booleanMaker, booleanWrapper),
};

const literalFunction = (prev, curr) => {
  if (prev == null || !LITERAL_FUNCTIONS.hasOwnProperty(prev)) {
    throw Error('Cannot create literal of:', prev, curr);
  }

  return LITERAL_FUNCTIONS[prev](curr.args);
};

module.exports = { literalFunction };
