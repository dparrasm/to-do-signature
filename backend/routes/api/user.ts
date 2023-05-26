import express from 'express'
const router = express.Router()
import { check, validationResult } from 'express-validator'
import bcrypt from 'bcryptjs'
import {
  invitationEmail,
  passwordResetRequest
} from '../../utils/emailMessages'
const jwt = require('jsonwebtoken')
const config = require('config')
const { sendEmail } = require('../../middleware/email')

export const generatePassword = (length: number): string => {
  const charset =
    'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
  let result = ''
  for (let i = 0; i < length; i++) {
    result += charset.charAt(Math.floor(Math.random() * charset.length))
  }
  return result
}

// @route   POST api/users
// @desc    Register an user
// @access  Public

const User = require('../../models/User')

router.post(
  '/',
  [
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check(
      'password',
      'Please enter a password with 4 or more characters'
    ).isLength({ min: 4 })
  ],
  async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }
    const { name, surname, email, password, avatar } = req.body

    try {
      let user = await User.findOne({ email })
      if (user) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'User already exists' }] })
      }

      user = new User({
        name,
        surname,
        email,
        password,
        avatar
      })
      const salt = await bcrypt.genSalt(10)

      user.password = await bcrypt.hash(password, salt)

      await user.save()

      const payload = {
        user: {
          id: user.id
        }
      }

      jwt.sign(
        payload,
        config.get('jwtToken'),
        { expiresIn: 360000 },
        //Returns either an error, either the token.
        (err, token) => {
          if (err) throw err
          res.json({ token })
        }
      )
    } catch (err: any) {
      console.error(err.message)
      res.status(500).send('Server error on user resgistering')
    }
  }
)

// @route   PUT api/users
// @desc    Update an user
// @access  Public
router.put('/', async (req, res, next) => {
  const { email } = req.body
  let newUser = req.body

  try {
    let user = await User.findOne({ email })

    if (user === null) {
      return res.status(400).json({ errors: [{ msg: 'User does not exists' }] })
    }
    let updatedUser = Object.assign({}, user._doc, newUser)

    if (newUser.password === updatedUser.password) {
      console.log('New password: ', newUser.password)
      const salt = await bcrypt.genSalt(10)
      const password = await bcrypt.hash(updatedUser.password, salt)
      updatedUser.password = password
    }

    user = await User.findOneAndUpdate({ email }, updatedUser, {
      useFindAndModify: false
    }).then(() => {
      res.status(200).json(updatedUser)
    })
  } catch (err: any) {
    console.error(err.message)
    res.status(500).send('Server error on user updating')
  }
})

router.post('/notRegisteredRecipients', async (req, res, next) => {
  const recipients = req.body
  let notRegisteredRecipients: string[] = []

  try {
    const promises = recipients?.map(async (r) => {
      let user = await User.findOne({ email: r }).select('-avatar')
      if (user === null) {
        notRegisteredRecipients.push(r)
      }
    })

    await Promise.all(promises)

    notRegisteredRecipients.map(async (r) => {
      let user = new User({
        name: '',
        surname: '',
        email: r,
        password: '',
        avatar: ''
      })
      let password = generatePassword(8)
      const salt = await bcrypt.genSalt(10)
      user.password = await bcrypt.hash(password, salt)
      await user
        .save()
        .then(() => console.log('Succes for: ', JSON.stringify(user)))
        .catch(() => console.log('Failure for: ', JSON.stringify(user)))
      sendEmail(r, invitationEmail(password))
    })
    res
      .status(200)
      .json(
        'Not registered users has received their invitation to join the platform'
      )
  } catch (err: any) {
    console.error('notRegisteredRecipients', err.message)
    res.status(500).send('Server error on user invitation')
  }
})

router.put('/passwordResetRequest', async (req, res, next) => {
  const email = req?.body?.email

  try {
    let user = await User.findOne({ email: email })

    if (user !== null) {
      user = user._doc
      let password = generatePassword(8)
      const salt = await bcrypt.genSalt(10)
      user.password = await bcrypt.hash(password, salt)

      console.log(email)
      await User.findOneAndUpdate({ email }, user, {
        useFindAndModify: false
      }).then(() => {
        sendEmail(email, passwordResetRequest(password))
        res.status(200).json(user)
      })
    }
  } catch (err: any) {
    console.error('passwordResetRequest', err.message)
    res.status(500).send('Server error on password reset')
  }
})

module.exports = router
