import { remove_from_cart } from "../data/cart.js";
import { products } from "../data/products.js";
import { centsToDollars } from "../scripts/utils/money.js";
let cart = JSON.parse(localStorage.getItem('localCart'))|| [{prodectId:'default',quantity:0}];
function SummaryHTMLLoader(){
  document.querySelector('.checkout_number').innerHTML= cart.length-1
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
};
function delete_loader(){
  cart.forEach((item)=>{
    if (!item.productId){return}else{
      document.getElementById(`p${item.productId}`).addEventListener('click',() =>{       
        remove_from_cart (item.productId);        
        SummaryHTMLLoader();                       
      })
    };
  })
};
document.querySelector('.place-order-button').addEventListener('click',()=>{console.log(200);});
SummaryHTMLLoader();