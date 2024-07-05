import { createContext, useContext, useState, useEffect } from "react";
import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
} from "firebase/auth";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  getDoc,
  doc,
  query,
  where,
} from "firebase/firestore";
import { getStorage, ref, getDownloadURL } from "firebase/storage";
const FirebaseContext = createContext(null);
console.log(process.env.REACT_APP_FIREBASE_API_KEY);
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
};

export const useFirebase = () => useContext(FirebaseContext);

const firebaseApp = initializeApp(firebaseConfig);
const firebaseAuth = getAuth(firebaseApp);
const firestore = getFirestore(firebaseApp);
const storage = getStorage(firebaseApp);
const googleProvider = new GoogleAuthProvider();
export const FirebaseProvider = (props) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    onAuthStateChanged(firebaseAuth, (user) => {
      if (user) setUser(user);
      else setUser(null);
    });
  }, []);
  const signupUserWithEmailAndPassword = (email, password) =>
    createUserWithEmailAndPassword(firebaseAuth, email, password);
  const singinUserWithEmailAndPass = (email, password) =>
    signInWithEmailAndPassword(firebaseAuth, email, password);
  const signinWithGoogle = () => signInWithPopup(firebaseAuth, googleProvider);
  const newPeople = async (name, url) => {
    return await addDoc(collection(firestore, "people"), {
      name,
      url,
    });
  };
  const listAllPeople = async () => {
    try {
      const querySnapshot = await getDocs(collection(firestore, "people"));
      const peopleList = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      console.log("Done", peopleList);
      console.log(peopleList.length);
      return peopleList;
    } catch (error) {
      console.error("Error fetching people: ", error);
      throw error;
    }
  };
  const getPersonById = async (id) => {
    try {
      const docRef = doc(firestore, "people", id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        return docSnap.data();
      } else {
        console.log("No such document!");
        return null;
      }
    } catch (error) {
      console.error("Error getting document:", error);
      throw error;
    }
  };
  const getImageURL = (path) => {
    return getDownloadURL(ref(storage, path));
  };

  const addCelebImage = async (id, url) => {
    const collectionRef = collection(firestore, "people", id, "images");
    const result = await addDoc(collectionRef, {
      url,
    });
    return result;
  };

  const fetchMyBooks = async (userId) => {
    const collectionRef = collection(firestore, "books");
    const q = query(collectionRef, where("userID", "==", userId));

    const result = await getDocs(q);
    return result;
  };
  const logout = () => {
    firebaseAuth.signOut().then(
      function () {
        console.log("Signed Out");
      },
      function (error) {
        console.error("Sign Out Error", error);
      }
    );
  };

  const getImages = async (id) => {
    const collectionRef = collection(firestore, "people", id, "images");
    const querySnapshot = await getDocs(collectionRef);
    const imagesArray = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return imagesArray;
  };

  const isLoggedIn = user ? true : false;

  return (
    <FirebaseContext.Provider
      value={{
        signinWithGoogle,
        signupUserWithEmailAndPassword,
        singinUserWithEmailAndPass,
        newPeople,
        listAllPeople,
        getImageURL,
        getPersonById,
        addCelebImage,
        fetchMyBooks,
        getImages,
        isLoggedIn,
        setUser,
        user,
        logout,
      }}
    >
      {props.children}
    </FirebaseContext.Provider>
  );
};
