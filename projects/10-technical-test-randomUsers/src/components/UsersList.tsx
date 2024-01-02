import { SortBy } from '../App'

interface Props {
  users: User[]
  colorRows: boolean
  onDeleteUser: (email: string) => void
  onSort: (sort: SortBy) => void
}

export function UsersList ({ users, colorRows, onDeleteUser, onSort }: Props) {
  return (
    <table width='100%'>
      <thead>
        <tr>
          <th>Photo</th>
          <th className='pointer' onClick={() => { onSort(SortBy.NAME) }}>Name</th>
          <th className='pointer' onClick={() => { onSort(SortBy.LAST) }}>Lastname</th>
          <th className='pointer' onClick={() => { onSort(SortBy.COUNTRY) }}>Country</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody className={colorRows ? 'table--showColors' : ''}>
        {users.map(user => (
          <tr key={user.login.uuid}>
            <td><img src={user.picture.thumbnail} /></td>
            <td>{user.name.first}</td>
            <td>{user.name.last}</td>
            <td>{user.location.country}</td>
            <td><button onClick={() => { onDeleteUser(user.email) }}>Delete</button></td>
          </tr>
        )
        )}
      </tbody>
    </table>
  )
}
