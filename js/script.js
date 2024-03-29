function pushItems(array, item) {
    // console.log(array);
    localStorage.setItem(item, JSON.stringify(array));
}
// Control input active
var isAnythingInInput = false;
inputBox.onkeyup = () => {
    let userData = inputBox.value;
    if (userData.trim() != 0) {
        addBtn.classList.add("active");
        isAnythingInInput = true;
    } else {
        addBtn.classList.remove("active");
        isAnythingInInput = false;
    }
}

showTasks();

// Add tasks to ~To Do~
function addTask() {
    let userData = inputBox.value;
    let getLocalStorage = localStorage.getItem("New Todo");
    if (getLocalStorage == null) {
        listArr = [];
    } else {
        listArr = JSON.parse(getLocalStorage);
    }
    listArr.push(userData);
    pushItems(listArr, "New Todo")
    showTasks();
    addBtn.classList.remove("active");
    isAnythingInInput = false;
}

// Add tasks to ~Done~
function checkTask(index) {
    let getDoList = localStorage.getItem("New Todo");
    let getDoneList = localStorage.getItem("Done");
    if (getDoneList == null) {
        listDone = [];
    } else {
        listDone = JSON.parse(getDoneList);
    }
    listDo = JSON.parse(getDoList);
    checkedTodo = listDo[index];
    listDo.splice(index, 1);
    listDone.push(checkedTodo);
    pushItems(listDo, "New Todo");
    pushItems(listDone, "Done");
    showTasks();
}

// Remove tasks from ~Done~ and add them to ~To Do~
function uncheckTask(index) {
    let getDoneList = localStorage.getItem("Done");
    let getDoList = localStorage.getItem("New Todo");
    if (getDoList == null) {
        listDo = [];
    } else {
        listDo = JSON.parse(getDoList);
    }
    listDone = JSON.parse(getDoneList);
    uncheckedTodo = listDone[index];
    listDone.splice(index, 1);
    listDo.push(uncheckedTodo);
    pushItems(listDo, "New Todo");
    pushItems(listDone, "Done");
    showTasks();
}

// Show tasks in ~To Do~ and ~Done~
function showTasks() {
    //  Get Local Items
    let getDoList = localStorage.getItem("New Todo"); 
    let getDoneList = localStorage.getItem("Done");
    
    let todoListLi= '';
    let doneListLi= '';
    // Check ~To Do~ exist
    if (getDoList == null) {
        listDo = [];
    } else {
        listDo = JSON.parse(getDoList);
    }
    // Check ~Done~ exist
    if (getDoneList == null) {
        listDone = [];
    } else {
        listDone = JSON.parse(getDoneList);
    }

    const pendingNum = document.querySelector(".pendingNum");
    const doneNum = document.querySelector(".doneNum");
    
    pendingNum.textContent = listDo.length;
    doneNum.textContent = listDone.length;
    if(listDo.length > 0) {
        deleteAllTodo.classList.add("active");
        todoListLi = "";
    } else {
        deleteAllTodo.classList.remove("active");
        todoListLi = `<li class="emptyLi"> There is no todo </li>`;
    }
    if(listDone.length > 0) {
        deleteAllDone.classList.add("active");
        doneListLi = "";
    } else {
        deleteAllDone.classList.remove("active");
        doneListLi = `<li class="emptyLi"> There is no task done </li>`;
    }
    // make To do ul
    listDo.forEach((element, index) => {
        todoListLi += `<li class="dropzone" id="${index}" draggable="true"> ${element} <span class="handler"><span class="delete" onclick="deleteTask(${index})"><i class="fas fa-trash"></i></span><span class="done" onclick="checkTask(${index})"><i class="fas fa-check"></i></span></span></li>`;
    });
    // make Done ul
    listDone.forEach((element, index) => {
        doneListLi += `<li class="sec-dropzone" id="${index}" draggable="true"> ${element} <span class="handler"><span class="delete" onclick="deleteDoneTask(${index})"><i class="fas fa-trash"></i></span><span class="done" onclick="uncheckTask(${index})"><i class="fas fa-times"></i></span></span></li>`;
    });
    todoList.innerHTML = todoListLi;
    doneListUl.innerHTML = doneListLi;
    inputBox.value= "";
}

// Delete Tasks from ~To Do~
function deleteTask(index) {
    let getLocalStorage = localStorage.getItem("New Todo");
    listArr = JSON.parse(getLocalStorage);
    listArr.splice(index, 1);
    pushItems(listArr, "New Todo");
    showTasks();
}

// Delete Tasks from ~Done~
function deleteDoneTask(index) {
    let getLocalStorage = localStorage.getItem("Done");
    listArr = JSON.parse(getLocalStorage);
    listArr.splice(index, 1);
    pushItems(listArr, "Done");
    showTasks();
}

