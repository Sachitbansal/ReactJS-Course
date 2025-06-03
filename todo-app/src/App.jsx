import { Header } from './components/Header.jsx'
import { Tabs } from './components/Tabs.jsx'
import { TodoList } from './components/TodoList.jsx'
import { TodoInput } from './components/TodoInput.jsx'
import { useState } from 'react'

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
  }
  function handleEditTodo() {

  }
  function handleDeleteTodo() {

  }

  let x = 3
  return (

    <>
      <Header todos={todos} />
      <Tabs selectedTab={selectedTab} setSelectedTab={setSelectedTab} todos={todos} />
      <TodoList selectedTab={selectedTab} todos={todos} />
      <TodoInput handleAddTodo={handleAddTodo}/>

    </>
  )
}

export default App
