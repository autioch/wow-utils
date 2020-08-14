module.exports = {
  extends: 'qb',
  parser: 'babel-eslint',
  rules: {
    'id-length': ['off'],
    'max-len': ['off'],
    'id-blacklist': ['off'],
    'line-comment-position': ['off'],
    'no-inline-comments': ['off'],
    'no-magic-numbers': ['off'],
    'no-return-assign': ['off'],
    'camelcase': ['off'],
    'no-console': ['off'],
    'newline-per-chained-call': ['off']
  },
  env: {
    node: true
  }
};
