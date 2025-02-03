const productContainer = document.querySelector(".product_list_container");

fetch("https://kea-alt-del.dk/t7/api/products/")
  .then((response) => response.json())
  .then(showProductList);

function showProductList(data) {
  const markup = data
    .map(
      (product) =>
        `<div class="card">
          <img src="https://kea-alt-del.dk/t7/images/webp/640/${product.id}.webp" alt="${product.productdisplayname}">
          <h2>${product.productdisplayname}</h2>
          <p class="grey">${product.articletype} | ${product.brandname}</p>
          <p> DKK ${product.price} ,-</p>
          <a class="read_more" href="product.html?id=${product.id}">Read more</a>
        </div>`
    )
    .join("");

  productContainer.innerHTML = markup;
}
