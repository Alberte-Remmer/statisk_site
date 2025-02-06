// Henter værdien af "category" fra URL'en (fx ?category=shoes)
const myCategory = new URLSearchParams(window.location.search).get("category");

// Indsætter kategori-navnet direkte i en eksisterende <h1>
document.querySelector(".category_title").textContent = `${myCategory}`;

// Finder den HTML-container, hvor produkterne skal vises
const productContainer = document.querySelector(".product_list_container");

// Indsætter eventlistener på mine filtreringsknapper.
document.querySelectorAll("button").forEach((knap) => knap.addEventListener("click", showFiltered));

function showFiltered() {
  const filter = this.dataset.gender;
  if (filter == "All") {
    showProductList(allData);
  } else {
    fraction = allData.filter((product) => product.gender === filter);
    showProductList(fraction);
  }
}

let allData;

fetch(`https://kea-alt-del.dk/t7/api/products?category=${myCategory}`)
  .then((response) => response.json())
  .then((json) => {
    allData = json;
    showProductList(allData);
  });

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
          <img class="${product.soldout && "soldout-img"}" src="https://kea-alt-del.dk/t7/images/webp/640/${product.id}.webp" alt="${product.productdisplayname}">
          <h2>${product.productdisplayname}</h2>
          <p class="grey">${product.articletype} | ${product.brandname}</p>

           <div class="price">
           <p class="${product.discount && "strik"}">${product.price} kr.</p>
            <p class="tilbud ${product.discount && "isOnSale"}"> Now ${Math.floor(product.price - (product.price * product.discount) / 100)}kr.</p>
        </div>
          <a class="read_more" href="product.html?id=${product.id}">Read more</a>
        <div class="discount ${product.discount && "isOnSale"}">
        <p>${product.discount}%</p>
        </div>
        <div class="soldout ${product.soldout && "isSoldOut"}">
        <p>Sold out</p>
        </div>
        </div>`
    )
    .join(""); // Samler alle produkterne til én lang HTML-streng

  // Indsætter produkterne i HTML-containeren
  productContainer.innerHTML = markup;
}
