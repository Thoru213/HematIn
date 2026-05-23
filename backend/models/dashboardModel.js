const pool = require('../config/db')

// =========================
// TOTAL BALANCE
// =========================
const getTotalBalance = async (id_user) => {

  return await pool.query(

    `
    SELECT

      COALESCE(SUM(balance), 0)
      AS total_balance

    FROM wallet

    WHERE id_user = $1
    `,

    [id_user]

  )

}

// =========================
// TOTAL PEMASUKAN
// =========================
const getTotalIncome = async (id_user) => {

  return await pool.query(

    `
    SELECT

      COALESCE(SUM(amount), 0)
      AS total_income

    FROM transactions

    WHERE id_user = $1

    AND transaction_type = 'Pemasukan'
    `,

    [id_user]

  )

}

// =========================
// TOTAL PENGELUARAN
// =========================
const getTotalExpense = async (id_user) => {

  return await pool.query(

    `
    SELECT

      COALESCE(SUM(amount), 0)
      AS total_expense

    FROM transactions

    WHERE id_user = $1

    AND transaction_type = 'Pengeluaran'
    `,

    [id_user]

  )

}

module.exports = {

  getTotalBalance,
  getTotalIncome,
  getTotalExpense

}