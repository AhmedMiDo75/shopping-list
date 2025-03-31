const itemForm = document.getElementById(`item-form`);
const itemInput = document.getElementById(`item-input`);
const itemList = document.getElementById(`item-list`);
const clearBtn = document.getElementById(`clear`);
const filter = document.getElementById(`filter`);

function addItem(e) {
  e.preventDefault();
  const newItem = itemInput.value;
  // Validate Input
  if (newItem === "") {
    alert(`Please add an item`);
    // To stop function from executing after the alert
    return;
  }
  // Create List Item
  const li = document.createElement(`li`);
  li.appendChild(document.createTextNode(newItem));
  const button = createButton("remove-item btn-link text-red");
  li.appendChild(button);
  itemList.appendChild(li);
  checkUI();
  itemInput.value = "";
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

// Removing items
function removeItem(e) {
  if (e.target.parentElement.classList.contains("remove-item")) {
    if (confirm(`Are you sure?`)) {
      // first parent is the button second is the list item
      e.target.parentElement.parentElement.remove();
      checkUI();
    }
  }
}

// Clear items
function clearItems(e) {
  while (itemList.firstChild) {
    itemList.removeChild(itemList.firstChild);
  }
  checkUI();
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

// EventListener
itemForm.addEventListener(`submit`, addItem);
itemList.addEventListener(`click`, removeItem);
clearBtn.addEventListener(`click`, clearItems);
