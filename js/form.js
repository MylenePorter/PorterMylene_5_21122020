// *** FORM ***

// Vérification informations correctes et bien formatées
// dans les différents champs avant envoie
function validateForm() {
    var returned = false;
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
    if (allLetters(lname) === false) {
        alert("Pas de chiffres dans le nom");
        returned = false;
    }
    if (allLetters(fname) === false) {
        alert("Pas de chiffres dans le nom");
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
        alert("Pas de lettres svp");
        returned = false;
    }
    console.log
    return false;
}

// Valider les caractères insérés dans champ email
function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

// Valider que les données ne sont que des lettres (et pas des chiffres)
function allLetters(inputtxt) {
    var first_length = inputtxt.length;
    console.log(first_length, inputtxt);
    var letters = /[^a-zA-Z]+/;
    inputtxt.match(letters);
    var new_length = inputtxt.length;
    console.log(new_length, inputtxt);
    if (new_length == first_length) {
        return false;
    } else if (new_length < first_length) {
        return false;
    }
    return false;
}

// Valider que les données ne sont que des lettres (et pas des chiffres)
function allNumbers(input) {
    var first_length = input.length;
    console.log(first_length, input);
    var numbers = /[^0-9]+/;
    input.match(numbers);
    var new_length = input.length;
    console.log(new_length, input);
    if (new_length == first_length) {
        //return true;
    } else if (new_length < first_length) {
        return false;
    }
    return false;
}