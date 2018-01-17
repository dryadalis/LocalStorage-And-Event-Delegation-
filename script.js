const addItems = document.querySelector('.add-items');
const itemsList = document.querySelector('.plates');
const items = JSON.parse(localStorage.getItem('items')) || [];
const clearAllButton = document.querySelector('.clearAllButton');
const checkAllButton = document.querySelector('.checkAllButton');



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
    if (plates.length == 0) {
        const loading = document.createElement("p");
        loading.innerHTML = "Loading Tapas... "
        loading.classList.add("loading")
        document.querySelector('.loading').appendChild(loading);

    }
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

function toggleAll(e) {
    const inputs = document.querySelectorAll("input[type='checkbox']");
    inputs.forEach(input => {
        if(input.checked == false){
            input.checked = true; 
        } else if (input.checked == true) {
                input.checked = false;
            }
    });
    }

addItems.addEventListener('submit', addItem);
itemsList.addEventListener('click', toggleDone);
clearAllButton.addEventListener('click', clearAll);
checkAllButton.addEventListener('click', toggleAll);
populateList(items, itemsList);