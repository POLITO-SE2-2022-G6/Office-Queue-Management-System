import './App.css';

import {
  Route,
  Routes,
  BrowserRouter as Router,
  Navigate,
} from 'react-router-dom'
import { useState } from 'react';

import Landing from './routes/landing/Landing'
import Manager from './routes/manager/Manager';

function App() {

  const [user, setUser] = useState("User");

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/' element={<Landing user={user} setUser={setUser}/>} />
          <Route path='/manager' element={<Manager user={user} setUser={setUser}/>} />

        </Routes>
      </Router>
    </div>
  );
}

export default App;
