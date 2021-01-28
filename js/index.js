// ***INDEX***

// Lister tous les produits d'une categorie en particulier
function listAll(category) {
    const url = "http://localhost:3000/api/" + category;
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
    let products = "";
    list.forEach((camera, index) => {
        products = products + `
        <div class="article">
            <div id="product_photo" class="article__img"><img src="` + camera.imageUrl + `" alt=""></div>
            <div class="article__desc">
                <div id="article_title" class="article__desc__title">
                    <a href="/product.html?category=cameras&product=` + camera._id + `">
                        <h3>` + camera.name + `</h3>
                    </a>
                </div>
                <div id="article_details" class="article__desc__details">` + camera.description + `</div>
            </div>
            <div class="article__infos">
                <div id="article_price" class="article__infos__price">` + convertToPrice(camera.price) + `</div>
                <div id="article_more" class="article__infos__more"><a href="/product.html?category=cameras&product=` + camera._id + `">+ d'infos</a></div>
            </div>
        </div>`;
    });
    document.getElementById("articles").innerHTML = products;
}
//Au chargement de la page, charger tous les produits de la section Cameras
listAll("cameras");