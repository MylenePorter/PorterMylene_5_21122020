// ***PRODUCT**

// 
function showProduct(category, product) {
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

// Liste déroulante pour afficher les options
function buildDropDown(list) {
    // variable product_choice 
    // loop dans l'objet pour chercher tous les "name"
    // les afficher dans le drop down list 
    var options = "";
    Object.keys(list.lenses).forEach(key => {
        //console.log(key, list.lenses[key]);
        options = options + '<option>' + list.lenses[key] + '</option>';
    });
    document.getElementById("product_choice").innerHTML = options;
}

// Fonctions pour Product Photo
function updateProduct(list) {
    var product_photo = list.imageUrl;
    var product_title = list.name;
    var product_details = list.description;
    var product_price = list.price;
    var code = "<img src='" + product_photo + "' alt='' />";
    document.getElementById("product_photo").innerHTML = code;
    document.getElementById("product_title").innerHTML = product_title;
    document.getElementById("product_details").innerHTML = product_details;
    document.getElementById("product_price").innerHTML = convertToPrice(product_price);
}