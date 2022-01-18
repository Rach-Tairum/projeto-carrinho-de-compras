const getSavedCartItems = () => {
  const lista = localStorage.getItem('cartItems');
  return lista;
};

if (typeof module !== 'undefined') {
  module.exports = getSavedCartItems;
}
