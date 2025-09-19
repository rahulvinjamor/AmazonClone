// Account dropdown interaction (for accessibility)
document.getElementById('accountMenu').addEventListener('focus', function() {
    document.getElementById('accountDropdown').style.display = 'block';
});
document.getElementById('accountMenu').addEventListener('blur', function() {
    document.getElementById('accountDropdown').style.display = 'none';
});

// Cart preview interaction (for accessibility)
document.getElementById('cartMenu').addEventListener('focus', function() {
    document.getElementById('cartDropdown').style.display = 'block';
});
document.getElementById('cartMenu').addEventListener('blur', function() {
    document.getElementById('cartDropdown').style.display = 'none';
});

// Carousel navigation
const carouselImages = [
    document.getElementById('carouselImage1'),
    document.getElementById('carouselImage2'),
    document.getElementById('carouselImage3')
];
let currentCarousel = 0;
function showCarousel(idx) {
    carouselImages.forEach((img, i) => {
        img.style.display = i === idx ? 'block' : 'none';
    });
}
document.getElementById('carouselPrev').addEventListener('click', function() {
    currentCarousel = (currentCarousel - 1 + carouselImages.length) % carouselImages.length;
    showCarousel(currentCarousel);
});
document.getElementById('carouselNext').addEventListener('click', function() {
    currentCarousel = (currentCarousel + 1) % carouselImages.length;
    showCarousel(currentCarousel);
});
showCarousel(currentCarousel);
const products = [
    {
        title: "Echo Dot (4th Gen)",
        price: "$29.99",
        image: "https://picsum.photos/200?random=11",
        rating: 4.5,
        prime: true
    },
    {
        title: "Fire TV Stick 4K",
        price: "$24.99",
        image: "https://picsum.photos/200?random=12",
        rating: 4.7,
        prime: true
    },
    {
        title: "Kindle Paperwhite",
        price: "$99.99",
        image: "https://picsum.photos/200?random=13",
        rating: 4.8,
        prime: true
    },
    {
        title: "AmazonBasics Backpack",
        price: "$19.99",
        image: "https://picsum.photos/200?random=14",
        rating: 4.2,
        prime: false
    }
];

let cart = JSON.parse(localStorage.getItem('cart') || '[]');

function updateCartCount() {
    const cartMenu = document.getElementById('cartMenu');
    let countSpan = cartMenu.querySelector('.cart-count');
    if (!countSpan) {
        countSpan = document.createElement('span');
        countSpan.className = 'cart-count';
        countSpan.style.background = '#ffa41c';
        countSpan.style.color = '#232f3e';
        countSpan.style.fontWeight = 'bold';
        countSpan.style.borderRadius = '50%';
        countSpan.style.padding = '2px 7px';
        countSpan.style.marginLeft = '6px';
        cartMenu.appendChild(countSpan);
    }
    countSpan.textContent = cart.length;
}

function updateCartDropdown() {
    const cartDropdown = document.getElementById('cartDropdown');
    if (cart.length === 0) {
        cartDropdown.innerHTML = '<p>Your cart is empty.</p>';
        return;
    }
    cartDropdown.innerHTML = '<b>Cart Items:</b><ul style="list-style:none;padding-left:0;">' +
        cart.map(item => `<li style='margin-bottom:8px;'>${item.title} <span style='color:#B12704;'>${item.price}</span></li>`).join('') +
        '</ul>' +
        `<button id='checkoutBtn' style='background:#ffa41c;color:#232f3e;border:none;padding:8px 16px;border-radius:4px;cursor:pointer;font-weight:bold;margin-right:8px;'>Proceed to Checkout</button>` +
        `<button id='clearCartBtn' style='background:#eee;color:#232f3e;border:none;padding:8px 16px;border-radius:4px;cursor:pointer;font-weight:bold;margin-top:8px;margin-bottom:4px;'>Clear Cart</button>`;
    document.getElementById('checkoutBtn').onclick = function() {
        alert('Checkout is not implemented in this demo.');
    };
    document.getElementById('clearCartBtn').onclick = function() {
        cart = [];
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartCount();
        updateCartDropdown();
    };
}

const productsContainer = document.getElementById('products');
products.forEach((product, idx) => {
    const div = document.createElement('div');
    div.className = 'product';
    div.innerHTML = `
        <img src="${product.image}" alt="${product.title}">
        <div class="title">${product.title}</div>
        <div class="rating">
            ${'★'.repeat(Math.floor(product.rating))}${product.rating % 1 ? '½' : ''}
            <span style='color:#555; font-size:0.9em;'>(${product.rating})</span>
        </div>
        ${product.prime ? '<div class="prime"><i class="fa fa-crown"></i> Prime</div>' : ''}
        <div class="price">${product.price}</div>
        <button class="add-to-cart-btn">Add to Cart</button>
    `;
    div.style.cursor = 'pointer';
    div.addEventListener('click', function(e) {
        // Prevent button click from triggering navigation
        if (e.target.tagName.toLowerCase() === 'button') return;
        window.location.href = `item-details.html?id=${idx}`;
    });
    div.querySelector('.add-to-cart-btn').addEventListener('click', function(ev) {
        ev.stopPropagation();
              cart = JSON.parse(localStorage.getItem('cart') || '[]');
              cart.push(product);
              localStorage.setItem('cart', JSON.stringify(cart));
              updateCartCount();
              updateCartDropdown();
    });
    productsContainer.appendChild(div);
});

updateCartCount();
updateCartDropdown();
