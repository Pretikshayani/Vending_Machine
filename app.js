let openShopping = document.querySelector('.shopping');
let closeShopping = document.querySelector('.closeShopping');
let list = document.querySelector('.list');
let listCard = document.querySelector('.listCard');
let body = document.querySelector('body');
let total = document.querySelector('.total');
let quantity = document.querySelector('.quantity');

openShopping.addEventListener('click', () => {
    body.classList.add('active');
});
closeShopping.addEventListener('click', () => {
    body.classList.remove('active');
});

let products = [
    {
        id: 1,
        name: 'FANTA',
        image: 'images/i1.jpeg', // Ensure this is relative
        price: 35
    },
    {
        id: 2,
        name: 'NESTEA',
        image: 'images/i2.jpeg',
        price: 40
    },
    {
        id: 3,
        name: 'COCA COLA',
        image: 'images/i10.jpeg',
        price: 35
    },
    {
        id: 4,
        name: 'PEPSI',
        image: 'images/i11.jpeg',
        price: 25
    },
    {
        id: 5,
        name: 'MOUNTAIN DEW',
        image: 'images/i5.jpeg',
        price: 25
    },
    {
        id: 6,
        name: 'SPRITE',
        image: 'images/i13.jpeg',
        price: 35  
    },
    {
        id: 7,
        name: 'NESCAFE',
        image: 'images/i7.jpeg',
        price: 35
    },
    {
        id: 8,
        name: 'WATER BOTTLE',
        image: 'images/i6.jpeg',
        price: 20  
    },
    {
        id: 9,
        name: 'DORITOS',
        image: 'images/i9.jpeg',
        price: 10  
    },
    {
        id: 10,
        name: 'LAYS',
        image: 'images/i3.jpeg',
        price: 10  
    },
    {
        id: 11,
        name: 'KURKURE',
        image: 'images/i4.jpeg',
        price: 10  
    },
    {
        id: 12,
        name: 'KIT KAT',
        image: 'images/i8.jpeg',
        price: 20 
    },
    {
        id: 13,
        name: 'DAIRY MILK',
        image: 'images/i12.jpeg',
        price: 10  
    }
];

let listCards = [];
function initApp() {
    products.forEach((value, key) => {
        let newDiv = document.createElement('div');
        newDiv.classList.add('item');
        newDiv.innerHTML = `
            <img src="${value.image}" alt="${value.name}">  <!-- Use relative path -->
            <div class="title">${value.name}</div>
            <div class="price">${value.price.toLocaleString()}</div>
            <button onclick="addToCard(${key})">Add To Card</button>`;
        list.appendChild(newDiv);
    });
}
initApp();

function addToCard(key) {
    // Find if the item already exists in the listCards array
    const existingItem = listCards.find(item => item.id === products[key].id);
    
    if (existingItem) {
        // If item exists, increase its quantity
        existingItem.quantity += 1;
    } else {
        // Add new item to the cart
        const productToAdd = { ...products[key], quantity: 1 }; // Use spread operator to copy product details
        listCards.push(productToAdd);
    }
    reloadCard();
}

function changeQuantity(key, quantity) {
    if (quantity == 0) {
        delete listCards[key];
    } else {
        listCards[key].quantity = quantity; // Only update the quantity, do not touch the price
    }
    reloadCard();
}

function reloadCard() {
    listCard.innerHTML = '';
    let count = 0;
    let totalPrice = 0;
    
    // Iterate through the array without null checks, since `null` won't exist now
    listCards.forEach((item, index) => {
        totalPrice += item.price * item.quantity;
        count += item.quantity;

        let newDiv = document.createElement('li');
        newDiv.innerHTML = `
            <div><img src="${item.image}" alt="${item.name}"/></div>
            <div>${item.name}</div>
            <div>${item.price.toLocaleString()} per item</div>
            <div>
                <button onclick="changeQuantity(${index}, ${item.quantity - 1})">-</button>
                <div class="count">${item.quantity}</div>
                <button onclick="changeQuantity(${index}, ${item.quantity + 1})">+</button>
            </div>`;
        listCard.appendChild(newDiv);
    });

    // Update total and quantity displays
    total.innerText = totalPrice.toLocaleString();
    quantity.innerText = count;

    // Log values for debugging
    console.log('Total Price:', totalPrice);
    console.log('Count:', count);
}


total.addEventListener('click', openBillPopup);
function openBillPopup() {
    // Store the bill items and total amount in localStorage
    const billItems = JSON.stringify(listCards);
    const totalAmount = total.innerText; // Ensure total is correctly populated

    // Log values for debugging
    console.log('Storing bill items:', billItems);
    console.log('Storing total amount:', totalAmount);

    // Set the bill data in localStorage
    localStorage.setItem('billItems', billItems);
    localStorage.setItem('total', totalAmount);

    // Redirect to the Bill.html page in the same window
    window.location.href = 'Bill.html';
}


