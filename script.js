// Show first category by default
    document.addEventListener('DOMContentLoaded', () => {
      const tabs = document.querySelectorAll('.category-tab');
      const contents = document.querySelectorAll('[data-category-content]');
      function activateCategory(cat) {
        contents.forEach(c => c.classList.remove('active'));
        tabs.forEach(t => t.classList.remove('active'));
        document.querySelector(`[data-category-content='${cat}']`).classList.add('active');
        document.querySelector(`.category-tab[data-category='${cat}']`).classList.add('active');
      }
      tabs.forEach(tab => {
        tab.addEventListener('click', () => activateCategory(tab.dataset.category));
      });
      // Activate first tab initially
      if(tabs.length) activateCategory(tabs[0].dataset.category);
    });

    // Placeholder functions to be implemented on main script
    function addToCart(name, price) {
      // Append item to cart logic...
      if(window.addItemToCart) window.addItemToCart(name, price);
    }
    function clearCart() {
      if(window.clearCartFunction) window.clearCartFunction();
    }
    function submitOrder() {
      if(window.submitOrderFunction) window.submitOrderFunction();
    }