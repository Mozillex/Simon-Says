const blue = document.getElementById('blue');
const green = document.getElementById('green');
const red = document.getElementById('red');
const yellow = document.getElementById('yellow');
const pads = document.querySelectorAll('.pad');

let streak = [];

pads.forEach(p => {
  p.onclick = () => padEvent(p);
})

function padEvent(el){
  console.log(el.id);
}
