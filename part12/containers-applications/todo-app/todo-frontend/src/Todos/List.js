import React from 'react'
import Todo from './Todo'

const TodoList = ({ todos, deleteTodo, completeTodo }) => {
  return (
    <>
      {todos.map(todo => {
        return(<Todo key={crypto.randomUUID()} todo={todo} deleteTodo={deleteTodo} completeTodo={completeTodo}/>)
      }).reduce((acc, cur) => [...acc, <hr key={crypto.randomUUID()}/>, cur], [])}
    </>
  )
}

export default TodoList
