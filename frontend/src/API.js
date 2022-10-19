
const SERVER_URL = 'http://localhost:3001';


const addTicket = async (serviceId) => {
    try {
        const response = await fetch(SERVER_URL + '/api/ticket', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(serviceId),
        });

        if (!response.ok) {
            const errMessage = await response.json();
            throw errMessage;
        }
        else return null;
    } catch (err) {
        throw new Error('Cannot communicate with the server.<br/>Error: ' + err);
    }
}

export default {addTicket} ;