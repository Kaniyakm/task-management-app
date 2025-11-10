// ========== STEP 1: INITIALIZE TASK ARRAY ==========
let tasks = [];

// ========== STEP 2: SELECT ELEMENTS ==========
const taskNameInput = document.getElementById('taskName');
const taskCategoryInput = document.getElementById('taskCategory');
const taskDeadlineInput = document.getElementById('taskDeadline');
const taskStatusInput = document.getElementById('taskStatus');
const addTaskBtn = document.getElementById('addTaskBtn');
const taskList = document.getElementById('taskList');

// ========== STEP 3: EVENT LISTENER FOR ADD BUTTON ==========
addTaskBtn.addEventListener('click', addTask);

// ========== STEP 4: FUNCTION TO ADD NEW TASK ==========
function addTask() {
  // Create a new task object
  const task = {
    id: Date.now(), // unique ID for each task
    name: taskNameInput.value,
    category: taskCategoryInput.value,
    deadline: taskDeadlineInput.value,
    status: taskStatusInput.value
  };

  // Validate that the task has a name before adding
  if (task.name.trim() === '') {
    alert('Please enter a task name.');
    return;
  }

  // Add to array
  tasks.push(task);

  // Clear input fields
  taskNameInput.value = '';
  taskCategoryInput.value = '';
  taskDeadlineInput.value = '';
  taskStatusInput.value = 'In Progress';

  // Update display
  displayTasks();
}

// ========== STEP 5: FUNCTION TO DISPLAY TASKS ==========

function displayTasks() {
  taskList.innerHTML = '';

  tasks.forEach((task, index) => {
    const li = document.createElement('li');
    li.innerHTML = `
      <strong>${task.name}</strong> (${task.category}) - Due: ${task.deadline}
      <select onchange="updateTaskStatus(${index}, this.value)">
        <option value="In Progress" ${task.status === "In Progress" ? "selected" : ""}>In Progress</option>
        <option value="Completed" ${task.status === "Completed" ? "selected" : ""}>Completed</option>
      </select>
      <span>Current: ${task.status}</span>
    `;
    taskList.appendChild(li);
  });
}

// Function to update status
function updateTaskStatus(index, newStatus) {
  tasks[index].status = newStatus;
  displayTasks();
}
