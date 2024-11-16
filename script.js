class Product {
  constructor(id, name, price) {
    this.id = id;
    this.name = name;
    this.price = price;
  }
}

class ShoppingCartItem {
  constructor(product, quantity) {
    this.product = product;
    this.quantity = quantity;
  }

  getTotalPrice() {
    return this.product.price * this.quantity;
  }
}

class ShoppingCart {
  constructor() {
    this.items = [];
  }

  addItem(product, quantity) {
    const existingItem = this.items.find(item => item.product.id === product.id);
    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      this.items.push(new ShoppingCartItem(product, quantity));
    }
    this.displayCart();
  }

  removeItem(productId) {
    this.items = this.items.filter(item => item.product.id !== productId);
    this.displayCart();
  }

  getTotalPrice() {
    return this.items.reduce((total, item) => total + item.getTotalPrice(), 0);
  }

  displayCart() {
    const cartItemsDiv = document.getElementById("cart-items");
    cartItemsDiv.innerHTML = ""; // Clear current items

    this.items.forEach(item => {
      const cartItemDiv = document.createElement("div");
      cartItemDiv.className = "cart-item";
      cartItemDiv.innerHTML = `
        <span>${item.product.name} (x${item.quantity})</span>
        <span>${item.getTotalPrice()} usd</span>
        <button onclick="cart.removeItem(${item.product.id})">Supprimer</button>
      `;
      cartItemsDiv.appendChild(cartItemDiv);
    });

    // Update the total price
    document.getElementById("cart-total").textContent = `Total du Panier : ${this.getTotalPrice()} usd`;
  }
}

// Sample products
const products = [
  new Product(1, "Iphone 12", 600),
  new Product(2, "Iphone 13", 800),
  new Product(3, "Iphone 14", 1400),
];

// Initialize the cart
const cart = new ShoppingCart();

// Display products
const productListDiv = document.getElementById("product-list");
products.forEach(product => {
  const productDiv = document.createElement("div");
  productDiv.className = "product-item";
  productDiv.innerHTML = `
    <span>${product.name} - ${product.price} usd</span>
    <button onclick="cart.addItem(new Product(${product.id}, '${product.name}', ${product.price}), 1)">Ajouter au Panier</button>
  `;
  productListDiv.appendChild(productDiv);
});

  