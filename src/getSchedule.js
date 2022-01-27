const data = require('../data/zoo_data');

const { hours } = data;
// console.log(Object.keys(hours));
function comparingDays(day) {
  const animalList = [];
  data.species.forEach(({ availability, name }) => {
    if (availability.includes(day)) {
      animalList.push(name);
    }
  });
  return animalList;
}

function animalSchedule() {
  const weekDays = Object.keys(hours);
  const mapping = weekDays.map((day) => comparingDays(day));
  return mapping;
}

function getSchedule(scheduleTarget) {
  const weekDays = Object.keys(hours);
  if (scheduleTarget === 'Monday') {
    return { Monday: { officeHour: 'CLOSED', exhibition: 'The zoo will be closed!' } };
  }
  const schedule = Object.values(hours).reduce((acc, hour, index) => {
    if (!scheduleTarget) {
      const schedObj = {
        officeHour: `Open from ${hour.open}am until ${hour.close}pm`,
        exhibition: animalSchedule()[index],
      };
      acc[weekDays[index]] = weekDays[index] !== 'Monday'
        ? schedObj : { officeHour: 'CLOSED', exhibition: 'The zoo will be closed!' };
    }
    return acc;
  }, {});
  return schedule;
}
console.log(getSchedule());
module.exports = getSchedule;
