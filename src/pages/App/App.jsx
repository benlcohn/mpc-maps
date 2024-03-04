import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import { getUser } from '../../utilities/users-service';
import AuthPage from '../AuthPage/AuthPage';
// import DrumKit from '../../components/DrumKit/DrumKit'
import DrumKitPage from '../DrumKitPage/DrumKitPage';
import LibraryPage from '../LibraryPage/LibraryPage';
import LayoutsPage from '../LayoutsPage/LayoutsPage';
import UploadSoundPage from '../UploadSoundPage/UploadSoundPage'
import NavBar from '../../components/NavBar/NavBar';
import * as layoutsAPI from '../../utilities/layouts-api';
import * as soundsAPI from '../../utilities/sounds-api'


export default function App() {
  const [user, setUser] = useState(getUser());
  const [layouts, setLayouts] = useState([]);
  const [sounds, setSounds] = useState([]);

  useEffect(function() {
    if (user) {
      layoutsAPI.getAll().then(layouts => setLayouts(layouts));
      soundsAPI.getAll().then(sounds => setSounds(sounds));
    } 
  }, [user]);

  return (
    <main className="App">
      { user ?
        <>
          <NavBar user={user} setUser={setUser} />
          <Routes>
          {/* client-side route that renders the component instance if the path matches the url in the address bar */}
          <Route path="/drumkit" element={<DrumKitPage layouts={layouts} />} />
          <Route path="/upload" element={<UploadSoundPage />} />
          <Route path="/library" element={<LibraryPage />} />
          <Route path="/layouts" element={<LayoutsPage sounds={sounds} layouts={layouts} setLayouts={setLayouts} />} />
          {/* redirect to /orders/new if path in address bar hasn't matched a <Route> above */}
        </Routes>

        </>
        :
        <AuthPage setUser={setUser} />
      }
    </main>
  );
}
