module.exports = {
  'env': {
    'browser': true,
    'es6': true,
  },
  'extends': [
    'google',
  ],
  'globals': {
    'Atomics': 'readonly',
    'SharedArrayBuffer': 'readonly',
  },
  'parserOptions': {
    'ecmaVersion': 11,
    'sourceType': 'module',
  },
  'ignorePatterns': [
    './node_modules/**/*.js',
    'Lesson_1/**/*.js',
  ],
  'rules': {
    'max-len': ['error', {'code': 120}],
  },
};
