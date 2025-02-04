let productId = new URLSearchParams(window.location.search).get("id");
let productContainer = document.querySelector(".product_container");

fetch(`https://kea-alt-del.dk/t7/api/products/${productId}`)
  .then((response) => response.json())
  .then((data) => showProduct(data)); //heroppe kalder jeg funktionen.
function showProduct(data) {
  // jeg laver en funktion, hvor der kommer data ind i. showProduct().
  productContainer.innerHTML = ` <div class="product_image">
                <img class="${data.soldout && "soldout-img"}" src="https://kea-alt-del.dk/t7/images/webp/640/${productId}.webp" alt="tshirt" id="productImage">
            </div>
            <div class="product_info ${data.discount && "produkt_discount"}${data.soldout && "lagerstatus"}">
                <h1>Product Information</h1>
                <h3>Model name</h3> 
                <p class="indryk">${data.productdisplayname}</p>
                 <h3>Inventory number</h3>
                <p class="indryk">${data.id}</p>
                <h3>Brand</h3>
                <p class="indryk">${data.brandname}</p>
                <h3>Stock quantity</h3>
               <p class="lagerstatus ${data.soldout ? "soldout2" : "in-stock"}">
  ${data.soldout ? "Out of Stock" : ""}
  ${!data.soldout ? "In Stock" : ""}
</p>
                 <div class="price">
                 <h3>Price</h3>
           <p class="${data.discount && "strik"}">${data.price} kr.</p>
            <p class="tilbud ${data.discount && "isOnSale"}"> Now ${Math.floor(data.price - (data.price * data.discount) / 100)}kr.</p>
            </div>
            <div class="discount_produkt ${data.discount && "isOnSale"}">
        <p>${data.discount}%</p>
        </div>
        </div>

            <div class="product_purchase">
                <h1>${data.productdisplayname}</h1>
                <p>
                ${data.articletype}</p>
                <div class="price">
           <p class="${data.discount && "strik"}">${data.price} kr.</p>
            <p class="tilbud ${data.discount && "isOnSale"}"> Now ${Math.floor(data.price - (data.price * data.discount) / 100)}kr.</p>
            </div>
        
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
}
