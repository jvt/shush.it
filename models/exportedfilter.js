var bookshelf = require('bookshelf').DB;
var checkit   = require('checkit');

var Filter = require('./filter').model;
var User = require('./user').model;

exports.model = bookshelf.Model.extend({
  constructor: function() {
    bookshelf.Model.apply(this, arguments); // super()
    this.on('saving', this.validate.bind(this));
  },
  tableName: 'filter_export_log',
  hasTimestamps: true,

  exportedBy: function() {
    return this.belongsTo(User, 'user');
  },

  filter: function() {
    return this.belongsTo(Filter, 'filter');
  },

  validations: {
  	filter: ['required', 'numeric', 'natural'],
  	user: ['required', 'numeric', 'natural']
  },
  validate: function() {
  	return new checkit(this.validations).run(this.toJSON());
  }

});

exports.collection = bookshelf.Collection.extend({
  model: exports.model
});
