import closeIcon from '../resources/images/icon-cross.svg'

const Todo = ({text, completed, todos, setTodos, todo, innerRef, provided}) => {

  const deleteHandler = () => {
    setTodos(todos.filter(item => item.id !== todo.id))
  }

  const completeHandler = () => {
    setTodos(todos.map(item => {
      if (item.id === todo.id) {
        return {
          ...item, completed: !item.completed
        }
      }
      return item
    })) 
  }

  return (
    <li className={ completed ? 'completed' : '' } ref={innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
      <button className="complete-btn" onClick={completeHandler} ></button>
        { text }
      <button className="delete-btn" onClick={deleteHandler}><img src={closeIcon} alt='delete-todo'></img></button>
    </li>
  )
}

export default Todo