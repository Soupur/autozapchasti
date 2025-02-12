// script.js
const productData = [
    {
      id: 1,
      name: "Фильтр масляный",
      price: 500,
      image: "https://via.placeholder.com/250x150?text=Фильтр",
      description: "Высококачественный масляный фильтр для вашего автомобиля.",
    },
    {
      id: 2,
      name: "Тормозные колодки",
      price: 1200,
      image: "https://via.placeholder.com/250x150?text=Колодки",
      description: "Надежные тормозные колодки для безопасного вождения.",
    },
    {
      id: 3,
      name: "Свечи зажигания",
      price: 800,
      image: "https://via.placeholder.com/250x150?text=Свечи",
      description: "Комплект свечей зажигания для эффективной работы двигателя.",
    },
    {
      id: 4,
      name: "Аккумулятор",
      price: 5000,
      image: "https://via.placeholder.com/250x150?text=Аккумулятор",
      description: "Надежный аккумулятор для запуска двигателя.",
    },
      {
          id: 5,
          name: "Ремень ГРМ",
          price: 2500,
          image: "https://via.placeholder.com/250x150?text=Ремень+ГРМ",
          description: "Ремень ГРМ для вашего автомобиля.",
      },
      {
          id: 6,
          name: "Масляный насос",
          price: 4000,
          image: "https://via.placeholder.com/250x150?text=Насос",
          description: "Масляный насос для вашего автомобиля.",
      }
    // Добавьте больше товаров здесь
  ];
  
  
  const productGrid = document.querySelector(".product-grid");
  const cartIconCount = document.getElementById("cart-count");
  const cartItemsContainer = document.getElementById("cart-items");
  const cartTotalElement = document.getElementById("cart-total");
  const cartSummary = document.getElementById("cart-summary");
  const checkoutButton = document.getElementById("checkout-button");
  
  
  let cart = []; // Массив для хранения товаров в корзине
  
  // Функция для отображения товаров на странице
  function displayProducts() {
    productData.forEach((product) => {
      const productCard = document.createElement("div");
      productCard.classList.add("product-card");
  
      productCard.innerHTML = `
        <img src="" alt="${product.name}">
        <h3>${product.name}</h3>
        <p>${product.description}</p>
        <p>Цена: ${product.price} руб</p>
        <button data-id="${product.id}">В корзину</button>
      `;
  
      productGrid.appendChild(productCard);
      productCard.querySelector("button").addEventListener("click", addToCart);
    });
  }
  
  // Функция добавления товара в корзину
  function addToCart(event) {
    const productId = parseInt(event.target.dataset.id);
    const product = productData.find((p) => p.id === productId);
  
    if (product) {
      const existingCartItem = cart.find((item) => item.id === productId);
  
      if (existingCartItem) {
        existingCartItem.quantity++;
      } else {
        cart.push({ ...product, quantity: 1 });
      }
  
      updateCart();
    }
  }
  
  // Функция для обновления отображения корзины
  function updateCart() {
    cartIconCount.textContent = cart.reduce((total, item) => total + item.quantity, 0); // Обновляем значок корзины
    cartItemsContainer.innerHTML = "";
    let total = 0;
  
    cart.forEach((item) => {
      const cartItemElement = document.createElement("div");
      cartItemElement.classList.add("cart-item");
  
      cartItemElement.innerHTML = `
          <img src="" alt="${item.name}">
          <div class="cart-item-details">
              <p>${item.name}</p>
              <p>Цена: ${item.price} руб</p>
              <p>Количество: ${item.quantity}</p>
          </div>
          <div class="cart-item-actions">
              <button class="remove-from-cart" data-id="${item.id}">Удалить</button>
          </div>
      `;
  
      cartItemsContainer.appendChild(cartItemElement);
      total += item.price * item.quantity;
  
  
      cartItemElement.querySelector(".remove-from-cart").addEventListener("click", removeFromCart);
    });
  
    cartTotalElement.textContent = total.toFixed(2);
    cartSummary.style.display = cart.length > 0 ? "block" : "none";
  }
  
  function removeFromCart(event) {
      const productId = parseInt(event.target.dataset.id);
      cart = cart.filter(item => item.id !== productId);
      updateCart();
  }
  
  
  // Функция для оформления заказа (просто выводит сообщение в консоль)
  function checkout() {
      if (cart.length === 0) {
          alert("Ваша корзина пуста.");
          return;
      }
      let orderDetails = "Заказ:\n";
      cart.forEach(item => {
          orderDetails += `${item.name} x ${item.quantity} - ${item.price * item.quantity} руб\n`;
      });
      orderDetails += `\nИтого: ${cartTotalElement.textContent} руб`;
  
      alert("Спасибо за заказ!\n" + orderDetails);  // Выводим детали заказа в alert
      cart = [];
      updateCart();
  }
  
  
  // Загрузка товаров и добавление обработчиков событий
  document.addEventListener("DOMContentLoaded", () => {
    displayProducts();
    updateCart(); // Обновляем корзину при загрузке страницы, чтобы показать текущее состояние
    checkoutButton.addEventListener("click", checkout);
  });