var buttonTask = document.getElementById("buttonTask");
buttonTask.addEventListener("click", addTask);
var enterUser = document.getElementById("input");
enterUser.addEventListener("keydown", logKey);

const buttonDelete = document.querySelector(".delete-button");
buttonDelete.addEventListener("click", deleteAll);

function deleteAll() {
    //console.log("quiero borrar");
    const attacheElement = document.querySelectorAll(".done")
        //console.log(done);
    for (const toDo of attacheElement) {
        //toDo.remove()
        //console.log(attacheElement);
        const parent = toDo.parentElement;
        // console.log(parent);
        parent.remove()

    }
}


function init() {
    const toDos = readToDo("list");

    for (const toDo of toDos) {
        addTask(toDo);
    }

}
init();

function logKey(e) {
    if (e.keyCode === 13) {
        var value = enterUser.value;
        addTask(value);
        const preview = readToDo("list");
        saveToDo("list", [...preview, value]);
    }
}

function addTask(value) {
    var list = document.querySelector(".list");
    var isValueEmpty = value === "";


    if (isValueEmpty) {
        return alert("Please, add a new note");
    }
    list.innerHTML += `<li class="toDo"> <input type="checkbox" class="check"> <span class="text">${value}</span> </li>`;

    enterUser.value = "";

    attacheListener();
}


function attacheListener() {

    var toDos = document.querySelectorAll(".toDo");
    var total = document.querySelector(".total");
    var numberOfNotes = toDos.length;
    total.innerHTML = ` ${numberOfNotes} `;

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
    var numberOf = document.querySelector(".number-of");
    var attache = document.querySelectorAll(".done")
    var taskOk = attache.length;
    numberOf.innerHTML = ` ${taskOk} `
}

function saveToDo(key, value) {
    const valueToSave = JSON.stringify(value)
    localStorage.setItem(key, valueToSave);
}

function readToDo(key) {
    const keyValue = localStorage.getItem(key);
    const final = JSON.parse(keyValue);
    return final
}