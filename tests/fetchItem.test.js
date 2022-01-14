require('../mocks/fetchSimulator');
const { fetchItem } = require('../helpers/fetchItem');
const item = require('../mocks/item');

describe('2 - Teste a função fecthItem', () => {
  it('Teste se fetchItem é uma função', () => {

    expect.assertions(1);
    expect(typeof fetchItem).toBe('function')
  });

  it('Execute a função fetchItem com o argumento do item "MLB1615760527" e teste se fetch foi chamada', async () => {

    expect.assertions(1);
    await fetchItem('MLB1615760527')
    expect(fetch).toHaveBeenCalled()
  });

  it('Teste se, ao chamar a função fetchItem com o argumento do item "MLB1615760527", a função fetch utiliza o endpoint "https://api.mercadolibre.com/items/MLB1615760527"', async ()=> {

    expect.assertions(1);
    const url = 'https://api.mercadolibre.com/items/MLB1615760527';
    await fetchItem('MLB1615760527');
    expect(fetch).toHaveBeenCalledWith(url);
  });

  it('Teste se o retorno da função fetchItem com o argumento do item "MLB1615760527" é uma estrutura de dados igual ao objeto item', async () => {
    expect.assertions(1);
    const result = await fetchItem('MLB1615760527');
    expect(result).toEqual(item);
  });

  it('Teste se, ao chamar a função fetchItem sem argumento, retorna um erro com a mensagem: You must provide an url.', async () => {
    const testeErro = await fetchItem();
    expect(testeErro).toStrictEqual(new Error('You must provide an url'))
  });
});
