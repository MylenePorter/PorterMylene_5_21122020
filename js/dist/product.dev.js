"use strict";

// *** PRODUCT **
// Afficher le détails des produits et mettre les options dans la liste déroulante
function showProduct(category, product) {
    const url = "http://localhost:3000/api/" + category + "/" + product; //console.log(url);

    makeCallAsync(url).then(function(list) {
        buildDropDown(list);
        updateProduct(list);
    })["catch"](function(err) {
        console.error(err);
    });
} // Liste déroulante pour afficher les options


function buildDropDown(list) {
    // variable product_choice 
    // loop dans l'objet pour chercher tous les "name"
    // les afficher dans le drop down list 
    let options = "";
    Object.keys(list.lenses).forEach(function(key) {
        //console.log(key, list.lenses[key]);
        options = options + '<option>' + list.lenses[key] + '</option>';
    });
    document.getElementById("product_choice").innerHTML = options;
} // Fonctions pour Product Photo


function updateProduct(list) {
    let product_photo = list.imageUrl;
    let product_title = list.name;
    let product_details = list.description;
    let product_price = list.price;
    let code = "<img src='" + product_photo + "' alt='' />";
    document.getElementById("product_photo").innerHTML = code;
    document.getElementById("product_title").innerHTML = product_title;
    document.getElementById("product_details").innerHTML = product_details;
    document.getElementById("product_price").innerHTML = convertToPrice(product_price);
} // + sur "product_amount" avant ajout panier


function increaseAmount() {
    document.getElementById("product_amount").stepUp(1);
} // - sur "product_amount" avant ajout panier


function decreaseAmount() {
    document.getElementById("product_amount").stepDown(1);
} // Ajouter au localStorage (key, value)


function addToCart() {
    let qty = document.getElementById("product_amount").value;
    let db = window.localStorage;
    db.setItem(product, qty);
} // Au chargement de la page afficher les produits de la catégorie Caméras


showProduct(category, product);