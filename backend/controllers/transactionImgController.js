const {

    createTransactionImage,
    getTransactionImage
  
  } = require('../models/transactionImgModel')
  
  // =========================
  // CREATE IMAGE
  // =========================
  const addTransactionImage = async (req, res) => {
  
    try {
  
      const {
  
        id_transaction,
        img_nota,
        status
  
      } = req.body
  
      await createTransactionImage(
  
        id_transaction,
        img_nota,
        status
  
      )
  
      res.json({
        message: 'Transaction image berhasil ditambahkan'
      })
  
    } catch (error) {
  
      console.log(error)
  
      res.status(500).json({
        message: 'Server Error'
      })
  
    }
  
  }
  
  // =========================
  // GET IMAGE
  // =========================
  const getImage = async (req, res) => {
  
    try {
  
      const { id_transaction } = req.params
  
      const result =
        await getTransactionImage(id_transaction)
  
      res.json(result.rows)
  
    } catch (error) {
  
      console.log(error)
  
      res.status(500).json({
        message: 'Server Error'
      })
  
    }
  
  }
  
  module.exports = {
  
    addTransactionImage,
    getImage
  
  }