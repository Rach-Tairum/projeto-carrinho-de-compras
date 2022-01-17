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

function cartItemClickListener(event) {
  const lista = document.querySelectorAll('.cart__items');
  lista.forEach((elemento) => {
      elemento.removeChild(event.target);
    });
}

function createCartItemElement({ sku, name, salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;

  document.getElementsByClassName('cart__items')[0].appendChild(li);

  li.addEventListener('click', cartItemClickListener);
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
    const itensCarrinho = document.querySelector('.cart__items');
    itensCarrinho.innerHTML = '';
    console.log(itensCarrinho.childNodes);
  });
}

window.onload = async () => { 
  await produtos();
  createFunctionToButton();
  await produtoCarrinho();
  emptyCart();
};
