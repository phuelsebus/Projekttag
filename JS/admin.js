document.addEventListener("DOMContentLoaded", () => {
    const apiUrl = "https://fakestoreapi.com/products";

    // Produkte abrufen und anzeigen
    function fetchProducts() {
        fetch(apiUrl)
            .then(response => response.json())
            .then(products => {
                const productList = document.getElementById("product-list");
                productList.innerHTML = ""; // Liste leeren

                products.forEach(product => {
                    const productItem = document.createElement("div");
                    productItem.className = "product-item";
                    productItem.innerHTML = `
                        <h3>${product.title}</h3>
                        <p><strong>Preis:</strong> ${product.price} €</p>
                        <p>${product.description}</p>
                        <button class="edit-button" data-id="${product.id}">Bearbeiten</button>
                        <button class="delete-button" data-id="${product.id}">Löschen</button>
                    `;
                    productList.appendChild(productItem);
                });

                // Event-Listener für Bearbeiten und Löschen
                document.querySelectorAll(".edit-button").forEach(button => {
                    button.addEventListener("click", () => editProduct(button.dataset.id));
                });
                document.querySelectorAll(".delete-button").forEach(button => {
                    button.addEventListener("click", () => deleteProduct(button.dataset.id));
                });
            })
            .catch(error => console.error("Fehler beim Abrufen der Produkte:", error));
    }

    // Produkt hinzufügen
    document.getElementById("product-form").addEventListener("submit", event => {
        event.preventDefault();

        const newProduct = {
            title: document.getElementById("title").value,
            price: parseFloat(document.getElementById("price").value),
            description: document.getElementById("description").value,
            image: document.getElementById("image").value,
            category: "default" // Kategorie kann angepasst werden
        };

        fetch(apiUrl, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newProduct)
        })
            .then(response => response.json())
            .then(product => {
                console.log("Produkt hinzugefügt:", product);
                fetchProducts(); // Liste aktualisieren
            })
            .catch(error => console.error("Fehler beim Hinzufügen des Produkts:", error));
    });

    // Produkt bearbeiten
    function editProduct(productId) {
        const newTitle = prompt("Neuer Titel:");
        const newPrice = prompt("Neuer Preis:");
        const newDescription = prompt("Neue Beschreibung:");

        if (newTitle && newPrice && newDescription) {
            fetch(`${apiUrl}/${productId}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    title: newTitle,
                    price: parseFloat(newPrice),
                    description: newDescription,
                    image: "https://via.placeholder.com/150", // Beispielbild
                    category: "default"
                })
            })
                .then(response => response.json())
                .then(product => {
                    console.log("Produkt aktualisiert:", product);
                    fetchProducts(); // Liste aktualisieren
                })
                .catch(error => console.error("Fehler beim Bearbeiten des Produkts:", error));
        }
    }

    // Produkt löschen
    function deleteProduct(productId) {
        if (confirm("Möchten Sie dieses Produkt wirklich löschen?")) {
            fetch(`${apiUrl}/${productId}`, {
                method: "DELETE"
            })
                .then(response => {
                    if (response.ok) {
                        console.log("Produkt gelöscht:", productId);
                        fetchProducts(); // Liste aktualisieren
                    } else {
                        throw new Error("Fehler beim Löschen des Produkts");
                    }
                })
                .catch(error => console.error(error));
        }
    }

    // Initiale Produktliste abrufen
    fetchProducts();
});