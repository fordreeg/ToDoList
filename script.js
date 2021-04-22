class Task {
    id;
    title;
    description;
    statusOne;
    statusTwo;
    statusThree;

    constructor (id, title, description, statusOne, statusTwo, statusThree) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.statusOne = statusOne;
        this.statusTwo = statusTwo;
        this.statusThree = statusThree;
    }
};


class TaskList {
    list;

    constructor () {
        this.list = [];
    }

    add(title, description, statusOne, statusTwo, statusThree) {
        let newTask = new Task(this.list.length, title, description, statusOne, statusTwo, statusThree);
        this.list.push(newTask);
        this.renderTask(table, newTask);
        this.updateStatus(select);
    }

    renderTask(parent, task) {
        parent.innerHTML += `
                            <tr class="row" >
                                <td class="cell cell-id">#${task.id + 1}</td>
                                <td class="cell cell-name">${task.title}</td>
                                <td class="cell cell-desc">${task.description}</td>
                                <td class="cell cell-status">
                                    <select class="select">
                                        <option value="${task.statusOne}">${task.statusOne}</option>
                                        <option value="${task.statusTwo}">${task.statusTwo}</option>
                                        <option value="${task.statusThree}">${task.statusThree}</option>
                                    </select>
                                </td>  
                            </tr>
        `;
    }

    updateStatus(arrItem) {

        for (let key of arrItem) {
            key.addEventListener('change', e => {
                if (e.target.classList.contains('select')) {
                    let selectValue = e.target.value;

                    switch (selectValue) {
                        case 'Done': key.parentElement.parentElement.classList.remove('undone');;
                                     key.parentElement.parentElement.classList.add('done');
                                    break;
                        case 'Undone': key.parentElement.parentElement.classList.remove('done');
                                       key.parentElement.parentElement.classList.add('undone');
                                    break;
                        case 'InProgress': key.parentElement.parentElement.classList.remove('done');
                                           key.parentElement.parentElement.classList.remove('undone');
                                    break;
                    }

                }
            });
        }
    }
}

const enumTaskStatus = Object.freeze({
    InProgress: 'InProgress',
    Done: 'Done',
    Undone: 'Undone'
});

let taskList = new TaskList();

const btnAddTask = document.querySelector('.btn'),
      form = document.getElementById('form'),
      inputName = document.getElementById('name'),
      textArea = document.getElementById('descr'),
      table = document.querySelector('.tbody'),
      select = document.getElementsByClassName('select'),
      row = document.getElementsByClassName('row');


btnAddTask.addEventListener('click', () => {
    form.classList.toggle('hidden');
});

form.addEventListener('submit', item => {
    item.preventDefault();
    taskList.add(inputName.value, textArea.value, enumTaskStatus.InProgress, enumTaskStatus.Done, enumTaskStatus.Undone);


    inputName.value = "";
    textArea.value = "";
    item.target.classList.toggle('hidden');
});

