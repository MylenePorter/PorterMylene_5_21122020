// *** FORM ***

// Vérification informations correctes et bien formatées
// dans les différents champs avant envoie
function validateForm() {
    var returned = true;
    // Nom
    var lname = document.getElementById('lname').value;
    if (lname == "") {
        alert("Le champ nom doit être rempli");
        returned = false;
    }
    // Prénom
    var fname = document.getElementById('fname').value;
    if (fname == "") {
        alert("Le champ prénom doit être rempli");
        returned = false;
    }
    // Pas de chiffres dans le nom ou prénom
    if (allLetters(lname) == false) {
        alert("Pas de chiffres dans le nom svp");
        returned = false;
    }
    if (allLetters(fname) == false) {
        alert("Pas de chiffres dans le prénom svp");
        returned = false;
    }
    // Email
    var email = document.getElementById('email').value;
    if (email == "") {
        alert("Le champ email doit être rempli");
        returned = false;
    }
    // Email valide
    if (validateEmail(email) === false) {
        alert("Le champ email est erroné");
        returned = false;
    }
    // Rue
    var street = document.getElementById('street').value;
    if (street == "") {
        alert("Le champ rue doit être rempli");
        returned = false;
    }
    // Ville
    var town = document.getElementById('town').value;
    if (town == "") {
        alert("Le champ ville doit être rempli");
        returned = false;
    }
    // Code postal
    var postcode = document.getElementById('postcode').value;
    if (postcode == "") {
        alert("Le champ code postal doit être rempli");
        returned = false;
    }
    // Pas de lettres dans le code postal
    if (!allNumbers(postcode)) {
        alert("Pas de lettres dans le code postal svp");
        returned = false;
    }
    if (returned === true) {
        var contact = {
            firstName: fname,
            lastName: lname,
            address: street,
            city: town,
            email: email
        }; // Object
        if (passOrder(contact)) {
            // Rediriger la page sur order_confirmed.html
        }
    }
    return returned;
}

function getAllProducts() {
    var products = [];
    var keys = Object.keys(localStorage);
    var i = keys.length;
    while (i--) {
        products.push(localStorage.key(i));
    }
    return products;
}

function passOrder(contact) {
    // Envoyer la commande par Ajax
    var products = getAllProducts(); // Array
    var order = {
        contact,
        products
    }
    order = JSON.stringify(order);
    var url = "http://localhost:3000/api/cameras/order";
    makePostAsync(url, order);
}

// Valider les caractères insérés dans champ email
function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

// Valider que les données ne sont que des lettres (et pas des chiffres)
function allLetters(input) {
    const re = /^[a-zA-Z]+$/;
    console.log(input.match(re));
    if (input.match(re)) {
        return true;
    } else {
        return false;
    }
}

// Valider que les données ne sont que des lettres (et pas des chiffres)
function allNumbers(input) {
    const re = /^[0-9]+$/;
    console.log(input.match(re));
    if (input.match(re)) {
        return true;
    } else {
        return false;
    }
}