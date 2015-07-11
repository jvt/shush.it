var bookshelf = require('bookshelf').DB;

var Filter = require("./filter").model;
var User = require("./user").model;

exports.model = bookshelf.Model.extend({
  tableName: 'filters',
  hasTimestamps: true,

  exportedBy: function() {
    return this.belongsTo(User, 'user');
  },

  filter: function() {
    return this.belongsTo(Filter, 'filter');
  }

});

exports.collection = bookshelf.Collection.extend({
  model: exports.model
});
