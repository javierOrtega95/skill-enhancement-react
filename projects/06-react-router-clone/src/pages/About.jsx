import { Link } from '../components/Link'

export default function AboutPage () {
  return (
    <>
      <h1>About</h1>
      <div>
        <img src='https://unavatar.io/github/javierOrtega95' alt='javierOrtega95 github profile image' />
        <p>Hi! I'm Javier and this is a react router clone</p>
      </div>
      <Link to='/'>Go to home</Link>
    </>
  )
}
