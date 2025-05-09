document.addEventListener("DOMContentLoaded", () => {
    // Produkt-ID aus der URL abrufen
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get("id");

    if (!productId) {
        document.querySelector(".product-detail").innerHTML = "<p>Produkt-ID fehlt!</p>";
        return;
    }

    // API-URL mit der Produkt-ID
    const apiUrl = `https://fakestoreapi.com/products/${productId}`;

    // Produktdetails abrufen
    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error("Fehler beim Abrufen der Produktdetails");
            }
            return response.json();
        })
        .then(product => {
            // Produktdetails in den vorhandenen Container einfügen
            const productDetail = document.querySelector(".product-detail");
            productDetail.innerHTML = `
                <h1>${product.title}</h1>
                <img src="${product.image}" alt="${product.title}" style="max-width: 100%; height: auto; border-radius: 10px;">
                <p><strong>Preis:</strong> ${product.price} €</p>
                <p><strong>Beschreibung:</strong> ${product.description}</p>
                <p><strong>Lagerbestand:</strong> ${product.rating.count} Stück verfügbar</p>
                <a href="index.html" class="back-button">Zurück zur Startseite</a>
            `;
        })
        .catch(error => {
            console.error("Fehler:", error);
            document.querySelector(".product-detail").innerHTML = "<p>Produkt konnte nicht geladen werden.</p>";
        });
});