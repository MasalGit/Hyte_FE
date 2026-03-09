import {fetchData} from './fetch.js';

//Render items in a list in the UI
/////////////////////

const renderFruitList = (items) => {
  const fruitList = document.querySelector('.fruitlist');
  fruitList.innerHTML = '';

  items.forEach((item) => {
    const li = document.createElement('li');
    li.textContent = item.name;
    fruitList.appendChild(li);
  });
};

// GET items
////////////////////

// Render items into table tbody for the GET table button
const renderItemsTable = (items) => {
  const tbody = document.querySelector('.tbody');
  if (!tbody) return;
  tbody.innerHTML = '';

  items.forEach((item) => {
    const tr = document.createElement('tr');

    const nameTd = document.createElement('td');
    nameTd.textContent = item.name;

    const infoTd = document.createElement('td');
    const infoBtn = document.createElement('button');
    infoBtn.textContent = 'Info';
    infoBtn.className = 'info-btn';
    infoBtn.addEventListener('click', () => {
      alert(JSON.stringify(item, null, 2));
    });
    infoTd.appendChild(infoBtn);

    const delTd = document.createElement('td');
    const delBtn = document.createElement('button');
    delBtn.textContent = 'Delete';
    delBtn.className = 'del-btn';
    delBtn.addEventListener('click', async () => {
      if (!confirm('Poistetaanko item id ' + item.id + '?')) return;
      const res = await fetchData(`http://localhost:3000/api/items/${item.id}`, { method: 'DELETE', headers: { 'Content-Type': 'application/json' } });
      if (res.error) {
        alert('Error deleting item: ' + res.error);
        return;
      }
      alert('Item deleted');
      getItems();
    });
    delTd.appendChild(delBtn);

    const idTd = document.createElement('td');
    idTd.textContent = item.id;

    tr.appendChild(nameTd);
    tr.appendChild(infoTd);
    tr.appendChild(delTd);
    tr.appendChild(idTd);

    tbody.appendChild(tr);
  });
};

// augment getItems to also render table when present
const _getItemsAndRender = async () => {
  const items = await fetchData('http://localhost:3000/api/items');
  if (items.error) {
    console.error('Error fetching items:', items.error);
    return [];
  }
  renderFruitList(items);
  renderItemsTable(items);
  return items;
};

// replace getItems with the augmented version
const getItems = _getItemsAndRender;
// GET item by id
////////////////////

const getItemById = async (event) => {
  console.log('getItemById called');

  event.preventDefault();

  const idInput = document.querySelector('#itemId');
  const itemId = idInput.value.trim();
  console.log('Item ID:', itemId);

  const url = `http://localhost:3000/api/items/${itemId}`;

  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const item = await fetchData(url, options);

  if (item.error) {
    console.error('Error fetching item:', item.error);
    return;
  }
  console.log(item);
  alert(`Item name: ${item.name}`);
};


// Delete item by id
////////////////////

const deleteItemById = async (event) => {
  console.log('deleteItemById called');

  event.preventDefault();

  const idInput = document.querySelector('#itemId');
  const itemId = idInput.value.trim();
  console.log('Item ID:', itemId);

  if (!itemId) {
    alert('Please enter an item ID');
    return;
  }

  const url = `http://localhost:3000/api/items/${itemId}`;

  const options = {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const response = await fetchData(url, options);

  if (response.error) {
    console.error('Error deleting item:', response.error);
    alert('Error deleting item: ' + response.error);
    return;
  }
  console.log('Item deleted:', response);
  alert('Item deleted successfully!');
  idInput.value = '';
  getItems();
};
// Add new item via POST
const addItem = async (event) => {
  event.preventDefault();
  const nameInput = document.querySelector('#newItemName');
  const weightInput = document.querySelector('#newItemWeight');
  if (!nameInput) return;
  const name = nameInput.value.trim();
  const weight = weightInput ? weightInput.value.trim() : '';
  if (!name) {
    alert('Please provide a name');
    return;
  }
  const payload = { name };
  if (weight) payload.weight = Number(weight);

  const res = await fetchData('http://localhost:3000/api/items', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  if (res.error) {
    alert('Error adding item: ' + res.error);
    return;
  }
  alert('Item added');
  nameInput.value = '';
  if (weightInput) weightInput.value = '';
  getItems();
};

// Load item into PUT form
const loadItemToPutForm = async () => {
  const idInput = document.querySelector('#putItemId');
  if (!idInput) return;
  const id = idInput.value.trim();
  if (!id) {
    alert('Please enter an item ID');
    return;
  }
  const item = await fetchData(`http://localhost:3000/api/items/${id}`);
  if (item.error) {
    alert('Error fetching item: ' + item.error);
    return;
  }
  const nameInput = document.querySelector('#putItemName');
  if (nameInput) nameInput.value = item.name || '';
};

// Update item by id (PUT)
const updateItemById = async (event) => {
  event.preventDefault();
  const idInput = document.querySelector('#putItemId');
  const nameInput = document.querySelector('#putItemName');
  if (!idInput || !nameInput) return;
  const id = idInput.value.trim();
  const name = nameInput.value.trim();
  if (!id || !name) {
    alert('Please provide id and new name');
    return;
  }
  const res = await fetchData(`http://localhost:3000/api/items/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name }),
  });
  if (res.error) {
    alert('Error updating item: ' + res.error);
    return;
  }
  alert('Item updated');
  getItems();
};
export {getItems, getItemById, deleteItemById, addItem, loadItemToPutForm, updateItemById};