// Delete all Tasks from ~To Do~
deleteAllTodo.onclick = ()=>{
    listArr = []; // Empty list to set ~New To Do~ empty
    pushItems(listArr, "New Todo");
    showTasks();
}

// Delete all Tasks from ~Done~
deleteAllDone.onclick = ()=>{
    listArr = []; // Empty list to set ~Done~ empty
    pushItems(listArr, "Done");
    showTasks();
}

// Event key listener, when ~Enter~ pressed submit a ~To Do~
window.onload = ()=>{
    window.addEventListener(
      "keydown",
      function(event) {
        if (event.key == 'Enter') {
            if (isAnythingInInput) {
                addTask();
            }
        }
      }
    )
}

// Draggable Ul
let dragged;
let id;
let index;
let indexDrop;
let list;

document.addEventListener("dragstart", ({target}) => {
    dragged = target;
    id = target.id;
    list = target.parentNode.children;
    for(let i = 0; i < list.length; i += 1) {
        if(list[i] === dragged){
            index = i;
        }
    }
});

document.addEventListener("dragover", (event) => {
    event.preventDefault();
});

document.addEventListener("drop", ({target}) => {
    if(target.className == "dropzone" && target.id !== id) {
        // if (dragged.className == "sec-dropzone") {
        //     dragged.classList.remove("sec-dropzone");
        //     dragged.classList.add("dropzone");
        //     sortedList = [];
        //     dragged.remove( dragged );
        //     for(let i = 0; i < list.length; i += 1) {
        //         if(list[i] === target){
        //             indexDrop = i;
        //         }
        //     }
        //     // console.log(index, indexDrop);
        //     if(index > indexDrop) {
        //         target.before( dragged );
        //     } else {
        //         target.after( dragged );
        //     }
        //     for(let i = 0; i < list.length; i += 1) {
        //         sortedList.push(list[i].innerText);
        //     }
        //     pushItems(sortedList, "New To do");
        // } else if (dragged.className == "dropzone") {
            sortedList = [];
            dragged.remove( dragged );
            for(let i = 0; i < list.length; i += 1) {
                if(list[i] === target){
                    indexDrop = i;
                }
            }
            // console.log(index, indexDrop);
            if(index > indexDrop) {
                target.before( dragged );
            } else {
                target.after( dragged );
            }
            for(let i = 0; i < list.length; i += 1) {
                sortedList.push(list[i].innerText);
                // console.log(sortedList);
            }
            pushItems(sortedList, "New Todo");
            showTasks();
        // }
    } else if(target.className == "sec-dropzone" && target.id !== id) {
        // if (dragged.className == "sec-dropzone") {
            sortedList = [];
            dragged.remove( dragged );
            for(let i = 0; i < list.length; i += 1) {
                if(list[i] === target){
                    indexDrop = i;
                }
            }
            // console.log(index, indexDrop);
            if(index > indexDrop) {
                target.before( dragged );
            } else {
                target.after( dragged );
            }
            for(let i = 0; i < list.length; i += 1) {
                sortedList.push(list[i].innerText);
            }
            pushItems(sortedList, "Done");
            showTasks();
        // } else if(dragged.className == "dropzone") {
        //     dragged.classList.remove("dropzone");
        //     dragged.classList.add("sec-dropzone");
        // }
    }
    target.style.opacity = 1;
});

// Night Mode
let nightmode = true;
if (nightmode) {
    nightmode = false;
    nightModeToggler.style.color= "gray";
    // optionModeToggler.style.color= "gray";
    nightModeToggler.innerHTML = `<i class="fas fa-moon">`;
    nightModeToggler.classList.add("dropshadow-moon");
}
function toggleNightMode() {
    if (!nightmode) {
        nightmode = true;
        nightModeToggler.style.color= "white";
        // optionModeToggler.style.color= "white";
        nightModeToggler.innerHTML = `<i class="fas fa-sun">`;
        nightModeToggler.classList.remove("dropshadow-moon");
    } else {
        nightmode = false;
        nightModeToggler.style.color= "gray";
        // optionModeToggler.style.color= "gray";
        nightModeToggler.innerHTML = `<i class="fas fa-moon">`;
        nightModeToggler.classList.add("dropshadow-moon");
    }
    document.querySelector("#todo-wrapper").classList.toggle("light-wrapper");
    document.querySelector("#done-wrapper").classList.toggle("light-wrapper");
    document.querySelector("body").classList.toggle("light-bg");
    document.querySelector(".header h1").classList.toggle("header-dark");
}

// var optionmode = false;
// function toggleOptionMode() {
//     if (optionmode) {
//         optionmode = false;
//         document.querySelector(".option1").style.display= "none";
//     } else {
//         optionmode = true;
//         document.querySelector(".option1").style.display= "block";
//     }
// }
