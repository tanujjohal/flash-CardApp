const card = document.querySelector(".card__inner");
const button = document.querySelector(".html");
const submit = document.querySelector(".button__");
const previous = document.querySelector(".previous");
const next = document.querySelector(".next");
const image = document.querySelector("#card-image");
const cross = document.querySelector('#modal-cross-icon');
const crossModal = document.querySelector('#modalcollection-cross-icon');
const modal = document.querySelector('#modal');
const modalCollection = document.querySelector("#modalCollection")


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
    let categoryName = document.querySelector("#offset-category option[value=\""+ categoryId +"\"]").innerText;

    console.log(categoryName);

    let url = `https://flashcardapplication.herokuapp.com/cards?id=${categoryId}`;
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
                document.getElementById("front-category").innerText = "";
                document.getElementById("front-data").innerText = "";
                document.getElementById("front-title").innerText = "";
                document.getElementById("back-data").innerText = "";
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
  let categoryId = document.getElementById("offset-category").value;
  let categoryName = document.querySelector("#offset-category option[value=\""+ categoryId +"\"]").innerText;


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
  let categoryId = document.getElementById("offset-category").value;
  let categoryName = document.querySelector("#offset-category option[value=\""+ categoryId +"\"]").innerText;

  
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
  document.getElementById('front-content').value = cardsData[cardNo].frontBody;
  document.getElementById('back-content').value = cardsData[cardNo].backBody;  
  document.getElementById('addbutton').style.display = "none";
  document.getElementById('updatebutton').style.display = "block";
  document.getElementById('deletebutton').style.display = "block";

  
  modal.setAttribute('style', "display: block;");
});

cross.addEventListener('click', function() {
  console.log("CLICKED");
  modal.setAttribute('style', "");

});

crossModal.addEventListener('click', function() {
  console.log("CLICKED");
  modalCollection.setAttribute('style', "");
});

function deleteCard(){
  console.log("Delete");
  let id = cardsData[cardNo].id;
  let url = `https://flashcardapplication.herokuapp.com/cards/${id}`;

  if(confirm("Are you sure you want to delete this Card???")){
    var http1 = getXMLHTTPRequest();
    http1.open("DELETE", url , true);
    http1.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    http1.onreadystatechange = function () {
        if (http1.readyState == 4 && http1.status == 200) {
            let response = http1.responseText;
            response = JSON.parse(response);
            if(response.status == 1){
              alert("Deleted Done!\n" + response.msg);
              window.location.reload();
            } else{
                alert("Error Occurred!\n" + response.msg);
              }             
          }
      }
    http1.send(); 
  }

}

function updateCard(){
  console.log("Update");
  let id = cardsData[cardNo].id;
  let categoryId = document.getElementById('category').value;
  let title = document.getElementById('title').value;
  let frontbody = document.getElementById('front-content').value;
  let backbody = document.getElementById('back-content').value;  
  console.log({categoryId, title, frontbody, backbody});

  let url = "https://flashcardapplication.herokuapp.com/cards";

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
            window.location.reload();
          } else{
              alert("Error Occurred!\n" + response.msg);
            }             
        }
    }
  http1.send(params); 

}

function logout(){
  // console.log("Logout");
  let url = `https://flashcardapplication.herokuapp.com/logout`;
  var http1 = getXMLHTTPRequest();
    http1.open("GET", url , true);
    http1.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    http1.onreadystatechange = function () {
        if (http1.readyState == 4 && http1.status == 200) {
            let response = http1.responseText;
            response = JSON.parse(response);
            if(response.status == 1){
                window.location.href = "https://flashcardapplication.herokuapp.com/login";
            }
        }
    };
    http1.send();
}

