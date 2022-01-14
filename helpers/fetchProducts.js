const fetchProducts = async (QUERY) => {
  const urlPronto = `https://api.mercadolibre.com/sites/MLB/search?q=${QUERY}`;

  try {
    const response = await fetch(urlPronto);
    const dadosDoProduto = await response.json();
    return dadosDoProduto;
  } catch (error) {
    return error;
  }
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}
