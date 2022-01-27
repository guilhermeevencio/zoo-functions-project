const data = require('../data/zoo_data');

const { hours } = data;
const weekDays = Object.keys(hours);
const animals = data.species.map(({ name }) => name);
const comparison = (scheduleTarget) =>
  (weekDays.includes(scheduleTarget) || animals.includes(scheduleTarget));

function comparingDays(day) {
  const animalList = [];
  data.species.forEach(({ availability, name }) => {
    if (availability.includes(day)) animalList.push(name);
  });
  return animalList;
}
const animalExhibition = (scheduleTarget) =>
  data.species.find(({ name }) => scheduleTarget === name).availability;
const animalSchedule = () => weekDays.map((day) => comparingDays(day));
const monday = () => ({ officeHour: 'CLOSED', exhibition: 'The zoo will be closed!' });
const scheduleDays = (hour, index) =>
  ({
    officeHour: `Open from ${hour.open}am until ${hour.close}pm`,
    exhibition: animalSchedule()[index],
  });
const schedule = Object.values(hours).reduce((acc, hour, index) => {
  acc[weekDays[index]] = weekDays[index] !== 'Monday'
    ? scheduleDays(hour, index) : monday();
  return acc;
}, {});
const onlyOneDaySchedule = (scheduleTarget) => {
  const find = Object.entries(schedule).find((arr) => arr.includes(scheduleTarget));
  const obj = {};
  const [a, b] = find;
  obj[a] = b;
  return obj;
};
function getSchedule(scheduleTarget) {
  if (scheduleTarget === 'Monday') return ({ Monday: monday() });
  if (!scheduleTarget || (!comparison(scheduleTarget))) return schedule;
  if (weekDays.includes(scheduleTarget)) return onlyOneDaySchedule(scheduleTarget);
  return animalExhibition(scheduleTarget);
}
module.exports = getSchedule;
