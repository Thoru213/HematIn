const express = require('express')

const router = express.Router()

const {

  addWallet,
  getWallet,
  editWallet,
  removeWallet,
  getWalletTypes

} = require('../controllers/walletController')

// GET TYPES
router.get('/types', getWalletTypes)

// CREATE
router.post('/', addWallet)

// GET
router.get('/:id_user', getWallet)

// UPDATE
router.put('/:id_wallet', editWallet)

// DELETE
router.delete('/:id_wallet', removeWallet)

module.exports = router