interface Empty {
  results: User[]
  info: Info
}

interface Info {
  seed: string
  results: number
  page: number
  version: string
}

interface User {
  gender: Gender
  name: Name
  location: Location
  email: string
  login: Login
  dob: Dob
  registered: Dob
  phone: string
  cell: string
  id: ID
  picture: Picture
  nat: string
}

interface Dob {
  date: Date
  age: number
}

enum Gender {
  Female = 'female',
  Male = 'male',
}

interface ID {
  name: string
  value: null | string
}

interface Location {
  street: Street
  city: string
  state: string
  country: string
  postcode: number | string
  coordinates: Coordinates
  timezone: Timezone
}

interface Coordinates {
  latitude: string
  longitude: string
}

interface Street {
  number: number
  name: string
}

interface Timezone {
  offset: string
  description: string
}

interface Login {
  uuid: string
  username: string
  password: string
  salt: string
  md5: string
  sha1: string
  sha256: string
}

interface Name {
  title: Title
  first: string
  last: string
}

enum Title {
  MS = 'Ms',
  Madame = 'Madame',
  Miss = 'Miss',
  Monsieur = 'Monsieur',
  Mr = 'Mr',
  Mrs = 'Mrs',
}

interface Picture {
  large: string
  medium: string
  thumbnail: string
}
