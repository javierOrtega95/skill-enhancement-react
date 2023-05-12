interface Props {
  id: string
  title: string
  completed: boolean
  setCompleted: (id: string, completed: boolean) => void
  removeTodo: (id: string) => void
}

export const Todo: React.FC<Props> = ({
  id,
  title,
  completed,
  removeTodo,
  setCompleted
}) => {
  return (
    <>
      <div className='view'>
        <input
          className='toggle'
          checked={completed}
          type='checkbox'
          onChange={(e) => { setCompleted(id, e.target.checked) }}
        />
        <label>{title}</label>
        <button className='destroy' onClick={() => { removeTodo(id) }} />
      </div>

      <input
        className='edit'
      />
    </>
  )
}
