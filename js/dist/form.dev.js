"use strict";

// *** FORM ***
// Vérification informations correctes et bien formatées
// dans les différents champs avant envoie
function validateForm() {
    let returned = true; // Nom

    let lname = document.getElementById('lname').value;

    if (lname == "") {
        alert("Le champ nom doit être rempli");
        returned = false;
    } // Prénom


    let fname = document.getElementById('fname').value;

    if (fname == "") {
        alert("Le champ prénom doit être rempli");
        returned = false;
    } // Pas de chiffres dans le nom ou prénom


    if (allLetters(lname) == false) {
        alert("Pas de chiffres dans le nom svp");
        returned = false;
    }

    if (allLetters(fname) == false) {
        alert("Pas de chiffres dans le prénom svp");
        returned = false;
    } // Email


    let email = document.getElementById('email').value;

    if (email == "") {
        alert("Le champ email doit être rempli");
        returned = false;
    } // Email valide


    if (validateEmail(email) === false) {
        alert("Le champ email est erroné");
        returned = false;
    } // Rue


    let street = document.getElementById('street').value;

    if (street == "") {
        alert("Le champ rue doit être rempli");
        returned = false;
    } // Ville


    let town = document.getElementById('town').value;

    if (town == "") {
        alert("Le champ ville doit être rempli");
        returned = false;
    } // Code postal


    let postcode = document.getElementById('postcode').value;

    if (postcode == "") {
        alert("Le champ code postal doit être rempli");
        returned = false;
    } // Pas de lettres dans le code postal


    if (!allNumbers(postcode)) {
        alert("Pas de lettres dans le code postal svp");
        returned = false;
    }

    if (returned === true) {
        let contact = {
            firstName: fname,
            lastName: lname,
            address: street,
            city: town,
            email: email
        }; // Object

        if (passOrder(contact)) { // Rediriger la page sur order_confirmed.html
        }
    }

    return returned;
}

function getAllProducts() {
    let products = [];
    let keys = Object.keys(localStorage);
    let i = keys.length;

    while (i--) {
        products.push(localStorage.key(i));
    }

    return products;
}

function passOrder(contact) {
    // Envoyer la commande par Ajax
    let products = getAllProducts(); // Array

    let order = {
        contact: contact,
        products: products
    };
    order = JSON.stringify(order);
    let url = "http://localhost:3000/api/cameras/order";
    makePostAsync(url, order);
} // Valider les caractères insérés dans champ email


function validateEmail(email) {
    let re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
} // Valider que les données ne sont que des lettres (et pas des chiffres)


function allLetters(input) {
    let re = /^[a-zA-Z]+$/;
    console.log(input.match(re));

    if (input.match(re)) {
        return true;
    } else {
        return false;
    }
} // Valider que les données ne sont que des lettres (et pas des chiffres)


function allNumbers(input) {
    let re = /^[0-9]+$/;
    console.log(input.match(re));

    if (input.match(re)) {
        return true;
    } else {
        return false;
    }
}