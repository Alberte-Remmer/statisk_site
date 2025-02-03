// Starter scriptet og tjekker, at det er indlæst korrekt
console.log("index script loaded");

// Finder den HTML-container, hvor kategorierne skal vises
const categoryContainer = document.querySelector(".category_list_container");

// Henter kategorier fra API'et
fetch(`https://kea-alt-del.dk/t7/api/categories`)
  .then((response) => response.json()) // Konverterer svaret til JSON-format
  .then(showCategories); // Sender data videre til showCategories-funktionen

// Funktion der viser kategorierne på hjemmesiden
function showCategories(categories) {
  // Logger de hentede data i konsollen (til fejlfinding)
  console.log("mine data er:", categories);

  // Går igennem alle kategorier og laver HTML-links til dem
  const markup = categories
    .map(
      (category) =>
        `
         <div class="category">
           <a href="productlist.html?category=${category.category}">${category.category}</a>
         </div>
        `
    )
    .join(""); // Samler alle kategorierne til én lang HTML-streng

  // Indsætter kategorierne i HTML-containeren
  categoryContainer.innerHTML = markup;
}
