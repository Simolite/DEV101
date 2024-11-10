import { remove_from_cart } from "../data/cart.js";
import { products } from "../data/products.js";
import { centsToDollars } from "../scripts/utils/money.js";
let cart = JSON.parse(localStorage.getItem('localCart'))|| [{prodectId:'default',quantity:0}];
function orderHTMLLoader(){
  cart = JSON.parse(localStorage.getItem('localCart'))|| [{prodectId:'default',quantity:0}];
    document.querySelector('.order-summary').innerHTML = "";
    cart.forEach((cartItem) => {
        let matchingProduct; 
        products.forEach((product)=>{
            if(product.id === cartItem.productId){
                matchingProduct = product;                           
            };            
        });
        if (!matchingProduct){return};
        document.querySelector('.order-summary').innerHTML +=`
        <div class="cart-item-container">
          <div class="delivery-date">
            Delivery date: Tuesday, June 21
          </div>
    
          <div class="cart-item-details-grid">
            <img class="product-image"
              src="${matchingProduct.image}">
    
            <div class="cart-item-details">
              <div class="product-name">
                ${matchingProduct.name}
              </div>
              <div class="product-price">
                ${centsToDollars(matchingProduct.priceCents)}
              </div>
              <div class="product-quantity">
                <span>
                  Quantity: <span class="quantity-label">${cartItem.quantity}</span>
                </span>
                <span class="update-quantity-link link-primary">
                  Update
                </span>
                <span class="link-primary delete-item-js" id="p${matchingProduct.id}" data-product-id="${matchingProduct.id}">
                  Delete
                </span>
              </div>
            </div>
    
            <div class="delivery-options">
              <div class="delivery-options-title">
                Choose a delivery option:
              </div>
              <div class="delivery-option">
                <input type="radio" checked
                  class="delivery-option-input"
                  name="D-O${matchingProduct.id}">
                <div>
                  <div class="delivery-option-date">
                    Tuesday, June 21
                  </div>
                  <div class="delivery-option-price">
                    FREE Shipping
                  </div>
                </div>
              </div>
              <div class="delivery-option">
                <input type="radio"
                  class="delivery-option-input"
                  name="D-O${matchingProduct.id}">
                <div>
                  <div class="delivery-option-date">
                    Wednesday, June 15
                  </div>
                  <div class="delivery-option-price">
                    $4.99 - Shipping
                  </div>
                </div>
              </div>
              <div class="delivery-option">
                <input type="radio"
                  class="delivery-option-input"
                  name="D-O${matchingProduct.id}">
                <div>
                  <div class="delivery-option-date">
                    Monday, June 13
                  </div>
                  <div class="delivery-option-price">
                    $9.99 - Shipping
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        `;       
    });
    delete_loader();
  document.querySelectorAll('.checkout_number').forEach((num)=>{num.innerHTML = cart.length-1;});
  paymentHTMLLoader();  
};
function delete_loader(){
  cart.forEach((item)=>{
    if (!item.productId){return}else{
      document.getElementById(`p${item.productId}`).addEventListener('click',() =>{       
        remove_from_cart (item.productId);        
        orderHTMLLoader();                       
      })
    };
  })
};
document.querySelector('.place-order-button').addEventListener('click',()=>{console.log(200);});
function paymentHTMLLoader(){
  let items_total = 0;
  let shipping_total = 0;
  let total_bt = 0;
  let est_tax = 0;
  let grand_total = 0;
  cart.forEach((cartItem) =>{
    let matchingProduct;
    products.forEach((product)=>{
      if(product.id === cartItem.productId){
          matchingProduct = product;                           
      };            
    });
    if(!matchingProduct){return};
    items_total+=matchingProduct.priceCents*cartItem.quantity;
    total_bt = items_total+shipping_total;
    est_tax = total_bt/10;
    grand_total = total_bt+est_tax;
  });
  document.querySelector('.items_total').innerHTML = `${centsToDollars(items_total)}`;
  document.querySelector('.shipping_total').innerHTML = `${centsToDollars(shipping_total)}`;
  document.querySelector('.total_bt').innerHTML = `${centsToDollars(total_bt)}`;
  document.querySelector('.est_tax').innerHTML = `${centsToDollars(est_tax)}`;
  document.querySelector('.grand_total').innerHTML = `${centsToDollars(grand_total)}`;
};
orderHTMLLoader();