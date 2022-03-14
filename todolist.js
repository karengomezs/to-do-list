var buttonTask = document.getElementById("buttonTask");
buttonTask.addEventListener("click", addTask);
var enterUser = document.getElementById("input");
enterUser.addEventListener("keydown", logKey);


function logKey(e) {
    if (e.keyCode === 13) {
        addTask();
    }
}

function addTask() {
    var value = enterUser.value;
    var list = document.querySelector(".list");
    var isValueEmpty = value === "";


    if (isValueEmpty) {
        return alert("please, add a new note");
    }
    list.innerHTML += `<li class="toDo"> <input type="checkbox" class="check"> <span class="text">${value}</span> </li>`;

    enterUser.value = "";

    attacheListener();
}


function attacheListener() {


    var toDos = document.querySelectorAll(".toDo");
    var numberOf = document.querySelector(".number-of");
    var attache = document.querySelectorAll(".done")
    var numberOfNotes = toDos.length;
    var taskOk = attache.length;
    numberOf.innerHTML = `${taskOk} <p> / </p> ${numberOfNotes}`
    numberOf.innerHTML = `${numberOfNotes}`;

    for (var toDo of toDos) {

        toDo.addEventListener("click", handleClick);
    }
}


function handleClick(e) {
    var isInput = e.target.nodeName === "INPUT";

    if (isInput) {
        var sibling = e.target.nextElementSibling;

        sibling.classList.toggle("done");
    }
    var toDos = document.querySelectorAll(".toDo");
    var numberOf = document.querySelector(".number-of");
    var attache = document.querySelectorAll(".done")
    var numberOfNotes = toDos.length;
    var taskOk = attache.length;
    numberOf.innerHTML = `${taskOk} <p> / </p> ${numberOfNotes}`

}