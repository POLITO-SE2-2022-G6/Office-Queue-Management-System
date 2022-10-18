'use strict';
const db = require('./db.js');

exports.addService =(type, time) => {
    return new Promise((resolve, reject) => { //check if id is autoincremented
        const sql = 'INSERT INTO service (type, time) VALUES ()';
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

exports.getServices = () => {
    return new Promise((resolve, reject) => {
        const sql = 'SELECT * FROM service';
        db.all(sql, [], (err, type) => {
            if (err) {
                reject(err);
                console.log(err);
                return;
            }
            resolve(type);
        });
        const services = rows.map((s) => ({ id: s.id, type: s.type, time: s.time}));
        resolve(services);
    })
}