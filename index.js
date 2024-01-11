const tableContainer = document.querySelector('.table-container');
const output = document.querySelector('#output');
const createButton = document.querySelector('#create-button');
const saveButton = document.querySelector('#save-button');
const fieldList = [];
const INITIAL_ROWS_AMOUNT = 1; 

createButton.addEventListener('click', createRow);
saveButton.addEventListener('click', saveRows);

class TableRow {
    constructor() {
        this.container = document.createElement('div');
        this.container.className = 'table-row';

        this.nameColumn = document.createElement('input');
        this.numberColumn = document.createElement('input');

        this.nameColumn.type = 'text';
        this.numberColumn.type = 'number';

        this.upButton = this.addButton('↑', this.moveUp.bind(this));
        this.downButton = this.addButton('↓', this.moveDown.bind(this));
        this.removeButton = this.addButton('x', this.remove.bind(this));

        this.container.append(this.nameColumn);
        this.container.append(this.numberColumn);
        this.container.append(this.upButton);
        this.container.append(this.downButton);
        this.container.append(this.removeButton);
    }

    addButton(text, clickHandler) {
        const button = document.createElement('button');
        button.innerText = text;
        button.addEventListener('click', clickHandler);
        return button;
    }

    moveUp() {
        let previousRow = this.container.previousElementSibling;

        if (previousRow) {
            previousRow.before(this.container);
        }
    }

    moveDown() {
        let nextRow = this.container.nextElementSibling;

        if (nextRow) {
            nextRow.after(this.container);
        }
    }

    remove() {
        this.container.remove();
    }
}

function createRow() {
    var newField = new TableRow();
    tableContainer.appendChild(newField.container);
    fieldList.push(newField);
}

function saveRows() {
    let outputResult = ['{'];

    const rows = tableContainer.querySelectorAll('.table-row');

    rows.forEach((row) => {
        let name = row.querySelector('input[type="text"]').value;
        let number = row.querySelector('input[type="number"]').value;

        outputResult += `"${name}":"${number}",`;
    });

    if (outputResult[outputResult.length - 1] == ',') {
        outputResult = outputResult.substr(0, outputResult.length - 1);
    }

    outputResult += '}'
    output.innerHTML = outputResult;
}

for (let i = 0; i < INITIAL_ROWS_AMOUNT; i++)
    createRow()
