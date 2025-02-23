document.addEventListener("DOMContentLoaded", function() {
    const taskInput = document.getElementById("taskInput");
    const prioritySelect = document.getElementById("priority");
    const addTaskBtn = document.getElementById("addTask");
    const taskList = document.getElementById("taskList");
    const toggleThemeBtn = document.getElementById("toggleTheme");

    function saveTasks() {
        localStorage.setItem("tasks", taskList.innerHTML);
    }

    function loadTasks() {
        taskList.innerHTML = localStorage.getItem("tasks") || "";
        addDeleteListeners();
    }

    function addDeleteListeners() {
        document.querySelectorAll(".delete").forEach(button => {
            button.addEventListener("click", function() {
                this.parentElement.remove();
                saveTasks();
            });
        });
    }

    addTaskBtn.addEventListener("click", function() {
        if (taskInput.value.trim() === "") return;
        const li = document.createElement("li");
        li.classList.add(prioritySelect.value);
        li.innerHTML = `${taskInput.value} <button class='delete'>❌</button>`;
        taskList.appendChild(li);
        taskInput.value = "";
        saveTasks();
        addDeleteListeners();
    });

    toggleThemeBtn.addEventListener("click", function() {
        document.body.classList.toggle("dark-mode");
    });

    new Sortable(taskList, {
        animation: 150,
        onEnd: saveTasks
    });

    loadTasks();
});
