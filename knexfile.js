var path = require('path');
var nconf = require('nconf');
var config = nconf.argv().env().file({ file: path.join(__dirname, 'config.json') });

module.exports = {

  client: 'mysql',
  connection: config.get('database'),
  pool: {
    min: 2,
    max: 10
  },
  migrations: {
    tableName: 'knex_migrations'
  }

};
