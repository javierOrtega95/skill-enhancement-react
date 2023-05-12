interface Props {
  id: string
  title: string
  completed: boolean
  setCompleted: (id: string, completed: boolean) => void
}

export const Todo: React.FC<Props> = ({
  id,
  title,
  completed,
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
        <button className='destroy' />
      </div>

      <input
        className='edit'
      />
    </>
  )
}
