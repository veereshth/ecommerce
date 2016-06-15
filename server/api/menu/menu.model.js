'use strict';

var mongoose = require('bluebird').promisifyAll(require('mongoose'));
var Schema = mongoose.Schema;
var slugs = require('mongoose-url-slugs');

var MenuSchema = new mongoose.Schema({
  name: { type: String, required: true},
  info: String,
  active: Boolean,
  parent: { type: Schema.Types.ObjectId, ref: 'Menu' },
  ancestors: [{ type: Schema.Types.ObjectId, ref: 'Menu' }],
  children: [{ type: Schema.Types.ObjectId, ref: 'Catalog' }]
});
MenuSchema.methods = {
  addChild: function (child) {
    var that = this;
    child.parent = this._id;
    child.ancestors = this.ancestors.concat([this._id]);
    return this.model('Menu').create(child).addCallback(function (child) {
      that.children.push(child._id);
      that.save();
    });
  }
}

MenuSchema.plugin(slugs('name'));

module.exports = mongoose.model('Menu', MenuSchema);

