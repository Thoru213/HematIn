const express = require('express')
const cors = require('cors')
const { Pool } = require('pg')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

require('dotenv').config()

const app = express()

app.use(cors())
app.use(express.json())

// DATABASE CONNECTION
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
})

// =========================
// TEST API
// =========================
app.get('/', (req, res) => {

  res.json({
    message: 'API Hematin berjalan'
  })

})

// =========================
// GET USERS
// =========================
app.get('/users', async (req, res) => {

  try {

    const result = await pool.query(`
      SELECT
        id_user,
        username,
        email_user,
        phone_number,
        user_created_at
      FROM users
      ORDER BY user_created_at DESC
    `)

    res.json(result.rows)

  } catch (error) {

    console.log(error)

    res.status(500).json({
      message: 'Server Error'
    })

  }

})

// =========================
// REGISTER
// =========================
app.post('/register', async (req, res) => {

  try {

    const {
      username,
      email_user,
      password,
      phone_number
    } = req.body

    // VALIDASI
    if (
      !username ||
      !email_user ||
      !password ||
      !phone_number
    ) {
      return res.status(400).json({
        message: 'Semua field wajib diisi'
      })
    }

    // CHECK EMAIL
    const checkUser = await pool.query(
      `
      SELECT *
      FROM users
      WHERE email_user = $1
      `,
      [email_user]
    )

    if (checkUser.rows.length > 0) {

      return res.status(400).json({
        message: 'Email sudah terdaftar'
      })

    }

    // HASH PASSWORD
    const hashedPassword = await bcrypt.hash(password, 10)

    // INSERT USER
    await pool.query(
      `
      INSERT INTO users
      (
        username,
        email_user,
        password,
        phone_number
      )
      VALUES ($1, $2, $3, $4)
      `,
      [
        username,
        email_user,
        hashedPassword,
        phone_number
      ]
    )

    res.json({
      message: 'Register berhasil'
    })

  } catch (error) {

    console.log(error)

    res.status(500).json({
      message: 'Server Error'
    })

  }

})

// =========================
// LOGIN
// =========================
app.post('/login', async (req, res) => {

  try {

    const {
      email_user,
      password
    } = req.body

    // CHECK USER
    const result = await pool.query(
      `
      SELECT *
      FROM users
      WHERE email_user = $1
      `,
      [email_user]
    )

    if (result.rows.length === 0) {

      return res.status(400).json({
        message: 'Email tidak ditemukan'
      })

    }

    const user = result.rows[0]

    // CHECK PASSWORD
    const validPassword = await bcrypt.compare(
      password,
      user.password
    )

    if (!validPassword) {

      return res.status(400).json({
        message: 'Password salah'
      })

    }

    // JWT TOKEN
    const token = jwt.sign(
      {
        id_user: user.id_user,
        email_user: user.email_user
      },
      process.env.JWT_SECRET,
      {
        expiresIn: '1d'
      }
    )

    // RESPONSE
    res.json({
      message: 'Login berhasil',
      token,
      user: {
        id_user: user.id_user,
        username: user.username,
        email_user: user.email_user,
        phone_number: user.phone_number
      }
    })

  } catch (error) {

    console.log(error)

    res.status(500).json({
      message: 'Server Error'
    })

  }

})

// =========================
// SERVER
// =========================
app.listen(3000, () => {

  console.log('Server running on port 3000')

})