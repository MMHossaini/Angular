const functions = require('firebase-functions');
// The Firebase Admin SDK to access the Firebase Realtime Database.
const admin = require('firebase-admin');
admin.initializeApp();

exports.userCreatedDate = functions.firestore
    .document('users/{userId}')
    .onCreate((snap, context) => {
        return snap.ref.set(
            {
                createdAt: admin.firestore.FieldValue.serverTimestamp()
            },
            { merge: true }
        );
    });