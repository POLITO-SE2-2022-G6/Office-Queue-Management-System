import './Manager.css';

import {
  Route,
  Routes,
  BrowserRouter as Router,
  Navigate,
  Outlet,
  useNavigate
} from 'react-router-dom'
import Navbar from '../../components/Navbar';

function Manager(props) {
  const navigate = useNavigate();

  return (
    <>
      <Navbar user={props.user} setUser={props.setUser}></Navbar>
      <span className="text-auto font-semibold inline-block py-1 px-2 uppercase rounded text-stone-600 bg-stone-200 last:mr-0 mr-1">
        As a Manager, what you would  like to do?
      </span>
      <div className="container px-4 mx-auto flex flex-wrap items-center justify-between">
        <div className="flex w-max gap-8">
          <button className="bg-blue-500 text-white active:bg-blue-600 font-bold uppercase text-base px-8 py-3 rounded shadow-md hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button"
            onClick={() => { navigate("/servicetime"); }}>Set the service time for each service type</button>
        </div>
      </div>
      <Outlet />
    </>
  );
}

export default Manager;
