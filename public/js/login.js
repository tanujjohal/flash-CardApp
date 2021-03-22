const { response } = require("express");

console.log("LOAD HOGYII");

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

function func(){
    console.log("YOU PRESSED Login MATE!!");
    const userId = document.getElementById('id').value;
    const password = document.getElementById('password').value;
    console.log(userId);
    console.log(password);
    if(userId == ""){
        alert("Enter Id");
    } else if(password == ""){
        alert("Enter Password");
    }
    let url = `https://flashcardapplication.herokuapp.com/api/v1/login?id=${userId}&password=${password}`;
    let params =
        "id=" +
        encodeURIComponent(userId) +
        "&password=" +
        encodeURIComponent(password);
    
    var http1 = getXMLHTTPRequest();
    http1.open("GET", url , true);
    http1.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    http1.onreadystatechange = function () {
        if (http1.readyState == 4 && http1.status == 200) {
            let response = http1.responseText;
            console.log(response);
            response = JSON.parse(response);
            if(response.status == 1){
                window.location.href = "https://flashcardapplication.herokuapp.com/index";
            }
        }
    };
    http1.send();

}
