const Form = ({ inputText, setInputText, todos, setTodos }) => {

  const inputTextHandler = (e) => {
    setInputText(e.target.value)
  }

  const formHandler = (e) => {
    e.preventDefault()
    if (inputText !== '') {
      setTodos([
        ...todos, {text: inputText, completed: false, id: Math.random() * 100}
      ])
      setInputText('')
    }
  } 

  return (
    <form onSubmit={formHandler}>
      <div className="circle-container">
        <div className="circle"></div>
      </div>
      <input type='text' placeholder='Create a new todo...' onChange={inputTextHandler} value={inputText}></input>
    </form>
  )
}

export default Form