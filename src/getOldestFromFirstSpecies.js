const data = require('../data/zoo_data');

const findingAnimals = (idEmployee) => {
  const employeeFirstAnimal = data.employees.find(({ id }) => id === idEmployee).responsibleFor[0];
  const firstAnimal = data.species.find(({ id }) => id === employeeFirstAnimal).residents;
  return firstAnimal.sort((a, b) => b.age - a.age)
    .map(({ name, sex, age }) => ([name, sex, age]))[0];
};

const getOldestFromFirstSpecies = (id) => findingAnimals(id);

module.exports = getOldestFromFirstSpecies;
