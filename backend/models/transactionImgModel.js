const pool = require('../config/db')

// =========================
// CREATE TRANSACTION IMAGE
// =========================
const createTransactionImage = async (

  id_transaction,
  img_nota,
  status

) => {

  return await pool.query(

    `
    INSERT INTO transaction_img
    (
      id_transaction,
      img_nota,
      status
    )

    VALUES ($1,$2,$3)
    `,

    [
      id_transaction,
      img_nota,
      status
    ]

  )

}

// =========================
// GET TRANSACTION IMAGE
// =========================
const getTransactionImage = async (id_transaction) => {

  return await pool.query(

    `
    SELECT *
    FROM transaction_img
    WHERE id_transaction = $1
    ORDER BY transaction_created_at DESC
    `,

    [id_transaction]

  )

}

module.exports = {

  createTransactionImage,
  getTransactionImage

}