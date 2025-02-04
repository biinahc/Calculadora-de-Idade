const form = document.getElementById('ageCalculator');
const result = document.getElementById('result');
const nextBirthday = document.getElementById('nextBirthday');


form.addEventListener('submit', (event) => {
  event.preventDefault();

  const day = parseInt(document.getElementById('day').value);
  const month = parseInt(document.getElementById('month').value);
  const year = parseInt(document.getElementById('year').value);

  // Validação básica
  if (isNaN(day) || isNaN(month) || isNaN(year)) {
    result.textContent = 'Por favor, insira apenas números.';
    return;
  }

  if (day <= 0 || month <= 0 || year <= 0) {
    result.textContent = 'Data inválida: dia, mês e ano devem ser maiores que zero.';
    return;
  }



  if (day < 1 || day > 31 || month < 1 || month > 12) {
    result.textContent = 'Data inválida: dia ou mês fora do intervalo válido.';
    return;
  }

  // Calculando o próximo aniversário
  const today = new Date();
  const birthDate = new Date(year, month - 1, day);

  // Criando uma data para o próximo aniversário no mesmo mês e dia
  let nextBirthdayDate = new Date(today.getFullYear(), birthDate.getMonth(), birthDate.getDate());

  // Verificando se já passou do aniversário este ano
  if (today >= nextBirthdayDate) {
    // Se já passou, o próximo aniversário é no ano seguinte
    nextBirthdayDate.setFullYear(today.getFullYear() + 1);
  } else {
    // Se ainda não passou, o próximo aniversário é no mesmo ano
    nextBirthdayDate.setFullYear(today.getFullYear());
  }

  if (birthDate > today) {
    result.textContent = 'Data futura.';
    return;
  }

  if (day <= 0) {
    document.getElementById('day').classList.add('invalid');

  }


  // Calculando idade
  let age = today.getFullYear() - birthDate.getFullYear();
  let m = today.getMonth() - birthDate.getMonth();
  let d = today.getDate() - birthDate.getDate();

  if (d < 0) {
    m--;
    d += new Date(year, month, 0).getDate(); // Último dia do mês anterior
  }
  if (m < 0) {
    m += 12;
    age--;
  }



  result.textContent = `Você tem ${age} anos, ${m} meses e ${d} dias!`;
  form.reset();

  const timeToNextBirthday = nextBirthdayDate - today;
  const daysToNextBirthday = Math.ceil(timeToNextBirthday / (1000 * 60 * 60 * 24));
  const monthsToNextBirthday = Math.floor(daysToNextBirthday / 30.44);
  const remainingDays = daysToNextBirthday % 30.44;

  nextBirthday.textContent = `Faltam ${monthsToNextBirthday} meses e ${remainingDays.toFixed(0)} dias para o próximo aniversário.🥳`;

  form.reset();

});