var bookshelf = require('bookshelf').DB;
var checkit   = require('checkit');

var User = require('./user').model;
var ExportedFilter = require('./exportedfilter').model;

exports.model = bookshelf.Model.extend({
  constructor: function() {
    bookshelf.Model.apply(this, arguments); // super()
    this.on('saving', this.validate.bind(this));
  },
  tableName: 'filters',
  hasTimestamps: true,

  exportLog: function() {
    return this.hasMany(ExportedFilter, 'filter');
  },

  owner: function() {
    return this.belongsTo(User, 'owner');
  },

  validations: {
    owner: ['required', 'numeric', 'natural'],
    title: ['required', 'alphaDash', 'maxLength:75'],
    description: ['required', 'alphaDash', 'maxLength:255'],
    type: ['required'],
    pattern: ['required', 'maxLength:255']
  },
  validate: function() {
    return new checkit(this.validations).run(this.toJSON());
  }

 });

exports.collection = bookshelf.Collection.extend({
  model: exports.model
});
