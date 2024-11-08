export let cart = [];
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
      }else{
        cart.push({productId:productId,quantity:Number(multiplayer)});
      };      
      cart_quan_calculator();
      document.querySelector(`#p${productId}`).value = 1;
      multiplayer = 1;     
    });
    multiplayer_calculator ();
  });
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
 function cart_quan_calculator(){
  let totalQ = 0;
  cart.forEach((cartItem) => totalQ += cartItem.quantity)
  document.querySelector('.cart-quantity').innerHTML=totalQ;
};
let multiplayer = 1;