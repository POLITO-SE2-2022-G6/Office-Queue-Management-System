'use strict';

const app = require('express')();
const sDao = require('./sDao'); // module for accessing the DB

//POST /api/service
app.post('/api/service', async (req, res) => {
  try {
    if (!req.body) 
      return res.status(500).json({error: "illegal Body"});

    const serv = req.body;
    let id = sDao.addService(serv.type, serv.service); 
    //add some control here
    
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

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(3001, () => {
  console.log('Server started on port 3001');
});
