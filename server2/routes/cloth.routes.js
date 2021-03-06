'use strict';




let Router = require('express').Router;
let ClothController = require('../controllers/cloth.controller');
const router = new Router();

// Get all Posts
router.route('/clothes').get(ClothController.getClothes);

// Get one post by cuid
router.route('/clothes/:cuid').get(ClothController.getCloth);

// Add a new Post
router.route('/clothes').post(ClothController.addCloth);

// Delete a post by cuid
router.route('/clothes/:cuid').delete(ClothController.deleteCloth);

module.exports = router;
