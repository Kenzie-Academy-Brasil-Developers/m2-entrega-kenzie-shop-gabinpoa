class App {
  static async request() {
    let response = await fetch("https://m2-kenzie-shop.herokuapp.com/products")
      .then((res) => res.json())
      .then((data) => data.products);
    response.forEach((product) => {
      this.createProductTemplate(product);
    });
  }
  static createProductTemplate(product) {
    let containerProduct = document.createElement("div");
    let img = document.createElement("img");
    let description = document.createElement("p");
    let price = document.createElement("span");

    containerProduct.id = product.id;
    img.src = `https://kenzie-academy-brasil.gitlab.io/fullstack/frontend/modulo2/sprint3/img/consumindo-api-produtos/${product.id}/Image.png`;
    img.alt = product.productName;
    description.innerText = product.productName;
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
    containerProduct.append(img, description, price);
    document.getElementById("products").append(containerProduct);
  }
}
App.request();
