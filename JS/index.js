document.addEventListener("DOMContentLoaded", () => {
    // Beispiel-API-URL
    const apiUrl = "https://fakestoreapi.com/products";

    // Produktdaten abrufen
    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error("Fehler beim Abrufen der Produktdaten");
            }
            return response.json();
        })
        .then(products => {
            // Container für die Produktkarten
            const productList = document.getElementById("product-list");

            // Produktkarten dynamisch erstellen
            products.forEach(product => {
                const productCard = document.createElement("div");
                productCard.className = "product-card";

                productCard.innerHTML = `
                    <h2 class="product-title">${product.title}</h2>
                    <img src="${product.image}" alt="${product.title}" class="product-image">
                    <p class="product-description">${product.description.substring(0, 100)}...</p>
                    <p class="product-price"><strong>Preis:</strong> ${product.price} €</p>
                    <a href="produkte.html?id=${product.id}" class="product-link">Zur Produktseite</a>
                `;

                productList.appendChild(productCard);
            });
        })
        .catch(error => {
            console.error("Fehler:", error);
            const productList = document.getElementById("product-list");
            productList.innerHTML = "<p>Produkte konnten nicht geladen werden.</p>";
        });
});