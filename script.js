const btnAddTask = document.querySelector('.btn-newTask'),
      form = document.getElementById('form'),
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

    constructor(id, title, description){
        this.id = id;
        this.title = title;
        this.description = description;
        this.status = enumTaskStatus.InProgress;
	}

    updateStatus(newStatus){
        this.status = newStatus;
    }
};

class TaskList {
    list;

    constructor () {
        this.list = [];
    }

    add(title, description) {
        let newTask = new Task(this.list.length + 1, title, description);
        this.list.push(newTask);

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
            
                select.addEventListener('change', (e) => {
                    taskList.list[newTask.id - 1].updateStatus(enumTaskStatus[select.value]);

                    
                    // if(e.target === 'Done') {
                    //     e.target.parentElement.classList.remove('undone');
                    //     e.target.parentElement.classList.add('done');
                    // }
                    // if(e.target === 'Undone') {
                    //     e.target.parentElement.classList.remove('done');
                    //     e.target.parentElement.classList.add('undone');
                    // }
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
        }
        wrapper.append(divTask);
    }
}



let taskList = new TaskList();

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



