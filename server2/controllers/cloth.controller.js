'use strict';

let mongoose = require('mongoose');
let Cloth = mongoose.model('Cloth', require('../models/cloth'));
let cuid = require('cuid');
let slug = require('limax');
let sanitizeHtml = require('sanitize-html');
let fs = require('fs');
const shareVolume = './assets/images';
// let he = require('he');
// let rp = require('request-promise-native');
//
// const boom = require('boom');

function saveImageToFile(image, user = '1') {

	//return user;
  //Create UUID
	let uuid = require('uuid');
	const uuidValue = uuid.v1();// Generate a v1 (time-based) id

	//Get file extension
	const imgNameArray = image.filename.split('.');
	const extension = imgNameArray[imgNameArray.length - 1];

	const imgUserPath = user + '/' + uuidValue + '.' + extension;
	// const saveTo = '.' + Microservices.file.shareVolume + '/' + imgUserPath;// For localhost testing
	const saveTo = shareVolume + '/' + imgUserPath;

	//Create the user dir if does not exist
	// const userDir = '.' + Microservices.file.shareVolume + '/' + user;// For localhost testing
	const userDir = shareVolume + '/' + user;
	if (!fs.existsSync(userDir)){
		fs.mkdirSync(userDir, 744, (err) => {
			if(err) {
				console.log(err);
			}
		});
	}

	let image_Body = new Buffer(image.base64.replace(/^data:image\/(png|jpg|jpeg);base64,/, ''), 'base64');

	//Save file
	let fileStream = fs.createWriteStream(saveTo);
	fileStream.write(image_Body);
	fileStream.end();
	fileStream.on('error', (err) => {
		console.log('error', err);
	});
	fileStream.on('finish', () => {
		console.log('upload completed');
	});

	return shareVolume + '/' + imgUserPath;
}

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

		let picture_url = req.body.cloth.picture ? saveImageToFile(req.body.cloth.picture) : null;
		console.log(picture_url);
		const newCloth = new Cloth(req.body.cloth);

		// Let's sanitize inputs
		newCloth.name = sanitizeHtml(newCloth.name);
		newCloth.bodypart = sanitizeHtml(newCloth.bodypart);
		newCloth.brand = sanitizeHtml(newCloth.brand);
		newCloth.size = newCloth.size ? sanitizeHtml(newCloth.size) : null;
		newCloth.color = newCloth.color ? sanitizeHtml(newCloth.color) : null;
		newCloth.fabric = newCloth.fabric ? sanitizeHtml(newCloth.fabric) : null;
		newCloth.picture = picture_url;

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
