// localStorage.clear();
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

function getSkuFromProductItem(item) {
  return item.querySelector('span.item__sku').innerText;
}

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

const lista = [];

function storageCart(objeto) {
  lista.push(objeto);
  const item = JSON.stringify(lista);
  saveCartItems(item);
}

function cartItemClickListener(event) {
  const lista1 = document.querySelectorAll('.cart__items');

  lista1.forEach((elemento) => {
      const texto = event.target.innerText;
      const valor = texto.split('PRICE: $');
      const valorNovo = totalPrice() - Number(valor[1]);
      div.innerHTML = '';
      const precoAPagar = document.createElement('p');
      precoAPagar.innerText = `${valorNovo}`;
      div.appendChild(precoAPagar);
      elemento.removeChild(event.target);
    });
}

function createCartItemElement({ sku, name, salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;

  document.getElementsByClassName('cart__items')[0].appendChild(li);

  li.addEventListener('click', cartItemClickListener);
  
  totalPrice();

  // localStorage.setItem('chave', [{ sku, name, salePrice }])

  return li;
}

async function produtos() {
  const objProdutos = await fetchProducts('computador');

  objProdutos.forEach((elemento) => {
    const { id, title, thumbnail } = elemento;
    const objFinal = { sku: id, name: title, image: thumbnail };
    createProductItemElement(objFinal);
  });
}

async function produtoCarrinho(elemento) {
  const obj = await fetchItem(elemento);
  const { id: identifica, title, price } = obj;
  const objEspecifico = { sku: identifica, name: title, salePrice: price };
  createCartItemElement(objEspecifico);
  storageCart(objEspecifico);
}

function createFunctionToButton() {
  const button = document.querySelectorAll('.item__add');

  button.forEach((botao, index) => {
    botao.addEventListener('click', () => {
      const itens = document.getElementsByClassName('item__sku')[index].innerText;
      produtoCarrinho(itens); 
    });
  });
}

function emptyCart() {
  const botao = document.querySelector('.empty-cart');
  botao.addEventListener('click', () => {
    listaCompras.innerHTML = '';
    const item = document.querySelector('.total-price>p');
    item.innerText = '0';
    localStorage.clear();
  });
}
emptyCart();

function getStorageCart() {
  if (localStorage.length > 0) {
    const carrinho = JSON.parse(getSavedCartItems());
    carrinho.forEach((elemento) => {
       createCartItemElement(elemento);
    });
  }
}

window.onload = async () => { 
  await produtos();
  createFunctionToButton();
  criaDivPreco();
  getStorageCart();
};
