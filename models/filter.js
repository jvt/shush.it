var bookshelf = require('bookshelf').DB;

var User = require("./user").model;

exports.model = bookshelf.Model.extend({
  tableName: 'filters',
  hasTimestamps: true,

  exportLog: function() {
    return this.hasMany(ExportedFilter, 'filter');
  },

  owner: function() {
    return this.belongsTo(User, 'owner');
  }

});

exports.collection = bookshelf.Collection.extend({
  model: exports.model
});
