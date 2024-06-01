const TODOLIST_APP = "TODOLIST_APP";
let data = [
  {
    task: "Run 2km",
    is_complete: true,
  },
  {
    task: "Learn JS beginner",
    is_complete: false,
  },
];

// save LocalStorage

const saveData = (data) => {
  localStorage.setItem(TODOLIST_APP, JSON.stringify(data));
};
// saveData(data);

const loadData = () => {
  let data;
  data = JSON.parse(localStorage.getItem(TODOLIST_APP));
  data = data ? data : []; //nếu chưa có dữ liệu trong data thì trả về mảng rỗng
  return data;
};
// data = loadData();
// console.log(data);

const addTask = (new_task) => {
  let data;
  data = loadData();
  // data.push(new_task);
  data = [...data, new_task];
  saveData(data);
};

// creatTaskItem
const creatTaskItem = (task, is_complete, index) => {
  return `
<li class="task-item" index = ${index} is-complete = ${is_complete}>
  <span onclick="markTaskComplete(${index})" class="task">${task}</span>
  <div class="task-actions">
    <button type="button" onclick = 'pushEditTask(${index})'>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        class="w-6 h-6"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"
        />
      </svg>
    </button>
    <button onclick="deleteTask(this, ${index})">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        class="w-6 h-6"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
        />
      </svg>
    </button>
  </div>
</li>
  
  `;
};

////renderTask() xuất dữ liệu lên màn hình
const renderTask = () => {
  let data, ulTasksHTML, ulTask, task_result, count_complete;
  task_result = document.querySelector(".task-result");
  ulTask = document.querySelector("ul.tasks");
  data = loadData();
  count_complete = 0;
  ulTasksHTML = data.map((element, index) => {
    if (element.is_complete == true) count_complete++;
    return creatTaskItem(element.task, element.is_complete, index);
  });
  task_result.textContent = `You have completed ${count_complete} tasks`;
  ulTask.innerHTML = ulTasksHTML.join("");
};

const markTaskComplete = (index) => {
  let data;
  data = loadData();
  data[index].is_complete = data[index].is_complete == true ? false : true;
  saveData(data);
  console.log(data[index]);
  renderTask();
};

const deleteTask = (element, index) => {
  // console.log(element);
  // console.log(index);
  let data;
  let delete_confirm = confirm("Do you want to remove this task!!");
  if (delete_confirm == false) return false;
  data = loadData();
  data.splice(index, 1);
  saveData(data);
  element.closest(".task-item").remove();
  // renderTask();
};

//editTask()
const pushEditTask = (index) => {
  let data = loadData();
  const btn = document.querySelector("#add-task button");
  // console.log(btn);
  const task = document.querySelector("#task");
  task.value = data[index].task;
  task.setAttribute("index", index);
  btn.innerText = "EDIT TASK";
  // console.log(data[index]);
};

const editTask = (task, index) => {
  let data = loadData();
  data[index].task = task;
  const btn = document.querySelector("#add-task button");
  btn.innerText = "ADD TASK";
  saveData(data);
};

const formAddTask = document.getElementById("add-task");

formAddTask.addEventListener("submit", (e) => {
  let new_task;
  const task = document.querySelector("#task");
  // console.log(task.value);
  const index = task.getAttribute("index");

  if (task.value.length < 1) {
    alert("Enter your task!!");
    return false;
  }

  if (index) {
    editTask(task.value, index);
    task.removeAttribute("index");
  } else {
    new_task = {
      task: task.value,
      is_complete: false,
    };
    addTask(new_task);
  }

  renderTask();
  task.value = "";
  // console.log(loadData());

  e.preventDefault();
});

document.addEventListener("keyup", (e) => {
  const task = document.querySelector("#task");
  const btn = document.querySelector("#add-task button");
  if (e.which == 27) {
    task.value = "";
    task.removeAttribute('index');
    btn.innerText = "ADD TASK";
  }
});

renderTask();
