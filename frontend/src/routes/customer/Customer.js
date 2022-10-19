import './Customer.css';
import React, {useState} from 'react';
import Ticket from '../../Ticket';
import API from '../../API';
import {Link} from 'react-router-dom'

function Customer() {

  const [message, setMessage] = useState('');

  const addTicket = (serviceId) => {
    API.addTicket(serviceId)
      .catch(e => setMessage(e));     
  }

  return ( 
    <div className="grid grid-flow-row">
      <h1 className="text-2xl">Get a new ticket</h1> <br/>
     
    <TicketForm  addTicket ={addTicket}/> 
    </div>
  );
}

function TicketForm (props) {

  const [service, setService] = useState(props.ticket ? props.ticket.service : '');
  const [eta, setEta] = useState(props.ticket ? props.ticket.eta : 0);
  
 
  const handleSubmit = (event) => {
    event.preventDefault();

   const ticket = new Ticket(service,eta,0);

   if(props.ticket === undefined){
      props.addTicket(ticket);       
    }

  }


  return (
     
    <div className="grid grid-flow-row">
    
     <form onSubmit={handleSubmit}>
       <div>
         <label for="service">Service type:</label> &nbsp;
         <input type="number" min="1" id="service" 
         className=" border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500" 
         placeholder="" required 
         onChange={event => setService(event.target.value)} value={service}/>
         <br/>
         <br/>
         <button type="submit"
                     className="ml-5 rounded-md border border-gray-300 bg-green-500 py-2 px-3 text-sm font-medium leading-4 text-black shadow-sm hover:bg-green-600 "
                   >
                     Save
                   </button> 
        
         <Link to="/"> 
         <button type="button" 
                 className="ml-5 rounded-md border border-gray-300 bg-red-500 py-2 px-3 text-sm font-medium leading-4 text-black shadow-sm hover:bg-red-600 ">
                   Cancel
         </button> 
         </Link>        
       </div>
     </form>
 </div> 
    
  )
}
export default Customer;
