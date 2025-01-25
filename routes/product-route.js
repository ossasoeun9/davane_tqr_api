const express = require('express');
const router = express.Router();
const {
  getProducts,
  getProductDetail,
  createProduct,
  editProduct,
  deleteProduct,
} = require('../controllers/product-controller');

router.get('/', getProducts);
router.get('/detail/:id', getProductDetail)
router.post('/add', createProduct);
router.put('/edit/:id', editProduct);
router.delete('/delete/:id', deleteProduct);

module.exports = router;