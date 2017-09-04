const TYPES = {
  STRING: 'string',
  NUMBER: 'number',
  BOOL: 'bool',
  OBJECT: 'object',
  ARRAY: 'object', // NOTE: object and array is the same from a type perspective
};

const LITERAL_TYPES = TYPES.NUMBER + TYPES.STRING + TYPES.OBJECT + TYPES.BOOL;

TYPES.isLiteral = token => LITERAL_TYPES.indexOf(token.type) > -1;

module.exports = TYPES;
