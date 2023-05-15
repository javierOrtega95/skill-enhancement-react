import { useState } from 'react'
import type { Todo as TodoType } from '../types'
import { Todo } from './Todo'
import { useAutoAnimate } from '@formkit/auto-animate/react'

interface Props {
  todos: TodoType[]
  setCompleted: (id: string, completed: boolean) => void
  removeTodo: (id: string) => void
  setTitle: (params: Omit<TodoType, 'completed'>) => void
}

export const Todos: React.FC<Props> = ({
  todos,
  setCompleted,
  removeTodo,
  setTitle
}) => {
  const [isEditing, setIsEditing] = useState('')
  const [parent] = useAutoAnimate(/* optional config */)

  return (
    <ul className='todo-list' ref={parent}>
      {todos?.map((todo) => (
        <li
          key={todo.id}
          onDoubleClick={() => { setIsEditing(todo.id) }}
          className={`
            ${todo.completed ? 'completed' : ''}
            ${isEditing === todo.id ? 'editing' : ''}
          `}
        >
          <Todo
            key={todo.id}
            id={todo.id}
            title={todo.title}
            completed={todo.completed}
            setCompleted={setCompleted}
            removeTodo={removeTodo}
            isEditing={isEditing}
            setIsEditing={setIsEditing}
            setTitle={setTitle}
          />
        </li>
      ))}
    </ul>
  )
}
