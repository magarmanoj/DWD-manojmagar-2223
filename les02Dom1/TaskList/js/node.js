const btn = document.querySelector('#frmTask');
const tasks = document.querySelector('#tasks');
const selPriority = btn.querySelector('#selPriority');
const deadLine = btn.querySelector('#datDeadline');
const txtTask = btn.querySelector('#txtTask');


btn.addEventListener('submit', function(e) {
    e.preventDefault();

    if (selPriority.value == 'low' && txtTask.value != '' && deadLine.value != '') {
        tasks.innerHTML += `
        <div class="task">
            <span class="priority material-icons">assignment</span>
            <p class="tasktext">${txtTask.value} <span class="deadline">(deadline: ${deadLine.value})</span></p>
            <span class="complete material-icons">more_horiz</span>
         </div>`;
    }
    if (selPriority.value == 'normal' && txtTask.value != '' && deadLine.value != '') {
        tasks.innerHTML += `
        <div class="task">
            <span class="priorityNormal material-icons">assignment</span>
            <p class="tasktext">${txtTask.value} <span class="deadline">(deadline: ${deadLine.value})</span></p>
            <span class="complete material-icons">more_horiz</span>
         </div>`;
    }
    if (selPriority.value == 'high' && txtTask.value != '' && deadLine.value != '') {
        tasks.innerHTML += `
        <div class="task">
            <span class="priorityHigh material-icons">assignment</span>
            <p class="tasktext">${txtTask.value} <span class="deadline">(deadline: ${deadLine.value})</span></p>
            <span class="complete material-icons">more_horiz</span>
         </div>`;
    }
});

tasks.addEventListener('click', function(e) {
    if (!e.target.classList.contains('complete')) return; 
    e.target.classList.add('done');
    e.target.innerText = 'done';
});