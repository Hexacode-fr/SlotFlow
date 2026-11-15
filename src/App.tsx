import { Title } from '@solidjs/meta';
import { createEffect, Loading } from 'solid-js';
import { Router } from './router';
import './app.css';
import { refreshUser } from './lib/auth';
import { Spinner } from './components/Spinner';


export default function App() {

  createEffect(
    () => null,
    () => {
      refreshUser()
    }
  )  

  return (
    <Router>
      {(props) => (
        <>
          <div style={{
            display: 'flex',
            'align-items': 'center',
            "margin-left": '10px',
          }}>
            <img src="/logo.svg" alt="logo Hexacode" width={60} height={60} style={{
              margin: '2px',
              'border-style': 'solid',
              'border-color': 'white',
              'border-radius': '10px',
            }} />
            <div style={{
              'text-align': 'center',
              margin: '5px',
            }}>
              <h1 style={{
                margin: '0',
              }}>Hexacode</h1>
              <h6>Developpe the future</h6>
            </div>
          </div>
          <Title>SlotFlow</Title>
          <Loading fallback={
            <main>
              <div class="centerContent">
                <Spinner />
              </div>
            </main>
          }>{props.children}</Loading>
        </>
      )}
    </Router>
  );
}
