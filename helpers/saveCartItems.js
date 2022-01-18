const saveCartItems = (listaItens) => {
    localStorage.setItem('cartItems', listaItens);
};

if (typeof module !== 'undefined') {
  module.exports = saveCartItems;
}
