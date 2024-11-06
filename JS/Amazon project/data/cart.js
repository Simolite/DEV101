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
          matchProdId.quantity ++;
        }else{
          cart.push({productId:productId,quantity:1});
        };
        cart_quan_calculator();
      });
    });      
};
function cart_quan_calculator(){
    let totalQ = 0;
    cart.forEach((cartItem) => totalQ += cartItem.quantity)
    document.querySelector('.cart-quantity').innerHTML=totalQ;
};
document.querySelector('.testing_button').addEventListener('click',() => {alert(200)});