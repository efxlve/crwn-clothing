import { initializeApp } from 'firebase/app';
import { 
    getAuth,
    signInWithRedirect,
    signInWithPopup,
    GoogleAuthProvider,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
    NextOrObserver,
    User
} from 'firebase/auth';
import { 
    getFirestore,
    doc,
    getDoc,
    setDoc,
    collection,
    writeBatch,
    query,
    getDocs,
    QueryDocumentSnapshot
} from 'firebase/firestore';
import { Category } from '../../store/categories/category.types';

const firebaseConfig = {
    apiKey: "AIzaSyBix7Vi_h1xh8HC0firAodj3G2rqom0u_g",
    authDomain: "crwn-clothing-db-7c212.firebaseapp.com",
    projectId: "crwn-clothing-db-7c212",
    storageBucket: "crwn-clothing-db-7c212.appspot.com",
    messagingSenderId: "52819295373",
    appId: "1:52819295373:web:1227d22a2f6cf148fe76c4"
};

initializeApp(firebaseConfig);

const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: 'select_account' });

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider);
export const signInWithGoogleRedirect = () => signInWithRedirect(auth, googleProvider);

export const db = getFirestore();

export type ObjectToAdd = {
    title: string;
};

export const addCollectionAndDocuments = async <T extends ObjectToAdd>(collectionKey: string, objectsToAdd: T[]): Promise<void> => {
    const collectionRef = collection(db, collectionKey);
    const batch = writeBatch(db);

    objectsToAdd.forEach(object => {
        const DocRef = doc(collectionRef, object.title.toLowerCase());
        batch.set(DocRef, object);
    });

    return await batch.commit();
};

export const getCategoriesAndDocuments = async (): Promise<Category[]> => {
    const collectionRef = collection(db, 'categories');
    const q = query(collectionRef);
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => doc.data() as Category);
};

export type AdditionalInformation = {
    displayName?: string;
};

export type UserData = {
    createdAt: Date;
    displayName: string;
    email: string;
};

export const createUserDocumentFromAuth = async (userAuth: User, additionalInformation = {} as AdditionalInformation): Promise<void | QueryDocumentSnapshot<UserData>> => {
    if (!userAuth) return;
    const userDocRef = doc(db, 'users', userAuth.uid);
    const userDocSnapshot = await getDoc(userDocRef);

    if (!userDocSnapshot.exists()) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        try {
            await setDoc(userDocRef, {
                displayName,
                email,
                createdAt,
                ...additionalInformation
            });
        } catch (error) {
            console.log('Error creating the user', error);
        }
    }

    return userDocSnapshot as QueryDocumentSnapshot<UserData>;
};

export const createAuthUserWithEmailAndPassword = async (email: string, password: string) => {
    if (!email || !password) return;

    return await createUserWithEmailAndPassword(auth, email, password);
};

export const signInAuthUserWithEmailAndPassword = async (email: string, password: string) => {
    if (!email || !password) return;

    return await signInWithEmailAndPassword(auth, email, password);
};

export const signOutUser = async () => await signOut(auth);

export const onAuthStateChangedListener = (callback: NextOrObserver<User>) => onAuthStateChanged(auth, callback);

export const getCurrentUser = (): Promise<User | null> => {
    return new Promise((resolve, reject) => {
        const unsubscribe = onAuthStateChanged(auth, userAuth => {
            unsubscribe();
            resolve(userAuth);
        }, reject);
    });
}
