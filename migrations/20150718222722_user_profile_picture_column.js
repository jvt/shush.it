
exports.up = function(knex, Promise) {
  return knex.schema.table('users', function (table) {
    table.string('twitter_profile_picture').after('twitter_screenname');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.table('users', function (table) {
    table.dropColumn('twitter_profile_picture');
  })
};
