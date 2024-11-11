import { remove_from_cart } from "../data/cart.js";
import { products } from "../data/products.js";
import { centsToDollars } from "../scripts/utils/money.js";
import dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js";
let cart = JSON.parse(localStorage.getItem('localCart'))|| [{prodectId:'default',quantity:0}];
let deleveryOptions = JSON.parse(localStorage.getItem('delevery'))|| [{prodId : "default",option:Number(0)}];
function orderHTMLLoader(){
  let index =-1;
  cart = JSON.parse(localStorage.getItem('localCart'))|| [{prodectId:'default',quantity:0}];
    document.querySelector('.order-summary').innerHTML = "";
    cart.forEach((cartItem) => {
        index ++;
        let matchingProduct; 
        products.forEach((product)=>{
            if(product.id === cartItem.productId){
                matchingProduct = product;                           
            };            
        });
        if (!matchingProduct){return};
        let today = dayjs();
        let delevery_text1 = '';
        let delevery_text2 = '';
        let delevery_text3 = '';
        let delevery_date = '';        
        if(deleveryOptions[index].option === 1){delevery_text1 = 'checked';delevery_date=today.add(7,'days').format('dddd, MMMM D');}
        else if(deleveryOptions[index].option === 2){delevery_text2 = 'checked';delevery_date=today.add(3,'days').format('dddd, MMMM D');}
        else if (deleveryOptions[index].option === 3){delevery_text3 = 'checked';delevery_date=today.add(1,'days').format('dddd, MMMM D');};
        document.querySelector('.order-summary').innerHTML +=`
        <div class="cart-item-container">
          <div class="delivery-date">
            Delivery date: ${delevery_date}
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
                <input id="d1${matchingProduct.id}" type="radio" ${delevery_text1}
                  class="delivery-option-input"
                  name="D-O${matchingProduct.id}">
                <div>
                  <div class="delivery-option-date">
                  ${today.add(7,'days').format('dddd, MMMM D')}
                  </div>
                  <div class="delivery-option-price">
                    FREE Shipping
                  </div>
                </div>
              </div>
              <div class="delivery-option">
                <input id="d2${matchingProduct.id}" type="radio" ${delevery_text2}
                  class="delivery-option-input"
                  name="D-O${matchingProduct.id}">
                <div>
                  <div class="delivery-option-date">
                  ${today.add(3,'days').format('dddd, MMMM D')}
                  </div>
                  <div class="delivery-option-price">
                    $4.99 - Shipping
                  </div>
                </div>
              </div>
              <div class="delivery-option">
                <input id="d3${matchingProduct.id}" type="radio" ${delevery_text3}
                  class="delivery-option-input"
                  name="D-O${matchingProduct.id}">
                <div>
                  <div class="delivery-option-date">
                  ${today.add(1,'days').format('dddd, MMMM D')}
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
  delevery_calculator(); 
};
function delete_loader(){
  cart.forEach((item)=>{
    if (!item.productId){return}else{
      document.getElementById(`p${item.productId}`).addEventListener('click',() =>{               
        remove_from_cart (item.productId);  
        remove_from_delevery (item.productId);      
        orderHTMLLoader();                       
      })
    };
  })
};
function paymentHTMLLoader(){
  let items_total = 0;
  let shipping_total = 0;
  let total_bt = 0;
  let est_tax = 0;
  let grand_total = 0;
  let index = 0;
  cart.forEach((cartItem) =>{
    let matchingProduct;
    products.forEach((product)=>{
      if(product.id === cartItem.productId){
          matchingProduct = product;                           
      };            
    });
    if(!matchingProduct){return};
    index++;
    let dOption = deleveryOptions[index].option;
    if (dOption === 1){ shipping_total += 0}else if(dOption === 2){shipping_total += 499}else if (dOption === 3){ shipping_total += 999};
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
function delevery_calculator(){
  cart.forEach((item)=>{
    if (!item.productId){return}else{
      document.getElementById(`d1${item.productId}`).addEventListener('click',() =>{ 
        let prodId = item.productId;
        deleveryOptions.forEach((prod) =>{
          if(prod.prodId === prodId){prod.option=1};
        });
        localStorage.setItem('delevery',JSON.stringify(deleveryOptions));
        orderHTMLLoader();
      });
      document.getElementById(`d2${item.productId}`).addEventListener('click',() =>{ 
        let prodId = item.productId;
        deleveryOptions.forEach((prod) =>{
          if(prod.prodId === prodId){prod.option=2};
        });
        localStorage.setItem('delevery',JSON.stringify(deleveryOptions));
        orderHTMLLoader();
      });
      document.getElementById(`d3${item.productId}`).addEventListener('click',() =>{ 
        let prodId = item.productId;
        deleveryOptions.forEach((prod) =>{
          if(prod.prodId === prodId){prod.option=3};
        });
        localStorage.setItem('delevery',JSON.stringify(deleveryOptions));
        orderHTMLLoader();
      });  
    };
  })
};
function remove_from_delevery (productId){
  let newDelevry = [];
  deleveryOptions.forEach((deleveryItem)=>{
    if (deleveryItem.prodId !== productId){
      newDelevry.push(deleveryItem);      
    }
  });
  deleveryOptions = newDelevry;
  localStorage.setItem('delevery',JSON.stringify(deleveryOptions));
};
orderHTMLLoader();