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
    var task = document.querySelector(".list")
    task.innerHTML += `<li><input type="checkbox" id="check"> ${value}</li>`
}