// class Task {
//     constructor () {
//         this.id = id;
//         this.title = title;
//         this.description = description;
//         this.status = status;
//     }

//     getId() {
//         this.id = 1;
//         return this.id ++
//     }
// };



// class TaskList {

// };

const enumTaskStatus = Object.freeze({
                                        'InProgress': 'InProgress', 
                                        'Done': 'Done', 
                                        'Undone': 'Undone'
                                    });


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

let id = 1;

form.addEventListener('submit', item => {
    item.preventDefault();

    table.innerHTML += `<tr class="row" >
                            <td class="cell cell-id">#${id++}</td>
                            <td class="cell cell-name">${inputName.value}</td>
                            <td class="cell cell-desc">
                                ${textArea.value}
                            </td>
                            <td class="cell cell-status">
                                <select id="select" class="select">
                                    <option value="${enumTaskStatus.InProgress}" selected>${enumTaskStatus.InProgress}</option>
                                    <option value="${enumTaskStatus.Done}">${enumTaskStatus.Done}</option>
                                    <option value="${enumTaskStatus.Undone}">${enumTaskStatus.Undone}</option>
                                </select> 
                            </td>
                            
                        </tr>
                      `;
    inputName.value = "";
    textArea.value = "";
    item.target.classList.toggle('hidden');

    for (let key of select) {
        console.log(key.value);
        key.addEventListener('change', item => {
            let parent = item.target.parentElement.parentElement;
            let enumItem = item.target.value;

            switch (enumItem) {
                case enumTaskStatus.Done: 
                    parent.classList.remove('undone');
                    parent.classList.add('done');
                break;

                case enumTaskStatus.Undone: 
                    parent.classList.remove('done');
                    parent.classList.add('undone');
                break;

                case enumTaskStatus.InProgress: 
                    parent.classList.remove('undone');
                    parent.classList.remove('done');
                break;
            }
        });
        break;
    }
});


