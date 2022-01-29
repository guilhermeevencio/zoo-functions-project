const data = require('../data/zoo_data');

const employeeList = data.employees;

// ESSA PARTE DE BAIXO É RESPONSÁVEL POR TRANSFORMAR OS INPUTS EM DADOS DE ACORDO COM AS INFORMAÇÕES PESSOAIS QUE FORAM RECEBIDAS;

const reducingList = (personData) =>
  employeeList.filter(({ id, firstName, lastName }) =>
    id === personData || firstName === personData || lastName === personData);

// NESSA PARTE, EU COMEÇO A MONTAR O ARRAY PADRÃO QUE E PEDIDO NO TESTE;

const arrData = (identification) => {
  const expectedList = reducingList(identification)
    .reduce((acc, { id, firstName, lastName, responsibleFor }) => {
      (acc.id = id);
      (acc.fullName = `${firstName} ${lastName}`);
      (acc.species = responsibleFor);
      return acc;
    }, {});
  return expectedList;
};

// ESSA PARTE EU PEGUEI IS IDS PASSADOS QUANDO RECEBI O NOME, ID OU SOBRENOME DA PESSOA;
const getAnimalIds = (identification) => arrData(identification).species;

// ESSA PARTE EU PEGUEI TODOS OS DADOS ATRAVES DOS IDS RECEBIDOS NA FUNÇÃO ANTERIOR;
const getAnimalInfos = (identification) =>
  data.species.filter(({ id }) => getAnimalIds(identification).includes(id))
    .reduce((acc, { name, location }) => {
      if (acc.species && acc.locations) {
        (acc.species.push(name));
        (acc.locations.push(location));
      }
      if (!acc.species && !acc.location) {
        (acc.species = [name]);
        (acc.locations = [location]);
      }
      return acc;
    }, {});

const mergingObjects = (ids) => Object.assign(arrData(ids),
  getAnimalInfos(ids));

const returningEmployeesId = () => employeeList.map(({ id }) => ({ id }))
  .map(({ id }) => mergingObjects(id));
const includeValid = (identification) => {
  const employeeIdentifications = employeeList.reduce((acc, { firstName, lastName, id }) =>
    acc.concat([firstName, lastName, id]), []);
  if (!employeeIdentifications.includes(Object.values(identification)[0])) {
    throw new Error('Informações inválidas');
  }
};

function getEmployeesCoverage(identification) {
  if (!identification) return returningEmployeesId();
  const { name, id, lastName } = identification;
  includeValid(identification);
  if (name || id || lastName) return mergingObjects(Object.values(identification)[0]);
}

module.exports = getEmployeesCoverage;
