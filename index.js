const newtodo = document.querySelector('#newtodo');
const newtodobutton = document.querySelector('.todo-add');
const todolist = document.querySelector('.todo-list');

newtodobutton.addEventListener('click', addToDo);
todolist.addEventListener('click', toDoButton);
document.addEventListener('DOMContentLoaded', readLocalStorage);

function toDoButton(e){

    e.preventDefault;
    const target = e.target;

    if(target.classList.contains('todo-button-complete')){
        target.parentElement.classList.toggle('todo-complete');
    }
    
    if(target.classList.contains('todo-button-delete')){
        if(confirm("Are you sure you want to delete?")){
        target.parentElement.classList.toggle('hide');
        target.parentElement.addEventListener('transitionend', function(){
            deleteLocalStorage(target.parentElement.children[0].textContent);
            target.parentElement.remove();
        });
        }else{
            alert("Deleting process is canceled.");
        }
        
    }

}

function addToDo(e){
    e.preventDefault();
    const input = newtodo.value;
    if(input.length < 1){
        alert("Job title is too short.");
    }else{
        addItem(input);
        saveToLocalStorage(input);
        input = '';
    }
    
    
}

function saveToLocalStorage(newToDo){
    let todo = turnArray();

    todo.push(newToDo);
    localStorage.setItem('todo', JSON.stringify(todo));

}

function readLocalStorage(){
    let todo = turnArray();

    todo.forEach(function(todo){
        addItem(todo);
    });
}

function addItem(todo){
    // Görev Oluşturma
    const divToDo = document.createElement('div');
    divToDo.classList.add('todo-item');

    const liToDo = document.createElement('li');
    liToDo.classList.add('todo-name');
    liToDo.innerText = todo;

    divToDo.appendChild(liToDo);

    todolist.appendChild(divToDo);

    // Butonlar

    const completetodo = document.createElement('button');
    completetodo.classList.add('todo-button');
    completetodo.classList.add('todo-button-complete');
    completetodo.innerHTML = '<i class="far fa-check-square todo-button-complete"></i>';

    const deletetodo = document.createElement('button');
    deletetodo.classList.add('todo-button');
    deletetodo.classList.add('todo-button-delete');
    deletetodo.innerHTML = '<i class="far fa-trash-alt "></i>';

    divToDo.appendChild(completetodo);
    divToDo.appendChild(deletetodo);
}

function deleteLocalStorage(value){
    let todo = turnArray();
    const deleteIndex = todo.indexOf(value);
    todo.splice(deleteIndex, 1);
    localStorage.setItem('todo', JSON.stringify(todo));
}

function turnArray(){
    let todo;

    if(localStorage.getItem('todo') === null){
        todo = [];
    }else{
        todo = JSON.parse(localStorage.getItem('todo'));
    }
    return todo;
}