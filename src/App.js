import { useState, useEffect } from "react"

import Wrapper from "./Components/layout/Wrapper"
import Form from "./Components/Form"
import Todos from "./Components/Todos"

import sunIcon from './resources/images/icon-sun.svg'
import moonIcon from './resources/images/icon-moon.svg'

const App = () => {
  
  let value = (localStorage.getItem('dark') === 'true')
  const [darkMode, setDarkMode] = useState(value)

  const changeDarkMode = () => {
    setDarkMode(!darkMode)
    localStorage.setItem('dark', `${!darkMode}`)
  }

  useEffect(() => {
    if (darkMode) {
      document.body.style.backgroundColor = 'var(--very-dark-blue)'
    }
    else {
      document.body.style.backgroundColor = 'var(--very-light-gray)'      
    }
  }, [darkMode])

  const [inputText, setInputText] = useState('')
  const [todos, setTodos] = useState([])
  const [filteredTodos, setFilteredTodos] = useState([])
  const [todoStatus, setTodoStatus] = useState('')
  const [selectedBtn, setSelectedBtn] = useState('')

  useEffect(() => {
    getLocalTodos()
  }, [])

  useEffect(() => {
    const filterHandler = () => {
      switch (todoStatus) {
        case 'completed':
          setFilteredTodos(todos.filter(todo => todo.completed === true))
          setSelectedBtn(3)
          break;
        case 'active':
          setFilteredTodos(todos.filter(todo => todo.completed === false))
          setSelectedBtn(2)
          break;
        default:
          setFilteredTodos(todos)
          setSelectedBtn(1)
          break;
      }
    }
    filterHandler()
    saveLocalTodos()
  }, [todos, todoStatus])

  const saveLocalTodos = () => {
    localStorage.setItem('todos', JSON.stringify(todos))
  }

  const getLocalTodos = () => {
    if(localStorage.getItem('todos') === null) {
      localStorage.setItem('todos', JSON.stringify(''))
    } 
    else {
      let localTodo = JSON.parse(localStorage.getItem('todos'))
      setTodos(localTodo)
    }
  }
  
  return (
    <Wrapper darkMode={darkMode} >
      <section>
        <header>
          <h1>TODO</h1>
          <button className="theme-btn" onClick={changeDarkMode}>
            <img src={ darkMode ? sunIcon : moonIcon } alt='switch theme'></img>
          </button>
        </header>
        <Form inputText={inputText} setInputText={setInputText} todos={todos} setTodos={setTodos} />
        <Todos todos={todos} setTodos={setTodos} setTodoStatus={setTodoStatus} filteredTodos={filteredTodos} selectedBtn={selectedBtn} setFilteredTodos={setFilteredTodos} />
      </section>
    </Wrapper>
  )
}

export default App