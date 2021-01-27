// *** CONFIRM ***

//
function updateOrderInfo() {
    document.getElementById("order_number").innerHTML = order_number;
    document.getElementById("order_price").innerHTML = convertToPrice(sessionStorage.getItem("cart_price"));
}

updateOrderInfo();