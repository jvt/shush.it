var bookshelf = require('bookshelf').DB;
var checkit   = require('checkit');
var xss = require('xss');

var User = require('./user').model;
var ExportedFilter = require('./exportedfilter').model;

exports.model = bookshelf.Model.extend({
  constructor: function() {
    bookshelf.Model.apply(this, arguments); // super()
    this.on('saving', this.sanitize.bind(this));
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
    title: ['required', 'maxLength:75'],
    description: ['required', 'maxLength:255'],
    type: ['required'],
    pattern: ['required', 'maxLength:255']
  },
  validate: function() {
    return new checkit(this.validations).run(this.toJSON());
  },
  sanitize: function() {
    this.attributes.title = xss(this.attributes.title);
    this.attributes.description = xss(this.attributes.description);
    this.attributes.pattern = xss(this.attributes.pattern);
    return true;
  }

 });

exports.collection = bookshelf.Collection.extend({
  model: exports.model
});
