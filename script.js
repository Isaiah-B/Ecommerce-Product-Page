//*************************************************************/
// MAIN PAGE / MOBILE / LIGHTBOX IMAGE SELECTORS
//*************************************************************/

// Draw selection box around currently selected thumbnail 
const setSelected = (id, list) => {
  // Remove .selected from all thumbnails
  list.forEach(el => el.classList.remove('selected'));

  const selectedThumbnail = document.getElementById(id)
  selectedThumbnail.classList.add('selected');
}

// Change the displayed image
const setDisplay = (id, display) => {
  const currentThumbnail = document.getElementById(id);
  const fileName = currentThumbnail.firstChild.src.replace('-thumbnail', '');
  display.src = fileName;
}

// Add event listeners for each list element to
// become selected and displayed on click
const setListListeners = (list, display) => {
  list.forEach(el => el.addEventListener('click', () => {
    setSelected(el.id, list);
    setDisplay(el.id, display);
  }));
}

//*************************************************************/
// MAIN PAGE IMAGES
const mainDisplayImg = document.querySelector('.display-img');
const mainThumbnailList = document.querySelectorAll('.main-thumbnail');

setListListeners(mainThumbnailList, mainDisplayImg);


//*************************************************************/
// MOBILE IMAGES
let currMobileIndex = 0;
const mobilePrevBtn = document.querySelector('.arrow-mobile.btn-prev');
const mobileNextBtn = document.querySelector('.arrow-mobile.btn-next');

mobilePrevBtn.addEventListener('click', () => {
  if (currMobileIndex === 0) currMobileIndex = 3
  else currMobileIndex -= 1
  
  const newImg = mainThumbnailList[currMobileIndex];
  setDisplay(newImg.id, mainDisplayImg);
})

mobileNextBtn.addEventListener('click', () => {
  if (currMobileIndex === 3) currMobileIndex = 0
  else currMobileIndex += 1

  const newImg = mainThumbnailList[currMobileIndex];
  setDisplay(newImg.id, mainDisplayImg);
})


//*************************************************************/
// LIGHTBOX
const lightbox = document.querySelector('.lightbox');
const lbDisplayImg = document.querySelector('.lightbox-main-img')
const lbClose = document.querySelector('.icon-close');
const lbThumbnailList = document.querySelectorAll('.lightbox-thumbnail');
const prevBtn = document.querySelector('.btn-prev');
const nextBtn = document.querySelector('.btn-next');
let currentIndex;

// Set the lightbox display image to be the same as the 
// clicked image on the main screen
const setInitial = () => {
  currentMain = document.querySelector('.main-thumbnail.selected');
  currentIndex = Object.values(mainThumbnailList).indexOf(currentMain);
  
  currentLB = lbThumbnailList[currentIndex];
  setDisplay(currentLB.id, lbDisplayImg);
  setSelected(currentLB.id, lbThumbnailList);
}

setListListeners(lbThumbnailList, lbDisplayImg);

prevBtn.addEventListener('click', () => {
  if (currentIndex === 0) currentIndex = 3;
  else currentIndex -= 1;
  
  const prevImg = lbThumbnailList[currentIndex];
  setDisplay(prevImg.id, lbDisplayImg);
  setSelected(prevImg.id, lbThumbnailList);
});

nextBtn.addEventListener('click', () => {
  if (currentIndex === 3) currentIndex = 0;
  else currentIndex += 1;
  
  const nextImg = lbThumbnailList[currentIndex];
  setDisplay(nextImg.id, lbDisplayImg);
  setSelected(nextImg.id, lbThumbnailList);
});

// Open lightbox (Non-mobile)
mainDisplayImg.addEventListener('click', () => {
  if (window.screen.width > 544) {
    lightbox.classList.add('opened');
    setInitial();
  }
});

// Close lightbox
lbClose.addEventListener('click', () => {
  lightbox.classList.remove('opened');
});


