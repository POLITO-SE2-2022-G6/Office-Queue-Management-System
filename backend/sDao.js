'use strict';
const db = require('./db.js');

exports.addService =(type, time) => {
    return new Promise((resolve, reject) => { //check if id is autoincremented
        const sql = 'INSERT INTO service (type, time) VALUES (?,?) RETURNING id';
        db.get(sql, [type, time], (err, id) => {
            if (err) {
                reject(err);
                console.log(err);
                return;
            }
            resolve(id);
        });
    })

}

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
      const sql = 'INSERT INTO ticket (service, eta) VALUES (?,?) RETURNING id';
      db.run(sql, [service, eta], (err,id) => {
          if (err) {
              reject(err);
              console.log(err);
              return;
          }
          resolve(id);
      });
  })
  
  }
  
  exports.getTicket = (id) => {
  return new Promise((resolve, reject) => {
      const sql = 'SELECT * FROM ticket WHERE id = ?';
      db.get(sql, [id], (err, row) => {
        if (err) 
          reject(err);
        else if (row === undefined)
          resolve({error: 'Ticket not found.'});
        else {
          
          const ticket = {id: row.id, service: row.service, eta: row.eta,served:row.served}
          resolve(ticket);
        }
      });
  })
  }
 
exports.getAllTickets = () => {
    return new Promise((resolve, reject) => {
      const sql = 'SELECT * FROM ticket';
      db.all(sql, [], (err, rows) => {
        if (err) {
          reject(err);
          return;
        }
        const tickets = rows.map((t) => ({
            id:t.id,service:t.service,eta:t.eta,served:t.served
        }));
        resolve(tickets);
      });
    });
  };
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

exports.getServices = () => {
    return new Promise((resolve, reject) => {
        const sql = 'SELECT * FROM service';
        db.all(sql, [], (err, rows) => {
            if (err) {
                reject(err);
                console.log(err);
                return;
            }
            const services = rows.map((s) => ({ id: s.id, type: s.type, time: s.time}));
            resolve(services);
        });
    })
}

////////////////////////////////////////////////////////////////////////
/////////////COUNTER API////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////

exports.getCounters = () => {
    return new Promise((resolve, reject) => {
        const sql = 'SELECT * FROM counter C, service S, ServiceCounter SC WHERE C.id = SC.counter AND S.id = SC.service';
        db.all(sql, [], (err, rows) => {
            if (err) {
                reject(err);
                console.log(err);
                return;
            }
            const data = []
            rows.forEach((row) => {
                const service = { id: row.service, type: row.type, time: row.time }
                const id = data.findIndex((d) => d.id === row.counter);
                if (id != -1) {
                    data[id].services.push(service);
                } else {
                    data.push({ id: row.counter, services: [service] });
                }
            })
            resolve(data);
        })
    })
}

exports.getCounterById = (id) => {
    return new Promise((resolve, reject) => {
        const sql = 'SELECT * FROM counter C, service S WHERE C.id = S.id ';
        db.get(sql, [id], (err, row) => {
            if (err) {
                reject(err);
                console.log(err);
                return;
            }
        });
        
        resolve(row);
    })
}

exports.addCounter = () => {
    return new Promise((resolve, reject) => { //check if id is autoincremented
        const sql = 'INSERT INTO counter';
        db.run(sql, [], (err) => {
            if (err) {
                reject(err);
                console.log(err);
                return;
            }
            resolve('done');
        });
    })
}

exports.addCounterServices = (id, service) => {
    return new Promise((resolve, reject) => {
        const sql = 'UPDATE ServiceCounter SET service = ? WHERE id = ?';
        db.run(sql, [service, id], (err) => {
            if (err) {
                reject(err);
                console.log(err);
                return;
            }
            resolve('done');
        });
    })

}