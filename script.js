const addBtn = document.getElementById('add-btn');
const taskInput = document.getElementById('task-input');
const taskList = document.getElementById('task-list');
const taskCount = document.getElementById('task-count');

function updateCount() {
  const count = document.querySelectorAll('.task-item').length;
  taskCount.textContent = `${count} task${count !== 1 ? 's' : ''}`;

  const emptyState = document.querySelector('.empty-state');
  if (count === 0) {
    if (!emptyState) {
      const msg = document.createElement('p');
      msg.className = 'empty-state';
      msg.textContent = 'No tasks yet. Start by adding one! 🚀';
      taskList.appendChild(msg);
    }
  } else {
    if (emptyState) {
      emptyState.remove();
    }
  }
}

function createTask(taskText) {
  const li = document.createElement('li');
  li.className = 'task-item';

  const span = document.createElement('span');
  span.textContent = taskText;

  const actions = document.createElement('div');
  actions.className = 'task-actions';

  const completeBtn = document.createElement('button');
  completeBtn.className = 'complete-btn';
  completeBtn.textContent = '✔';

  const deleteBtn = document.createElement('button');
  deleteBtn.className = 'delete-btn';
  deleteBtn.textContent = '✖';

  completeBtn.addEventListener('click', () => {
    li.classList.toggle('completed');
  });

  deleteBtn.addEventListener('click', () => {
    li.remove();
    updateCount();
  });

  actions.appendChild(completeBtn);
  actions.appendChild(deleteBtn);

  li.appendChild(span);
  li.appendChild(actions);

  taskList.appendChild(li);
  updateCount();
}

addBtn.addEventListener('click', () => {
  const taskText = taskInput.value.trim();
  if (taskText === '') return;
  createTask(taskText);
  taskInput.value = '';
  taskInput.focus();
});

taskInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    addBtn.click();
  }
});

updateCount();
