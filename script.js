"use strict";
const AppState = {
  tasks: [],
  finance: [],
  focus: []
};

const newEntryBtn = document.querySelector(".btn");
const overlay = document.getElementById("overlay");
const closeBtn = document.getElementById("closeBtn");
const saveBtn = document.querySelector(".save-btn");
const menuItems = document.querySelectorAll(".sidebar li");
const header=document.querySelector(".header");
const cards=document.querySelector(".cards");
const score=document.querySelector(".score");
const newTaskblock=document.querySelector(".NewTaskblock");
const addNewTask=document.querySelector("#addnewtask");
const enternewTask=document.querySelector("#enternewtask");
const tasksContainer = document.querySelector(".tasks");
const taskList = document.querySelector("#taskList");
const dailytasks=document.querySelector(".DailyTasks");
  const modalInput = document.querySelector("#task input");

  const tasktogglebtn=document.querySelector(".taskstoggle");
  const calendertogglebtn=document.querySelector(".calendertoggle");
const calendersection=document.querySelector(".calendersection");

function ShowOnlyTaskMode(){
  document.querySelector('[data-type="finance"]').style.display="None";
  document.querySelector('[data-type="focus"]').style.display="None";
}

function ShowEveryTab(){
  document.querySelectorAll(".tab").forEach(tab=>{
    tab.style.display="inline-block";
  })
}

addNewTask.addEventListener("click", ()=>{
 
    overlay.classList.remove("hidden");
    ShowOnlyTaskMode();
   document.querySelectorAll(".section").forEach(sec => {
    sec.classList.remove("active");
      });

      document.getElementById("task").classList.add("active");

  // highlight TASK tab
  document.querySelectorAll(".tab").forEach(tab => {
    tab.classList.remove("active");
  });
   document.querySelector('[data-type="task"]').classList.add("active");
    modalInput.value = enternewTask.value;

});


// Open modal
newEntryBtn.addEventListener("click", () => {
  overlay.classList.remove("hidden");
  ShowEveryTab();
});
 
// Close modal
closeBtn.addEventListener("click", () => {
  overlay.classList.add("hidden");
});

// Switch tabs
document.querySelectorAll(".tab").forEach(btn => {
  btn.addEventListener("click", () => {

    // remove active from tabs
    document.querySelector(".tab.active").classList.remove("active");
    btn.classList.add("active");

    // switch section
    document.querySelector(".section.active").classList.remove("active");
    document.getElementById(btn.dataset.type).classList.add("active");

  });
});

saveBtn.addEventListener("click", () => {
  const type = document.querySelector(".tab.active").dataset.type;
  if (type === "task") saveTask();
  if (type === "finance") saveFinance();
  if (type === "focus") saveFocus();
  overlay.classList.add("hidden");
});
// ================= SAVE FUNCTIONS =================
function saveTask() {

   const topInput = document.querySelector("#enternewtask").value;
  const modalInput = document.querySelector("#task input").value;
  const title = topInput || modalInput || "";

  let taskcount=0;

  const activepriority= document.querySelector(".priority .active");

  const priority=activepriority?activepriority.innerText:"None";

  const Duedate=document.querySelector(".TaskDueDate input").value;

  if(!title.trim()) return;
  const TaskDiv=document.createElement("div");
TaskDiv.classList.add("task");

  TaskDiv.innerHTML=`
  <div class="Taskdetails" type=>
    <div class="TaskTitleAndCheckbox">
<input  class="taskcheckbox" type="checkbox"><p class="TaskTitle">${title}</p> </div>
<div class="TaskPriorityAndDueDate">
  <span class="TaskPriority">${priority}</span>
  <span class="TaskDueDate">${Duedate}</span>
  </div>
  </div>
  `;
  
taskList.appendChild(TaskDiv);
updateTaskcompletedcard();
taskcount++;

document.querySelector("#enternewtask").value = "";
document.querySelector("#task input").value="";
document.querySelector(".TaskDueDate input").value="";

 if (modalInput) {
    overlay.classList.add("hidden");
  }
}

 taskList.addEventListener("click", (e)=>{
if(e.target.classList.contains("taskcheckbox")){
  const Task=e.target.closest(".Taskdetails");
  const Title= Task.querySelector(".TaskTitle");
if(e.target.checked){
  Title.style.textDecoration = "line-through";
}
else{
  Title.style.textDecoration = "none";
}
 updateTaskcompletedcard();
}
});

