var bookshelf = require('bookshelf').DB;
var checkit   = require('checkit');

var ExportedFilter = require('./exportedfilter').model;
var Filter = require('./filter').model;

exports.model = bookshelf.Model.extend({
  constructor: function() {
    bookshelf.Model.apply(this, arguments); // super()
    this.on('saving', this.validate.bind(this));
  },
  tableName: 'users',
  hasTimestamps: true,

  exportedFilters: function() {
    return this.hasMany(ExportedFilter, 'user');
  },

  filters: function() {
    return this.hasMany(Filter, 'owner');
  },

  validations: {
    twitter_id: ['required', 'numeric', 'natural'],
    twitter_screenname: ['required', 'alphaDash'],
    twitter_profile_picture: ['required', 'url']
  },
  validate: function() {
    return new checkit(this.validations).run(this.toJSON());
  }

});

exports.collection = bookshelf.Collection.extend({
  model: exports.model
});
