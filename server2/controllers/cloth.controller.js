'use strict';

let mongoose = require('mongoose');
let Cloth = mongoose.model('Cloth', require('../models/cloth'));
let cuid = require('cuid');
let slug = require('limax');
let sanitizeHtml = require('sanitize-html');

module.exports = {
	/**
	* Get all clothes
	* @param req
	* @param res
	* @returns void
	*/
	getClothes: function(req, res) {
		Cloth.find().sort('-dateAdded').exec((err, clothes) => {
			if (err) {
				res.status(500).send(err);
			}
			res.json({ clothes });
		});
	},
	/**
	* Save a cloth
	* @param req
	* @param res
	* @returns void
	*/

	addCloth: function(req, res) {
		// if (!req.body.cloth.name || !req.body.cloth.bodypart || !req.body.cloth.brand || !req.body.cloth.size || !req.body.cloth.color || !req.body.cloth.fabric || !req.body.cloth.picture) {
		//   res.status(403).end();
		// }

		const newCloth = new Cloth(req.body.cloth);

		// Let's sanitize inputs
		newCloth.name = sanitizeHtml(newCloth.name);
		newCloth.bodypart = sanitizeHtml(newCloth.bodypart);
		newCloth.brand = sanitizeHtml(newCloth.brand);
		newCloth.size = newCloth.size ? sanitizeHtml(newCloth.size) : null;
		newCloth.color = newCloth.color ? sanitizeHtml(newCloth.color) : null;
		newCloth.fabric = newCloth.fabric ? sanitizeHtml(newCloth.fabric) : null;
		newCloth.picture = newCloth.picture ? sanitizeHtml(newCloth.picture): null;

		newCloth.slug = slug(newCloth.name.toLowerCase(), { lowercase: true });
		newCloth.cuid = cuid();
		newCloth.save((err, saved) => {
			if (err) {
				res.status(500).send(err);
			}
			res.json({ cloth: saved });
		});
	},

	/**
	* Get a single cloth
	* @param req
	* @param res
	* @returns void
	*/
	getCloth: function(req, res) {
		Cloth.findOne({ cuid: req.params.cuid }).exec((err, cloth) => {
			if (err) {
				res.status(500).send(err);
			}
			res.json({ cloth });
		});
	},

	/**
	* Delete a cloth
	* @param req
	* @param res
	* @returns void
	*/
	deleteCloth: function(req, res) {
		Cloth.findOne({ cuid: req.params.cuid }).exec((err, cloth) => {
			if (err) {
				res.status(500).send(err);
			}
			cloth.remove(() => {
				res.status(200).end();
			});
		});
	}
}
