import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import { getUser } from '../../utilities/users-service';
import AuthPage from '../AuthPage/AuthPage';
// import DrumKit from '../../components/DrumKit/DrumKit'
import DrumKitPage from '../DrumKitPage/DrumKitPage';
import UploadSoundPage from '../UploadSoundPage/UploadSoundPage'
import NavBar from '../../components/NavBar/NavBar';


export default function App() {
  const [user, setUser] = useState(getUser());
  return (
    <main className="App">
      { user ?
        <>
          <NavBar user={user} setUser={setUser} />
          <Routes>
          {/* client-side route that renders the component instance if the path matches the url in the address bar */}
          <Route path="/drumkit" element={<DrumKitPage user={user} setUser={setUser} />} />
          <Route path="/upload" element={<UploadSoundPage user={user} setUser={setUser} />} />
          {/* redirect to /orders/new if path in address bar hasn't matched a <Route> above */}
        </Routes>

        </>
        :
        <AuthPage setUser={setUser} />
      }
    </main>
  );
}
