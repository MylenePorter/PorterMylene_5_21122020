// *** COMMON ***

// Query (variables dans URL)
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const category = urlParams.get('category'); // Ex: cameras
const product = urlParams.get('product'); // Ex: 5be1ed3f1c9d44000030b061
const order_number = urlParams.get('order_number'); // Numéro de commande

// Promises
function makeCallAsync(url) {
    return new Promise((resolve) => {
        var req = new XMLHttpRequest();
        req.addEventListener("load", function() {
            // Call OK
            if (req.status >= 200 && req.status < 400) {
                console.log('makeCallAsync success');
                // Appelle la fonction callback en lui passant la réponse de la requête
                resolve(JSON.parse(req.responseText));
            }
        });
        req.open("GET", url);
        req.send(null);
    });
}

function makePostAsync(url, order) {
    fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            mode: 'cors',
            body: order
        })
        .then((response) => response.json())
        .then((returner) => {
            console.log(returner.orderId); //3
            var redirect = "/order_confirmed.html?order_number=" + returner.orderId;
            window.location = redirect;
        });
}

// Convertir en prix et ajout €
function convertToPrice(price) {
    price = price / 100;
    price = price.toFixed(2);
    price = new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(price)
        //price = price + "&nbsp;€";
    return price;
}