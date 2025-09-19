// Cart logic shared with homepage
let cart = JSON.parse(localStorage.getItem('cart') || '[]');

function updateCartCount() {
    const cartCountDiv = document.getElementById('cartCount');
    if (cartCountDiv) {
        if (cart.length > 0) {
            cartCountDiv.textContent = cart.length;
            cartCountDiv.style.display = 'inline-block';
        } else {
            cartCountDiv.textContent = '';
            cartCountDiv.style.display = 'none';
        }
    }
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
        /* No alert, just a placeholder */
    };
    document.getElementById('clearCartBtn').onclick = function() {
        cart = [];
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartCount();
        updateCartDropdown();
    };
}
// Sample product data (should match main.js)
const products = [
    {
        title: "Echo Dot (4th Gen)",
        price: "$29.99",
        images: [
            "https://picsum.photos/320?random=11",
            "https://picsum.photos/320?random=111",
            "https://picsum.photos/320?random=112"
        ],
        rating: 4.5,
        prime: true,
        description: "Smart speaker with Alexa. Stream music, control smart home, and more.",
        highlights: ["Voice control your music", "Works with smart home devices", "Compact design"],
        techspecs: {Brand: "Amazon", Model: "Echo Dot (4th Gen)", Color: "Charcoal", Connectivity: "Wi-Fi, Bluetooth"},
        reviews: [
            {user: "Alice", rating: 5, text: "Love the sound quality!"},
            {user: "Bob", rating: 4, text: "Alexa is super helpful."}
        ],
        qa: [
            {q: "Does it work with Spotify?", a: "Yes, it supports Spotify."},
            {q: "Can I use it as an alarm clock?", a: "Absolutely!"}
        ],
        related: [1,2]
    },
    {
        title: "Fire TV Stick 4K",
        price: "$24.99",
        images: [
            "https://picsum.photos/320?random=12",
            "https://picsum.photos/320?random=121"
        ],
        rating: 4.7,
        prime: true,
        description: "Stream in 4K Ultra HD. Access Netflix, Prime Video, Disney+, and more.",
        highlights: ["4K Ultra HD streaming", "Voice remote included", "Easy setup"],
        techspecs: {Brand: "Amazon", Model: "Fire TV Stick 4K", Color: "Black", Connectivity: "HDMI, Wi-Fi"},
        reviews: [
            {user: "Charlie", rating: 5, text: "Great for streaming!"}
        ],
        qa: [
            {q: "Does it support YouTube?", a: "Yes, YouTube is available."}
        ],
        related: [0,2]
    },
    {
        title: "Kindle Paperwhite",
        price: "$99.99",
        images: [
            "https://picsum.photos/320?random=13",
            "https://picsum.photos/320?random=131"
        ],
        rating: 4.8,
        prime: true,
        description: "Waterproof e-reader with a 6.8” display and adjustable warm light.",
        highlights: ["Waterproof design", "Adjustable warm light", "Long battery life"],
        techspecs: {Brand: "Amazon", Model: "Kindle Paperwhite", Color: "Black", Connectivity: "Wi-Fi"},
        reviews: [
            {user: "Dana", rating: 5, text: "Perfect for reading at night."}
        ],
        qa: [
            {q: "Can I read PDFs?", a: "Yes, PDFs are supported."}
        ],
        related: [0,1]
    },
    {
        title: "AmazonBasics Backpack",
        price: "$19.99",
        images: [
            "https://picsum.photos/320?random=14"
        ],
        rating: 4.2,
        prime: false,
        description: "Lightweight backpack for work, travel, or school. Durable and spacious.",
        highlights: ["Lightweight", "Durable material", "Spacious compartments"],
        techspecs: {Brand: "AmazonBasics", Model: "Backpack", Color: "Black", Material: "Polyester"},
        reviews: [
            {user: "Eve", rating: 4, text: "Good value for money."}
        ],
        qa: [
            {q: "Is it waterproof?", a: "It is water-resistant."}
        ],
        related: [0]
    }
];

