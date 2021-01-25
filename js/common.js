// Query (variables dans URL)
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const category = urlParams.get('category'); // Ex: cameras
const product = urlParams.get('product'); // Ex: 5be1ed3f1c9d44000030b061

/*
// Synchronus AJAX sans promesses
function makeCall(url) {
    var xhttp = new XMLHttpRequest();
    xhttp.open("GET", url, false);
    xhttp.send();
    var returned = JSON.parse(xhttp.responseText);
    console.log(returned);
    return returned;
}*/

// Promises
function makeCallAsync(url) {
    return new Promise((resolve, reject) => {
        var req = new XMLHttpRequest();
        req.open("GET", url);
        req.addEventListener("load", function() {
            // Call OK
            if (req.status >= 200 && req.status < 400) {
                console.log('makeCallAsync success');
                // Appelle la fonction callback en lui passant la réponse de la requête
                resolve(JSON.parse(req.responseText));
            }
        });
        req.addEventListener("error", function(err) {
            reject("Erreur réseau avec l'URL " + url, err);
        });
        req.send(null);
    });
}

// Convert Price
function convertToPrice(price) {
    price = price / 100;
    price = price.toFixed(2);
    price = price + "&nbsp;€";
    return price;
}