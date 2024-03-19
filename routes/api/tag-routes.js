const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

// TODO find all tags
router.get('/', (req, res) => {
  // find all tags
  // be sure to include its associated Product data
});

// find a single tag by its `id`
router.get('/:id', (req, res) => {
  // be sure to include its associated Product data
});

router.post('/', (req, res) => {
  // create a new tag
});

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
});

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
});

module.exports = router;
