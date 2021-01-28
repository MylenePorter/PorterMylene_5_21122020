"use strict";

// ***INDEX***
// Lister tous les produits d'une categorie en particulier
function listAll(category) {
    const url = "http://localhost:3000/api/" + category;
    makeCallAsync(url).then(function(cameras) {
        listLoop(cameras);
    })["catch"](function(err) {
        console.error(err);
    });
} // Chargement de toutes les informations d'un produit


function listLoop(list) {
    let products = "";
    list.forEach(function(camera, index) {
        products = products + "\n        <div class=\"article\">\n            <div id=\"product_photo\" class=\"article__img\"><img src=\"" + camera.imageUrl + "\" alt=\"\"></div>\n            <div class=\"article__desc\">\n                <div id=\"article_title\" class=\"article__desc__title\">\n                    <a href=\"/product.html?category=cameras&product=" + camera._id + "\">\n                        <h3>" + camera.name + "</h3>\n                    </a>\n                </div>\n                <div id=\"article_details\" class=\"article__desc__details\">" + camera.description + "</div>\n            </div>\n            <div class=\"article__infos\">\n                <div id=\"article_price\" class=\"article__infos__price\">" + convertToPrice(camera.price) + "</div>\n                <div id=\"article_more\" class=\"article__infos__more\"><a href=\"/product.html?category=cameras&product=" + camera._id + "\">+ d'infos</a></div>\n            </div>\n        </div>";
    });
    document.getElementById("articles").innerHTML = products;
} //Au chargement de la page, charger tous les produits de la section Cameras


listAll("cameras");