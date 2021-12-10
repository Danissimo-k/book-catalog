import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import {books, firestore, BOOK_PATH} from './api'
import {addDoc, collection, deleteDoc, doc, getDocs, getFirestore, query, updateDoc} from "firebase/firestore";


// Async Thunks --------------------------------------------------------------------------------------------------------
export const getBooksAsync = createAsyncThunk('books/getBooks',
    async () => {
        const qu = query(
            books
        )
        const querySnapshot = await getDocs(qu)
        return querySnapshot.docs.map(snap => (
            Object.assign({id: snap.id}, snap.data())))
    }
)

export const editBookAsync = createAsyncThunk('books/editBook',
    async (props, {}) => {
        const id = props.id;
        const filter_data = {...props};
        delete filter_data.id;
        await updateDoc(doc(firestore,BOOK_PATH, id), filter_data)
    }
)

export const addBookAsync = createAsyncThunk('books/addBook',
    async (props, {}) => {
        await addDoc(books, {...props})
    }
)

export const removeBookAsync = createAsyncThunk('books/remove',
    async ({id}, {}) => {
        await deleteDoc(doc(firestore, BOOK_PATH, id ))
        removeBook(id)
    }
)


// Slice ------------------------------------------------------------------------------------
export const counterSlice = createSlice({
    name: 'books',
    initialState: {
        books: [],
        loading: false,
        error: false,

    },
    reducers: {
        removeBook(state, action) {
            state.books = state.books.filter((book) => book.id !== action.payload)
        }

    },
    extraReducers:{
        // Get books Thunk
        [getBooksAsync.pending]: (state, action) => {
            state.loading = true;
            state.error = null;
        },
        [getBooksAsync.fulfilled]: (state, action) => {
            state.loading = false;
            state.books = action.payload;
        },
        [getBooksAsync.rejected]: (state, action) => {
        //    TODO errors handler may be?
        },

    //    Edit Books Thunk

    //    Add Book Thunk
        [addBookAsync.pending]: (state, action)=>{
            state.loading = true;
            state.error = null;
        },
        [addBookAsync.fulfilled]: (state, action)=>{
            state.loading = false;
            getBooksAsync()
        },
        [addBookAsync.rejected]: (state, action)=>{
            // TODO errors handler may be?
        },
    //    Remove Book Thunk
        [removeBookAsync.pending]:(state, action) => {
            state.loading = true
        },
        [removeBookAsync.fulfilled]: (state, action) => {
            state.loading = false
        },
        [removeBookAsync.rejected] : (state, action) => {
            // TODO errors handler may be?
        }

    }
})

// Action creators are generated for each case reducer function
export const {removeBook} = counterSlice.actions


export default counterSlice.reducer