interface Props {
  id: string
  title: string
  completed: boolean
}

export const Todo: React.FC<Props> = ({
  id,
  title,
  completed
}) => {
  return (
    <>
      <div className='view'>
        <input
          className='toggle'
          checked={completed}
          type='checkbox'
          onChange={(e) => { console.log('set completed') }}
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
