const addItems = document.querySelector('.add-items');
const itemsList = document.querySelector('.plates');
// const items = JSON.parse(localStorage.getItem('items')) || [];
const clearAllButton = document.querySelector('.clearAllButton');
const checkAllButton = document.querySelector('.checkAllButton');
const uncheckAllButton = document.querySelector('.uncheckAllButton');


let items = JSON.parse(localStorage.getItem('items')) || [];
function addItem(e) {
    e.preventDefault();
    const text = this.querySelector(('[name=item]')).value;
    const item = {
        text,
        done: false
    };
    items.push(item);
    populateList(items, itemsList);
    localStorage.setItem('items', JSON.stringify(items)); // when item is added put it in the local storage
    this.reset();
}

function populateList(plates = [], platesList) {
    platesList.innerHTML = plates.map((plate, i) => {
        return `
        <li>
        <input type="checkbox" data-index=${i} id="item${i}" ${plate.done ? 'checked' : ''}/>
          <label for="item${i}">${plate.text}</label>
        </li>
      `;
    }).join('');
}

function checkAll () {
    items.map(item => item.done = true);
    localStorage.setItem('items', JSON.stringify(items));
    populateList(items, itemsList)
}

function uncheckAll () {
    items.map(item => item.done = false);
    localStorage.setItem('items', JSON.stringify(items));
    populateList(items, itemsList)
}


function toggleDone(e) {
    if (!e.target.matches('input')) return; // skip this unless it's an input
    const el = e.target;
    const index = el.dataset.index;
    items[index].done = !items[index].done;
    localStorage.setItem('items', JSON.stringify(items));
    populateList(items, itemsList)
}

function clearAll(e) {
    e.preventDefault();
    items.splice(0);
    populateList(items, itemsList);
    localStorage.setItem('items', JSON.stringify(items));
}

addItems.addEventListener('submit', addItem);
itemsList.addEventListener('click', toggleDone);
clearAllButton.addEventListener('click', clearAll);
checkAllButton.addEventListener('click', checkAll);
uncheckAllButton.addEventListener('click', uncheckAll);
populateList(items, itemsList);