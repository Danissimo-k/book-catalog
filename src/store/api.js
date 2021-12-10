import {initializeApp} from "firebase/app";
import {addDoc, collection, deleteDoc, doc, getDocs, getFirestore, query, updateDoc} from "firebase/firestore";
//Path constant

// Inititalize App
const firebaseApp = initializeApp(
    {
        apiKey: "AIzaSyAXNMXzpkObDpACoykufvd00LtEIsrCxE8",
        authDomain: "bookcatalog-9fd23.firebaseapp.com",
        databaseURL: "https://bookcatalog-9fd23-default-rtdb.asia-southeast1.firebasedatabase.app",
        projectId: "bookcatalog-9fd23",
        storageBucket: "bookcatalog-9fd23.appspot.com",
        messagingSenderId: "395853277541",
        appId: "1:395853277541:web:276f0d2d57000fb2ad198c"
    }
);


export const BOOK_PATH = 'books';
// Gef Firestore
export const firestore = getFirestore()
export const books = collection(firestore, BOOK_PATH);

//Actions---------------------------------------------------------------------------------------------------------------


export const editBookDB = async (id, newData) => {
    await updateDoc(doc(firestore,BOOK_PATH, id), newData)
}

export const addBookDB = async (data)=> {
    await addDoc(books, data)
}

