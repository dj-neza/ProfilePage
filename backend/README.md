# SIMPLE PROFILE PAGE BACKEND

This is a quick backend setup that uses Firebase Cloud Functions and Firestore to manage user data.\
It consists of three functions: 
- onCreate action that adds a user record to Firestore every time a new user signs in with Firebase Auth
- GET: getUser request that returns user data for a given user
- PUT: updateUser request that updates user data for a given user

## Running the functions

All the commands should be run in the `/functions` directory!\
To run the firebase commands you need to install the [Firebase CLI](https://firebase.google.com/docs/cli#setup_update_cli) using the following command: `npm install -g firebase-tools`.

### `npm install`

To install the packages used for the functions. Should be done the first time when working with this project.

### `npm run serve`

Builds the functions and starts up the Firebase emulator for testing the functions locally pre-deploy (includes visible logs and temporary Firestore).

## Building and deploying the functions 

### `npm run build`

Creates a functions build (including compiling functions to JavaScrip) in the lib folder.\
Then deploys the functions

## Using the Firebase console

To get access to the Firebase console, please contact the project owner.
