//Esperar que todos elementos da pagina carreguem antes de continuar o script

if (document.readyState == "loading") {
  document.addEventListener("DOMContentLoaded", ready);
} else {
  ready();
}

function ready() {
  //funcionalidade aos botões de eliminar do carrinho
  var buttonsRemoveItems = document.getElementsByClassName("fa-trash");
  for (var i = 0; i < buttonsRemoveItems.length; i++) {
    var button = buttonsRemoveItems[i];
    button.addEventListener("click", removeCartItem);
  }

  //Adicionar funcionalidade aos botões de adicionar ao carrinho
  var addCart = document.getElementsByClassName("button-product");
  for (var i = 0; i < addCart.length; i++) {
    var button = addCart[i];
    button.addEventListener("click", addToCart);
  }

  //funcionalidade ao botão pagar
  document
    .getElementsByClassName("btn-cart")[0]
    .addEventListener("click", payClicked);
}

//Remover o item selecionado do carrinho
function removeCartItem(event) {
  var buttonClicked = event.target;
  buttonClicked.parentElement.parentElement.parentElement.remove();

  addIcon(0);

  //Atualizar o total do carrinho após remover um item
  updateCartTotal();
}

//Função de atualizar o total do carrnho
function updateCartTotal() {
  //Selecionar o container do carrinho
  var cartContainer = document.getElementsByClassName("list-items")[0];
  var cartItems = cartContainer.getElementsByClassName("cart-item");
  var total = 0;

  //Percorrer cada elemento do carrinho para atualizar o seu total
  for (var i = 0; i < cartItems.length; i++) {
    var item = cartItems[i];
    var elementPrice = item.getElementsByClassName("cart-item-price")[0];

    //remover o simbolo de reais e o o ponto e virgula
    var price = parseFloat(
      elementPrice.innerText
        .replace("Preço:", "")
        .replace("R$", "")
        .replace(".", "")
        .replace(",", ".")
    );
    var itemQuantity = item.getElementsByClassName("cart-item-quantity")[0];
    var quantity = itemQuantity.value;
    total = total + price * quantity;
  }

  document.getElementsByClassName("cart-total-price")[0].innerText =
    "R$: " + total.toLocaleString("pt-BR");
}

function closeCart() {
  var cartItems = document.getElementsByClassName("list-items")[0];
  if (cartItems.childElementCount == 0) {
  }
}

//Aumento em uma quantidade do elemento selecionado
function sumQuantity(event) {
  var buttonClicked = event.target;
  var selector = buttonClicked.parentElement;
  var currentQuantity =
    selector.getElementsByClassName("cart-item-quantity")[0].value;
  currentQuantity++;
  selector.getElementsByClassName("cart-item-quantity")[0].value =
    currentQuantity;

  //Atualizar o total
  updateCartTotal();
}

function subtractQuantity(event) {
  var buttonClicked = event.target;
  var selector = buttonClicked.parentElement;
  var currentQuantity =
    selector.getElementsByClassName("cart-item-quantity")[0].value;
  currentQuantity--;

  if (currentQuantity >= 1) {
    selector.getElementsByClassName("cart-item-quantity")[0].value =
      currentQuantity;

    //Atualizar o total
    updateCartTotal();
  }
}

function addToCart(event) {
  var button = event.target;
  var item = button.parentElement;
  var description =
    item.getElementsByClassName("item-description")[0].innerText;
  var price = item.getElementsByClassName("price")[0].innerText;
  var imageSrc = item.getElementsByClassName("image-products")[0].src;

  //Agregar ao carrinho os valores recebidos através de parâmetros
  addItemToCart(description, price, imageSrc);
}

function addItemToCart(description, price, imageSrc) {
  var cartItem = document.getElementsByClassName("list-items")[0];

  var item = document.createElement("div");
  item.classList.add = "item";

  //Controlar se o item adicionado não se encontra ao carrinho
  var cartItemDescription = cartItem.getElementsByClassName(
    "cart-item-description"
  );

  for (var i = 0; i < cartItemDescription.length; i++) {
    if (
      cartItemDescription[i].textContent.substring(0, 50) ==
      description.substring(0, 50)
    ) {
      alert("O item já se encontra no carrinho");
      return;
    }
  }

  addIcon(1);
  var cartItemContent = `
    <div class="cart-item">
      <img class="cart-image" src="${imageSrc}" />
      <div class="cart-item-detail">
        <span class="cart-item-description"
          >${description}</span
        >
        <div class="cart-quantity-selector">
          <i class="fa-solid fa-minus subtract-quantity me-2"></i>
          <input
            type="text"
            value="1"
            class="cart-item-quantity"
            disabled
          />
          <i class="fa-solid fa-plus sum-quantity ms-2"></i>
        </div>
        <span class="cart-item-price">Preço: ${price}</span>
      </div>
      <span class="btn-remove me-2">
        <i class="fa-solid fa-trash"></i>
      </span>
    </div>`;

  item.innerHTML = cartItemContent;
  cartItem.append(item);

  //adicionar a função de eliminar do carrinho do item novo
  item
    .getElementsByClassName("fa-trash")[0]
    .addEventListener("click", removeCartItem);

  //adicionar a função de somar no carrinho do item novo
  var buttonSumQuantity = item.getElementsByClassName("sum-quantity")[0];
  buttonSumQuantity.addEventListener("click", sumQuantity);

  //adicionar a função de subtrair no carrinho do item novo
  var buttonSubtractQuantity =
    item.getElementsByClassName("subtract-quantity")[0];
  buttonSubtractQuantity.addEventListener("click", subtractQuantity);
}

function payClicked() {
  alert("Obrigado pela sua compra");
  //eliminar todos itens do carrinho

  var cartItems = document.getElementsByClassName("list-items")[0];
  while (cartItems.hasChildNodes()) {
    cartItems.removeChild(cartItems.firstChild);
  }
  updateCartTotal();
  addIcon(0);
}

function addIcon(num) {
  valor = num;
  var cartItem = document.getElementsByClassName("list-items")[0];
  document.querySelector(".count-item").innerText =
    cartItem.childElementCount + valor;
}
