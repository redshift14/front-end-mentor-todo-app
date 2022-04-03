import { useState, useEffect } from 'react'
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd'

import Controller from './Controller'
import Todo from './Todo'

const Todos = ({todos, setTodos, setTodoStatus, filteredTodos, selectedBtn, setFilteredTodos}) => {
  
  const [smallWindow, setSmallWindow] = useState(window.innerWidth < 500)

  useEffect(() => {
    const resizeHandler = () => {
      if (window.innerWidth < 500) {
        setSmallWindow(true)
      }
    }
    window.addEventListener('resize', resizeHandler)
    return _ => {
      window.removeEventListener('resize', resizeHandler)
    }
  })

  const getNotCompletedTodosNumber = () => {
    return todos.filter(item => item.completed !== true).length
  }

  const reorderList = (list, startIndex, endIndex) => {
    const result = Array.from(list)
    const [removed] = result.splice(startIndex, 1)
    result.splice(endIndex, 0, removed)
    return result
  }

  const onEnd = (result) => {
    setFilteredTodos(reorderList(filteredTodos, result.source.index, result.destination.index))
    setTodos(reorderList(filteredTodos, result.source.index, result.destination.index))
  }

  return (
    <DragDropContext onDragEnd={onEnd}>
      <Droppable droppableId='list'>
        {
          (provided) => (
            <ul className='list' ref={provided.innerRef} {...provided.droppableProps}>
              {
                filteredTodos.map((todo, index) => {
                  return (
                    <Draggable draggableId={(todo.id).toString()} key={todo.id} index={index}>
                      {
                        (providedDrag) => (
                          <Todo 
                            innerRef={providedDrag.innerRef}
                            provided={providedDrag}
                            text={todo.text} 
                            completed={todo.completed} 
                            todos={todos} 
                            setTodos={setTodos} 
                            todo={todo} 
                          />
                        )
                      }
                    </Draggable>
                  )
                })
              }
              {provided.placeholder}
              <Controller smallWindow={smallWindow} itemsCount={getNotCompletedTodosNumber()} setTodoStatus={setTodoStatus} selectedBtn={selectedBtn} todos={todos} setTodos={setTodos} />
              <p className={smallWindow ? 'shifted hint': 'hint'}>Drag and drop to reorder list</p>
            </ul>
          )
        }
      </Droppable>
    </DragDropContext>
  )
}

export default Todos