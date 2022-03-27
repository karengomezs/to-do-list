var buttonTask = document.getElementById("buttonTask");
buttonTask.addEventListener("click", addTask);
var enterUser = document.getElementById("input");
enterUser.addEventListener("keydown", logKey);
const buttonDelete = document.querySelector(".delete-button");
buttonDelete.addEventListener("click", function() {
    deleteAll()
    updateStorage()
    updateCounters()
});

function updateCounters() {
    var toDos = document.querySelectorAll(".toDo");
    countTodos(toDos)
    countDoneTodos()
}

function deleteAll() {
    const doneTodos = document.querySelectorAll(".done") //busco que voy a eliminar

    for (const toDo of doneTodos) {
        const parent = toDo.parentElement;
        parent.remove() //quiero eliminar el padre del que tenga la clase .done (contenedor), se lo lleva todo de una vez
    }
    //den esta función solo elimino

}

function updateStorage() {
    const doneTodos = document.querySelectorAll(".done") //busco que voy a eliminar
    const savedTodos = readToDo("list"); //este list se saca del key del storage
    const newToSave = [];

    for (const toDo of doneTodos) {

        for (const saveToDo of savedTodos) {

            const isDifferent = toDo.innerText !== saveToDo; //si el elemento es diferente en las dos listas, entonces lo guardo en la nueva lista (newTosave)
            //console.log(toDo.innerText, saveToDo, isSame);

            if (isDifferent) {
                newToSave.push(saveToDo);
            }

        }

    }
    saveToDo("list", newToSave)
        //acá actualizo el storage
}

function init() {
    const toDos = readToDo("list");

    //console.log('todos', toDos);

    for (const toDo of toDos) {
        addTask(toDo);
    }
    //lee storage y recorre todos los elementos que tiene el storage para que los coloque en la primera carga
}

init(); //se ejecuta de primero porque arriba la cree y la ejcuté afuera



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
    updateCounters();
}

function handleClick(e) {
    var isInput = e.target.nodeName === "INPUT";
    if (isInput) {
        var sibling = e.target.nextElementSibling;
        sibling.classList.toggle("done"); //toogle is for adding the class "done" to the sibling if it doesn´t have one, or if it has the class then delete it the class
    }
}

function countDoneTodos() {
    var numberOf = document.querySelector(".number-of");
    var doneTodos = document.querySelectorAll(".done")
    var taskOk = doneTodos.length;
    numberOf.innerHTML = ` ${taskOk} `
}

function countTodos(toDos) {
    var total = document.querySelector(".totalNotes");
    var numberOfNotes = toDos.length;
    total.innerHTML = ` ${numberOfNotes} `;
}

function attacheListener() {
    var toDos = document.querySelectorAll(".toDo");
    for (var toDo of toDos) {
        toDo.addEventListener("click", function(e) {
            handleClick(e);
            countDoneTodos();
        });
    }
}

function readToDo(key) {
    //se parsea para que la herramienta lo pueda leer
    const keyValue = localStorage.getItem(key);
    const final = JSON.parse(keyValue);
    return final
}

function saveToDo(key, value) {
    //el storage solo lee json
    const valueToSave = JSON.stringify(value)
    localStorage.setItem(key, valueToSave);
}