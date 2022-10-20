'use strict';
const express = require('express');
const app = new express();
const sDao = require('./sDao'); // module for accessing the DB
app.use(express.json());

//POST /api/service
app.post('/api/service', async (req, res) => {
  try {
    if (!req.body) return res.status(500).json({error: "Illegal Body"});

    const serv = req.body;
    let addRes = await sDao.addService(serv.type, serv.time); 
    if (addRes.error) return res.status(500).json({error: "Error adding service"});
    return res.status(201).json(addRes);
  } catch (err) {
    console.log(err);
    res.status(500).end();
  }
})

//GET /api/service
app.get('/api/service', async (res, req) => {
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
app.get('/api/service/:sID', async (req, res) => {
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
    const nAvgTime = parseInt(req.body.time);
    if (!nAvgTime) return res.status(422).json({error: "Illegal Average Time"});

    // Set the New Time to DB
    const resultSetT = await sDao.setTime(req.params.sType, nAvgTime);
    if (resultSetT.error) return res.status(500).json(resultSetT);
	  else res.status(200).json(resultSetT);
  } catch (err) {
    console.log(err);
    res.status(500).end();
  }
})

//POST /api/ticket
app.post('/api/ticket', async (req, res) => {
  try {
    if (!req.body) 
      return res.status(500).json({error: "illegal Body"});

    const serv_id = req.body;
    //const eta=fucntion that computes eta and returns the result
    let id = await sDao.addTicket(serv_id,eta); //served is 0 by default 
    if(id.error) return res.status(500).json({error: "Error adding ticket"});
    return res.status(201).json(id);
  } catch (err) {
    console.log(err);
    res.status(500).end();
  }
  
})

//GET /api/ticket/:tID
app.get('/api/ticket/:tID', async (res, req) => {
  try {
    // Get Ticket from ID
    const ticket = await sDao.getTicket(req.params.tID);
    if (ticket.error) return res.status(500).json(ticket);
    else res.status(200).json(ticket);
  } catch (err) {
    console.log(err);
    res.status(500).end();
  }
})


//GET /api/ticket
app.get("/api/ticket", async (res, req) => {
  try {
    const tickets = await sDao.getAllTickets();
    res.status(200).json(tickets);
  } catch (err) {
    res.status(500).end();
  }
});


//PATCH /api/ticket/:tID    ticket served 0-->1
app.patch('/api/ticket/:tID', async (req, res) => {
  try {
    

    // Set served from 0 to 1
    const resultSetServed = await sDao.setServed(req.params.tID);
    if (resultSetServed.error) return res.status(500).json(resultSetServed);
	else res.status(200).json(resultSetServed);
  } catch (err) {
    console.log(err);
    res.status(500).end();
  }
})

//GET /api/counter
app.get('/api/counters', async (res, req) => {
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
app.get('/api/counter/:id', async (res, req) => {
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

module.exports = app;
