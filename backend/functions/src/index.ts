// The Cloud Functions for Firebase SDK to create Cloud Functions and triggers.
import {onRequest} from "firebase-functions/v2/https";
import {auth} from "firebase-functions";

// The Firebase Admin SDK to access Firestore.
import {initializeApp} from "firebase-admin/app";
import {getFirestore} from "firebase-admin/firestore";
import {UserRecord} from "firebase-admin/auth";

initializeApp();

// Add user to Firestore when user is created in Firebase Auth.
exports.addUser = auth.user().onCreate(async (authUser: UserRecord) => {
   // handle error with missing phone number
  if (!authUser.phoneNumber) {
    // add 400 with missing phone number for logging 
    return;
  }

  await getFirestore().collection("users").doc(
    authUser.phoneNumber,
  ).set({
    // remove default values
    name: "Happy chipmunk",
    email: "",
  }).catch(() => {
    // add 500 for logging
  });
});

// Update users details
exports.updateUser = onRequest(
  {cors: true},
  async (req, res) => {
    const email = req.body.email;
    const name = req.body.name;
    const phoneNumber = req.body.phoneNumber;
    // for each field, check if it exists / is valid and return 400 if not
    await getFirestore()
      .collection("users")
      .doc(phoneNumber)
      .set({
        name,
        email,
      }).then(() => res.json({result: "User info updated."})).catch((error) => {
        res.status(500).json({error});
      });
  }
);

// Get user details
exports.getUser = onRequest({cors: true}, async (req, res) => {
  const phoneNumber = req.query.phoneNumber as string;
  // check if phone number exists
  await getFirestore().collection("users").doc(phoneNumber).get()
    .then((user) => {
      if (!user.exists) {
        res.status(400).json({error: "No such user!"});
      }
      res.json({...user.data()});
    }).catch((error) => {
      res.status(500).json({error});
    });
});
