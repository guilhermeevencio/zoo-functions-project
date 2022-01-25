const data = require('../data/zoo_data');

const getSpeciesByIds = (...ids) => data.species.filter(({ id }) => ids.includes(id));

module.exports = getSpeciesByIds;
