const argv = require('yargs').argv;

function getArgValue(param) {
  const value = argv[param];
  return Array.isArray(value) ? value[value.length - 1] : value;
}

module.exports = {
  getArgValue
};
