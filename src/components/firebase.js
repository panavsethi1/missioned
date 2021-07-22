import app from 'firebase/app'
import 'firebase/auth'
import 'firebase/firebase-firestore'

var firebaseConfig = {
    apiKey: 'AIzaSyALCuPpZu8Eua604_hkldobTB9fM1jx7P8',
    authDomain: 'missioned-4cbf0.firebaseapp.com',
    projectId: 'missioned-4cbf0',
    storageBucket: 'missioned-4cbf0.appspot.com',
    messagingSenderId: '286541919809',
    appId: '1:286541919809:web:b52e223b1cd44ca614f8c0',
    measurementId: 'G-TW3Z416XHL',
}

class Firebase {
    constructor() {
        if (!app.length) {
            app.initializeApp(firebaseConfig)
        }
        this.auth = app.auth()
        this.db = app.firestore()
    }

    async login(email, password) {
        return await this.auth
            .setPersistence(app.auth.Auth.Persistence.SESSION)
            .then(() => {
                return this.auth.signInWithEmailAndPassword(email, password)
            })
            .catch((error) => {
                alert(error.message)
            })
        // return this.auth.signInWithEmailAndPassword(email, password)
    }

    logout() {
        return this.auth
            ? this.auth.signOut()
            : delete sessionStorage[Object.keys(sessionStorage)[0]]
    }

    async register(name, email, password) {
        await this.auth
            .setPersistence(app.auth.Auth.Persistence.SESSION)
            .then(() => {
                return this.auth.createUserWithEmailAndPassword(email, password)
            })
            .catch((error) => {
                alert(error.code)
                alert(error.message)
            })
        return this.auth.currentUser.updateProfile({
            displayName: name,
        })
    }

    addUserType(type) {
        if (!this.auth.currentUser) {
            return alert('Not authorized')
        }

        return this.db.doc(`users/${this.auth.currentUser.uid}`).set({
            type,
        })
    }

    isInitialized() {
        return new Promise((resolve) => {
            this.auth.onAuthStateChanged(resolve)
        })
    }

    getCurrentUsername() {
        return this.auth.currentUser && this.auth.currentUser.displayName
    }

    async getCurrentUserType() {
        if (sessionStorage[Object.keys(sessionStorage)[0]]) {
            const uid = JSON.parse(
                sessionStorage[Object.keys(sessionStorage)[0]]
            ).uid
            const user = await this.db.doc(`users/${uid}`).get()
            return user.get('type')
        } else {
            const user = await this.db
                .doc(`users/${this.auth.currentUser.uid}`)
                .get()
            return user.get('type')
        }
    }

    async getSubjectList() {
        let results = []
        const subjectsRef = this.db.collection('subjects')
        const snapshot = await subjectsRef.get()
        snapshot.forEach((doc) => {
            results.push(doc.id)
        })
        return results
    }

    async getVideoList(subject) {
        const cityRef = this.db.collection('subjects').doc(subject)
        const doc = await cityRef.get()
        if (!doc.exists) {
            console.log('No such document!')
        } else {
            return doc.data()
        }
    }

    async sendMessage(msg, subject) {
        const messagesRef = this.db.collection(`${subject}-messages`)
        let uid
        this.auth.currentUser
            ? (uid = this.auth.currentUser.uid)
            : (uid = JSON.parse(
                  sessionStorage[Object.keys(sessionStorage)[0]]
              ).uid)
        return await messagesRef.add({
            text: msg,
            createdAt: new Date(),
            uid,
        })
    }
}

export default new Firebase()
