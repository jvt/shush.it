
exports.up = function(knex, Promise) {
  return knex.schema.createTable('filters', function (table) {
    table.increments();
    table.integer('owner');
    table.string('title');
    table.string('description');
    table.enum('type', ['regex', 'keyword']);
    table.string('pattern');
    table.timestamps();
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('filters')
};
