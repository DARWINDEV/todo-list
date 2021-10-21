import { Todo } from "../classes";
import {todoList} from '../index.js'

const divTodoList = document.querySelector('.todo-list');
const txtInput = document.querySelector('.new-todo');
const btnDelete = document.querySelector('.clear-completed');
const ulFilters = document.querySelector('.filters') 
const filterWeight = document.querySelectorAll('.filtro')



export const createTodoHtml = (todo) =>{
    const htmlTodo = `
    <li class="${(todo.completed) ? 'completed' : ''}" data-id="${todo.id}">
						<div class="view">
							<input class="toggle" type="checkbox" ${(todo.completed) ? 'checked' : ''}>
							<label>${todo.task}</label>
							<button class="destroy"></button>
						</div>
						<input class="edit" value="Create a TodoMVC template">
					</li>`;
    
    const div = document.createElement('div');
    div.innerHTML = htmlTodo;

    divTodoList.append(div.firstElementChild)

    return div.firstElementChild;
    
}

txtInput.addEventListener('keyup', (event) => {
    if (event.keyCode === 13 && txtInput.value.length > 0){
        console.log(txtInput.value)
        const createTask = new Todo(txtInput.value)
        todoList.addTodo(createTask)

        createTodoHtml(createTask);
        txtInput.value= '';
    }
})

//events

divTodoList.addEventListener('click' , (event) => { //click en el cjeck
    const elementName = event.target.localName
    const todoElement = event.target.parentElement.parentElement
    const todoId = todoElement.getAttribute('data-id')

    if(elementName.includes('input')){
        todoList.taskCompleted(todoId)
        todoElement.classList.toggle('completed')
    } else if (elementName.includes('button')){
        todoList.deleteTodo(todoId);
        divTodoList.removeChild(todoElement)
    }
    
    console.log(`todoList: `, todoList)
});

btnDelete.addEventListener('click', () => {
    todoList.deleteCompetedTasks();
    for(let i = divTodoList.children.length -1; i >= 0; i--){
        const element = divTodoList.children[i];

        if(element.classList.contains('completed')){
            divTodoList.removeChild(element)
        }
    }
    
});

ulFilters.addEventListener('click', (event) => {
    const filter = event.target.text
    if(!filter) {return ;}

    filterWeight.forEach(elem => elem.classList.remove('selected'))
    event.target.classList.add('selected')


    for (const element of divTodoList.children) {
        element.classList.remove('hidden')
        const completed = element.classList.contains('completed')

        switch (filter) {
            case 'Pendientes':
                if(completed){
                    element.classList.add('hidden')
                }
            break;
        
            case 'Completados':
                if(!completed){
                    element.classList.add('hidden')
                }
            break;
        }

    }
})