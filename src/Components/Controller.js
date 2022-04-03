const Controller = ({itemsCount, setTodoStatus, selectedBtn, todos, setTodos, smallWindow}) => {

  const clearCompletedHanlder = () => {
    setTodos(todos.filter(item => item.completed !== true))
  }

  return (
    <div className="controller">
      <div className="items-left">{`${itemsCount} items left`}</div>
      <div className={smallWindow ? 'filter seperated' : 'filter'}>
        <button onClick={() => setTodoStatus('all')} className={selectedBtn === 1 ? 'selected': ''}>All</button>
        <button onClick={() => setTodoStatus('active')} className={selectedBtn === 2 ? 'selected': ''}>Active</button>
        <button onClick={() => setTodoStatus('completed')} className={selectedBtn === 3 ? 'selected': ''}>Completed</button>
      </div>
      <button className="clear-btn" onClick={clearCompletedHanlder}>Clear Completed</button>
    </div>
  )
}

export default Controller