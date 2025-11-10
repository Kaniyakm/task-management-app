// Step 1: Create an empty array to store all tasks
let tasks = [];

// Step 2: Select elements
const taskNameInput = document.getElementById('taskName');
const taskCategoryInput = document.getElementById('taskCategory');
const taskDeadlineInput = document.getElementById('taskDeadline');
const taskStatusInput = document.getElementById('taskStatus');
const addTaskBtn = document.getElementById('addTaskBtn');
const taskList = document.getElementById('taskList');

// Step 3: Add event listener for button click
addTaskBtn.addEventListener('click', addTask);

// Step 4: Define addTask function
function addTask() {
  // Create a new task object
  const task = {
    name: taskNameInput.value,
    category: taskCategoryInput.value,
    deadline: taskDeadlineInput.value,
    status: taskStatusInput.value
  };

  // Add task to the array
  tasks.push(task);

  // Clear input fields
  taskNameInput.value = '';
  taskCategoryInput.value = '';
  taskDeadlineInput.value = '';
  taskStatusInput.value = 'In Progress';

  // Display updated list
  displayTasks();
}

// Step 5: Function to display tasks
function checkOverdue() {
  const today = new Date().toISOString().split("T")[0];
  tasks.forEach(task => {
    if (task.deadline < today && task.status !== "Completed") {
      task.status = "Overdue";
    }
  });
  saveTasks();
  displayTasks();
}