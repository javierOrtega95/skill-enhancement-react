import { Link } from '../components/Link'

const i18n = {
  es: {
    title: 'Sobre mí',
    button: 'Ir a la home',
    description: '¡Hola! Me llamo Javier y estoy creando un clon de React Router'
  },
  en: {
    title: 'About me',
    button: 'Go to home page',
    description: 'Hi! My name is Javier and this is a react router clone'
  }
}

const useI18n = (lang) => {
  return i18n[lang] || i18n.en
}

export default function AboutPage ({ routeParams }) {
  const i18n = useI18n(routeParams.lang ?? 'es')

  return (
    <>
      <h1>{i18n.title}</h1>
      <div>
        <img src='https://unavatar.io/github/javierOrtega95' alt='javierOrtega95 github profile image' />
        <p>{i18n.description}</p>
      </div>
      <Link to='/'>{i18n.button}</Link>
    </>
  )
}
