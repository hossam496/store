  
  
   document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                document.querySelector(this.getAttribute('href')).scrollIntoView({
                    behavior: 'smooth'
                });
            });
        });
  
  let cart = [];

        function addToCart(productName, price) {
            cart.push({ name: productName, price: price });
            updateCart();
        }

        function removeFromCart(index) {
            cart.splice(index, 1);
            updateCart();
        }

        function updateCart() {
            const cartItemsDiv = document.getElementById('cart-items');
            cartItemsDiv.innerHTML = '';

            if (cart.length === 0) {
                cartItemsDiv.innerHTML = '<p style="text-align: center; color: #555;">السلة فارغة</p>';
                document.getElementById('total-price').textContent = '';
                return;
            }

            cart.forEach((item, index) => {
                const cartItem = document.createElement('div');
                cartItem.classList.add('cart-item');
                cartItem.innerHTML = `
                    <span>${item.name}</span>
                    <span class="price">${item.price} ريال</span>
                    <div class="cart-buttons">
                        <button class="delete-btn" onclick="removeFromCart(${index})">حذف</button>
                    </div>
                `;
                cartItemsDiv.appendChild(cartItem);
            });

            const totalPrice = cart.reduce((sum, item) => sum + item.price, 0);
            document.getElementById('total-price').textContent = `السعر النهائي: ${totalPrice} ريال`;
        }