window.addEventListener("load", () => {
  const form = document.querySelector("#task_form");
  const input = document.querySelector("#task_input");
  const list_el = document.querySelector("#tasks");

  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  let completedTasks = JSON.parse(localStorage.getItem("completedTasks")) || [];

  function loadTasks() {
    list_el.innerHTML = "";
    tasks.forEach((task, index) => {
      const task_el = document.createElement("div");
      task_el.classList.add("task");

      const task_content_el = document.createElement("div");
      task_content_el.classList.add("content");

      task_el.appendChild(task_content_el);

      //checkbox

      const task_checkbox_el = document.createElement("input");
      task_checkbox_el.type = "checkbox";
      task_checkbox_el.classList.add("checkbox");

      if (completedTasks.includes(index)) {
        task_checkbox_el.checked = true;
      }

      task_content_el.appendChild(task_checkbox_el);

      const task_input_el = document.createElement("input");
      task_input_el.classList.add("text");
      task_input_el.type = "text";
      task_input_el.value = task;
      task_input_el.setAttribute("readonly", "readonly");

      if (completedTasks.includes(index)) {
        task_input_el.style.textDecoration = "line-through";
      }

      task_content_el.appendChild(task_input_el);

      const task_actions_el = document.createElement("div");
      task_actions_el.classList.add("actions");

      const task_edit_el = document.createElement("button");
      task_edit_el.classList.add("edit_btn");
      task_edit_el.innerText = "Edit";

      const task_delete_el = document.createElement("button");
      task_delete_el.classList.add("delete_btn");
      task_delete_el.innerText = "Delete";

      task_actions_el.appendChild(task_edit_el);
      task_actions_el.appendChild(task_delete_el);

      task_el.appendChild(task_actions_el);

      list_el.appendChild(task_el);

      task_checkbox_el.addEventListener("change", (evt) => {
        if (task_checkbox_el.checked) {
          task_input_el.style.textDecoration = "line-through";
          completedTasks.push(index);
          localStorage.setItem(
            "completedTasks",
            JSON.stringify(completedTasks)
          );
        } else {
          task_input_el.style.textDecoration = "none";
          completedTasks = completedTasks.filter((i) => i !== index);
          localStorage.setItem(
            "completedTasks",
            JSON.stringify(completedTasks)
          );
        }
      });

      task_edit_el.addEventListener("click", (evt) => {
        if (task_edit_el.innerText.toLowerCase() == "edit") {
          task_edit_el.innerText = "Save";
          task_input_el.removeAttribute("readonly");
          task_input_el.focus();
        } else {
          task_edit_el.innerText = "Edit";
          task_input_el.setAttribute("readonly", "readonly");
          tasks[index] = task_input_el.value;
          localStorage.setItem("tasks", JSON.stringify(tasks));
        }
      });

      task_delete_el.addEventListener("click", (evt) => {
        tasks = tasks.filter((t) => t !== task);
        completedTasks = completedTasks.filter((i) => i !== index);
        localStorage.setItem("tasks", JSON.stringify(tasks));
        localStorage.setItem("completedTasks", JSON.stringify(completedTasks));
        loadTasks();
      });
    });
  }

  loadTasks();

  form.addEventListener("submit", (evt) => {
    evt.preventDefault();

    const putSomething = document.querySelector(".putSomething");
    const okBtn = document.querySelector(".ok_btn");

    okBtn.addEventListener("click", (evt) => {
      putSomething.style.display = "none";
    });

    if (input.value === "") {
      putSomething.style.display = "block";
      document.body.appendChild(putSomething);
      return;
    } else {
      putSomething.style.display = "none";
    }

    tasks.push(input.value);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    input.value = "";
    loadTasks();
  });
});
