import React, { useState, useRef } from 'react';
import './App.css';
import { Auth } from './components/Auth';
import Cookies from 'universal-cookie';
import { Chat } from './components/Chat';
import { signOut } from 'firebase/auth';
import { auth } from './firebase-config';

const cookies = new Cookies();

function App() {
  const [isAuth, setIsAuth] = useState(cookies.get("auth-token"));
  const [room, setRoom] = useState(null);

  const roomInputRef = useRef(null);

  const signUserOut = async () => {
    await signOut(auth);
    cookies.remove("auth-token");
    setIsAuth(false);
    setRoom(null);
  };

  if (!isAuth) {
    return (
      <div className="App">
        <div className="app-header">Chat App</div>
        <Auth setIsAuth={setIsAuth} />
      </div>
    );
  }

  return (
    <div className="App">
      <div className="app-header">Chat App</div>
      {room ? (
        <Chat room={room} />
      ) : (
        <div className="room">
          <label>Join Room</label>
          <input ref={roomInputRef} />
          <button onClick={() => setRoom(roomInputRef.current.value)}>
            Enter Chat
          </button>
        </div>
      )}
      <div className="sign-out">
        <button onClick={signUserOut}>Signout</button>
      </div>
    </div>
  );
}

export default App;
