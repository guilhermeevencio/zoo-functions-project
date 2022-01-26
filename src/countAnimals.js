const data = require('../data/zoo_data');

function countAnimals(animal) {
  const obj = {};
  let count = 0;
  if (!animal) {
    data.species.forEach(({ name, residents }) => { obj[name] = residents.length; });
    return obj;
  }
  if (Object.values(animal).length === 2) {
    // tenho que retornar o valor de quantos animais do mesmo sexo possuem... provavelmente irei com o filter e depois irei atualizar o count com o length.
  }
}
console.log(countAnimals({ specie: 'elephants', sex: 'male' }));
module.exports = countAnimals;
