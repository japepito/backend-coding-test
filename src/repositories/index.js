const sqlite3 = require('sqlite3').verbose();
const buildSchemas = require('../schemas');

const db = new sqlite3.Database(':memory:');

module.exports = {
  db,
  buildSchemas,

  init() {
    this.db.serialize(() => {
      this.buildSchemas(this.db);
    });
  },
};
