export let cart = JSON.parse(localStorage.getItem('localCart'))|| [{prodectId:'default',quantity:0}];
export function addToCart(){
  document.querySelectorAll('.js-add-to-cart').forEach((button) => {
    button.addEventListener('click' , () => {
      let productId = button.dataset.productId;
      let matchProdId;
      cart.forEach((cartItem) => {
        if(productId === cartItem.productId){
          matchProdId = cartItem;
        };
      });
      if(matchProdId){
        matchProdId.quantity = matchProdId.quantity + Number(multiplayer);
        localStorage.setItem('localCart',JSON.stringify(cart));
      }else{
        cart.push({productId:productId,quantity:Number(multiplayer)});
        localStorage.setItem('localCart',JSON.stringify(cart));
      };      
      cart_quan_calculator();
      document.querySelector(`#p${productId}`).value = 1;
      multiplayer = 1;    
    });
    multiplayer_calculator (); 
  });
  cart_quan_calculator();
};
export function multiplayer_calculator(){
  document.querySelectorAll('.quantity_selector').forEach((qbutton) => {
    qbutton.addEventListener('click' ,() => {
      let productqId = qbutton.dataset.productqId;
      multiplayer = document.querySelector(`#p${productqId}`).value;         
    })
  })
  return multiplayer;
};
export function remove_from_cart (productId){
  let newCart = [];
  cart.forEach((cartItem)=>{
    if (cartItem.productId !== productId){
      newCart.push(cartItem);
    }
  });
  cart = newCart;
  localStorage.setItem('localCart',JSON.stringify(cart));
};
function cart_quan_calculator(){
  let totalQ = 0;
  cart.forEach((cartItem) => totalQ += cartItem.quantity)
  document.querySelector('.cart-quantity').innerHTML=totalQ;
};
let multiplayer = 1;