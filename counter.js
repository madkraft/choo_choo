import choo from 'choo'
import html from 'choo/html'

const app = choo()

app.model({
  state: {
    counter: 0,
    todos: []
  },
  reducers: {
    dec: (data, state) => {
      if (state.counter <= 0) {
        return state.counter
      } else {
        return {counter: state.counter - 1}
      }
    },
    inc: (data, state) => ({counter: state.counter + 1}),
    addTodo: (data, state) => {
      const newTodos = state.todos.slice()
      newTodos.push(data)
      return {todos: newTodos}
    }
  }
})



const mainView = (state, prev, send) => html `
  <main>
    <button onclick=${() => send('dec')}>-</button>
    <div>${state.counter}</div>
    <button onclick=${() => send('inc')}>+</button>
  </main>
`

const todoView = (state, prev, send) => {
  function onSubmit (e) {
    e.preventDefault()
    const input = e.target.children[0]
    send('addTodo', {title: input.value})
    input.value = ''
  }

  return html `
    <div>
      <h1>Todos</h1>
      <form onsubmit=${onSubmit}>
        <input type="text" placeholder="New item" id="title" />
      </form>
      <ul>
        ${state.todos.map(todo => html `<li>${todo.title}</li>`)}
      </ul>
    </div>
  `
}


app.router(route => [
  route('/', todoView)
])

const tree = app.start()
document.body.appendChild(tree)