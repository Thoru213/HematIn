const {

    createWallet,
    getWalletByUser,
    updateWallet,
    deleteWallet
  
  } = require('../models/walletModel')
  
  // =========================
  // CREATE WALLET
  // =========================
  const addWallet = async (req, res) => {
  
    try {
  
      const {
  
        id_user,
        wallet_name,
        balance,
        wallet_type
  
      } = req.body
  
      await createWallet(
  
        id_user,
        wallet_name,
        balance,
        wallet_type
  
      )
  
      res.json({
        message: 'Wallet berhasil ditambahkan'
      })
  
    } catch (error) {
  
      console.log(error)
  
      res.status(500).json({
        message: 'Server Error'
      })
  
    }
  
  }
  
  // =========================
  // GET WALLET
  // =========================
  const getWallet = async (req, res) => {
  
    try {
  
      const { id_user } = req.params
  
      const result =
        await getWalletByUser(id_user)
  
      res.json(result.rows)
  
    } catch (error) {
  
      console.log(error)
  
      res.status(500).json({
        message: 'Server Error'
      })
  
    }
  
  }
  
  // =========================
  // UPDATE WALLET
  // =========================
  const editWallet = async (req, res) => {
  
    try {
  
      const { id_wallet } = req.params
  
      const {
  
        wallet_name,
        balance,
        wallet_type
  
      } = req.body
  
      await updateWallet(
  
        id_wallet,
        wallet_name,
        balance,
        wallet_type
  
      )
  
      res.json({
        message: 'Wallet berhasil diupdate'
      })
  
    } catch (error) {
  
      console.log(error)
  
      res.status(500).json({
        message: 'Server Error'
      })
  
    }
  
  }
  
  // =========================
  // DELETE WALLET
  // =========================
  const removeWallet = async (req, res) => {
  
    try {
  
      const { id_wallet } = req.params
  
      await deleteWallet(id_wallet)
  
      res.json({
        message: 'Wallet berhasil dihapus'
      })
  
    } catch (error) {
  
      console.log(error)
  
      res.status(500).json({
        message: 'Server Error'
      })
  
    }
  
  }
  
  // =========================
  // GET WALLET TYPES
  // =========================
  const getWalletTypes = (req, res) => {
  
    const types = [
      'Cash',
      'Bank',
      'E-Wallet',
      'Credit Card',
      'Investment',
      'Other'
    ]
  
    res.json(types)
  
  }
  
  module.exports = {
  
    addWallet,
    getWallet,
    editWallet,
    removeWallet,
    getWalletTypes
  
  }