const data = require('../data/zoo_data');

const getSpeciesByIds = (...ids) => ids.map((input) =>
  data.species.filter(({ id }) => id === input));

console.log(getSpeciesByIds('0938aa23-f153-4937-9f88-4858b24d6bce',
  '78460a91-f4da-4dea-a469-86fd2b8ccc84'));

module.exports = getSpeciesByIds;
