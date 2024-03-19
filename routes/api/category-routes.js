const router = require('express').Router();
const { Category, Product } = require('../../models');

// To view all categories:
router.get('/', async (req, res) => {
  try {
     const categoryData = await Category.findAll();
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// TODO find one category by its `id` value
router.get('/:id', async (req, res) => {
  try {
    const categoryData = await Category.findByPk(req.params.id, {
      include: [{ model: Product }]
    });
    if (!categoryData) {
      res.status(404).json({ message: 'No category found with this ID'});
      return;
    }

     res.status(200).json(categoryData);
  } catch (err) {
  res.status(500).json.apply(err);
  }
});

// TODO create a new category
router.post('/', async (req, res) => {
  try {
    const categoryData = await Category.create(req.body);
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(400).json(err);
  }
});

// TODO update a category by its `id` value
router.put('/:id', (req, res) => {
  
});

// TODO delete a category by its `id` value
router.delete('/:id', (req, res) => {
  
});

module.exports = router;
