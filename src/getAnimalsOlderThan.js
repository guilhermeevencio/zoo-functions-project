const data = require('../data/zoo_data');

function getAnimalsOlderThan(animal, age) {
  const animals = data.species.filter(({ name }) => animal === name);
  // const ageVerification = animals.residents.every((element) => element.age < age);
  const ageVerification = animals.every(({ residents }) => residents.every((info) => info.age > age));
  return ageVerification;
}


//console.log(getAnimalsOlderThan('otters', 7));
//console.log(data.species[0].residents[0].age);



module.exports = getAnimalsOlderThan;
