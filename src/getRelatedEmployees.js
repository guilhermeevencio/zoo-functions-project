const data = require('../data/zoo_data');

function isManager(id) {
  const person = data.employees.some(({ managers }) => managers.includes(id));
  return person;
}

const getRelatedEmployees = (managerId) => {
  if (isManager(managerId) === true) {
    return data.employees.filter(({ managers }) => managers.includes(managerId))
      .map(({ firstName, lastName }) => `${firstName} ${lastName}`);
  }
  throw new Error('O id inserido não é de uma pessoa colaboradora gerente!');
};
module.exports = { isManager, getRelatedEmployees };
