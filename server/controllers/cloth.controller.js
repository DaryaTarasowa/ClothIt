import Cloth from '../models/cloth';
import cuid from 'cuid';
import slug from 'limax';
import sanitizeHtml from 'sanitize-html';

/**
 * Get all clothes
 * @param req
 * @param res
 * @returns void
 */
export function getClothes(req, res) {
  Cloth.find().sort('-dateAdded').exec((err, clothes) => {
    if (err) {
        console.log('ERROR:' + err);
      res.status(500).send(err);
    }
    res.json({ clothes });
  });
}

/**
 * Save a cloth
 * @param req
 * @param res
 * @returns void
 */

export function addCloth(req, res) {
  if (!req.body.cloth.name || !req.body.cloth.bodypart || !req.body.cloth.brand || !req.body.cloth.size || !req.body.cloth.color || !req.body.cloth.fabric || !req.body.cloth.picture) {
    res.status(403).end();
  }

  const newCloth = new Cloth(req.body.cloth);

  // Let's sanitize inputs
  newCloth.name = sanitizeHtml(newCloth.name);
  newCloth.bodypart = sanitizeHtml(newCloth.bodypart);
  newCloth.brand = sanitizeHtml(newCloth.brand);
  newCloth.size = sanitizeHtml(newCloth.size);
  newCloth.color = sanitizeHtml(newCloth.color);
  newCloth.fabric = sanitizeHtml(newCloth.fabric);
  newCloth.picture = sanitizeHtml(newCloth.picture);

  newCloth.slug = slug(newCloth.name.toLowerCase(), { lowercase: true });
  newCloth.cuid = cuid();
  newCloth.save((err, saved) => {
    if (err) {
      res.status(500).send(err);
    }
    res.json({ cloth: saved });
  });
}

/**
 * Get a single cloth
 * @param req
 * @param res
 * @returns void
 */
export function getCloth(req, res) {
  Cloth.findOne({ cuid: req.params.cuid }).exec((err, post) => {
    if (err) {
      res.status(500).send(err);
    }
    res.json({ cloth });
  });
}

/**
 * Delete a cloth
 * @param req
 * @param res
 * @returns void
 */
export function deleteCloth(req, res) {
  Cloth.findOne({ cuid: req.params.cuid }).exec((err, cloth) => {
    if (err) {
      res.status(500).send(err);
    }

    cloth.remove(() => {
      res.status(200).end();
    });
  });
}
