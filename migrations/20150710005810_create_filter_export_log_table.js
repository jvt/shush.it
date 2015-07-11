
exports.up = function(knex, Promise) {
  return knex.schema.createTable('filter_export_log', function (table) {
    table.increments();
    table.integer('filter');
    table.integer('user');
    table.timestamps();
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('filter_export_log')
};
