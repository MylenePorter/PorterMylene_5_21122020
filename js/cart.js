// *** CART ***

// Afficher infos du localStorage
function getCart(category) {
    var cart_items = [];
    for (var i = 0; i < localStorage.length; i++) {
        // cart_items = cart_items + localStorage.getItem(localStorage.key(i));
        var cart_price = 0;
        sessionStorage.setItem("cart_price", 0);
        getProductDetails(category, i, localStorage.key(i));
        console.log(cart_price);
    }
    console.log(cart_items);
}

// Obtenir les informations du localstorage pour chaque ligne
// et le convertir pour l'afficher dans le panier
function getProductDetails(category, key, product) {
    var url = "http://localhost:3000/api/" + category + "/" + product;
    //console.log(url);
    makeCallAsync(url)
        .then((product_details) => {
            console.log(product_details);
            var line_total = 0;
            var qty = localStorage.getItem(product);
            line_total = product_details.price * qty;
            var total_price = parseFloat(sessionStorage.getItem('cart_price'));
            total_price += line_total;
            sessionStorage.setItem("cart_price", total_price);
            console.log(total_price)
            formatHTML(product_details, qty, line_total);
            showCartTotalPrice();
        })
}

// HTML 
function formatHTML(product_details, qty, line_total) {
    document.getElementById("articles").innerHTML += ` 
            <div class="article">
                <div id="product_photo" class="article__img article__img--cart"><img src="` + product_details.imageUrl + `" alt=""></div>
                <div class="article__desc article__desc--cart">
                    <div id="article_title" class="article__desc__title">
                        <a href="/product.html?category=cameras&product=` + product_details._id + `">
                            <h3>` + product_details.name + `</h3>
                        </a>
                    </div>
                </div>
                <div class="article__infos">
                    <div id="article_price" class="article__infos__price">` + convertToPrice(line_total) + `</div>
                </div>
            <!-- Changement quantités -->
            <div class="article__infos__add">
                <!-- Réduire quantité -->
                <button id="product_minus" onclick="decreaseProductAmount('` + product_details._id + `', ` + qty + `);" class="article__infos__add__minus article__infos__add__minus--cart">-</button>
                <!-- Augmenter quantité -->
                <button id="product_plus" onclick="increaseProductAmount('` + product_details._id + `', ` + qty + `);" class="article__infos__add__plus article__infos__add__plus--cart">+</button>
                <!-- Quantité -->
                <div id="product_qty" class="article__infos__add__qty">
                <form action="post" action="#">
                    <input type="number" id="product_amount_` + product_details._id + `" value="` + qty + `" min="0" step="1" max="10" class="article__infos__add__qty__form">
                </form>
                </div>
                <button class="product_remove" onclick="removeFromCart('` + product_details._id + `')">Retirer</button>
            </div>
            `;
}

// Calcul du prix total du panier
function showCartTotalPrice() {
    var cart_price = convertToPrice(sessionStorage.getItem('cart_price'));
    console.log(cart_price);
    document.getElementById("cart-total").innerHTML = cart_price;
}

//
function showCartItems(product) {
    // TODO: innerHTML
}

// - ou + sur "product_amount" pour mettre à jour quantité dans Panier
function increaseProductAmount(id) {
    var qty = parseFloat(document.getElementById("product_amount_" + id).value);
    qty = qty + 1;
    console.log("product_amount_" + id);
    document.getElementById("product_amount_" + id).stepUp(1);
    //window.localStorage.removeItem(id);
    localStorage.setItem(id, qty);
    location.reload();
}

function decreaseProductAmount(id) {
    var qty = parseFloat(document.getElementById("product_amount_" + id).value);
    qty = qty - 1;
    console.log("product_amount_" + id);
    document.getElementById("product_amount_" + id).stepDown(1);
    //window.localStorage.removeItem(id);
    localStorage.setItem(id, qty);
    location.reload();

}

// Bouton supprimer
function removeFromCart(key) {
    localStorage.removeItem(key);
    location.reload();
}

// Au chargement de la page, afficher les informations stockées dans le local storage
getCart("cameras");