// The Cloud Functions for Firebase SDK to create Cloud Functions and triggers.
import { onRequest } from 'firebase-functions/v2/https'
import { auth, logger } from 'firebase-functions'

// The Firebase Admin SDK to access Firestore.
import { initializeApp } from 'firebase-admin/app'
import { getFirestore } from 'firebase-admin/firestore'
import { UserRecord } from 'firebase-admin/auth'

const emailRegex = /\S+@\S+\.\S+/

initializeApp()

const firestore = getFirestore()

/**
 * Adds user to Firestore when user is created in Firebase Auth.
 */
exports.addUser = auth.user().onCreate(async (authUser: UserRecord) => {
  if (!authUser.phoneNumber) {
    logger.error('No phone number was provided.')
    return
  }

  await firestore
    .collection('users')
    .doc(authUser.phoneNumber)
    .set({
      name: null,
      email: null,
    })
    .catch((error) => {
      logger.error(`Error: ${error}`)
    })
})

/**
 * Updates the user details in Firestore.
 */
exports.updateUser = onRequest({ cors: true }, async (req, res) => {
  const email = req.body.email
  const name = req.body.name
  const phoneNumber = req.body.phoneNumber
  if (!phoneNumber) {
    res.status(400).json({ error: 'Phone number of the user is required.' })
  }
  if (!email) {
    res.status(400).json({ error: 'Email is required.' })
  }
  if (!emailRegex.test(email)) {
    res.status(400).json({ error: 'Email is invalid.' })
  }
  if (!name) {
    res.status(400).json({ error: 'Name is required.' })
  }
  await firestore
    .collection('users')
    .doc(phoneNumber)
    .set({
      name,
      email,
    })
    .then(() => res.json({ result: 'User updated.' }))
    .catch((error) => {
      res.status(500).json({ error })
    })
})

/**
 * Retrieves the user details from Firestore.
 */
exports.getUser = onRequest({ cors: true }, async (req, res) => {
  const phoneNumber = req.query.phoneNumber as string
  if (!phoneNumber) {
    res.status(400).json({ error: 'Phone number of the user is required.' })
  }

  await firestore
    .collection('users')
    .doc(phoneNumber)
    .get()
    .then((user) => {
      res.json({ ...user.data() })
    })
    .catch((error) => {
      res.status(500).json({ error })
    })
})
