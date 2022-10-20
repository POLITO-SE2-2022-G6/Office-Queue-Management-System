import './App.css';

import {
  Route,
  Routes,
  BrowserRouter as Router,
  Navigate,
} from 'react-router-dom'

import Landing from './routes/landing/Landing'
import Manager from './routes/manager/Manager';
import CounterService from './routes/manager/counter/counterService';
import Customer from './routes/customer/Customer';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/' element={<Landing />} />
          <Route path='/manager' element={<Manager />} >
            <Route path='counters' element={<CounterService />} />
          </Route>
          <Route path='/customer' element={<Customer/>} />

        </Routes>
      </Router>
    </div>
  );
}

export default App;
