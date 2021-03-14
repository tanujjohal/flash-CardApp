const card = document.querySelector(".card__inner");
const button = document.querySelector(".html");
const submit = document.querySelector(".button__");
const previous = document.querySelector(".previous");
const next = document.querySelector(".next");

var back = 1;
button.addEventListener("click", function (e) {
  console.log("Clicked");
  card.classList.toggle('is-flipped');
  var add = "Back";
  if(back){
    add = "Front"; back = 0;
  } else{
    back = 1;
  }
  button.innerHTML = `<div id="btn"><span class="noselect">${add}</span><div id="circle"></div></div>`
});

submit.addEventListener("click", function (err) {
  console.log("Submit Clicked");
});

previous.addEventListener("click", function (err) {
  console.log("Previous Clicked");
});

next.addEventListener("click", function (err) {
  console.log("Next Clicked");
});