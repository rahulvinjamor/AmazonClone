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
products.forEach(product => {
    const div = document.createElement('div');
    div.className = 'product';
    div.innerHTML = `
        <img src="${product.image}" alt="${product.title}">
        <div class="title">${product.title}</div>
        <div class="rating">
            ${'★'.repeat(Math.floor(product.rating))}${product.rating % 1 ? '½' : ''}
            <span style=\"color:#555; font-size:0.9em;\">(${product.rating})</span>
        </div>
        ${product.prime ? '<div class="prime"><i class="fa fa-crown"></i> Prime</div>' : ''}
        <div class="price">${product.price}</div>
        <button>Add to Cart</button>
    `;
    productsContainer.appendChild(div);
});
