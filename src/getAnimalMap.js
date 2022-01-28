const data = require('../data/zoo_data');

const animals = data.species;
const mapNE = animals.filter(({ location }) => location === 'NE')
  .reduce((acc, { name }) => acc.concat(name), []);
const mapNW = animals.filter(({ location }) => location === 'NW')
  .reduce((acc, { name }) => acc.concat(name), []);
const mapSE = animals.filter(({ location }) => location === 'SE')
  .reduce((acc, { name }) => acc.concat(name), []);
const mapSW = animals.filter(({ location }) => location === 'SW')
  .reduce((acc, { name }) => acc.concat(name), []);
const functionsMap = [mapNE, mapNW, mapSE, mapSW];
const objMap = ['NE', 'NW', 'SE', 'SW'];

const globalMap = () => {
  const reducing = objMap.reduce((acc, value, index) => {
    acc[value] = functionsMap[index];
    return acc;
  }, {});
  return reducing;
};

const filteringByRegion = (region) => animals.filter(({ location }) => location === region);
const namesAnimals = (options) => {
  if (!options.sorted) {
    const includeNames = (region) => filteringByRegion(region).reduce((acc, { name, residents }) =>
      ([...acc, { [name]: residents.map((resident) => resident.name) }]), []);
    const nonOrderedNames = () => objMap.reduce((acc, reg) => {
      acc[reg] = includeNames(reg);
      return acc;
    }, {});
    return nonOrderedNames();
  }
  const sortingNames = (region) => filteringByRegion(region).reduce((acc, { name, residents }) =>
    ([...acc, { [name]: residents.map((resident) => resident.name).sort() }]), []);

  const orderedNames = objMap.reduce((acc, reg) => {
    acc[reg] = sortingNames(reg);
    return acc;
  }, {});
  return orderedNames;
};

function sexAndIncludesVerified(options) {
  const selectedSex = (region, sexx) =>
    filteringByRegion(region).reduce((acc, { name, residents }) =>
      ([...acc, { [name]: residents.filter((resident) =>
        resident.sex === sexx).map((resident) => resident.name) }]), []);
  const togetheringSelectedSex = () => objMap.reduce((acc, reg) => {
    acc[reg] = selectedSex(reg, options.sex);
    return acc;
  }, {});
  return togetheringSelectedSex();
}

const sexAndIncludesVerifiedSort = (options) => {
  const selectedSexSort = (region, sexx) =>
    filteringByRegion(region).reduce((acc, { name, residents }) =>
      ([...acc, { [name]: residents.filter((resident) =>
        resident.sex === sexx).map((resident) => resident.name).sort() }]), []);
  const togetheringSelectedSexSort = () => objMap.reduce((acc, reg) => {
    acc[reg] = selectedSexSort(reg, options.sex);
    return acc;
  }, {});
  return togetheringSelectedSexSort();
};

const SortedNamesOrNot = (options) => {
  if (options.sex && options.includeNames && options.sorted) {
    return sexAndIncludesVerifiedSort(options);
  }
  return sexAndIncludesVerified(options);
};

function getAnimalMap(options = {}) {
  if (!options.includeNames) return globalMap();

  if (options.includeNames && !options.sex) {
    return namesAnimals(options);
  }
  return SortedNamesOrNot(options);
}

module.exports = getAnimalMap;
