const btn = document.querySelector('#frmTask');
const tasks = document.querySelector('#tasks');
const selPriority = btn.querySelector('#selPriority');
const deadLine = btn.querySelector('#datDeadline');
const txtTask = btn.querySelector('#txtTask');


btn.addEventListener('submit', function(e) {
    e.preventDefault();

    if (txtTask.value != '') {
        const txtDatum = deadLine.value == '' ? '' : `<span class="deadline">(deadline: ${deadLine.value})</span>`;
        tasks.innerHTML += `
        <div class="task">
            <span class="${selPriority.value} material-icons">assignment</span>
            <p class="tasktext">${txtTask.value}${txtDatum} </p>
            <span class="complete material-icons">more_horiz</span>
        </div>`;
    }
});

tasks.addEventListener('click', function(e) {
    if (!e.target.classList.contains('material-icons')) return;
    if (e.target.classList.add('done')) {
        e.target.classList.remove('done');
        e.target.innerHTML = 'more_horiz';
    } else {
        e.target.classList.add('done');
        e.target.innerText = 'done';
    }
});