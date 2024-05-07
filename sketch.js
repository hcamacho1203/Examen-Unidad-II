let horaLaPaz = 20; 
let minutoLaPaz = 30; 
let horaCDMX = 0; 
let horaBarcelona = 0; 
let inputHora;
let botonActualizar;
function setup() {
  createCanvas(800, 400);
  inputHora = createInput();
  inputHora.position(20, height + 20);
  botonActualizar = createButton('Actualizar');
  botonActualizar.position(inputHora.x + inputHora.width, height + 20);
  botonActualizar.mousePressed(actualizarHora);
}
function draw() {
  background(220);
  // Dibujar relojes
  dibujarReloj(width / 4, height / 2, horaLaPaz, minutoLaPaz, 'La Paz, BCS');
  dibujarReloj(width / 2, height / 2, horaCDMX, 0, 'Ciudad de México');
  dibujarReloj(3 * width / 4, height / 2, horaBarcelona, 0, 'Barcelona, Esp');
}
function dibujarReloj(x, y, hora, minuto, ciudad) {
  // Dibujar circunferencia
  ellipse(x, y, 200, 200);
  for (let i = 0; i < 12; i++) {
    let angulo = map(i + 1, 0, 12, 0, TWO_PI) - HALF_PI;
    let posX = x + cos(angulo) * 80;
    let posY = y + sin(angulo) * 80;
    textAlign(CENTER, CENTER);
    text(i + 1, posX, posY);
  }
  let segundero = map(second(), 0, 60, 0, TWO_PI) - HALF_PI;
  let minutero = map(minuto, 0, 60, 0, TWO_PI) - HALF_PI;
  let horario = map(hora % 12 + minuto / 60, 0, 12, 0, TWO_PI) - HALF_PI; // Usamos la hora configurada en lugar de la hora actual
  // Dibujar manecillas
  dibujarManecilla(x, y, 80, segundero);
  dibujarManecilla(x, y, 60, minutero);
  dibujarManecilla(x, y, 40, horario);
  // Mostrar ciudad
  textAlign(CENTER, TOP);
  text(ciudad, x, y + 100);
}
function dibujarManecilla(x, y, longitud, angulo) {
  let x2 = x + cos(angulo) * longitud;
  let y2 = y + sin(angulo) * longitud;
  line(x, y, x2, y2);
}
function actualizarHora() {
  let horasIngresadas = inputHora.value().split(':');
  let horas = parseInt(horasIngresadas[0]);
  let minutos = parseInt(horasIngresadas[1]);
  if (horas >= 0 && horas < 24 && minutos >= 0 && minutos < 60) {
    horaLaPaz = horas;
    minutoLaPaz = minutos;
    let diferenciaHoraCDMX = 1; 
    horaCDMX = (horaLaPaz + diferenciaHoraCDMX) % 24;
    let diferenciaHoraBarcelona = 9; 
    horaBarcelona = (horaLaPaz + diferenciaHoraBarcelona) % 24;
  } else {
    alert('Por favor ingrese una hora válida en formato HH:MM.');
  }
}
