// Henter værdien af "category" fra URL'en (fx ?category=shoes)
const myCategory = new URLSearchParams(window.location.search).get("category");

// Indsætter kategori-navnet direkte i en eksisterende <h1>
document.querySelector(".category_title").textContent = `${myCategory}`;

// Finder den HTML-container, hvor produkterne skal vises
const productContainer = document.querySelector(".product_list_container");

// Henter data fra API'et og filtrerer efter den valgte kategori
fetch(`https://kea-alt-del.dk/t7/api/products?category=${myCategory}`)
  .then((response) => response.json()) // Konverterer svaret til JSON
  .then(showProductList); // Sender data videre til showProductList-funktionen

// Funktion der viser produkterne på hjemmesiden
function showProductList(data) {
  // Går gennem alle produkter og laver HTML til dem
  let markup = data
    .map(
      (product) =>
        `
      <div class="card">
          <img src="https://kea-alt-del.dk/t7/images/webp/640/${product.id}.webp" alt="${product.productdisplayname}">
          <h2>${product.productdisplayname}</h2>
          <p class="grey">${product.articletype} | ${product.brandname}</p>
          <p class="price">DKK ${product.price} ,-</p> <!-- Oprindelig pris -->
          <a class="read_more" href="product.html?id=${product.id}">Read more</a>
        </div>`
    )
    .join(""); // Samler alle produkterne til én lang HTML-streng

  // Indsætter produkterne i HTML-containeren
  productContainer.innerHTML = markup;

  // ------------------ NY KODE (PLACERET NEDERST) ------------------

  // Gennemgår produkterne igen og opdaterer dem med rabat & lagerstatus
  data.forEach((product, index) => {
    const productCard = document.querySelectorAll(".card")[index]; // Henter det tilsvarende produktkort
    const priceElement = productCard.querySelector(".price"); // Finder pris-elementet

    // Beregning af rabat
    if (product.discount && product.discount > 0) {
      let discountAmount = (product.price * product.discount) / 100;
      let newPrice = product.price - discountAmount;
      let discountTag = `<div class="discount">${product.discount}%</div>`;

      // Opdaterer prisen med rabatvisning, hvor den nye pris er nedenunder den gamle
      priceElement.innerHTML = `
        <div class="price-container">
          <p class="old_price strik">DKK ${product.price} ,-</p>
          <p class="new_price">DKK ${newPrice.toFixed(2)} ,-</p>
        </div>
      `;

      productCard.insertAdjacentHTML("afterbegin", discountTag); // Tilføjer rabatmærkat
    }

    // Lagerstatus
    if (product.soldout) {
      let stockStatus = `<div class="soldout">Sold Out</div>`;
      productCard.insertAdjacentHTML("beforeend", stockStatus); // Tilføjer "Sold Out"-tekst
      productCard.querySelector("img").style.filter = "grayscale(100%)"; // Gør billedet gråt
    }
  });
}
