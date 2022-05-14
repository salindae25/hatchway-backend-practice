const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const adapter = new FileSync('./data/data.dev.json');

const db = low(adapter);

module.exports = {
  Recipe: db,
};
