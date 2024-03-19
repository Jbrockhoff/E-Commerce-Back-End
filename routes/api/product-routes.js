const router = require('express').Router();
const { Product, Category, Tag, ProductTag } = require('../../models');

// The `/api/products` endpoint

//TODO get all products
router.get('/', async (req, res) => {
  try {
    const productData = await Product.findAll({
      include: [{Category, Tag}]
    });
    res.status(200).json(productData);
  } catch (err) {
    res.status(500).json(err);
  }
});

  // be sure to include its associated Category and Tag data;

// TODO get one product
router.get('/:id', (req, res) => {
  // find a single product by its `id`
  // be sure to include its associated Category and Tag data
});

// To create new product
router.post('/', (req, res) => {
   Product.create(req.body)
    .then((product) => {
      // To create pairings to bulk create in the ProductTag model
      if (req.body.tagIds.length) {
        const productTagIdArr = req.body.tagIds.map((tag_id) => {
          return {
            product_id: product.id,
            tag_id,
          };
        });
        return ProductTag.bulkCreate(productTagIdArr);
      }
      res.status(200).json(product);
    })
    .then((productTagIds) => res.status(200).json(productTagIds))
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
});

// To update a product
router.put('/:id', (req, res) => {
  Product.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
    .then((product) => {
      if (req.body.tagIds && req.body.tagIds.length) {
        
        ProductTag.findAll({
          where: { product_id: req.params.id }
        }).then((productTags) => {
          // create filtered list of new tag_ids
          const productTagIds = productTags.map(({ tag_id }) => tag_id);
          const newProductTags = req.body.tagIds
          .filter((tag_id) => !productTagIds.includes(tag_id))
          .map((tag_id) => {
            return {
              product_id: req.params.id,
              tag_id,
            };
          });

            // figure out which ones to remove
          const productTagsToRemove = productTags
          .filter(({ tag_id }) => !req.body.tagIds.includes(tag_id))
          .map(({ id }) => id);
          return Promise.all([
            ProductTag.destroy({ where: { id: productTagsToRemove } }),
            ProductTag.bulkCreate(newProductTags),
          ]);
        });
      }

      return res.json(product);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});

// delete one product by its `id` value
router.delete('/:id', (req, res) => {
  
});

module.exports = router;

//get all, get one, delete
//All of category first to carry over

