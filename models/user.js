var bookshelf = require('bookshelf').DB;

var ExportedFilter = require('./exportedfilter').model;
var Filter = require('./filter').model;

exports.model = bookshelf.Model.extend({
  tableName: 'users',
  hasTimestamps: true,

  exportedFilters: function() {
    return this.hasMany(ExportedFilter, 'user');
  },

  filters: function() {
    return this.hasMany(Filter, 'owner');
  }

});

exports.collection = bookshelf.Collection.extend({
  model: exports.model
});
