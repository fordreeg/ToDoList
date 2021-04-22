class Task {
    id;
    title;
    description;
    status;

    constructor (id, title, description) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.status = enumTaskStatus.Undone;
    }
};


class TaskList {
    list;

    constructor () {
        this.list = [];
    }

    add(title, description) {
        let newTask = new Task(this.list.length, title, description);
        this.list.push(newTask);
        this.renderTask(table, newTask);
        this.updateStatus();
    }

    renderTask(parent, task) {
        parent.innerHTML += `
                            <tr class="row" >
                                <td class="cell cell-id">#${task.id + 1}</td>
                                <td class="cell cell-name">${task.title}</td>
                                <td class="cell cell-desc">${task.description}</td>
                                <td class="cell cell-status">${task.status}</td>  
                            </tr>
        `;
    }

    updateStatus() {

        const row = document.getElementsByClassName('row');
        for (let key of row) {
            console.log(key);
            break;
        }
    }
}

const enumTaskStatus = Object.freeze({
    InProgress: 'InProgress',
    Undone: 'Undone',
    Done: 'Done',
});

let taskList = new TaskList();

const btnAddTask = document.querySelector('.btn'),
      form = document.getElementById('form'),
      inputName = document.getElementById('name'),
      textArea = document.getElementById('descr'),
      table = document.querySelector('.tbody');
      select = document.getElementsByClassName('select');
    //   row = document.getElementsByClassName('row');


btnAddTask.addEventListener('click', () => {
    form.classList.toggle('hidden');
});

form.addEventListener('submit', item => {
    item.preventDefault();
    taskList.add(inputName.value, textArea.value);


    inputName.value = "";
    textArea.value = "";
    item.target.classList.toggle('hidden');
});

