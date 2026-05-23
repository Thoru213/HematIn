const express = require('express')

const router = express.Router()

const {

  addTransactionImage,
  getImage

} = require('../controllers/transactionImgController')

// CREATE
router.post('/', addTransactionImage)

// GET
router.get('/:id_transaction', getImage)

module.exports = router