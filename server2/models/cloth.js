'use strict';

let mongoose =require('mongoose');
const Schema = mongoose.Schema;

const clothSchema = new Schema({
	name: { type: 'String', required: true },
	description: {type: 'String', required: false},
	bodypart: { type: 'String', required: false },
	brand: { type: 'String', required: false },
	size: {type: 'String', required: false},
	color: {type: 'String', required: false},
	fabric: {type: 'String', required: false},
	tags: [{ type: 'String', required: false }],
	slug: { type: 'String', required: true },
	cuid: { type: 'String', required: true },
	dateAdded: { type: 'Date', default: Date.now, required: true },
	picture: { type:'String', required: false },
}, { collection: 'clothes' });

module.exports = clothSchema;
