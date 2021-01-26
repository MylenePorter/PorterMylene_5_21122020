// ***INDEX***

// Lister tous les produits d'une categorie en particulier
function listAll(category) {
    var url = "http://localhost:3000/api/" + category;
    makeCallAsync(url)
        .then((cameras) => {
            listLoop(cameras);
        })
        .catch((err) => {
            console.error(err);
        })
}

// Chargement de toutes les informations d'un produit
function listLoop(list) {
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
//Au chargement de la page, charger tous les produits de la section Cameras
listAll("cameras");