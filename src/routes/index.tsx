import { Title } from '@solidjs/meta';
import { onSettled } from 'solid-js';
import { refreshUser, user } from '../lib/auth';
import { useNavigate } from '@solidjs/router';
import { account } from '../lib/appwrite';

export default function Home() {

  const navigate = useNavigate()

  onSettled(() => {
        (async () => {
            await refreshUser()
            if(!user()) return navigate("/login", { replace: true})
        })()
  })

  return (
    <main>
      <Title>SlotFlow</Title>
      <h1>name: {user()?.name}</h1>
      <button onClick={async () => {
        try {
            await account.deleteSession({ sessionId: 'current' })
          } catch (e) {
            console.error("logout error:", e)
          }
          navigate("/login", { replace: true })
        }}
    >
      deco tempo
    </button>
    </main>
  );
}
