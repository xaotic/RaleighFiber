'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;


/**
 * Article Schema
 */
var ArticleSchema = new Schema({
    created: {
        type: Date,
        default: Date.now
    },
    address: {
        type: String,
        required: true,
    },
    city: {
        type: String,
        default: 'Raleigh',
        required: true
    },
    state: {
        type: String,
        default: 'NC',
        required: true
    },
    zip: {
        type: Number,
        required: false
    },
    geometry: {
        type: Object,
        default: '',
        required: false
    },
    user: {
        type: Schema.ObjectId,
        ref: 'User'
    }
});


/**
 * Validations
 */
ArticleSchema.path('address').validate(function(address) {
    return address.length;
}, 'Address cannot be blank');

/**
 * Statics
 */
ArticleSchema.statics.load = function(id, cb) {
    this.findOne({
        _id: id
    }).populate('user', 'name username').exec(cb);
};

mongoose.model('Article', ArticleSchema);