function updateTaskcompletedcard(){
  const dailytasks=document.querySelector(".DailyTasks");
  const totalTasks=taskList.children.length;
  const completedtask=document.querySelectorAll(".taskcheckbox:checked").length;


  dailytasks.innerText=`Tasks remaining: ${completedtask} / ${totalTasks}`;
  dailytasks.style.fontWeight = "bold";
}


function saveFinance() {
  const amount = Number(document.querySelector("#finance input[type='number']").value);
  const category = document.querySelector("#finance input[type='text']").value;
  if (!amount) return;
  AppState.finance.push({
    amount,
    category
  });
  document.querySelector("#finance input[type='number']").value = "";
  document.querySelector("#finance input[type='text']").value = "";
}
function saveFocus() {
  const time = document.querySelector("#focus input[type='time']").value;
  const mode = document.querySelector("#focus input[type='text']").value;
  if (!time) return;
  AppState.focus.push({
    time,
    mode
  });
  document.querySelector("#focus input[type='time']").value = "";
  document.querySelector("#focus input[type='text']").value = "";
}
// ================= SIDEBAR NAVIGATION =================
menuItems.forEach(item => {
  item.addEventListener("click", () => {
    // active highlight
    document.querySelector(".sidebar li.active").classList.remove("active");
    item.classList.add("active");
    const page = item.dataset.page;
    if (page === "dashboard") showDashboard();
    if (page === "tasks") showTasks();
    if (page === "finance") showFinance();
    if (page === "focus") showFocus();
  });
});
// ================= DISPLAY FUNCTIONS =================
// 👉 Dashboard Reset
// function showDashboard() {
//   location.reload(); // simple reset (for now)
// }

// function showDashboard(){
 
  
//   dailytasks.innerHTML=``
// }
function showTasks() {
    header.style.display = "none";
  cards.style.display = "none";
  score.style.display = "none";
  newTaskblock.classList.remove("hidden");

  
  const container = document.querySelector(".tasks");
    container.style.display="block";

  // container.innerHTML += "<h3>All Tasks</h3>";
  AppState.tasks.forEach(task => {
    container.innerHTML += `
      <div class="task">
        <p>${task.title}</p>
        <span>${task.priority}</span>
          <span>${task.duedate}</span>
        
      </div>
    `;
  });
}

// 👉 Show Finance
function showFinance() {
  const container = document.querySelector(".tasks");
  container.innerHTML = "<h3>Finance Details</h3>";
  AppState.finance.forEach(f => {
    container.innerHTML += `
      <div>
        <p>$${f.amount}</p>
        <span>${f.category}</span>
      </div>
    `;
  });
}
// 👉 Show Focus
function showFocus() {
  const container = document.querySelector(".tasks");
  container.innerHTML = "<h3>Focus Sessions</h3>";
  AppState.focus.forEach(f => {
    container.innerHTML += `
      <div>
        <p>${f.time}</p>
        <span>${f.mode}</span>
      </div>
    `;
  });
}

const priorityButtons = document.querySelectorAll(".priority button");

priorityButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    
    // remove active from all
    priorityButtons.forEach(b => b.classList.remove("active"));
    
    // add active to clicked button
    btn.classList.add("active");
  });
});


//toggle btn logic
tasktogglebtn.addEventListener("click", ()=>{
  tasktogglebtn.classList.add("showbtn");
  calendertogglebtn.classList.remove("showbtn");
});

calendertogglebtn.addEventListener("click", ()=>{
  calendertogglebtn.classList.add("showbtn");
  tasktogglebtn.classList.remove("showbtn");
  tasksContainer.style.display="none";
calendersection.style.display="block";
})


//calender logic
//
