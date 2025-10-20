document.addEventListener('DOMContentLoaded', () => {
  const hero = document.querySelector('.hero');
  if (hero) {
    const bg = hero.getAttribute('data-bg');
    if (bg) hero.style.backgroundImage = `url(${bg})`;
  }

  const btn = document.querySelector('.btn');
  if (btn) {
    btn.addEventListener('click', e => {
      e.preventDefault();
      document.querySelector('#products').scrollIntoView({ behavior: 'smooth' });
    });
  }

  let cart = [];

  const cartButton = document.getElementById('cart-button');
  const cartModal = document.getElementById('cart-modal');
  const cartItemsDiv = document.getElementById('cart-items');
  const cartCount = document.getElementById('cart-count');
  const cartTotal = document.getElementById('cart-total');
  const closeCartBtn = document.getElementById('close-cart');
  const checkoutBtn = document.getElementById('checkout-button');
  const checkoutSection = document.getElementById('checkout-section');
  const checkoutForm = document.getElementById('checkout-form');

  function updateCartUI() {
    cartItemsDiv.innerHTML = '';
    let total = 0;
    cart.forEach(item => {
      total += item.price;
      const div = document.createElement('div');
      div.className = 'cart-item';
      div.textContent = `${item.name} - $${item.price.toFixed(2)}`;
      cartItemsDiv.appendChild(div);
    });
    cartCount.textContent = cart.length;
    cartTotal.textContent = `Total: $${total.toFixed(2)}`;
  }

  document.querySelectorAll('.add-to-cart').forEach(btn => {
    btn.addEventListener('click', () => {
      const card = btn.closest('.product-card');
      const id = card.getAttribute('data-id');
      const name = card.getAttribute('data-name');
      const price = parseFloat(card.getAttribute('data-price'));
      cart.push({ id, name, price });
      alert(`${name} added to cart.`);
      updateCartUI();
    });
  });

  cartButton.addEventListener('click', () => {
    cartModal.style.display = 'flex';
    updateCartUI();
    checkoutSection.style.display = 'none';
  });

  closeCartBtn.addEventListener('click', () => {
    cartModal.style.display = 'none';
    checkoutSection.style.display = 'none';
  });

  checkoutBtn.addEventListener('click', () => {
    checkoutSection.style.display = 'block';
  });

  checkoutForm.addEventListener('submit', e => {
    e.preventDefault();
    const cardNumber = document.getElementById('cardnumber').value.trim();
    const expiry = document.getElementById('expiry').value.trim();
    const cvc = document.getElementById('cvc').value.trim();
    if(cardNumber === '' || expiry === '' || cvc === ''){
      alert('Please fill in all card details.');
      return;
    }
    alert(`Order confirmed! Thank you for shopping with Eco Life.\n\nPayment Info:\nCard: ${cardNumber}\nExpiry: ${expiry}\nCVC: ${cvc}`);
    cart = [];
    updateCartUI();
    checkoutSection.style.display = 'none';
    cartModal.style.display = 'none';
    checkoutForm.reset();
  });
});
