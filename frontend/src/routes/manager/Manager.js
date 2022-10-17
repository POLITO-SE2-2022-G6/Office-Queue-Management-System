import './Manager.css';

import {
  Route,
  Routes,
  BrowserRouter as Router,
  Navigate,
  Outlet,
} from 'react-router-dom'


function Manager() {
  return (
    <>
      <Outlet/>
    </>
  );
}

export default Manager;