//*************************************************************/
// ITEM QUANTITY COMPONENT
//*************************************************************/

const minusBtn = document.querySelector('.minus-btn');
const plusBtn = document.querySelector('.plus-btn');
const numItems = document.querySelector('.num-items');

const minusOne = (el) => {
  let val = parseInt(el.textContent);
  const subtracted = val - 1;

  if (val > 1) el.textContent = subtracted.toString();
  else el.textContent = '1';
}

const plusOne = (el) => {
  let val = parseInt(el.textContent);
  const added = val + 1;

  el.textContent = added.toString();
}

minusBtn.addEventListener('click', () => minusOne(numItems));
plusBtn.addEventListener('click', () => plusOne(numItems));


//*************************************************************/
// SHOPPING CART
//*************************************************************/
const cartContainer = document.querySelector('.cart-container');
const cartBtn = document.querySelector('.cart-btn');
const cartMenuBottom = document.querySelector('.cart-menu-bottom');
const addToCartBtn = document.querySelector('.add-to-cart-btn');
const cartNumber = document.querySelector('.cart-number');
let cartContents = [];

const deleteItem = () => {
  cartMenuBottom.removeChild(cartMenuBottom.children[0]);
  cartContents = [];
}

// Create template for shopping cart item
const createTemplate = (numItems) => {
  const priceTotal = (numItems * 125).toFixed(2);
  const priceTotalStr = priceTotal.toString();

  const itemTemplate = document.createElement('template');
  itemTemplate.innerHTML = `
  <div class="cart-item">
  <img class="cart-item-img" src="images/image-product-1-thumbnail.jpg" alt="Thumbnail image of the product">
  <div class="cart-item-info">
    <span class="cart-item-name">Fall Limited Edition Sneakers</span>
    <div class="cart-item-price-info">
      <span class="cart-item-price">$125.00 x <span class="cart-item-quantity">${numItems}</span></span>
      <span class="cart-item-total">${priceTotalStr}</span>
    </div>
  </div>
  <button class="delete-item-btn">
    <img class="icon-delete" src="images/icon-delete.svg" alt="Delete item from cart button">
  </button>
  </div>
  `;
  
  const item = itemTemplate.content.cloneNode(true);
  return item;
}


// Open shopping cart menu
cartBtn.addEventListener('click', () => {
  cartContainer.classList.toggle('menu-open')
});

// Use cartContents to keep track of how many of our 
// single item is in the cart
if (Object.keys(cartContents).length === 0) {
  cartContainer.classList.add('cart-empty');
}

// Add to cart on button click
addToCartBtn.addEventListener('click', () => {
  let items = parseInt(numItems.textContent);
  
  // Append template to cart menu if it is empty
  if (cartContainer.classList.contains('cart-empty')) {
    cartContainer.classList.remove('cart-empty');
    cartMenuBottom.prepend(createTemplate(items));
    cartContents.push(items);

    // Remove existing item, update the number of items, and append
    // new template with updated number 
  } else {
    cartMenuBottom.removeChild(cartMenuBottom.children[0]);
    items += cartContents[0];
    cartContents[0] = items;
    cartMenuBottom.prepend(createTemplate(items));
  }

  // Update number on the cart icon
  cartNumber.textContent = items;

  // Set up button to delete item 
  const deleteItemBtn = document.querySelector('.delete-item-btn');

  deleteItemBtn.addEventListener('click', () => {
    cartContainer.classList.add('cart-empty');
    deleteItem();
  });
});


//*************************************************************/
// MOBILE NAV
//*************************************************************/
const header = document.querySelector('.header');
const openNavBtn = document.getElementById('open-menu');
const closeNavBtn = document.getElementById('close-menu');

openNavBtn.addEventListener('click', () => {
  header.classList.add('nav-open');
});

closeNavBtn.addEventListener('click', () => {
  header.classList.remove('nav-open');
});

