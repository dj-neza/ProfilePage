// The Cloud Functions for Firebase SDK to create Cloud Functions and triggers.
import {
  onCall,
  HttpsError,
} from 'firebase-functions/v2/https'
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
exports.updateUser = onCall({ cors: true }, async (request) => {
  const phoneNumber = request.auth?.token?.phone_number
  if (!request.auth || !phoneNumber) {
    throw new HttpsError('unauthenticated', 'You need to be signed in.')
  }
  const email = request.data.email
  const name = request.data.name
  if (!email) {
    throw new HttpsError('invalid-argument', 'Email is required.')
  }
  if (!emailRegex.test(email)) {
    throw new HttpsError('invalid-argument', 'Email is invalid.')
  }
  if (!name) {
    throw new HttpsError('invalid-argument', 'Name is required.')
  }
  return firestore
    .collection('users')
    .doc(phoneNumber)
    .set({
      name,
      email,
    })
    .then(() => ({ result: 'User updated.' }))
    .catch((error) => {
      throw new HttpsError('unknown', error)
    })
})

/**
 * Retrieves the user details from Firestore.
 */
exports.getUser = onCall({ cors: true }, async (request) => {
  const phoneNumber = request.auth?.token?.phone_number
  if (!request.auth || !phoneNumber) {
    throw new HttpsError('unauthenticated', 'You need to be signed in.')
  }

  return firestore
    .collection('users')
    .doc(phoneNumber)
    .get()
    .then((user) => {
      return { phoneNumber, ...user.data() }
    })
    .catch((error) => {
      throw new HttpsError('unknown', error)
    })
})
