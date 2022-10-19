'use strict';

const app = require('express')();
const sDao = require('./sDao'); // module for accessing the DB

//POST /api/service
app.post('/api/service', async (req, res) => {
  try {
    if (!req.body) 
      return res.status(500).json({error: "illegal Body"});

    const serv = req.body;
    let id = sDao.addService(serv.type, serv.time); 
    //add some control here
    
  } catch (err) {
    console.log(err);
    res.status(500).end();
  }
})

//GET /api/service
app.get('/api/service', async (res) => {
  try {
    // Get Type from ID
    const resultSetT = await sDao.getServices();
    if (resultSetT.error) return res.status(500).json(resultSetT);
	else res.status(200).json(resultSetT);
  } catch (err) {
    console.log(err);
    res.status(500).end();
  }
})


//GET /api/service/:sID
app.get('/api/service/:sID', async (res) => {
  try {
    // Get Type from ID
    const resultSetT = await sDao.getType(req.params.sID);
    if (resultSetT.error) return res.status(500).json(resultSetT);
	else res.status(200).json(resultSetT);
  } catch (err) {
    console.log(err);
    res.status(500).end();
  }
})

//PATCH /api/service/:sID
app.patch('/api/service/:sID', async (req, res) => {
  try {
    // Check integrità body    
    if (!req.body) return res.status(500).json({error: "Illegal Body"});
    const nAvgTime = req.body.pop();
    if (!nAvgTime.isNumeric()) return res.status(422).json({error: "Illegal Average Time"});

    // Set the New Time to DB
    const resultSetT = await sDao.setTime(req.params.sType, nAvgTime);
    if (resultSetT.error) return res.status(500).json(resultSetT);
	else res.status(200).json(resultSetT);
  } catch (err) {
    console.log(err);
    res.status(500).end();
  }
})

//GET /api/counter
app.get('/api/counters', async (res) => {
  try {
    // Get Type from ID
    const resultSetT = await sDao.getCounters();
    if (resultSetT.error) return res.status(500).json(resultSetT);
	else res.status(200).json(resultSetT);
  } catch (err) {
    console.log(err);
    res.status(500).end();
  }
})

//GET /api/counter/:id
app.get('/api/counter/:id', async (res) => {
  try {
    const resultSetT = await sDao.getCounterById(req.params.sID);
    if (resultSetT.error) return res.status(500).json(resultSetT);
	else res.status(200).json(resultSetT);
  } catch (err) {
    console.log(err);
    res.status(500).end();
  }
})

//POST /api/counter
//could be non ok
app.post('/api/counter', async (req, res) => {
  try {
    let res = sDao.addCounter();
    if(res != done){
      res.status(500).end();
    } 
  } catch (err) {
    console.log(err);
    res.status(500).end();
  }
})

//PATCH /api/counter/:id
app.patch('/api/counter/:id', async (req, res) => {
  try {
    // Check integrità body. //body = list of services assoiciated to a counter    
    if (!req.body) return res.status(500).json({error: "Illegal Body"});
    const services = req.body.pop();
    for (const service of services) {
      const result = await sDao.addCounterServices(req.params.id, service);
      if (result.error) {
        return res.status(500).json(res)
      }
    }
    res.status(200).end();
  } catch (err) {
    console.log(err);
    res.status(500).end();
  }
})

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(3001, () => {
  console.log('Server started on port 3001');
});
