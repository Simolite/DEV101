export let cart = [{
  productId:"e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
  quantity:5
},{
  productId:"15b6fc6f-327a-4ec4-896f-486349e85a3d",
  quantity:9  
},{
  productId:"77919bbe-0e56-475b-adde-4f24dfed3a04",
  quantity:9  
},{
  productId:"8c9c52b5-5a19-4bcb-a5d1-158a74287c53",
  quantity:9  
},{
  productId:"3ebe75dc-64d2-4137-8860-1f5a963e534b",
  quantity:9  
}];
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
export function remove_from_cart (productId){
  let newCart = [];
  cart.forEach((cartItem)=>{
    if (cartItem.productId !== productId){
      newCart.push(cartItem);
    }
  });
  cart = newCart;
};
let multiplayer = 1;