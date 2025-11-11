//  STEP 1: INITIALIZE TASK ARRAY 
let tasks = [];

// STEP 1.5: LOAD SAVED TASKS FROM LOCAL STORAGE 
if (localStorage.getItem("tasks")) {
  tasks = JSON.parse(localStorage.getItem("tasks"));
  displayTasks(); // display tasks immediately when page loads
}
// STEP 2: SELECT ELEMENTS 
const taskNameInput = document.getElementById('taskName');
const taskCategoryInput = document.getElementById('taskCategory');
const taskDeadlineInput = document.getElementById('taskDeadline');
const taskStatusInput = document.getElementById('taskStatus');
const addTaskBtn = document.getElementById('addTaskBtn');
const taskList = document.getElementById('taskList');
const filterStatus = document.getElementById('filterStatus');
const filterCategory = document.getElementById('filterCategory');


//  STEP 3: EVENT LISTENER FOR ADD BUTTON 
addTaskBtn.addEventListener('click', addTask);
filterStatus.addEventListener('change', displayTasks);
filterCategory.addEventListener('input', displayTasks);


// STEP 4: FUNCTION TO ADD NEW TASK 
function addTask() {
  const task = {
    id: Date.now(), // unique ID
    name: taskNameInput.value,
    category: taskCategoryInput.value,
    deadline: taskDeadlineInput.value,
    status: taskStatusInput.value
  };

  // Validate
  if (task.name.trim() === '') {
    alert('Please enter a task name.');
    return;
  }

  // Add task
  tasks.push(task);

  // Save to local storage
  localStorage.setItem("tasks", JSON.stringify(tasks));

  // Clear input fields
  taskNameInput.value = '';
  taskCategoryInput.value = '';
  taskDeadlineInput.value = '';
  taskStatusInput.value = 'In Progress';

  // Refresh display
  displayTasks();
}

// STEP 5: FUNCTION TO DISPLAY TASKS 
function displayTasks() {
  taskList.innerHTML = '';

  // Apply filters before rendering
  const statusFilter = filterStatus.value;
  const categoryFilter = filterCategory.value.toLowerCase();

  const filteredTasks = tasks.filter(task => {
    const statusMatch = statusFilter === 'All' || task.status === statusFilter;
    const categoryMatch =
      categoryFilter === '' ||
      task.category.toLowerCase().includes(categoryFilter);
    return statusMatch && categoryMatch;
  });

  // Render only filtered tasks
  filteredTasks.forEach((task, index) => {
    const li = document.createElement('li');

    if (task.status === "Overdue") {
      li.style.color = "red";
      li.style.fontWeight = "bold";
    }

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
  localStorage.setItem("tasks", JSON.stringify(tasks));
  displayTasks();
}

// STEP 7: FUNCTION TO CHECK OVERDUE TASKS 
function checkOverdueTasks() {
  const today = new Date().toISOString().split("T")[0]; // today's date (YYYY-MM-DD)

  tasks.forEach(task => {
    if (task.deadline && task.deadline < today && task.status !== "Completed") {
      task.status = "Overdue";
    }
  });

  localStorage.setItem("tasks", JSON.stringify(tasks));
  displayTasks();
}

// STEP 8: INITIALIZE APP ON PAGE LOAD 
checkOverdueTasks();
displayTasks();


