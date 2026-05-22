function toggleAccordion(button) {
      const expanded = button.getAttribute('aria-expanded') === 'true';
      button.setAttribute('aria-expanded', !expanded);
      const list = document.getElementById(button.getAttribute('aria-controls'));
      if(list) {
        if(expanded) {
          list.classList.add('hidden');
        } else {
          list.classList.remove('hidden');
        }
      }
      // Rotate icon
      const svg = button.querySelector('svg');
      if (svg) {
        if (expanded) {
          svg.style.transform = 'rotate(0deg)';
        } else {
          svg.style.transform = 'rotate(180deg)';
        }
      }
    }

    // Category Tabs behavior
    const tabs = document.querySelectorAll('#categoryButtons .category-tab');
    const contents = document.querySelectorAll('.category-content');
    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        tabs.forEach(t => {
          t.classList.remove('active');
          t.setAttribute('aria-selected', 'false');
        });
        tab.classList.add('active');
        tab.setAttribute('aria-selected', 'true');

        contents.forEach(content => {
          if(content.id === tab.getAttribute('aria-controls')) {
            content.classList.add('active');
          } else {
            content.classList.remove('active');
          }
        });
      });
    });

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