class App {
  static async request() {
    let response = await fetch("https://m2-kenzie-shop.herokuapp.com/products")
      .then((res) => res.json())
      .then((data) => data.products);
    await response.forEach((product) => {
      this.createProductTemplate(product);
    });
  }
  static createProductTemplate(product) {
    let containerProduct = document.createElement("div");
    let img = document.createElement("img");
    let reviews = document.createElement("ul");
    let productName = document.createElement("p");
    let price = document.createElement("span");
    let buttonBuy = document.createElement("button");

    containerProduct.id = product.id;
    img.src = `https://kenzie-academy-brasil.gitlab.io/fullstack/frontend/modulo2/sprint3/img/consumindo-api-produtos/${product.id}/Image.png`;
    img.alt = product.productName;
    for (let i = 0; i < product.reviews; i++) {
      reviews.append(document.createElement("li"));
    }
    let reducedName = product.productName.substring(0, 30);
    productName.innerText = reducedName;
    buttonBuy.innerText = "Comprar";
    if (!product.promotionStatus) {
      price.innerText = "R$" + product.price.productPrice;
      price.classList = "final-price";
    } else {
      let initialPrice = document.createElement("p");
      let promotionPrice = document.createElement("p");

      initialPrice.innerText = "De: R$" + product.price.productPrice;
      initialPrice.classList = "initial-price";
      promotionPrice.innerText =
        "Por: R$" + product.price.productPromotionPrice;
      promotionPrice.classList = "final-price";

      price.append(initialPrice, promotionPrice);
    }

    containerProduct.append(img, reviews, productName, price, buttonBuy);
    document.getElementById("products").append(containerProduct);
  }
}
App.request();
