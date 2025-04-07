const itemForm = document.getElementById(`item-form`);
const itemInput = document.getElementById(`item-input`);
const itemList = document.getElementById(`item-list`);
const clearBtn = document.getElementById(`clear`);
const filter = document.getElementById(`filter`);



function onAddItemSubmit(e) {
  e.preventDefault();
  const newItem = itemInput.value;
  // Validate Input
  if (newItem === "") {
    alert(`Please add an item`);
    // To stop function from executing after the alert
    return;
  }
  // Create Item DOM Element
  addItemToDOM(newItem);
  // Add item to local storage
  addItemToStorage(newItem);
  checkUI(); // updating ui visibility after adding an element
  itemInput.value = "";
}

function addItemToDOM(item) {
  // Create List Item
  const li = document.createElement(`li`);
  li.appendChild(document.createTextNode(item));
  const button = createButton("remove-item btn-link text-red");
  li.appendChild(button);
  itemList.appendChild(li);
}

// Create button
function createButton(classes) {
  const button = document.createElement(`button`);
  button.className = classes;
  const icon = createIcon("fa-solid fa-xmark");
  button.appendChild(icon);
  return button;
}

// Create icon
function createIcon(classes) {
  const icon = document.createElement(`i`);
  icon.className = classes;
  return icon;
}

function getItemsFromStorage() {
  let itemsFromStorage;
  if (localStorage.getItem("items") === null) {
    itemsFromStorage = [];
  } else {
    itemsFromStorage = JSON.parse(localStorage.getItem("items"));
  }
  return itemsFromStorage;
}

function addItemToStorage(item) {
  let itemFromStorage = getItemsFromStorage();
  // Add new item to array
  itemFromStorage.push(item);
  // Convert to JSON String And Set to local storage
  localStorage.setItem("items", JSON.stringify(itemFromStorage));
}

function displayItems() {
  const itemsFromStorage = getItemsFromStorage();
  itemsFromStorage.forEach((item) => addItemToDOM(item));
  checkUI();
}

// Removing items
function removeItem(e) {
  if (e.target.parentElement.classList.contains("remove-item")) {
    if (confirm(`Are you sure?`)) {
      // first parent is the button second is the list item
      e.target.parentElement.parentElement.remove();
      checkUI(); // updating ui visibility after removing elements
    }
  }
}

// Clear items
function clearItems(e) {
  while (itemList.firstChild) {
    itemList.removeChild(itemList.firstChild);
  }
  checkUI(); // updating ui visibility after clear elements
}

function checkUI() {
  // When the function run it will take the new items
  const items = itemList.querySelectorAll(`li`);
  if (items.length === 0) {
    clearBtn.style.display = "none";
    filter.style.display = "none";
  } else {
    clearBtn.style.display = "block";
    filter.style.display = "block";
  }
}

function filterItems(e) {
  const text = e.currentTarget.value.toLowerCase();
  const items = itemList.querySelectorAll(`li`);
  items.forEach((item) => {
    // first child is the text node
    const itemName = item.firstChild.textContent.toLowerCase();
    if (itemName.indexOf(text) !== -1) {
      item.style.display = "flex";
    } else {
      item.style.display = "none";
    }
  });
}

checkUI(); // updating ui visibility after the content loaded

// Initialize App
function init() {
  // EventListener
  itemForm.addEventListener(`submit`, onAddItemSubmit);
  itemList.addEventListener(`click`, removeItem);
  clearBtn.addEventListener(`click`, clearItems);
  filter.addEventListener(`input`, filterItems);
  document.addEventListener(`DOMContentLoaded`, displayItems);
  checkUI();
}

init();
