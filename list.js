const productContainer = document.querySelector(".product_list_container");

fetch(`https://kea-alt-del.dk/t7/api/products/`)
  .then((response) => response.json())
  .then((data) => showList(data));

function showList(products) {
  let markup = "";

  //Ting jeg har fået chatten til at hjælpe mig med.
  products.forEach((product) => {
    // Beregning af rabat
    let newPrice = product.price; // Start med den oprindelige pris
    let discountTag = "";
    let priceMarkup = `<p>DKK ${product.price} ,-</p>`; // Normal pris

    if (product.discount && product.discount > 0) {
      // Beregner rabatten og den nye pris
      let discountAmount = (product.price * product.discount) / 100;
      newPrice = product.price - discountAmount;
      discountTag = `<div class="discount">${product.discount}%</div>`;
      priceMarkup = `
        <div class="price-container">
          <p class="old_price">DKK <span class="strik">${product.price} ,-</span></p>
          <p class="new_price">DKK ${newPrice.toFixed(2)} ,-</p>
        </div>
      `; // Visning af både gammel og ny pris
    }

    // Lagerstatus
    let stockStatus = "";
    let imageStyle = "";
    if (product.soldout) {
      stockStatus = `<div class="soldout">Sold Out</div>`;
      imageStyle = 'style="filter: grayscale(100%)"'; // Gråskala på billede for udsolgte varer
    }

    //Det her er det gamle som skal være der.

    markup += `<div class="card">
                ${discountTag}
                <img src="https://kea-alt-del.dk/t7/images/webp/640/${product.id}.webp" alt="${product.productdisplayname}" ${imageStyle}>
                <h2>${product.productdisplayname}</h2>
                <p class="grey">${product.articletype} | ${product.brandname}</p>
                ${priceMarkup}  <!-- Pris vises her, med rabat hvis der er rabat -->
                <a class="read_more" href="product.html?id=${product.id}">Read more</a>
                ${stockStatus}
              </div>`;
  });

  productContainer.innerHTML = markup;
}
