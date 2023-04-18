import { Link } from '../components/Link'

export default function Page404 () {
  return (
    <>
      <div>
        <h1>This is NOT fine</h1>
        <img src='https://media2.giphy.com/media/QMHoU66sBXqqLqYvGO/giphy.gif?cid=ecf05e4785lamy8lysc53jtxq1s9aer42ohf9d9ud2x8irej&rid=giphy.gif&ct=g' alt='this is fine gif' />
      </div>
      <Link to='/'>Go to home</Link>
    </>
  )
}
