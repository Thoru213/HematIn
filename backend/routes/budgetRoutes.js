const express = require('express')

const router = express.Router()

const {

  addBudget,
  getBudget,
  editBudget,
  removeBudget

} = require('../controllers/budgetController')

// =========================
// CREATE
// =========================
router.post('/', addBudget)

// =========================
// GET BY USER
// =========================
router.get('/:id_user', getBudget)

// =========================
// UPDATE
// =========================
router.put('/:id_budget', editBudget)

// =========================
// DELETE
// =========================
router.delete('/:id_budget', removeBudget)

module.exports = router