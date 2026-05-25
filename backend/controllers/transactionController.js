const pool = require('../config/db')

const {

  createTransaction,
  getTransactionByUser,
  updateTransaction,
  deleteTransaction

} = require('../models/transactionModel')

// =========================
// CREATE TRANSACTION
// =========================
const addTransaction = async (req, res) => {

  console.log(req.body)

  try {

    const {

      id_user,
      id_wallet,
      id_category,
      id_budget,
      transaction_type,
      amount,
      description,
      transaction_date,
      source

    } = req.body

    await createTransaction(

      id_user,
      id_wallet,
      id_category,
      id_budget,
      transaction_type,
      amount,
      description,
      transaction_date,
      source

    )

    // =========================
    // PEMASUKAN
    // =========================
    if (transaction_type === 'Pemasukan') {

      await pool.query(

        `
        UPDATE wallet
        SET balance = balance + $1
        WHERE id_wallet = $2
        `,

        [amount, id_wallet]

      )

    }

    // =========================
    // PENGELUARAN
    // =========================
    if (transaction_type === 'Pengeluaran') {

      await pool.query(

        `
        UPDATE wallet
        SET balance = balance - $1
        WHERE id_wallet = $2
        `,

        [amount, id_wallet]

      )

    }

    res.json({
      message: 'Transaction berhasil ditambahkan'
    })

  } catch (error) {

    console.log(error)

    res.status(500).json({
      message: 'Server Error'
    })

  }

}

// =========================
// GET TRANSACTION
// =========================
const getTransaction = async (req, res) => {

  try {

    const { id_user } = req.params

    const result =
      await getTransactionByUser(id_user)

    res.json(result.rows)

  } catch (error) {

    console.log(error)

    res.status(500).json({
      message: 'Server Error'
    })

  }

}

// =========================
// UPDATE TRANSACTION
// =========================
const editTransaction = async (req, res) => {

  try {

    const { id_transaction } = req.params

    const {

      id_wallet,
      id_category,
      transaction_type,
      amount,
      description,
      transaction_date,

    } = req.body

    await updateTransaction(

      id_transaction,
      id_wallet,
      id_category,
      transaction_type,
      amount,
      description,
      transaction_date

    )

    res.json({
      message: 'Transaction berhasil diupdate'
    })

  } catch (error) {

    console.log(error)

    res.status(500).json({
      message: 'Server Error'
    })

  }

}

// =========================
// DELETE TRANSACTION
// =========================
const removeTransaction = async (req, res) => {

  try {

    const { id_transaction } = req.params

    await deleteTransaction(id_transaction)

    res.json({
      message: 'Transaction berhasil dihapus'
    })

  } catch (error) {

    console.log(error)

    res.status(500).json({
      message: 'Server Error'
    })

  }

}

module.exports = {

  addTransaction,
  getTransaction,
  editTransaction,
  removeTransaction

}