const data = require('../data/zoo_data');
const { prices } = require('../data/zoo_data');

function countEntrants(entrants) {
  const adultPeople = Object.values(entrants).filter(({ age }) => age >= 18 && age < 50);
  const seniorPeople = Object.values(entrants).filter(({ age }) => age >= 50);
  const childPeople = Object.values(entrants).filter(({ age }) => age < 18);
  return { adult: adultPeople.length, child: childPeople.length, senior: seniorPeople.length };
}

function calculateEntry(entrants) {
  if (!entrants || Object.entries(entrants).length === 0 || +(!!entrants) === 0) {
    return 0;
  }
  const qtd = Object.keys(countEntrants(entrants)).map((key) => countEntrants(entrants)[key]);
  const price = Object.keys(prices).map((key) => prices[key]);
  const [a, b, c] = price;
  const reorderedPrice = [a, c, b];
  const sum = qtd.reduce((acc, people, index) => acc + (people * reorderedPrice[index]), 0);
  return sum;
}

module.exports = { calculateEntry, countEntrants };
