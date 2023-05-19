window.addEventListener('DOMContentLoaded', getAllTodos)

function todoHtml({userId, id, title, completed}) {
		const crudWrapper = document.getElementById('crud__wrapper')

		crudWrapper.insertAdjacentHTML(
				'afterend',
				`	<section id="item${id}" class="crud__item" >
									<h6 class="crud__id">script id: ${id}</h6>
									<div class="crud__name-wrapper"> 
										<h3 class="crud__name">script name: ${userId}</h3>
										<h4 class="crud__text">description: ${title}</h4> 
									</div>
									<span class="crud__state">state: ${completed}</span>
									<div class="crud__check-wrapper">
										<input onchange="toggleTodo(${id})" class="crud__check" id="crud-check" type="checkbox" ${completed && 'checked'}></input>
									</div>
									<div class="crud__post">
										<input id="crud__post-input" type="text"/>

										<button onclick="deleteTodo(${id})" id="crud__post-btn--dell" type="button">удалить</button>
									</div>
						</section>`
		)
}


document.getElementById('crud__post-btn')
		.addEventListener("click", async () => {
				const input = document.getElementById('crud__post-input')
				console.log(input)
				const title = input.value

				if (title) {
						const result = await fetch('https://jsonplaceholder.typicode.com/todos', {
								method: 'POST',
								headers: {
										'Content-type': 'application/json'
								},
								body: JSON.stringify({
										title,
										completed: false
								})
						})

						const todo = await result.json()
						console.log(todo)
						todoHtml(todo)
						input.value = ''
				}
		})


async function deleteTodo(id) {
		const result = await fetch('https://jsonplaceholder.typicode.com/todos/${id}', {
				method: 'DELETE',
				headers: {
						'Content-type': 'application.json'
				}
		})
		const data = await result.json();
		if (data) {
				document.getElementById(`#crud__check${id}`).remove()
		}
}


async function toggleTodo(id) {
		const completed = document.getElementById('#crud__check').checked
		console.log(completed)

		const result = await fetch('https://jsonplaceholder.typicode.com/todos/${id}', {
				method: 'PATCH',
				headers: {
						'Content-type': 'application.json'
				},
				body: JSON.stringify({completed : completed})
		})
		const data = await result.json()
		console.log(data)
}

async function getAllTodos() {
		const result = await fetch('https://jsonplaceholder.typicode.com/todos?_limit=1')
		const todos = await result.json()
		console.log(todos)
		todos.forEach(item => todoHtml(item))
}
