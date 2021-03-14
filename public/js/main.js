const card = document.querySelector(".card__inner");
const button = document.querySelector(".html");
const submit = document.querySelector(".button__");
const previous = document.querySelector(".previous");
const next = document.querySelector(".next");
const image = document.querySelector("#card-image");
const cross = document.querySelector('#modal-cross-icon');
const modal = document.querySelector('#modal');


function getXMLHTTPRequest() {
  try {
      req = new XMLHttpRequest();
  } catch (err1) {
      try {
          req = new ActiveXObject("Msxml2.XMLHTTP");
      } catch (err2) {
          try {
              req = new ActiveXObject("Microsoft.XMLHTTP");
          } catch (err3) {
              req = false;
          }
      }
  }
  return req;
}


var back = 1, cardsData = Array(), cardNo = 0;
button.addEventListener("click", function(e) {
  console.log("Clicked");
  card.classList.toggle('is-flipped');
  var add = "Back";
  if (back) {
    add = "Front"; back = 0;
  } else {
    back = 1;
  }
  button.innerHTML = `<div id="btn"><span class="noselect">${add}</span><div id="circle"></div></div>`;
});

submit.addEventListener("click", function(err) {
    console.log("Submit Clicked");
    let categoryId = document.getElementById("offset-category").value;
    let categoryName = document.getElementById("offset-category").innerText;

    console.log(categoryName);

    let url = `http://localhost:8000/cards?id=${categoryId}`;
    var http1 = getXMLHTTPRequest();
    http1.open("GET", url , true);
    http1.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    http1.onreadystatechange = function () {
        if (http1.readyState == 4 && http1.status == 200) {
            let response = http1.responseText;
            response = JSON.parse(response);
            if(response.status == 1){
              cardsData = response.data;
              console.log(response.data);
              if(cardsData.length != 0){
                document.getElementById("front-category").innerText = categoryName;
                document.getElementById("front-data").innerText = cardsData[cardNo].frontBody;
                document.getElementById("front-title").innerText = cardsData[cardNo].title;
                document.getElementById("back-data").innerText = cardsData[cardNo].backBody;
                document.getElementById("differentDiv").style.display = "initial";
              } else{
                alert("No Cards exists for this Category! Please Add Cards!");
              }             
            }
        }
    };
    http1.send();
});

previous.addEventListener("click", function(err) {
  console.log("Previous Clicked");
  let categoryName = document.getElementById("offset-category").innerText;

  if(cardsData.length != 0){
    cardNo = (cardNo - 1 + cardsData.length)%cardsData.length;
    document.getElementById("front-category").innerText = categoryName;
    document.getElementById("front-data").innerText = cardsData[cardNo].frontBody;
    document.getElementById("front-title").innerText = cardsData[cardNo].title;
    document.getElementById("back-data").innerText = cardsData[cardNo].backBody;    
  }
});

next.addEventListener("click", function(err) {
  console.log("Next Clicked");
  let categoryName = document.getElementById("offset-category").innerText;
  
  if(cardsData.length != 0){
    cardNo = (cardNo + 1)%cardsData.length;
    document.getElementById("front-category").innerText = categoryName;
    document.getElementById("front-data").innerText = cardsData[cardNo].frontBody;
    document.getElementById("front-title").innerText = cardsData[cardNo].title;
    document.getElementById("back-data").innerText = cardsData[cardNo].backBody;    
  }
  console.log(cardsData);
});

image.addEventListener('click', function() {
  console.log('image clicked');
  let categoryId = document.getElementById("offset-category").value;
  console.log(categoryId);
  document.getElementById('category').value = categoryId;
  document.getElementById('title').value = cardsData[cardNo].title;
  document.getElementById('front-content').innerText = cardsData[cardNo].frontBody;
  document.getElementById('back-content').innerText = cardsData[cardNo].backBody;  
  
  modal.setAttribute('style', "display: block;");
});

cross.addEventListener('click', function() {
  modal.setAttribute('style', "");
});

function deleteCard(){
  console.log("Delete");
}

function updateCard(){
  console.log("Update");
  let id = cardsData[cardNo].id;
  let categoryId = document.getElementById('category').value;
  let title = document.getElementById('title').value;
  let frontbody = document.getElementById('front-content').value;
  let backbody = document.getElementById('back-content').value;  
  console.log({categoryId, title, frontbody, backbody});

  let url = "http://localhost:8000/cards";

  let params =
        "id=" +
        encodeURIComponent(id) +
        "&collectionId=" +
        encodeURIComponent(categoryId) +
        "&title=" +
        encodeURIComponent(title) +
        "&frontbody=" +
        encodeURIComponent(frontbody) +
        "&backbody=" +
        encodeURIComponent(backbody);
  
  var http1 = getXMLHTTPRequest();
  http1.open("PUT", url , true);
  http1.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  http1.onreadystatechange = function () {
      if (http1.readyState == 4 && http1.status == 200) {
          let response = http1.responseText;
          response = JSON.parse(response);
          if(response.status == 1){
            alert("Update Done!\n" + response.msg);
            cardsData[cardNo].categoryId = categoryId;
            cardsData[cardNo].title = title;
            cardsData[cardNo].frontBody = frontbody;
            cardsData[cardNo].backBody = backbody;
            document.getElementById('category').value = categoryId;
            document.getElementById('title').value = cardsData[cardNo].title;
            document.getElementById('front-content').innerText = cardsData[cardNo].frontBody;
            document.getElementById('back-content').innerText = cardsData[cardNo].backBody; 

          } else{
              alert("Error Occurred!\n" + response.msg);
            }             
        }
    }
  http1.send(params); 

}

function logout(){
  // console.log("Logout");
  let url = `http://localhost:8000/logout`;
  var http1 = getXMLHTTPRequest();
    http1.open("GET", url , true);
    http1.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    http1.onreadystatechange = function () {
        if (http1.readyState == 4 && http1.status == 200) {
            let response = http1.responseText;
            response = JSON.parse(response);
            if(response.status == 1){
                window.location.href = "http://localhost:8000/login";
            }
        }
    };
    http1.send();
}