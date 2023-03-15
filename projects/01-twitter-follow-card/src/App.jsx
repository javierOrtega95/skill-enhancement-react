import './App.css';
import { TwitterFollowCard } from './TwitterFollowCard';

const users = [
  {
    userName: 'javierOrtega95',
    name: 'Javier Ortega Carrasco',
    isFollowing: true,
  },
  {
    userName: 'elonmusk',
    name: 'Elon Musk',
    isFollowing: false,
  },
  {
    userName: 'aliciarebo',
    name: 'Alicia Rebollo',
    isFollowing: true,
  },
];

export function App() {
  const format = username => `@${username}`;
  return (
    <section className='App'>
      {users.map(({ userName, name, isFollowing }) => {
        return (
          <TwitterFollowCard
            key={userName}
            username={userName}
            formatUserName={format}
            name={name}
            initialIsFollowing={isFollowing}
          />
        );
      })}
    </section>
  );
}
