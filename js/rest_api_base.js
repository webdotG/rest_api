fetch('https://jsonplaceholder.typicode.com/todos/1')
		.then(response => response.json())
		.then((data) => getTodo(data))
									//data.map((item) => getTodo(item)));
function getTodo({userId, id, title, completed}) {
		document.body.insertAdjacentHTML(
				'afterbegin',
				`<li class="rest-api-base__item">
								<div class="rest-api-base__id-wrapper">
									<h6>user id: ${userId}</h6>
									<h6>task id: ${id}</h6> 
								</div>
								<h2 class="rest-api-base__title">title: ${title}</h2> 
								<span class="rest-api-base__state">state: ${completed}</span>
							</li>`
		)
}


