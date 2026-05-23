const express = require('express')

const router = express.Router()

const {

  addCategory,
  getCategory,
  editCategory,
  removeCategory

} = require('../controllers/categoryController')

// CREATE
router.post('/', addCategory)

// GET
router.get('/:id_user', getCategory)

// UPDATE
router.put('/:id_category', editCategory)

// DELETE
router.delete('/:id_category', removeCategory)

module.exports = router