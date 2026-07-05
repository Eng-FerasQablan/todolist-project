// This function gets the current date
function getDate() {
  // Create a new Date object
  var now = new Date();

  // Get the current day
  var day = now.getDate();

  // Get the current month
  var month = now.getMonth() + 1;

  // Get the current year
  var year = now.getFullYear();

  // Return the date
  return day + "/" + month + "/" + year;
}

// This function saves all tasks from HTML to Local Storage
function saveTasksToLocalStorage() {
  // Get all task elements
  var tasks = document.querySelectorAll(".task");

  // Create empty array
  var tasksArray = [];

  // Loop through all tasks
  tasks.forEach(function (task) {
    // Get task title
    var title = task.querySelector("h3").textContent;

    // Get task date
    var date = task.querySelector(".date").childNodes[0].textContent.trim();

    // Check if task is completed
    var completed = task.classList.contains("done");

    // Add task object to array
    tasksArray.push({
      title: title,
      date: date,
      completed: completed
    });
  });

  // Save tasks in Local Storage
  localStorage.setItem("tasks", JSON.stringify(tasksArray));
}

// This function loads tasks from Local Storage
function loadTasksFromLocalStorage() {
  // Get saved tasks
  var savedTasks = JSON.parse(localStorage.getItem("tasks"));

  // If Local Storage is empty, save default HTML tasks
  if (savedTasks === null || savedTasks.length === 0) {
    saveTasksToLocalStorage();
    return;
  }

  // Get tasks container
  var tasksContainer = document.getElementById("tasks");

  // Clear current tasks
  tasksContainer.innerHTML = "";

  // Loop through saved tasks
  savedTasks.forEach(function (task) {
    // Create task div
    var newTask = document.createElement("div");

    // Add task class
    newTask.className = task.completed ? "task done" : "task";

    // Add task content
    newTask.innerHTML = `
      <div class="task-info">
        <h3>${task.title}</h3>
        <div class="date">
          ${task.date} <i class="fa-regular fa-calendar-days"></i>
        </div>
      </div>

      <div class="actions">
        <button class="edit" onclick="editTask(this)">
          <i class="fa-solid fa-pen"></i>
        </button>

        <button
          class="done-btn"
          onclick="toggleTask(this)"
          style="background:${task.completed ? "#8b0000" : "#009b2e"};"
        >
          <i class="fa-solid ${task.completed ? "fa-xmark" : "fa-check"}"></i>
        </button>

        <button class="delete" onclick="deleteTask(this)">
          <i class="fa-solid fa-trash"></i>
        </button>
      </div>
    `;

    // Add task to page
    tasksContainer.appendChild(newTask);
  });
}

// This function adds a new task
function addTask() {
  // Ask user to enter task title
  var title = prompt("اكتب اسم المهمة:");

  // Stop if input is empty
  if (title === null || title.trim() === "") {
    return;
  }

  // Get tasks container
  var tasksContainer = document.getElementById("tasks");

  // Create new task div
  var newTask = document.createElement("div");

  // Add task class
  newTask.className = "task";

  // Add task content
  newTask.innerHTML = `
    <div class="task-info">
      <h3>${title}</h3>
      <div class="date">
        ${getDate()} <i class="fa-regular fa-calendar-days"></i>
      </div>
    </div>

    <div class="actions">
      <button class="edit" onclick="editTask(this)">
        <i class="fa-solid fa-pen"></i>
      </button>

      <button class="done-btn" onclick="toggleTask(this)">
        <i class="fa-solid fa-check"></i>
      </button>

      <button class="delete" onclick="deleteTask(this)">
        <i class="fa-solid fa-trash"></i>
      </button>
    </div>
  `;

  // Add new task to page
  tasksContainer.appendChild(newTask);

  // Save changes
  saveTasksToLocalStorage();
}

// This function deletes a task
function deleteTask(button) {
  // Ask user before deleting
  var confirmDelete = confirm("هل تريد بالتأكيد حذف هذه المهمة؟");

  // Stop if user clicks cancel
  if (confirmDelete === false) {
    return;
  }

  // Get selected task
  var task = button.closest(".task");

  // Remove task
  task.remove();

  // Save changes
  saveTasksToLocalStorage();
}

// This function edits a task
function editTask(button) {
  // Get selected task
  var task = button.closest(".task");

  // Get task title
  var title = task.querySelector("h3");

  // Ask user for new title
  var newTitle = prompt("عدّل اسم المهمة:", title.textContent);

  // Stop if input is empty
  if (newTitle === null || newTitle.trim() === "") {
    return;
  }

  // Update title
  title.textContent = newTitle;

  // Save changes
  saveTasksToLocalStorage();
}

// This function completes or cancels task completion
function toggleTask(button) {
  // Get selected task
  var task = button.closest(".task");

  // Toggle done class
  task.classList.toggle("done");

  // If task is completed
  if (task.classList.contains("done")) {
    // Change button color to red
    button.style.background = "#8b0000";

    // Change icon to X
    button.innerHTML = `<i class="fa-solid fa-xmark"></i>`;
  } else {
    // Change button color to green
    button.style.background = "#009b2e";

    // Change icon to check
    button.innerHTML = `<i class="fa-solid fa-check"></i>`;
  }

  // Save changes
  saveTasksToLocalStorage();
}

// Load tasks when page opens
loadTasksFromLocalStorage();