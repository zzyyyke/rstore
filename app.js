function scrollToShop() {
    document.querySelector('#product1').scrollIntoView({ behavior: 'smooth' });
}

let cart = JSON.parse(localStorage.getItem('cart')) || [];
let total = 0;

// Function to add a product to the cart
function addToCart(product, price) {
    const existingProduct = cart.find(item => item.product === product);
    
    if (existingProduct) {
        existingProduct.quantity++; 
    } else {
        cart.push({ product, price, quantity: 1 });  
    }

    updateCart();
    saveCart();

    // Show notification when item is added
    showNotification(`${product} has been added to the cart at ₱${price}`);
}

// Function to display notification
function showNotification(message) {
    const notification = document.getElementById('notification');
    notification.innerText = message;
    notification.style.display = 'block';

    // Hide the notification after 3 seconds
    setTimeout(() => {
        notification.style.display = 'none';
    }, 3000);
}

// Function to increase product quantity
function increaseQuantity(index) {
    cart[index].quantity++;  // Increase quantity
    updateCart();
    saveCart();
}

// Function to decrease product quantity
function decreaseQuantity(index) {
    if (cart[index].quantity > 1) {
        cart[index].quantity--;  
    } else {
        cart.splice(index, 1);  
    }
    updateCart();
    saveCart();
}

// Function to update the cart display
function updateCart() {
    const cartItems = document.getElementById('cartItems');
    cartItems.innerHTML = '';
    total = 0;  // Reset total before recalculating

    cart.forEach((item, index) => {
        const div = document.createElement('div');
        div.textContent = `${item.product} - ₱${item.price} x ${item.quantity}`;
        div.classList.add('cart-item'); 

        // Create buttons for quantity control
        const quantityDiv = document.createElement('div');
        quantityDiv.className = 'quantity-controls';

        const increaseButton = document.createElement('button');
        increaseButton.textContent = '+';
        increaseButton.className = 'increase-button';
        increaseButton.onclick = () => increaseQuantity(index);

        const decreaseButton = document.createElement('button');
        decreaseButton.textContent = '-';
        decreaseButton.className = 'decrease-button';
        decreaseButton.onclick = () => decreaseQuantity(index);

        const quantityDisplay = document.createElement('span');
        quantityDisplay.textContent = ` Quantity: ${item.quantity}`;
        quantityDisplay.className = 'quantity-display'; 

        // Append buttons to the quantity control div
        quantityDiv.appendChild(decreaseButton);
        quantityDiv.appendChild(quantityDisplay);
        quantityDiv.appendChild(increaseButton);
        div.appendChild(quantityDiv);

        cartItems.appendChild(div);

        // Update total price
        total += item.price * item.quantity;
    });

    document.getElementById('totalValue').textContent = total;
}

// Save cart data to localStorage
function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Checkout function
function checkout() {
    if (cart.length === 0) {
        alert("Your cart is empty!");
    } else {
        // Calculate total value
        const totalValue = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

        // Show confirmation notification
        const confirmation = confirm(`Your total is ₱${totalValue}. Do you want to proceed to checkout?`);

        if (confirmation) {
            // User confirmed, redirect to checkout page
            window.location.href = 'checkout.html';
        } else {
            // User cancelled, go back to the shop page
            alert("Returning to shop.");
            
        }
    }
}

// Display the cart on page load
updateCart();

let slideIndex = 0;
const slides = document.querySelector('.slide-track');
const totalSlides = document.querySelectorAll('.slide-track').length;

function showSlides() {
    slideIndex++;
    if (slideIndex >= totalSlides) {
        slideIndex = 0; // Reset to the first slide
    }
    // Move to the next slide using transform
    slides.style.transform = 'translateX(' + (-slideIndex * 100) + '%)';
}

// Show the slides every 3 seconds
setInterval(showSlides, 3000);

