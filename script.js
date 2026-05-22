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
          // Always show all categories by removing 'active' class from all
          content.classList.remove('active');
          if(content.id === tab.getAttribute('aria-controls')) {
            // Add active to the selected
            content.classList.add('active');
            // Open the accordion inside this category if it exists
            const button = content.querySelector('button[aria-expanded]');
            if (button && button.getAttribute('aria-expanded') === 'false') {
              button.setAttribute('aria-expanded', 'true');
              const list = document.getElementById(button.getAttribute('aria-controls'));
              if(list) {
                list.classList.remove('hidden');
              }
              const svg = button.querySelector('svg');
              if(svg) {
                svg.style.transform = 'rotate(180deg)';
              }
            }
            // Smooth scroll to category
            content.scrollIntoView({ behavior: 'smooth', block: 'start' });
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
      if(window.submitOrderFunction) {
        // Wrap the original function to add delivery fixed cost and adjust message
        const originalSubmit = window.submitOrderFunction;
        window.submitOrderFunction = function() {
          // Calculate order details from cart items container
          const cartItemsEl = document.getElementById('cartItems');
          const subtotalTextEl = document.getElementById('subtotalText');
          const deliveryTextEl = document.getElementById('deliveryText');
          const totalTextEl = document.getElementById('totalText');
          const deliveryCost = 50;

          // Parse subtotal from subtotalText (format RD$X)
          let subtotal = 0;
          const subtotalMatch = subtotalTextEl.textContent.match(/RD\$(\d+)/);
          if(subtotalMatch) {
            subtotal = parseInt(subtotalMatch[1], 10);
          }
          // Update delivery and total display
          deliveryTextEl.textContent = 'RD$' + deliveryCost;
          totalTextEl.textContent = 'RD$' + (subtotal + deliveryCost);

          // Compose message with subtotal, delivery and total
          let messageLines = [];
          // Iterate cart items for names and prices
          Array.from(cartItemsEl.children).forEach(item => {
            const nameSpan = item.querySelector('span');
            const priceSpan = item.querySelector('b');
            if(nameSpan && priceSpan) {
              messageLines.push(`${nameSpan.textContent}: ${priceSpan.textContent}`);
            }
          });
          messageLines.push(`Subtotal: RD$${subtotal}`);
          messageLines.push(`Delivery: RD$${deliveryCost}`);
          messageLines.push(`Total: RD$${subtotal + deliveryCost}`);

          // Attach message to a form field or global (depends on original function implementation)
          // For this code, add a global var message for demo (should integrate with original function)
          window.orderMessage = messageLines.join('\n');

          // Call original function
          originalSubmit();
        };
        window.submitOrderFunction();
      }
    }