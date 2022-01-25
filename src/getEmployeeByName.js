const { employees } = require('../data/zoo_data');
const data = require('../data/zoo_data');

const getEmployeeByName = (employeeName) => employees.find(({ firstName, lastName }) =>
  firstName === employeeName || lastName === employeeName) || {};

console.log(getEmployeeByName());
module.exports = getEmployeeByName;
