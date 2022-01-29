const data = require('../data/zoo_data');

function countAnimals(animal) {
  const obj = {};
  if (!animal) {
    data.species.forEach(({ name, residents }) => { obj[name] = residents.length; });
    return obj;
  }
  if (Object.values(animal).length === 2) {
    const selectedAnimal = data.species.find(({ name }) => animal.specie === name)
      .residents.filter(({ sex }) => sex === animal.sex);
    return selectedAnimal.length;
  }
  return data.species.find(({ name }) => animal.specie === name).residents.length;
}
module.exports = countAnimals;
