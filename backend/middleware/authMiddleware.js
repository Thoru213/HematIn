const jwt = require('jsonwebtoken')

const verifyToken = (req, res, next) => {

  const bearerHeader = req.headers['authorization']

  if (!bearerHeader) {

    return res.status(401).json({
      message: 'Access denied'
    })

  }

  const token = bearerHeader.split(' ')[1]

  try {

    const verified = jwt.verify(
      token,
      process.env.JWT_SECRET
    )

    req.user = verified

    next()

  } catch (error) {

    res.status(401).json({
      message: 'Invalid token'
    })

  }

}

module.exports = verifyToken