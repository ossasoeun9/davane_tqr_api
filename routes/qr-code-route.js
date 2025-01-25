const express = require('express');
const router = express.Router();
const {
  getQrCodes,
  getQrCodeDetail,
  createQrCode,
  editQrCodeNote,
  deleteQrCode
} = require('../controllers/qr-code-controller.js');

router.get('/', getQrCodes);
router.get('/detail/:id', getQrCodeDetail);
router.post('/add', createQrCode);
router.put('/note/:id', editQrCodeNote);
router.delete('/delete/:id', deleteQrCode);

module.exports = router;