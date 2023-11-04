// The Cloud Functions for Firebase SDK to create Cloud Functions and triggers.
const {auth} = require("firebase-functions");
const {onRequest} = require("firebase-functions/v2/https");

// The Firebase Admin SDK to access Firestore.
const {initializeApp} = require("firebase-admin/app");
const {getFirestore} = require("firebase-admin/firestore");

initializeApp();

// Add user to Firestore when user is created in Firebase Auth.
exports.addUser = auth.user().onCreate(async (user) => {
  await getFirestore().collection("users").doc(
      user.phoneNumber,
  ).set({
    name: "Happy chipmunk",
    email: "",
  });
});

// Update users details
exports.updateUser = onRequest({cors: true}, async (req, res) => {
  const email = req.body.email;
  const name = req.body.name;
  const phoneNumber = req.body.phoneNumber;
  await getFirestore()
      .collection("users")
      .doc(phoneNumber)
      .set({
        name,
        email,
      }).then(() => res.json({result: `User info updated.`})).catch((error) => {
        res.json({error});
      });
});

// Get user details
exports.getUser = onRequest({cors: true}, async (req, res) => {
  const phoneNumber = req.query.phoneNumber;
  await getFirestore().collection("users").doc(phoneNumber).get()
      .then((user) => {
        if (user.exists) {
          res.json({...user.data()});
        } else {
          res.json({error: "No such user!"});
        }
      }).catch((error) => {
        res.json({error});
      });
});
