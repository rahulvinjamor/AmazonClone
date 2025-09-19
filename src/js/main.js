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
        <button>Add to Cart</button>
    `;
    div.style.cursor = 'pointer';
    div.addEventListener('click', function(e) {
        // Prevent button click from triggering navigation
        if (e.target.tagName.toLowerCase() === 'button') return;
        window.location.href = `item-details.html?id=${idx}`;
    });
    productsContainer.appendChild(div);
});
