function makeCall(url) {
    var returned = "";
    xhttp.open("GET", url, false);
    xhttp.send();
    returned = xhttp.responseText;
    console.log(returned);
    return returned;
}

function listAll(category) {
    var url = "http://localhost:3000/api/" + category;
    makeCall(url);
}