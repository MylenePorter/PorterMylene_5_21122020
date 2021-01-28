"use strict";

// *** CART ***
// Afficher infos du localStorage
function getCart(category) {
    let cart_items = [];

    for (let i = 0; i < localStorage.length; i++) {
        // cart_items = cart_items + localStorage.getItem(localStorage.key(i));
        let cart_price = 0;
        sessionStorage.setItem("cart_price", 0);
        getProductDetails(category, i, localStorage.key(i));
        console.log(cart_price);
    }

    console.log(cart_items);
} // Obtenir les informations du localstorage pour chaque ligne
// et le convertir pour l'afficher dans le panier


function getProductDetails(category, key, product) {
    const url = "http://localhost:3000/api/" + category + "/" + product; //console.log(url);

    makeCallAsync(url).then(function(product_details) {
        console.log(product_details);
        let line_total = 0;
        let qty = localStorage.getItem(product);
        line_total = product_details.price * qty;
        let total_price = parseFloat(sessionStorage.getItem('cart_price'));
        total_price += line_total;
        sessionStorage.setItem("cart_price", total_price);
        console.log(total_price);
        formatHTML(product_details, qty, line_total);
        showCartTotalPrice();
    });
} // HTML 


function formatHTML(product_details, qty, line_total) {
    document.getElementById("articles").innerHTML += " \n            <div class=\"article\">\n                <div id=\"product_photo\" class=\"article__img article__img--cart\"><img src=\"" + product_details.imageUrl + "\" alt=\"\"></div>\n                <div class=\"article__desc article__desc--cart\">\n                    <div id=\"article_title\" class=\"article__desc__title\">\n                        <a href=\"/product.html?category=cameras&product=" + product_details._id + "\">\n                            <h3>" + product_details.name + "</h3>\n                        </a>\n                    </div>\n                </div>\n                <div class=\"article__infos\">\n                    <div id=\"article_price\" class=\"article__infos__price\">" + convertToPrice(line_total) + "</div>\n                </div>\n            <!-- Changement quantit\xE9s -->\n            <div class=\"article__infos__add\">\n                <!-- R\xE9duire quantit\xE9 -->\n                <button id=\"product_minus\" onclick=\"decreaseProductAmount('" + product_details._id + "', " + qty + ");\" class=\"article__infos__add__minus article__infos__add__minus--cart\">-</button>\n                <!-- Augmenter quantit\xE9 -->\n                <button id=\"product_plus\" onclick=\"increaseProductAmount('" + product_details._id + "', " + qty + ");\" class=\"article__infos__add__plus article__infos__add__plus--cart\">+</button>\n                <!-- Quantit\xE9 -->\n                <div id=\"product_qty\" class=\"article__infos__add__qty\">\n                <form action=\"post\" action=\"#\">\n                    <input type=\"number\" id=\"product_amount_" + product_details._id + "\" value=\"" + qty + "\" min=\"0\" step=\"1\" max=\"10\" class=\"article__infos__add__qty__form\">\n                </form>\n                </div>\n                <button class=\"product_remove\" onclick=\"removeFromCart('" + product_details._id + "')\">Retirer</button>\n            </div>\n            ";
} // Calcul du prix total du panier


function showCartTotalPrice() {
    let cart_price = convertToPrice(sessionStorage.getItem('cart_price'));
    console.log(cart_price);
    document.getElementById("cart-total").innerHTML = cart_price;
} // - ou + sur "product_amount" pour mettre à jour quantité dans Panier


function increaseProductAmount(id) {
    let qty = parseFloat(document.getElementById("product_amount_" + id).value);
    qty = qty + 1;
    console.log("product_amount_" + id);
    document.getElementById("product_amount_" + id).stepUp(1); //window.localStorage.removeItem(id);

    localStorage.setItem(id, qty);
    location.reload();
}

function decreaseProductAmount(id) {
    let qty = parseFloat(document.getElementById("product_amount_" + id).value);
    qty = qty - 1;
    console.log("product_amount_" + id);
    document.getElementById("product_amount_" + id).stepDown(1); //window.localStorage.removeItem(id);

    localStorage.setItem(id, qty);
    location.reload();
} // Bouton supprimer


function removeFromCart(key) {
    localStorage.removeItem(key);
    location.reload();
} // Au chargement de la page, afficher les informations stockées dans le local storage


getCart("cameras");