function addCard(){
  console.log("Clicked Add card");
  let categoryId = document.getElementById("offset-category").value;
  document.getElementById('category').value = categoryId;
  document.getElementById('title').value = '';
  document.getElementById('front-content').value = '';
  document.getElementById('back-content').value = '';  
  document.getElementById('deletebutton').style.display = "none";
  document.getElementById('updatebutton').style.display = "none";
  document.getElementById('addbutton').style.display = "block";

  modal.setAttribute('style', "display: block;");
  // window.location.reload();

}

function submitCard(){
  console.log("Clicked Submit Card");
  let categoryId = document.getElementById('category').value;
  let title = document.getElementById('title').value;
  let frontbody = document.getElementById('front-content').value;
  let backbody = document.getElementById('back-content').value;  
  console.log({categoryId, title, frontbody, backbody});

  let url = "https://flashcardapplication.herokuapp.com/cards";

  let params =
        "id=" +
        encodeURIComponent(categoryId) +
        "&title=" +
        encodeURIComponent(title) +
        "&frontbody=" +
        encodeURIComponent(frontbody) +
        "&backbody=" +
        encodeURIComponent(backbody);
  
  var http1 = getXMLHTTPRequest();
  http1.open("POST", url , true);
  http1.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  http1.onreadystatechange = function () {
      if (http1.readyState == 4 && http1.status == 200) {
          let response = http1.responseText;
          response = JSON.parse(response);
          if(response.status == 1){
            alert("New Card is Added !\n" + response.msg);
            window.location.reload();
          } else{
              alert("Error Occurred!\n" + response.msg);
            }             
        }
    }
  http1.send(params);




}

function editCollection(){
  console.log("Clicked Edit Collections");

  modalCollection.setAttribute('style', "display: block;");
}

function addCollection(){
  console.log("Clicked Add");
  let name = document.getElementById('name').value;
  console.log(name);

  let url = "https://flashcardapplication.herokuapp.com/collection";

  let params =
        "name=" +
        encodeURIComponent(name);
  
  var http1 = getXMLHTTPRequest();
  http1.open("POST", url , true);
  http1.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  http1.onreadystatechange = function () {
      if (http1.readyState == 4 && http1.status == 200) {
          let response = http1.responseText;
          response = JSON.parse(response);
          if(response.status == 1){
            alert("New Collection is Added !\n" + response.msg);
            window.location.reload();
          } else{
              alert("Error Occurred!\n" + response.msg);
            }             
        }
    }
  http1.send(params);

}

function updateCollection(){
  console.log("Clicked Update");
  let categoryId = document.getElementById('categorysecond').value;
  let name = document.getElementById('new_name').value;
  // console.log({categoryId, name});

  let url = `https://flashcardapplication.herokuapp.com/collection/${categoryId}/${name}`;

  if(confirm("Are you sure you want to update the exsiting  collection???\n")){
    var http1 = getXMLHTTPRequest();
    http1.open("PUT", url , true);
    http1.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    http1.onreadystatechange = function () {
        if (http1.readyState == 4 && http1.status == 200) {
            let response = http1.responseText;
            response = JSON.parse(response);
            if(response.status == 1){
              alert("Changes in Collection is Added !\n" + response.msg);
              window.location.reload();
            } else{
                alert("Error Occurred!\n" + response.msg);
              }             
          }
      }
    http1.send();
  }



}

function deleteCollection(){
  console.log("Clicked Delete");
  let categoryId = document.getElementById('categorythird').value;
  console.log({categoryId});

  let url = `https://flashcardapplication.herokuapp.com/collection/${categoryId}`;

  if(confirm("Are you sure you want to delete the collection???\n")){
    var http1 = getXMLHTTPRequest();
    http1.open("DELETE", url , true);
    http1.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    http1.onreadystatechange = function () {
        if (http1.readyState == 4 && http1.status == 200) {
            let response = http1.responseText;
            response = JSON.parse(response);
            if(response.status == 1){
              alert("Collection is Deleted !\n" + response.msg);
              window.location.reload();
            } else{
                alert("Error Occurred!\n" + response.msg);
              }             
          }
      }
    http1.send();
  }


}