// Get product index from query string
function getProductIndex() {
    const params = new URLSearchParams(window.location.search);
    return parseInt(params.get('id'), 10);
}

function renderDetails() {
    const idx = getProductIndex();
    const product = products[idx];
    if (!product) return;
    // Gallery
    document.getElementById('detailsImage').src = product.images[0];
    const galleryThumbnails = document.getElementById('galleryThumbnails');
    galleryThumbnails.innerHTML = '';
    product.images.forEach((img, i) => {
        const thumb = document.createElement('img');
        thumb.src = img;
        thumb.className = 'gallery-thumb';
        thumb.style.width = '48px';
        thumb.style.height = '48px';
        thumb.style.margin = '4px';
        thumb.style.cursor = 'pointer';
        thumb.onclick = () => {
            document.getElementById('detailsImage').src = img;
        };
        galleryThumbnails.appendChild(thumb);
    });
    // Title, rating, prime, price
    document.getElementById('detailsTitle').textContent = product.title;
    document.getElementById('detailsRating').innerHTML = `${'★'.repeat(Math.floor(product.rating))}${product.rating % 1 ? '½' : ''} <span style='color:#555; font-size:0.9em;'>(${product.rating})</span>`;
    document.getElementById('detailsPrime').innerHTML = product.prime ? '<i class="fa fa-crown"></i> Prime' : '';
    document.getElementById('detailsPrice').textContent = product.price;
    // Highlights
    const highlights = document.getElementById('detailsHighlights');
    highlights.innerHTML = '';
    product.highlights.forEach(h => {
        const li = document.createElement('li');
        li.textContent = h;
        highlights.appendChild(li);
    });
    // Description
    document.getElementById('detailsDescription').textContent = product.description;
    // Tech specs
    const techspecs = document.getElementById('detailsTechSpecs');
    techspecs.innerHTML = '';
    Object.entries(product.techspecs).forEach(([k,v]) => {
        const row = document.createElement('tr');
        row.innerHTML = `<td style='font-weight:bold;'>${k}</td><td>${v}</td>`;
        techspecs.appendChild(row);
    });
    // Reviews
    const reviewsContainer = document.getElementById('reviewsContainer');
    reviewsContainer.innerHTML = '';
    product.reviews.forEach(r => {
        const div = document.createElement('div');
        div.className = 'review';
        div.innerHTML = `<b>${r.user}</b>: ${'★'.repeat(r.rating)}<br>${r.text}`;
        reviewsContainer.appendChild(div);
    });
    // Q&A
    const qaContainer = document.getElementById('qaContainer');
    qaContainer.innerHTML = '';
    product.qa.forEach(q => {
        const div = document.createElement('div');
        div.className = 'qa';
        div.innerHTML = `<b>Q:</b> ${q.q}<br><b>A:</b> ${q.a}`;
        qaContainer.appendChild(div);
    });
    // Related products
    const relatedContainer = document.getElementById('relatedContainer');
    relatedContainer.innerHTML = '';
    product.related.forEach(i => {
        const rel = products[i];
        const div = document.createElement('div');
        div.className = 'related-product';
        div.innerHTML = `<img src='${rel.images[0]}' style='width:64px;height:64px;object-fit:contain;margin-right:8px;vertical-align:middle;'> <span>${rel.title}</span>`;
        div.style.cursor = 'pointer';
        div.onclick = () => {
            window.location.href = `item-details.html?id=${i}`;
        };
        relatedContainer.appendChild(div);
    });
}

document.addEventListener('DOMContentLoaded', function() {
    renderDetails();
    updateCartCount();
    updateCartDropdown();
});

document.getElementById('addToCartBtn').addEventListener('click', function() {
    cart = JSON.parse(localStorage.getItem('cart') || '[]');
    cart.push(products[getProductIndex()]);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    updateCartDropdown();
});
