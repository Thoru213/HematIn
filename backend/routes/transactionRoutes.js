const express = require('express')

const router = express.Router()

const {

  addTransaction,
  getTransaction,
  editTransaction,
  removeTransaction

} = require('../controllers/transactionController')

// CREATE
router.post('/', addTransaction)

// GET
router.get('/:id_user', getTransaction)

// UPDATE
router.put('/:id_transaction', editTransaction)

// DELETE
router.delete('/:id_transaction', removeTransaction)

module.exports = router