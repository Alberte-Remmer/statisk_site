let productId = 1163;
let productContainer = document.querySelector(".product_container");

fetch(`https://kea-alt-del.dk/t7/api/products/${productId}`)
  .then((response) => response.json())
  .then((data) => {
    productContainer.innerHTML = ` <div class="product_image">
                <img src="https://kea-alt-del.dk/t7/images/webp/640/${productId}.webp" alt="tshirt">
            </div>
            <div class="product_info">
                <h1>Product Information</h1>
                <h3>Model name</h3> 
                <p class="indryk">${data.productdisplayname}</p>
                <h3>Articletype</h3>
                <p class="indryk">${data.articletype}</p>
                <h3>Inventory number</h3>
                <p class="indryk">${data.id}</p>
                <h3>In stock</h3>
                <p class="lagerstatus">${data.soldout}</p>
                <h3>Price</h3>
                <p class="indryk"> DKK${data.price},-</p>
                <div class="discount_produkt">${data.discount}</div>
            </div>
            <div class="product_purchase">
                <h1>${data.productdisplayname}</h1>
                <p>${data.brandname}</p>
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
  });
