// Sample product data (should match main.js)
const products = [
    {
        title: "Echo Dot (4th Gen)",
        price: "$29.99",
        image: "https://picsum.photos/200?random=11",
        rating: 4.5,
        prime: true,
        description: "Smart speaker with Alexa. Stream music, control smart home, and more."
    },
    {
        title: "Fire TV Stick 4K",
        price: "$24.99",
        image: "https://picsum.photos/200?random=12",
        rating: 4.7,
        prime: true,
        description: "Stream in 4K Ultra HD. Access Netflix, Prime Video, Disney+, and more."
    },
    {
        title: "Kindle Paperwhite",
        price: "$99.99",
        image: "https://picsum.photos/200?random=13",
        rating: 4.8,
        prime: true,
        description: "Waterproof e-reader with a 6.8” display and adjustable warm light."
    },
    {
        title: "AmazonBasics Backpack",
        price: "$19.99",
        image: "https://picsum.photos/200?random=14",
        rating: 4.2,
        prime: false,
        description: "Lightweight backpack for work, travel, or school. Durable and spacious."
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
    document.getElementById('detailsImage').src = product.image;
    document.getElementById('detailsTitle').textContent = product.title;
    document.getElementById('detailsRating').innerHTML = `${'★'.repeat(Math.floor(product.rating))}${product.rating % 1 ? '½' : ''} <span style='color:#555; font-size:0.9em;'>(${product.rating})</span>`;
    document.getElementById('detailsPrime').innerHTML = product.prime ? '<i class="fa fa-crown"></i> Prime' : '';
    document.getElementById('detailsPrice').textContent = product.price;
    document.getElementById('detailsDescription').textContent = product.description;
}

document.addEventListener('DOMContentLoaded', renderDetails);

document.getElementById('addToCartBtn').addEventListener('click', function() {
    alert('Added to cart!');
});
