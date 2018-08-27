export default (product) => {
  let cart = JSON.parse(localStorage.getItem('cart'));
  let index = cart.findIndex(p => p.product._id === product._id);
  if (index >= 0) {
    let count = cart[index].count;
    if (count > 1) {
      cart[index].count--;
      localStorage.setItem('cart', JSON.stringify(cart));
    } else if (count === 1) {
      cart.splice(index, 1);
      localStorage.setItem('cart', JSON.stringify(cart));
    }
  }
};
