const {Router} = require('express')
const bcrypt = require('bcryptjs')
const config = require('config')
const jwt = require('jsonwebtoken')
const {check, validationResult} = require('express-validator')
const auth = require('../middleware/auth.middleware')
const router = Router()

let testUser = {}

// /api/clients/create
router.post(
  '/create',
  [
    check('user', 'Bad request').exists(),
    check('user.email', 'Incorrect email').isEmail(),
    check('user.password', 'Incorrect password').exists(),
    check('user.invited_by', 'Invalid invitation code').equals('RU-637164')
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req)

      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
          message: 'Incorrect registration data'
        })
      }

      const {email, password, invited_by} = req.body

      if (testUser.email && testUser.email === email)
        return res.status(400).json({message: 'This user already exists'})

      const hashedPassword = await bcrypt.hash(password, 'salt')
      testUser = {client_id: 'RU-777777', email, password: hashedPassword, invited_by}

      res.status(201).json({message: 'The user is created'})

    } catch (e) {
      res.status(500).json({message: 'Something went wrong, try again'})
    }
  })

// /api/clients/token
router.post(
  '/token',
  [
    check('username', 'Incorrect email').normalizeEmail().isEmail(),
    check('password', 'Incorrect password').exists()
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req)

      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
          message: 'Incorrect auth data'
        })
      }

      const {username, password} = req.body

      if (!testUser.email) {
        return res.status(400).json({message: 'The user is not found'})
      }

      const isMatch = await bcrypt.compare(password, testUser.password)

      if (!isMatch) {
        return res.status(400).json({message: 'Invalid password, please try again'})
      }

      const access_token = jwt.sign(
        {client_id: testUser.client_id},
        config.get('secret'),
        {expiresIn: 120}
      )

      testUser.token = access_token

      res.json({client_id: testUser.client_id, access_token, refresh_token: access_token})

    } catch (e) {
      res.status(500).json({message: 'Something went wrong, try again'})
    }
  })

// /api/clients/token/refresh
router.post(
  '/token/refresh',
  [
    check('refresh_token', 'Incorrect refresh_token').exists()
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req)

      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
          message: 'Incorrect auth data'
        })
      }

      const {refresh_token} = req.body

      if (!testUser.email) {
        return res.status(400).json({message: 'The user is not found'})
      }

      const isMatch = await bcrypt.compare(password, testUser.password)

      if (refresh_token !== testUser.refresh_token) {
        return res.status(400).json({message: 'Invalid refresh_token'})
      }

      const access_token = jwt.sign(
        {client_id: testUser.client_id},
        config.get('secret'),
        {expiresIn: 120}
      )

      testUser.token = access_token

      res.json({client_id: testUser.client_id, email: testUser.email})

    } catch (e) {
      res.status(500).json({message: 'Something went wrong, try again'})
    }
  })

// /api/clients/?id
router.get(
  '/:client_id', auth,
  async (req, res) => {
    try {
      const {client_id} = req.params

      const {refresh_token} = req.body

      if (!testUser.client_id && client_id !== testUser.client_id) {
        return res.status(400).json({message: 'The user is not found'})
      }

      res.json({client_id: testUser.client_id, access_token, refresh_token: access_token})

    } catch (e) {
      res.status(500).json({message: 'Something went wrong, try again'})
    }
  })


module.exports = router
