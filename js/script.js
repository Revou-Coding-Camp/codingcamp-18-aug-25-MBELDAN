document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("todo-form");
  const todoInput = document.getElementById("todo-input");
  const dateInput = document.getElementById("date-input");
  const todoList = document.getElementById("todo-list");
  const filterInput = document.getElementById("filter-input");
  const deleteAllBtn = document.getElementById("delete-all");

  const totalTasks = document.getElementById("total-tasks");
  const completedTasks = document.getElementById("completed-tasks");
  const pendingTasks = document.getElementById("pending-tasks");
  const progress = document.getElementById("progress");

  let todos = [];

  // Update Statistik
  function updateStats() {
    const total = todos.length;
    const completed = todos.filter(t => t.completed).length;
    const pending = total - completed;
    const prog = total === 0 ? 0 : Math.round((completed / total) * 100);

    totalTasks.textContent = total;
    completedTasks.textContent = completed;
    pendingTasks.textContent = pending;
    progress.textContent = prog + "%";
  }

  // Render list
  function renderTodos() {
    todoList.innerHTML = "";

    todos.forEach((todo, index) => {
      const li = document.createElement("li");
      li.innerHTML = `
        <span>${todo.text} - <small>${todo.date}</small> [${todo.completed ? "✅ Done" : "⌛ Pending"}]</span>
        <div class="todo-actions">
          <button class="complete-btn">${todo.completed ? "Undo" : "Done"}</button>
          <button class="delete-btn">Hapus</button>
        </div>
      `;

      // Tombol Done/Undo
      li.querySelector(".complete-btn").addEventListener("click", () => {
        todos[index].completed = !todos[index].completed;
        renderTodos();
      });

      // Tombol Hapus
      li.querySelector(".delete-btn").addEventListener("click", () => {
        todos.splice(index, 1);
        renderTodos();
      });

      todoList.appendChild(li);
    });

    updateStats();
  }

  // Tambah To-Do
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const todoText = todoInput.value.trim();
    const todoDate = dateInput.value;

    if (todoText === "" || todoDate === "") {
      alert("Isi kegiatan dan tanggal dulu ya!");
      return;
    }

    todos.push({ text: todoText, date: todoDate, completed: false });

    todoInput.value = "";
    dateInput.value = "";

    renderTodos();
  });

  // Filter
  filterInput.addEventListener("keyup", () => {
    const filterValue = filterInput.value.toLowerCase();
    const items = todoList.getElementsByTagName("li");

    Array.from(items).forEach((item) => {
      const text = item.textContent.toLowerCase();
      item.style.display = text.includes(filterValue) ? "flex" : "none";
    });
  });

  // Hapus semua
  deleteAllBtn.addEventListener("click", () => {
    if (confirm("Yakin mau hapus semua?")) {
      todos = [];
      renderTodos();
    }
  });

  renderTodos();
});
