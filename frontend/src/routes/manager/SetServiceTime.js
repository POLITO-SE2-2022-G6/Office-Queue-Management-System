import {
    useNavigate
} from 'react-router-dom'
import { useEffect, useState } from 'react';

function SetServiceTime(props) {

    const [serviceList, setServiceList] = useState(null);
    const [newTime, setNewTime] = useState(0);
    const [flag1, setFlag1] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        API.getServices() //api che prende i servizi
            .then((serviceList) => { setServiceList(serviceList); setFlag1(false); })
            .catch(err => handleError(err))
    }, [flag1]);

    function handleError(err) {
        console.log(err);
    }

    return (
        <>
            <Navbar user={props.user} setUser={props.setUser}></Navbar>
            <div className="container px-4 mx-auto flex flex-wrap items-center justify-between">
                <table class="table-auto">
                    <thead>
                        <tr>
                            <th>Service type</th>
                            <th>Time setted</th>
                            <th>New time</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            serviceList.map((service) => {
                                <>
                                    <td>{service.name}</td>
                                    <td>{service.time}</td>
                                    <td>
                                        <form class="w-full max-w-sm">
                                            <div class="flex items-center border-b border-teal-500 py-2">
                                                <input class="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none" type="number" placeholder="Insert new time" aria-label="Service Time" />
                                                <button class="flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 full-rounded" type="button"
                                                onClick={() => { setNewTime();  handleSubmit(service,newTime)}}
                                                > Confirm
                                                </button>
                                            </div>
                                        </form>
                                    </td>
                                </>
                            })
                        }
                    </tbody>
                </table>
            </div>
        </>
    );
}

function handleSubmit(props) {

}

export default SetServiceTime;