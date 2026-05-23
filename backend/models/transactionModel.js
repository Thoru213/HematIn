const pool = require('../config/db')

// =========================
// CREATE TRANSACTION
// =========================
const createTransaction = async (

  id_user,
  id_wallet,
  id_category,
  id_budget,
  transaction_type,
  amount,
  description,
  transaction_date,
  source

) => {

  return await pool.query(

    `
    INSERT INTO transactions
    (
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

    VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9)
    `,

    [
      id_user,
      id_wallet,
      id_category,
      id_budget,
      transaction_type,
      amount,
      description,
      transaction_date,
      source
    ]

  )

}

// =========================
// GET TRANSACTION
// =========================
const getTransactionByUser = async (id_user) => {

  return await pool.query(

    `
    SELECT

      t.*,
      w.wallet_name,
      c.category_name

    FROM transactions t

    JOIN wallet w
    ON t.id_wallet = w.id_wallet

    JOIN category c
    ON t.id_category = c.id_category

    WHERE t.id_user = $1

    ORDER BY t.transaction_created_at DESC
    `,

    [id_user]

  )

}

// =========================
// UPDATE TRANSACTION
// =========================
const updateTransaction = async (

  id_transaction,
  amount,
  description

) => {

  return await pool.query(

    `
    UPDATE transactions
    SET

      amount = $1,
      description = $2

    WHERE id_transaction = $3
    `,

    [
      amount,
      description,
      id_transaction
    ]

  )

}

// =========================
// DELETE TRANSACTION
// =========================
const deleteTransaction = async (id_transaction) => {

  return await pool.query(

    `
    DELETE FROM transactions
    WHERE id_transaction = $1
    `,

    [id_transaction]

  )

}

module.exports = {

  createTransaction,
  getTransactionByUser,
  updateTransaction,
  deleteTransaction

}