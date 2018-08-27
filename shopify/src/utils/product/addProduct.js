import messageHelper from '../../utils/messageHelper';
export default product => {
  let currentProduct = product;
  console.log('addwam ' + JSON.stringify(currentProduct));
  if (localStorage.getItem('cart') === null) {
    localStorage.setItem('cart', JSON.stringify([]));
  }
  let cart = JSON.parse(localStorage.getItem('cart'));
  let index = cart.findIndex(p => p.product._id === currentProduct._id);
  if (index >= 0) {
    cart[index].count++;
    localStorage.setItem('cart', JSON.stringify(cart));
  } else {
    let obj = { product: currentProduct, count: 1 };
    cart.push(obj);
    localStorage.setItem('cart', JSON.stringify(cart));
  }
  messageHelper.push('success', `Successfully add ${currentProduct.title} to your cart`);
};
