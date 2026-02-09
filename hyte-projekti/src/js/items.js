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


const getItems = async () => {

  const items = await fetchData('http://localhost:3000/api/items');

  if (items.error) {
    console.error('Error fetching items:', items.error);
    return [];
  }


  items.forEach((item) => {
    console.log(item.name);
  });

  renderFruitList(items);
};
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
export {getItems, getItemById, deleteItemById};
