'use strict';

const sqlite = require('sqlite3');

// open db
const db = new sqlite.Database('officeDB.db', (err) => {
  if (err) throw err;
});

module.exports = db;