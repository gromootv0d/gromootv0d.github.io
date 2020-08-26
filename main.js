const $btn = document.getElementById('btn-kick');
const $log_textarea = document.getElementById("textarea_log");
const $enemy = document.getElementById("enemy");
const $character = document.getElementById("character");
const $damage = 20;
const character = {
  name: "Pikachu",
  defaultHP: 100,
  damageHP: 100,
  elHP: document.getElementById('health-character'),
  elProgressbar: document.getElementById('progressbar-character'),
}

const enemy = {
  name: "Charmander",
  defaultHP: 100,
  damageHP: 100,
  elHP: document.getElementById('health-enemy'),
  elProgressbar: document.getElementById('progressbar-enemy'),
}

$btn.addEventListener('click', function() {
  shake_person($enemy);
  changeHP(random($damage), enemy);
  disable_btn();
  sleep(500).then(() => {enemy_attack(); enable_btn();});
});

function shake_person(person){
  person.classList.add("selected");
  sleep(400).then(() => {person.classList.remove("selected");});
}

function enemy_attack() {
  console.log(enemy.damageHP);
  if (enemy.damageHP > 0){
    shake_person($character);
    changeHP(random($damage), character);
  }
}

function init() {
  $log_textarea.value = "";
  renderHP(character);
  renderHP(enemy);
}
function renderHP(person) {
  renderHPLife(person);
  renderProgressbarHP(person);
}

function renderHPLife(person) {
  person.elHP.innerText = person.damageHP + ' / ' + person.defaultHP;
}

function renderProgressbarHP(person){
  person.elProgressbar.style.width = person.damageHP + '%';
}

function disable_btn(){
  $btn.disabled = true;
}
function enable_btn(){
  $btn.disabled = false;
}

function changeHP(count, person){
  add_attack_action(count, person);
  if (person.damageHP <= count){
    person.damageHP=0;
    alert(person.name + ' проиграл!')
    disable_btn();
  }
  else {
    person.damageHP -= count;
  }
  renderHP(person);
}

function random(num){
  return Math.ceil(Math.random()*num);
}

function add_attack_action(attack_count, person){
  $log_textarea.value += person.name + " was attacked (-" + attack_count.toString() + " hp) \n";
}
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

init();
