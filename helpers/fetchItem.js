const fetchItem = async (identificador) => {
  const urlUtilizado = `https://api.mercadolibre.com/items/${identificador}`;
  try {
    const resposta = await fetch(urlUtilizado);
    const dadosProduto = await resposta.json();
    return dadosProduto;
  } catch (error) {
      return error;
  }
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchItem,
  };
}
