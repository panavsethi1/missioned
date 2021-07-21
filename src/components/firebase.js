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
        app.initializeApp(firebaseConfig)
        this.auth = app.auth()
        this.db = app.firestore()
    }

    login(email, password) {
        return this.auth
            .setPersistence(app.auth.Auth.Persistence.SESSION)
            .then(() => {
                return this.auth.signInWithEmailAndPassword(email, password)
            })
            .catch((error) => {
                alert(error.code)
                alert(error.message)
            })
        // return this.auth.signInWithEmailAndPassword(email, password)
    }

    logout() {
        return this.auth.signOut()
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
        if (
            sessionStorage.getItem(
                'firebase:authUser:AIzaSyALCuPpZu8Eua604_hkldobTB9fM1jx7P8:[DEFAULT]'
            )
        ) {
            const uid = JSON.parse(
                sessionStorage.getItem(
                    'firebase:authUser:AIzaSyALCuPpZu8Eua604_hkldobTB9fM1jx7P8:[DEFAULT]'
                )
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
}

export default new Firebase()
