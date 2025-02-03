let productId = new URLSearchParams(window.location.search).get("id");
let productContainer = document.querySelector(".product_container");

fetch(`https://kea-alt-del.dk/t7/api/products/${productId}`)
  .then((response) => response.json())
  .then((data) => showProduct(data)); //heroppe kalder jeg funktionen.
function showProduct(data) {
  // jeg laver en funktion, hvor der kommer data ind i. showProduct().
  productContainer.innerHTML = ` <div class="product_image">
                <img src="https://kea-alt-del.dk/t7/images/webp/640/${productId}.webp" alt="tshirt" id="productImage">
            </div>
            <div class="product_info">
                <h1>Product Information</h1>
                <h3>Model name</h3> 
                <p class="indryk">${data.productdisplayname}</p>
                 <h3>Inventory number</h3>
                <p class="indryk">${data.id}</p>
                <h3>Brand</h3>
                <p class="indryk">${data.brandname}</p>
                <h3>Stock quantity</h3>
                <p class="lagerstatus">${data.soldout}</p>
                <h3>Price</h3>
                <p class="indryk" id="productPrice"> DKK ${data.price} ,-</p>
            </div>

            <div class="product_purchase">
                <h1>${data.productdisplayname}</h1>
                <p>
                ${data.articletype}</p>
                <p>DKK ${data.price} ,-</p>
        
                <form action="#">
                    <label for="size">
                        Select Your Size
                    </label>
                    <select name="size" id="size">
                        <option value="S">S</option>
                        <option value="M">M</option>
                        <option value="L">L</option>
                    </select>
                </form>
                <div class="btn">
                    <h3>Add to basket</h3>
                </div>
            </div>`;

  //Rabat
  // Finder .product_info-container
  let productInfo = document.querySelector(".product_info");

  // Tjekker om der er rabat (discount > 0)
  if (data.discount && data.discount > 0) {
    let discountVis = document.createElement("div"); // Laver en ny <div>
    discountVis.classList.add("discount_produkt"); // Tilføjer CSS-styling
    discountVis.textContent = `${data.discount}%`; // Sætter rabat-tekst
    productInfo.appendChild(discountVis); // 📌 Tilføjer knappen til .product_info
  }

  //Lagerstatus
  // Finder <p class="lagerstatus"> (lagerstatus)
  let lagerStatus = document.querySelector(".lagerstatus");

  // Tjekker om varen er udsolgt eller på lager
  if (data.soldout == 1) {
    lagerStatus.textContent = "Sold Out"; // Skifter tekst til "Sold Out"
    lagerStatus.style.color = "red"; // Skifter tekstfarve til rød 🔴
    productImage.style.filter = "grayscale(100%)"; // Gråskala filter for udsolgt billede
  } else {
    lagerStatus.textContent = "In Stock"; // Skifter tekst til "In Stock"
    lagerStatus.style.color = "green"; // Skifter tekstfarve til grøn 🟢
    productImage.style.filter = "none"; // Ingen filter for billede, hvis på lager
  }

  //Ny pris + streg (svær at forstå)
  // Beregner rabat og den nye pris nederst
  let newPrice = data.price;
  let discountText = "";

  if (data.discount && data.discount > 0) {
    let discountAmount = (data.price * data.discount) / 100;
    newPrice = data.price - discountAmount;
    discountText = `<p class="indryk"><strong></strong> DKK ${newPrice.toFixed(2)} ,-</p>`;

    // Gør den oprindelige pris gennemstreget og grå
    let priceElement = document.getElementById("productPrice"); // Find den rigtige pris baseret på ID
    priceElement.innerHTML = `DKK <span class="strik"> ${data.price} ,-</span>`;
  }

  // Vis rabatteret pris nederst
  let priceElement = document.getElementById("productPrice"); // Find den rigtige pris baseret på ID
  if (discountText) {
    priceElement.insertAdjacentHTML("afterend", discountText); // Sætter rabatprisen lige efter den oprindelige pris
  }
}
