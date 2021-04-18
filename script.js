// class Task {
//     constructor () {
//         this.id = id;
//         this.title = title;
//         this.description = description;
//         this.status = status;
//     }
// };

// const enumTaskStatus = Object.freeze({
//                                       'InProgress': 1, 
//                                       'Done': 2, 
//                                       'Undone': 3
//                                     });

// class TaskList {

// };

const btnAddTask = document.querySelector('.btn'),
      form = document.getElementById('form'),
      inputName = document.getElementById('name'),
      textArea = document.getElementById('descr'),
      table = document.querySelector('.tbody');


btnAddTask.addEventListener('click', () => {
    form.classList.toggle('hidden');
});

let id = 1;

form.addEventListener('submit', item => {
    item.preventDefault();

    table.innerHTML += `<tr class="row" >
                            <td class="cell cell-id">#${id++}</td>
                            <td class="cell cell-name">${inputName.value}</td>
                            <td class="cell cell-status">InProgress </td>
                            <td class="cell cell-desc">
                                ${textArea.value}
                            </td>
                        </tr>
                      `;
    item.target.classList.toggle('hidden');
});


