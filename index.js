let taskInp = document.querySelector(".todo");
let taskDate = document.querySelector("#date");
let add = document.querySelector(".add");
let check = document.querySelector(".checkbox");

// add tasks when page reloads

let tasks = JSON.parse(localStorage.getItem("todoTasks"));

if (tasks != null && tasks.length > 1) {
  tasks.forEach((x, index) => {
    if (index >= 1) {
      let todo = `
<div class="grid pending">
<input type="checkbox" name="check" class="checkbox">
<p class="work">${x.todo}</p>
<p class="finishdate">${x.date}</p>
</div>
<div class="line"></div>
`;
      document.querySelector(".flex").innerHTML += todo;
    }
  });
}

// invoke and add tasks to the array when add new button is clicked

add.addEventListener("click", () => {
  let task = taskInp.value;
  let date = taskDate.value;
  if (task === "" || date === "") {
    alert("Please enter a task and press add new!");
    return;
  }
  let todo = `
<div class="grid pending">
<input type="checkbox" name="check" class="checkbox">
<p class="work">${task}</p>
<p class="finishdate">${date}</p>
</div>
<div class="line"></div>
`;
  document.querySelector(".flex").innerHTML += todo;
  taskInp.value = taskDate.value = "";

  let temp = {
    todo: task,
    date: date,
  };
  if (tasks == null) tasks = [{}];
  tasks.push(temp);
  localStorage.setItem("todoTasks", JSON.stringify(tasks));
});

// reset button

document.querySelector(".reset").addEventListener("click", () => {
  localStorage.clear();
  window.location.reload();
  tasks = [{}];
  console.log("reset");
});

// delete the selected checkboxes

document.querySelector(".delete").addEventListener("click", () => {
  let boxes = document.querySelectorAll(".checkbox");
  let toRemove = [];
  boxes.forEach((item, index) => {
    if (item.checked) {
      toRemove.push(index);
    }
  });

  let temp = JSON.parse(localStorage.getItem("todoTasks" || "[{}]"));
  toRemove.forEach((item, index) => {
    temp.splice(item + 1, 1);
  });
  localStorage.setItem("todoTasks", JSON.stringify(temp));
  window.location.reload();
});
