const estadoHorario = document.querySelector('#estado-horario');
const horaLisboa = new Intl.DateTimeFormat('pt-PT', {
  timeZone: 'Europe/Lisbon', hour: 'numeric', hourCycle: 'h23'
});

function atualizarEstadoHorario() {
  const agora = new Date();
  const aberto = Number(horaLisboa.format(agora)) >= 12;
  const estado = aberto ? 'Aberto agora' : 'Fechado agora · abre às 12:00';
  if (estadoHorario.textContent !== estado) estadoHorario.textContent = estado;
}

atualizarEstadoHorario();
setInterval(atualizarEstadoHorario, 1000);
document.addEventListener('visibilitychange', atualizarEstadoHorario);
