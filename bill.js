function togglePaymentFields() {
    const cardFields = document.getElementById('card-fields');
    const upiFields = document.getElementById('upi-fields');
    const paymentMethod = document.querySelector('input[name="payment-method"]:checked').value;

    // Toggle visibility based on selected payment method
    cardFields.style.display = paymentMethod === 'card' ? 'block' : 'none';
    upiFields.style.display = paymentMethod === 'upi' ? 'block' : 'none';
}

function applyPromoCode(event) {
    event.preventDefault(); // Prevent form submission
    alert('Promo code applied.');
}

function completeCheckout() {
    // Gather necessary data for checkout
    const billItems = JSON.parse(localStorage.getItem('billItems')) || [];

    // Check if there are items in the bill
    if (billItems.length === 0) {
        alert("Your bill is empty. Please add items to proceed.");
        return;
    }

    // Prepare the data to send to the server
    const checkoutData = billItems.map(item => ({
        pd_id: item.id, // Assuming 'id' is the key for product ID
        pd_quantity: item.quantity
    }));

    // Make a POST request to update quantities in the database
    fetch('updateQuantities.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(checkoutData)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        if (data.error) {
            alert(data.error);
        } else {
            alert(data.message);
            localStorage.removeItem('billItems');
            window.location.href = 'confirmation.html';
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('An error occurred during checkout. Please try again.');
    });
    
}
// Populate bill details and payment amounts
document.addEventListener('DOMContentLoaded', () => {
    const billItemsList = document.querySelector('.bill-items');
    const subtotalElement = document.querySelector('.subtotal');
    const taxElement = document.querySelector('.tax');
    const totalPriceElement = document.querySelector('.price');

    // Retrieve bill data from localStorage
    const billItems = JSON.parse(localStorage.getItem('billItems')) || [];
    const storedTotal = parseFloat(localStorage.getItem('totalAmount')) || 0;

    // Constants
    const taxRate = 0.127; // 12.7% tax rate

    // Calculate and display bill items
    let subtotal = 0;
    if (billItems.length > 0) {
        billItems.forEach(item => {
            const listItem = document.createElement('li');
            listItem.textContent = `${item.name} - Quantity: ${item.quantity} - Price: ₹${(item.price * item.quantity).toFixed(2)}`;
            billItemsList.appendChild(listItem);
            subtotal += (item.price * item.quantity); // Accumulate subtotal
        });
    } else {
        billItemsList.innerHTML = '<li style="color: white;">No items in your bill.</li>';
    }

    // Calculate tax and total if necessary
    const tax = subtotal * taxRate;
    const calculatedTotalPrice = subtotal + tax;

    // Use stored total from localStorage if it exists, else calculate
    const totalPrice = storedTotal || calculatedTotalPrice;

    // Update subtotal, tax, and total fields
    subtotalElement.textContent = `₹${subtotal.toFixed(2)}`;
    taxElement.textContent = `₹${tax.toFixed(2)}`;
    totalPriceElement.textContent = `₹${totalPrice.toFixed(2)}`;

    // Update the total in localStorage if necessary
    localStorage.setItem('total', totalPrice);
});
