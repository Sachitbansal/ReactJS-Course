import { Header } from './components/Header.jsx'
import { Tabs } from './components/Tabs.jsx'
import { TodoList } from './components/TodoList.jsx'
import { TodoInput } from './components/TodoInput.jsx'
import { useState, useEffect, use } from 'react'

function App() {

  // const todos = [
  //   { input: 'Learn React', completed: false },
  //   { input: 'Build a Todo App', completed: false },
  //   { input: 'Deploy the App', completed: true }
  // ]

  const [todos, setTodos] = useState([
    { input: 'Learn React', completed: true },
    { input: 'Build a Todo App', completed: false },
  ])

  const [selectedTab, setSelectedTab] = useState('All')

  function handleAddTodo(newTodo) {
    const newTodoList = [...todos, { input: newTodo, completed: false }]
    setTodos(newTodoList)
    handleSaveData(newTodoList)
  }
  function handleCompleteTodo(index) {
    let newTodoList = [...todos]
    let completedTodo = newTodoList[index]
    completedTodo.completed = true
    newTodoList[index] = completedTodo
    setTodos(newTodoList)
    handleSaveData(newTodoList)

  }
  function handleDeleteTodo(index) {
    let newTodoList = todos.filter((val, valIndex) => {
      return valIndex !== index
    })
    setTodos(newTodoList)
    handleSaveData(newTodoList)
  }

  function handleSaveData(currentTodos) {
    localStorage.setItem('todo-app', JSON.stringify({todos: currentTodos}))
  }

  useEffect(() => {
    if (!localStorage || !localStorage.getItem('todo-app')) { return }
    let db = JSON.parse(localStorage.getItem('todo-app'))
    setTodos(db.todos)
    
  }, [])

  return (

    <>
      <Header todos={todos} />
      <Tabs selectedTab={selectedTab} setSelectedTab={setSelectedTab} todos={todos} />
      <TodoList handleCompleteTodo={handleCompleteTodo} handleDeleteTodo={handleDeleteTodo} selectedTab={selectedTab} todos={todos} />
      <TodoInput handleAddTodo={handleAddTodo} />

    </>
  )
}

export default App
