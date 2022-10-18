import './Customer.css';
import React, {useState} from 'react';
import Ticket from '../../Ticket';

import {Link} from 'react-router-dom'

function Customer() {

  const [message, setMessage] = useState('');

  /* to complete:
  const addTicket = (ticket) => {
    API.addTicket(ticket)
      .catch(e => setMessage(e)); 
      
  }*/

  return ( 
    <TicketForm  /> 
  );
}

function TicketForm (props) {

  const [service, setService] = useState(props.ticket ? props.ticket.service : '');
  const [eta, setEta] = useState(props.ticket ? props.ticket.eta : 0);
 
  const handleSubmit = (event) => {
    event.preventDefault();
  }

  const ticket = new Ticket(service,eta,0);

  if(props.ticket === undefined){
   // props.addTicket(ticket);       
    }

  return (
     
    <div class="grid grid-flow-row">
    <h1 class="text-2xl">Get a new ticket</h1> <br/>
     <form onSubmit={handleSubmit}>
       <div>
         <label for="service">Service type:</label> &nbsp;
         <input type="number" min="1" id="service" 
         class=" border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500" 
         onChange={event => setService(event.target.value)} value={service}
         placeholder="" required/>
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
