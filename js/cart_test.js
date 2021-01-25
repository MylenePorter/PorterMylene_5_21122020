// ***CART***

// Ajouter au localStorage
//(key, value)
function addToCart() {
    var qty = document.getElementById("product_amount").value;
    var db = window.localStorage;
    db.setItem(product, qty);
}

// Afficher infos du localStorage
function getCart() {
    var cart_items = [];
    for (var i = 0; i < localStorage.length; i++) {
        // cart_items = cart_items + localStorage.getItem(localStorage.key(i));
        cart_items[i] = {
            id: localStorage.key(i),
            name: "Un string"

        }

    }
    console.log(cart_items);
}

//
function getProductDetails(category, product) {
    var url = "http://localhost:3000/api/" + category + "/" + product;
    //console.log(url);
    makeCallAsync(url)
        .then((list) => {
            buildDropDown(list);
            updateProduct(list);
        })
        .catch((err) => {
            console.error(err);
        });
}

//
function showCartItems(cart_items) {
    var products = "";
    Object.keys(list).forEach(key => {
        products = products + `
        <div class="article">
            <div id="product_photo" class="article__img"><img src="` + list[key].imageUrl + `" alt=""></div>
            <div class="article__desc">
                <div id="article_title" class="article__desc__title">
                    <a href="/product.html?category=cameras&product=` + list[key]._id + `">
                        <h3>` + list[key].name + `</h3>
                    </a>
                </div>
                <div id="article_details" class="article__desc__details">` + list[key].description + `</div>
            </div>
            <div class="article__infos">
                <div id="article_price" class="article__infos__price">` + convertToPrice(list[key].price) + `</div>
                <div id="article_more" class="article__infos__more"><a href="/product.html?category=cameras&product=` + list[key]._id + `">+ d'infos</a></div>
            </div>
        </div>`;
    });
    document.getElementById("articles").innerHTML = products;
}

// - ou + sur "product_amount" avant ajout panier
function increaseAmount() {
    document.getElementById("product_amount").stepUp(1);
}

function decreaseAmount() {
    document.getElementById("product_amount").stepDown(1);
}