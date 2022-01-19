// Cria o carregando
/* referências:
 - https://desenvolvimentoparaweb.com/javascript/como-loading-de-javascript-funciona-domcontentloaded-e-onload/
 - https://www.horadecodar.com.br/2020/11/03/mostrar-gif-enquanto-uma-pagina-carrega-com-javascript/
*/
  function carregar() {
    const fadeContainer = document.querySelector('.loading');
  
  setTimeout(function () {
    const body = document.querySelector('.body');
    body.removeChild(fadeContainer);
    }, 2000);
}

// Criação dos produtos na tela, com botões de adicionar ao carrinho, imagens e descrições.
function createProductImageElement(imageSource) {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
}

function createCustomElement(element, className, innerText) {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  return e;
}

function createProductItemElement({ sku, name, image }) {
  const section = document.createElement('section');
  section.className = 'item';

  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  section.appendChild(createCustomElement('button', 'item__add', 'Adicionar ao carrinho!'));
  
  document.getElementsByClassName('items')[0].appendChild(section);

  return section;
}

async function produtos() {
  const objProdutos = await fetchProducts('computador');
  objProdutos.forEach((elemento) => {
    const { id, title, thumbnail } = elemento;
    const objFinal = { sku: id, name: title, image: thumbnail };
    createProductItemElement(objFinal);
  });
}
// --------------------------------------------------------------------------------

// Armazena os itens do Carrinho no Local Storage, está armazenando diretamente a lista
let lista = [];

function storageCart(objeto) {
  const item = JSON.stringify(objeto);
  saveCartItems(item);
}
// --------------------------------------------------------------------------

// Trabalha com o preço dos produtos para somar ou subtrair o preço total dos itens do carrinho.
const listaCompras = document.querySelector('.cart__items');
const div = document.querySelector('.total-price');

function criaDivPreco() {
  const precoAPagar = document.createElement('p');
  precoAPagar.innerText = '0';
  div.appendChild(precoAPagar);
}

function totalPrice() {
  div.innerHTML = '';

  let soma = 0;
  const itensNoCarrinho = document.querySelectorAll('.cart__item');
  itensNoCarrinho.forEach((element) => {
    const texto = element.innerText;
    const valor = texto.split('PRICE: $');
    soma += Number(valor[1]); // Number está definindo que valor[1] é do tipo number para que então o calculo seja feito
  });

  const precoAPagar = document.createElement('p');
  precoAPagar.innerText = `${soma}`;
  div.appendChild(precoAPagar);

  return soma;
}

// -------------------------------------------------------------------------------

// Evento que remove um item da lista e remove também do local Storage.

function cartItemClickListener(event) {
  const lista1 = document.querySelectorAll('.cart__items');

  lista1.forEach((elemento) => {
    // remove item da lista que vai pro local storage
      const texto = event.target.innerText;
      const valor = texto.split('PRICE: $');
      const titulo = texto.split('| NAME: ');
      const titulo1 = titulo[1].split(' |');
      const sku = titulo[0].split('SKU: ');
      const skuOk = sku[1].split(' ');
      const transformaTextoEmObj = { sku: skuOk[0], name: titulo1[0], salePrice: Number(valor[1]) };
      const resultadoFilter = lista.filter((element) => element.sku !== transformaTextoEmObj.sku);
      lista = resultadoFilter;
      storageCart(lista);

    // remove item
      elemento.removeChild(event.target);
    });
}
// ----------------------------------------------------------------------------------

// Trabalha com o carrinho de compras em si:
function createCartItemElement({ sku, name, salePrice }) { // Cria o elemento do carrinho e conforme vai adicinando os elementos faz a conta do preço total.
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;

  document.getElementsByClassName('cart__items')[0].appendChild(li);

  totalPrice();
  li.addEventListener('click', cartItemClickListener);
  li.addEventListener('click', totalPrice);

  return li;
}

async function produtoCarrinho(elemento) { // Trás os elementos da API, transforma em objeto para criar a li e adiciona no local storage
  const obj = await fetchItem(elemento);
  const { id: identifica, title, price } = obj;
  const objEspecifico = { sku: identifica, name: title, salePrice: price };
  createCartItemElement(objEspecifico);
  lista.push(objEspecifico);
  storageCart(lista);
}

function createFunctionToButton() { // Cria evento que ao clicar em add ao carrinho
  const button = document.querySelectorAll('.item__add');

  button.forEach((botao, index) => {
    botao.addEventListener('click', () => {
      const itens = document.getElementsByClassName('item__sku')[index].innerText;
      produtoCarrinho(itens); 
    });
  });
}

function getStorageCart() { // Trás os elementos de volta no local storage e coloca na lista para trabalhar com ele conforme as compras
  if (localStorage.length > 0) {
    const carrinho = JSON.parse(getSavedCartItems());
    lista = carrinho;
    carrinho.forEach((elemento) => {
       createCartItemElement(elemento);
    });
  }
}
// -------------------------------------------------------------------------------------------

// Cria função para o botão de esvaziar o carrinho.
function emptyCart() {
  const botao = document.querySelector('.empty-cart');
  botao.addEventListener('click', () => {
    listaCompras.innerHTML = '';
    const item = document.querySelector('.total-price>p');
    item.innerText = '0';
    localStorage.clear();
    lista = [];
  });
}
emptyCart();

// ------------------------------------------------------------------------------------------------

window.onload = async () => { 
  carregar();
  await produtos();
  createFunctionToButton();
  criaDivPreco();
  getStorageCart();
};
