// https://randomuser.me/api/?seed=javascript&results=100&nat=BR&noinfo
let tabUsers = null;
let tabStatistic = null;
let titleUsersFound = null;
let titleStatisticUsersFound = null;
let inputBusca = null;
let button = null;
let numberFormat = null;
let users = [];
let male = [];
let female = [];
let statistic = [];

window.addEventListener('load', () => {
  inputBusca = document.querySelector('#inputBusca');
  button = document.querySelector('#button');
  tabUsers = document.querySelector('#tabUsers');
  tabStatistic = document.querySelector('#tabStatistic');
  titleUsersFound = document.querySelector('#titleUsersFound');
  titleStatisticUsersFound = document.querySelector(
    '#titleStatisticUsersFound'
  );
  numberFormat = Intl.NumberFormat('pt-BR');
  getPeople();
});

function getPeople() {
  inputBusca.addEventListener('keyup', handleSearch);
}

function handleSearch(event) {
  function search() {
    button.classList.remove('disabled');
    users = people.results
      .map((person) => {
        return {
          picture: person.picture.thumbnail,
          firstName: person.name.first.toLowerCase(),
          lastName: person.name.last.toLowerCase(),
          dob: person.dob.age,
          gender: person.gender,
        };
      })
      .filter((person) => {
        let totalName = person.firstName + ' ' + person.lastName;
        return totalName.includes(inputBusca.value);
      });
    render();
  }

  if (inputBusca.value) {
    search();
  } else {
    users = [];
    clean();
  }
  if (event.key === 'Enter') {
    search();
  }
}

function render() {
  let usersHTML = '<div class="row">';
  let statisticsHTML = '<div class="row">';
  male = users.filter((person) => {
    return person.gender === 'male';
  });
  female = users.filter((person) => {
    return person.gender === 'female';
  });
  const totalAges = users.reduce((acc, curr) => {
    return acc + curr.dob;
  }, 0);
  users.forEach((person) => {
    const personHTML = `
    <div>
      <table class="highlight responsive-table ">
        <tbody>
          <tr>
            <td><img src="${person.picture}" alt="${person.firstName}"
            onclick="M.toast({html: 'I am ${person.firstName}'})" ></td>
            <td><span>${person.firstName} ${person.lastName}, ${person.dob}</span></td>
          </tr>
        </tbody>
      </table>
    </div>
    `;
    usersHTML += personHTML;
  });
  usersHTML += '</div>';
  titleUsersFound.textContent = `${users.length} usuário(s) encontrado(s)`;
  tabUsers.innerHTML = usersHTML;
  statisticsHTML += '</div>';
  const statisticHTML = `
    <ul class="collection">
      <li class="collection-item"><span>Sexo masculino: ${
        male.length
      }</span></li>
      <li class="collection-item"><span>Sexo feminino: ${
        female.length
      }</span></li>
      <li class="collection-item"><span>Soma das idades: ${totalAges}</span></li>
      <li class="collection-item"><span>Média das idades: ${formatNumber(
        (totalAges / users.length).toFixed(2)
      )}</span></li>
    </ul>
    `;
  statisticsHTML += statisticHTML;
  titleStatisticUsersFound.textContent = 'Estatísticas';
  tabStatistic.innerHTML = statisticsHTML;
}

function formatNumber(number) {
  return numberFormat.format(number);
}

function clean() {
  users = [];
  titleUsersFound.textContent = 'Nenhum usuário filtrado';
  tabUsers.innerHTML = '';
  titleStatisticUsersFound.textContent = 'Nada a ser exibido';
  tabStatistic.innerHTML = '';
  button.classList.add('disabled');
}
