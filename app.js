document.addEventListener("DOMContentLoaded", function () {
  const taskList = document.getElementById("taskList");
  const newTaskInput = document.getElementById("newTask");
  const addTaskBtn = document.getElementById("addTaskBtn");

  addTaskBtn.addEventListener("click", addTask);

  // Fetch tasks from an API (replace 'your-api-endpoint' with the actual API endpoint)
  fetch("your-api-endpoint")
    .then((response) => response.json())
    .then((data) => {
      // Display tasks fetched from the API
      data.forEach((task) => displayTask(task));
    })
    .catch((error) => console.error("Error fetching tasks:", error));

  function addTask() {
    const taskText = newTaskInput.value;

    if (taskText.trim() === "") {
      alert("Please enter a valid task!");
      return;
    }

    // Create a new task object
    const task = { text: taskText, completed: false };

    // Display the task on the page
    displayTask(task);

    // Clear the input field
    newTaskInput.value = "";
  }

  function displayTask(task) {
    // Create a new list item
    const newTaskItem = document.createElement("li");
    newTaskItem.textContent = task.text;

    // Create buttons for completing and removing tasks
    const completeButton = document.createElement("button");
    completeButton.textContent = "Complete";
    completeButton.addEventListener("click", () =>
      completeTask(newTaskItem, task)
    );

    const removeButton = document.createElement("button");
    removeButton.textContent = "Remove";
    removeButton.addEventListener("click", () => removeTask(newTaskItem));

    // Append buttons to the task item
    newTaskItem.appendChild(completeButton);
    newTaskItem.appendChild(removeButton);

    // Append the new task to the task list
    taskList.appendChild(newTaskItem);
  }

  function completeTask(taskItem, task) {
    // Toggle the completed status of the task
    task.completed = !task.completed;

    // Update the task item's style based on completion status
    taskItem.style.textDecoration = task.completed ? "line-through" : "none";
  }

  function removeTask(taskItem) {
    // Remove the task item from the task list
    taskList.removeChild(taskItem);
  }
});
