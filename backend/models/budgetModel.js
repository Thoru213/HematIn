const pool = require('../config/db')

// =========================
// CREATE BUDGET
// =========================
const createBudget = async (

  id_user,
  id_category,
  amount_limit,
  start_date,
  end_date,
  budget_type,
  description_budget

) => {

  return await pool.query(

    `
    INSERT INTO budget
    (
      id_user,
      id_category,
      amount_limit,
      start_date,
      end_date,
      budget_type,
      description_budget
    )

    VALUES ($1,$2,$3,$4,$5,$6,$7)
    `,

    [
      id_user,
      id_category,
      amount_limit,
      start_date,
      end_date,
      budget_type,
      description_budget
    ]

  )

}

// =========================
// GET BUDGET
// =========================
const getBudgetByUser = async (id_user) => {

  return await pool.query(

    `
    SELECT

      b.*,
      c.category_name

    FROM budget b

    JOIN category c
    ON b.id_category = c.id_category

    WHERE b.id_user = $1

    ORDER BY b.start_date DESC
    `,

    [id_user]

  )

}

// =========================
// UPDATE BUDGET
// =========================
const updateBudget = async (

  id_budget,
  amount_limit,
  start_date,
  end_date,
  budget_type,
  description_budget

) => {

  return await pool.query(

    `
    UPDATE budget
    SET

      amount_limit = $1,
      start_date = $2,
      end_date = $3,
      budget_type = $4,
      description_budget = $5

    WHERE id_budget = $6
    `,

    [
      amount_limit,
      start_date,
      end_date,
      budget_type,
      description_budget,
      id_budget
    ]

  )

}

// =========================
// DELETE BUDGET
// =========================
const deleteBudget = async (id_budget) => {

  return await pool.query(

    `
    DELETE FROM budget
    WHERE id_budget = $1
    `,

    [id_budget]

  )

}

module.exports = {

  createBudget,
  getBudgetByUser,
  updateBudget,
  deleteBudget

}