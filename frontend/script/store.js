document.addEventListener("DOMContentLoaded", function () {
    function fetchProducts() {
        const searchQuery = document.getElementById("search").value.trim(); // Trim any leading/trailing whitespace
        let apiUrl;
        if (searchQuery) {
            apiUrl = `http://localhost:8000/api/products/search?query=${encodeURIComponent(
                searchQuery
            )}`;
        } else {
            apiUrl = "http://localhost:8000/api/products";
        }
        fetch(apiUrl)
            .then((response) => response.json())
            .then((products) => {
                const productContainer = document.querySelector(".product-list");
                productContainer.innerHTML = ""; // Clear the previous products

                if (products.length === 0) {
                    // If no products found, display a message
                    const noProductsMessage = document.createElement("p");
                    noProductsMessage.textContent = "No products found.";
                    productContainer.appendChild(noProductsMessage);
                } else {
                    // If products found, create product cards
                    products.forEach((product) => {
                        const productCard = createProductCard(product);
                        productContainer.appendChild(productCard);
                    });
                }
            })
            .catch((error) => console.error("Error fetching products:", error));
    }

    function createProductCard(product) {
        const productCard = document.createElement("div");
        productCard.classList.add("product-card");

        const imageContainer = document.createElement("div");
        imageContainer.classList.add("image-container");

        imageContainer.style.backgroundImage = `url(${product.image})`;

        const productInfo = document.createElement("div");
        productInfo.classList.add("product-info");

        const productName = document.createElement("h3");
        productName.textContent = product.name;

        const productDescription = document.createElement("p");
        productDescription.textContent = product.description;
        productDescription.classList.add("product-description");
        productDescription.style.display = "none";

        const productCategory = document.createElement("p");
        productCategory.textContent = product.category_id;

        const productPrice = document.createElement("h3");
        productPrice.textContent = product.price;

        const addToFavoritesButton = document.createElement("button");
        addToFavoritesButton.textContent = "Add to Favorites";
        addToFavoritesButton.classList.add("add-to-favorites");
        addToFavoritesButton.addEventListener("click", () => {
            addToFavorites(product);
        });

        const addToCartButton = document.createElement("button");
        addToCartButton.textContent = "Add to Cart";
        addToCartButton.classList.add("add-to-cart");

        productInfo.appendChild(productName);
        productInfo.appendChild(productDescription);
        productInfo.appendChild(productCategory);
        productInfo.appendChild(productPrice);
        productInfo.appendChild(addToFavoritesButton);
        productInfo.appendChild(addToCartButton);

        productCard.appendChild(imageContainer);
        productCard.appendChild(productInfo);

        // Add event listeners to show and hide the product description on hover
        imageContainer.addEventListener("mouseover", () => {
            productDescription.style.display = "block";
        });

        imageContainer.addEventListener("mouseout", () => {
            productDescription.style.display = "none";
        });

        return productCard;
    }

    function addToFavorites(product) {
        const existingFavorites = JSON.parse(localStorage.getItem("favorites")) || [];

        const isProductInFavorites = existingFavorites.some((item) => item.id === product.id);

        if (!isProductInFavorites) {
            const token = localStorage.getItem("jwt_token");

            if (token) {
                const productId = product.id;

                fetch("http://localhost:8000/api/favorites/add", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify({
                        product_id: productId,
                    }),
                })
                    .then((response) => response.json())
                    .then((data) => {
                        console.log(data.message);
                        existingFavorites.push(product);
                        localStorage.setItem("favorites", JSON.stringify(existingFavorites));
                    })
                    .catch((error) => console.error("Error adding product to favorites:", error));
            } else {
                console.log("User not authenticated. Please log in first.");
            }
        } else {
            console.log("Product is already in favorites.");
        }
    }

    fetchProducts();
    document.getElementById("button-search").addEventListener("click", fetchProducts);
});