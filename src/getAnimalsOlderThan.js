const data = require('../data/zoo_data');

const getAnimalsOlderThan = (animal, age) => {
  const animals = data.species.filter(({ name }) => animal === name);
  const ageVerification = animals.every(({ residents }) =>
    residents.every((info) => info.age > age));
  return ageVerification;
};

module.exports = getAnimalsOlderThan;
