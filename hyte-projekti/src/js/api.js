import '../css/api.css';
import { getItems, getItemById, deleteItemById, addItem, loadItemToPutForm, updateItemById } from './items';
import { addUser } from './users';

console.log('Scripti starttaa');

// sync ja asyc ajatus ja demo

function synchronousFunction() {
  let number = 1;
  for (let i = 1; i < 10000; i++) {
    number += i;
    console.log('synchronousFunction running');
  }
  console.log('regular function complete', number);
}

// synchronousFunction();

console.log('Valmis');

// synkroninen
console.log('1');
console.log('2');
console.log('3');

// async suoritus

console.log('1');

setTimeout(() => {
  console.log('TIMEOUT');
}, 4000);

console.log('3');

// GET
// eka haku ulkoiseen rajapintaan
// tämä on fetch käyttäen promisea (eli lupausta)
// ja ON asykroninen

fetch('https://api.restful-api.dev/objects')
  .then((response) => {
    console.log(response);
    if (!response.ok) {
      throw new Error('Verkkovastaus ei ollut kunnossa');
    }
    return response.json();
  })
  .then((data) => {
    console.log(data);
  })
  .catch((error) => {
    console.error('Fetch-operaatiossa ilmeni ongelma:', error);
  });

// Yksikertaistetaan ja modernisoidaan haku
// käytettän async ja await avainsanoja

async function getData() {
  try {
    const response = await fetch('https://api.restful-api.dev/objects');
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error('Virhe:', error);
  }
}

//GetData();
// getItems();

const getItemsBtn = document.querySelector('.get_items');
if (getItemsBtn) getItemsBtn.addEventListener('click', getItems);

const getItemsTableBtn = document.querySelector('.get_items_table');
if (getItemsTableBtn) getItemsTableBtn.addEventListener('click', getItems);

const getForm = document.querySelector('.get-item-form');
if (getForm) getForm.addEventListener('submit', getItemById);

const deleteBtn = document.querySelector('.delete-item');
if (deleteBtn) deleteBtn.addEventListener('click', deleteItemById);

// Add form handlers
const addItemForm = document.querySelector('.add-item-form');
if (addItemForm) addItemForm.addEventListener('submit', addItem);

const addUserForm = document.querySelector('.addform');
if (addUserForm) addUserForm.addEventListener('submit', addUser);

const loadItemBtn = document.querySelector('.load-item');
if (loadItemBtn) loadItemBtn.addEventListener('click', loadItemToPutForm);

const putForm = document.querySelector('.put-item-form');
if (putForm) putForm.addEventListener('submit', updateItemById);
