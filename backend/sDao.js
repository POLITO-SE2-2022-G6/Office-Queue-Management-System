'use strict';
const db = require('./db.js');

exports.setTime = (type, time) => {
    return new Promise((resolve, reject) => {
        const sql = 'UPDATE service SET time = ? WHERE type = ?';
        db.run(sql, [time, type], (err) => {
            if (err) {
                reject(err);
                console.log(err);
                return;
            }
            resolve('done');
        });
    })
}

exports.getType = (id) => {
    return new Promise((resolve, reject) => {
        const sql = 'SELECT type FROM service WHERE id = ?';
        db.get(sql, [id], (err, type) => {
            if (err) {
                reject(err);
                console.log(err);
                return;
            }
            resolve(type);
        });
    })
}

exports.addTicket =(service,eta) => {
    return new Promise((resolve, reject) => { //check if id is autoincremented
      const sql = 'INSERT INTO ticket (service, eta) VALUES (?,?)';
      db.run(sql, [service, eta], (err) => {
          if (err) {
              reject(err);
              console.log(err);
              return;
          }
          resolve('done');
      });
  })
  
  }
  
  exports.getTicket = (id) => {
  return new Promise((resolve, reject) => {
      const sql = 'SELECT * FROM ticket WHERE id = ?';
      db.get(sql, [id], (err, ticket) => {
          if (err) {
              reject(err);
              console.log(err);
              return;
          }
          resolve(ticket);
      });
  })
  }
  exports.setServed = (id) => {
  return new Promise((resolve, reject) => {
      const sql = 'UPDATE ticket SET served = 1 WHERE id = ?';
      db.run(sql, [id], (err) => {
          if (err) {
              reject(err);
              console.log(err);
              return;
          }
          resolve('done');
      });
  })
  }