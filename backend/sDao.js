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