const express = require('express')

const router = express.Router()

const multer = require('multer')

const {

  addTransactionImage,
  getImage

} = require('../controllers/transactionImgController')

// =========================
// MULTER
// =========================
const upload = multer({

  storage: multer.memoryStorage()

})

// =========================
// CREATE IMAGE
// =========================
router.post(

  '/',

  upload.single('image'),

  addTransactionImage

)

// =========================
// GET IMAGE
// =========================
router.get(

  '/:id_transaction',

  getImage

)

module.exports = router