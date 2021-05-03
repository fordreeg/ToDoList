const form = document.getElementById('form'),
      inputName = document.getElementById('name'),
      textArea = document.getElementById('textArea'),
      wrapper = document.querySelector('.wrapper');


const enumTaskStatus = Object.freeze(
    {
        InProgress: 'InProgress',
        Done: 'Done',
        Undone: 'Undone'
    });

class Task {
    id;
    title;
    description;
    status;
    trash;

    constructor(id, title, description, trash){
        this.id = id;
        this.title = title;
        this.description = description;
        this.status = enumTaskStatus.InProgress;
        this.trash = trash;
	}

    updateStatus(statusValue, newStatus){
        this.status = statusValue;
        newStatus.parentElement.parentElement.className = 'task';
        
        switch(this.status){
            case 'Done':
                newStatus.parentElement.parentElement.classList.add('done');
                break;
            case 'Undone':
                newStatus.parentElement.parentElement.classList.add('undone');
                break;
        }
    }
};

class TaskList {
    list;
    nextId

    constructor () {
        this.list = [];
        this.nextId = 1;
    }

    add(title, description, trash) {
        let newTask = new Task(this.nextId, title, description, trash);
        this.list.push(newTask);

        this.nextId++;

        let divTask = document.createElement('div');
        divTask.classList.add('task');

        for(let key in newTask){
            if(key === 'status') {
                let spanStatus = document.createElement('span');
                spanStatus.classList.add('status');
            
                let select = document.createElement('select');
                select.classList.add('select');
                select.textContent = newTask.status;
            
                for (let key in enumTaskStatus) {
                    let option = document.createElement('option');
                    option.value = key;
                    option.textContent = enumTaskStatus[key];
                    select.append(option);
                }
            
                select.addEventListener('change', () => {
                    let taskIndex = taskList.list.findIndex(x => x.id === newTask.id);
                    taskList.list[taskIndex].updateStatus(enumTaskStatus[select.value], select);
                });
                spanStatus.append(select);
                divTask.append(spanStatus);
            } 
            
            if(key === 'description') {
                let spanDescr = document.createElement('span');
                spanDescr.classList.add('descr');
                spanDescr.textContent = description;
                divTask.append(spanDescr);
            }
            
            if(key === 'title') {
                let spanName = document.createElement('span');
                spanName.classList.add('name');
                spanName.textContent = title;
                divTask.append(spanName);
            }

            if(key === 'id') {
                let spanId = document.createElement('span');
                spanId.classList.add('id');
                spanId.textContent = `#${newTask.id}`;
                divTask.append(spanId);
            }
            
            if(key === 'trash') {
                let img = document.createElement('img');
                img.classList.add('basket');
                img.setAttribute('src', trash);
                img.setAttribute('alt', 'trash');
                divTask.append(img);

                img.addEventListener('click', (e) => {
                    
                    let taskIndex = taskList.list.findIndex(x => x.id === newTask.id);
                    taskList.list.splice(taskIndex, 1);
                    e.target.parentElement.remove();
                });
            }
        }
        wrapper.append(divTask);
    }

}

let taskList = new TaskList();

document.querySelector('.btn-newTask').addEventListener('click', () => {
    form.classList.toggle('hidden');
});

form.addEventListener('submit', item => {
    item.preventDefault();
    taskList.add(
        inputName.value,
        textArea.value, 
        "icon/trash.svg"
        );

    inputName.value = "";
    textArea.value = "";
    item.target.classList.toggle('hidden');
});



