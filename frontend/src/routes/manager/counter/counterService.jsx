import { useState, useEffect, useRef } from "react";
import axios from "axios";

function CounterService(props) {

  const [counters, setCounters] = useState([]);
  const [services, setServices] = useState([]);

  // Load data from API
  useEffect(() => {
    const fetchData = async () => {
      // let result = await axios(
      //   'http://localhost:3000/api/counter',
      // );
      let result = {
        data: [
          {
            id: 1,
            services: [{ id: 1, type: 'service1' }, { id: 2, type: 'service2' }]
          },
          {
            id: 2,
            services: [{ id: 1, type: 'service1' }, { id: 3, type: 'service3' }]
          },
        ]
      }
      setCounters(result.data);

      // result = await axios(
      //   'http://localhost:3000/api/service',
      // );
      result = {
        data: [
          { id: 1, type: 'service1' },
          { id: 2, type: 'service2' },
          { id: 3, type: 'service3' },
        ]
      }
      setServices(result.data);

    };

    fetchData();
  }, []);

  const addService = async (counterId, serviceId) => {
    const newCounters = [...counters];
    let id = newCounters.findIndex(counter => counter.id === counterId);
    const service = services.find(service => service.id == serviceId);
    newCounters[id].services.push(service);
    // let result = await axios.patch(
    //   `http://localhost:3000/api/counter/${counterId}`,
    //   {
    //     services: newCounters[id].services
    //   }
    // );
    setCounters(newCounters);
  }

  const removeService = async (counterId, serviceId) => {
    const newCounters = [...counters];
    let id = newCounters.findIndex(counter => counter.id === counterId);
    newCounters[id].services = newCounters[id].services.filter(service => service.id !== serviceId);
    // let result = await axios.patch(
    //   `http://localhost:3000/api/counter/${counterId}`,
    //   {
    //     services: newCounters[id].services
    //   }
    // );
    setCounters(newCounters);
  }

  return (
    <div className="flex flex-row justify-center flex-wrap">
      {counters.map(counter => (
        <CounterList key={counter.id} counter={counter} services={services} addService={addService} removeService={removeService} />

      ))}
    </div>
  )
}

function CounterList(props) {
  const ref = useRef();
  const { counter, services, addService, removeService } = props;
  const { services: list } = counter;

  const missingServices = services.filter(service => !list.find(s => s.id === service.id));

  return (
    <div className="p-4 border rounded mx-3">
      <h1 className="text-2xl">Counter: {counter.id}</h1>

      <select name="services" id="" ref={ref} className="rounded border  mx-2 p-1">
        {missingServices.length == 0 && <option disabled selected>No more services</option>}
        {missingServices.map(service => (
          <option value={service.id}>{service.type}</option>
        ))}
      </select>
      <button
        onClick={() => addService(counter.id, ref.current.value)}
        className="py-1 px-3 rounded border bg-green-200"
        disabled={missingServices.length == 0}>
        Add
      </button>
      <ul className="divide-y">
        {list.map(s => (
          <li key={s.id} className="flex justify-between w-48">
            <p>
              {s.type}
            </p>
            <p className="text-xl" onClick={() => removeService(counter.id, s.id)}>
              &times;
            </p>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default CounterService
