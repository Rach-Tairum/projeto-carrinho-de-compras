const getSavedCartItems = () => {
  const carrinho = localStorage.getItem('cartItems');
  return carrinho;
};

if (typeof module !== 'undefined') {
  module.exports = getSavedCartItems;
}
