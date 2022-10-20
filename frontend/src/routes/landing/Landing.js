import './Landing.css';
import Navbar from '../../components/Navbar';
import { useNavigate } from 'react-router-dom';

function Landing(props) {

  const navigate = useNavigate();

  return (
    <>
      <Navbar user={props.user} setUser={props.setUser}></Navbar>
      <span class="text-auto font-semibold inline-block py-1 px-2 uppercase rounded text-stone-600 bg-stone-200 last:mr-0 mr-1">
        Who are you?
      </span>
      <div className="container px-4 mx-auto flex flex-wrap items-center justify-between">
        <div className="flex w-max gap-8">
          <button className="bg-blue-500 text-white active:bg-blue-600 font-bold uppercase text-base px-8 py-3 rounded shadow-md hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button"
            onClick={() => { props.setUser("Costumer"); navigate("/"); }}>Costumer</button>
          <button className="bg-blue-500 text-white active:bg-blue-600 font-bold uppercase text-base px-8 py-3 rounded shadow-md hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button"
            onClick={() => { props.setUser("Counter"); navigate("/"); }}>Counter</button>
          <button className="bg-blue-500 text-white active:bg-blue-600 font-bold uppercase text-base px-8 py-3 rounded shadow-md hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button"
            onClick={() => { props.setUser("Manager"); navigate("/manager"); }}>Manager</button>
        </div>
      </div>
    </>
  );
}

export default Landing;