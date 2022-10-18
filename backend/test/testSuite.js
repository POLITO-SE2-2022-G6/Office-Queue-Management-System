const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
chai.should();

const app = require('../index');
var agent = chai.request.agent(app);

describe('service.api.addService', () =>{
    const newService = {
        "type":"post office",
        "time":"0"
    };
    let lastId;

    it('Add new service', async () => {
        const postRes = await agent.post('/api/service').send(newService);
        postRes.should.have.status(201);
        lastId = postRes.body;
        const getRes = await agent.get('/api/service/' + lastId);
        getRes.should.have.status(200);
        getRes.body.should.have.lengthOf.above(0);
        const type = getRes.body;
        type.should.be.equal(newService.type);
    });
})

describe('service.api.setTime', () =>{
    const newService = {
        "type":"post office",
        "time":"0"
    };
    const newTime = {
        "time":"5"
    };
    let lastId;

    it('Set time to service', async () => {
        const postRes = await agent.post('/api/service').send(newService);
        postRes.should.have.status(201);
        lastId = postRes.body;
        const patchRes = await agent.patch('/api/service/' + lastId).send(newTime);
        patchRes.should.have.status(200);
    });
})