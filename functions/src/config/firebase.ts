import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions';

admin.initializeApp({
    credential: admin.credential.cert({
        projectId: functions.config().project.id,
        clientEmail: functions.config().client.email,
        privateKey: functions.config().private.key.replace(/\\n/g, '\n')
    }),
    databaseURL: 'https://rest-images.firebaseio.com'
});

const db = admin.firestore();

export { admin, db }