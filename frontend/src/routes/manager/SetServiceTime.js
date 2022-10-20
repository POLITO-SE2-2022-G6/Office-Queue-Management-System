import {
    useNavigate
} from 'react-router-dom'
import { useEffect, useState } from 'react';
import Navbar from '../../components/Navbar';

function SetServiceTime(props) {

    let list = [{name: "tipo1", time: 5}, {name: "tipo2", time: 10}, {name: "tipo3", time: 15}]

    const [serviceList, setServiceList] = useState(list);
    const [newTime, setNewTime] = useState(0);
    const [service, setService] = useState(null);
    const [flag1, setFlag1] = useState(true);
    const navigate = useNavigate();

    /*useEffect(() => {
        API.getServices() //api che prende i servizi
            .then((serviceList) => { setServiceList(serviceList); setFlag1(false); })
            .catch(err => handleError(err))
    }, [flag1]);*/

    function handleError(err) {
        console.log(err);
    }

    function handleSubmit() {
        /*API.setServiceTime(newTime,service) //api che salva il nuovo tempo
        .then(() => {setNewTime(0); setService(null); setFlag1(false)})
        .catch(err => handleError(err))*/
    }
    console.log(service);
    console.log(newTime);

    return (
        <>
            <Navbar user={props.user} setUser={props.setUser}></Navbar>
            <div className="container px-4 mx-auto flex flex-wrap items-center justify-between">
                <table class="table-auto">
                    <thead>
                        <tr>
                            <th>Service type</th>
                            <th>Time setted</th>
                            <th>Set New time</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            serviceList.map((service) => <TableRow key={service.id} service={service} setNewTime={setNewTime} setService={setService} handleSubmit={handleSubmit()}></TableRow>)
                        }
                    </tbody>
                </table>
                <button className="bg-blue-500 text-white active:bg-blue-600 font-bold uppercase text-base px-8 py-3 rounded shadow-md hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button"
                    onClick={() => { navigate("/manager"); }}>Go back</button>
            </div>
        </>
    );
}

function TableRow(props) {

    return (
        <tr>
        <td>{props.service.name}</td>
        <td>{props.service.time}</td>
        <td>
            <form class="w-full max-w-sm">
                <label>
                    <div class="flex items-center border-b border-teal-500 py-2">
                        <input class="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none" type="number" placeholder="Insert new time" aria-label="Service Time" onChange={(ev) => {props.setNewTime(ev.target.value); props.setService(props.service);}} />
                        <button class="flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 full-rounded" type="submit"
                            onClick={() => { props.handleSubmit() }}
                        > Save
                        </button>
                    </div>
                </label>
            </form>
        </td>
    </tr>
    );
  }

export default SetServiceTime;
