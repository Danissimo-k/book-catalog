import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import {books, firestore, BOOK_PATH} from './api'
import {addDoc,  deleteDoc, doc, getDocs,  query, updateDoc} from "firebase/firestore";


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
        const {id, ...filterData} = props
        await updateDoc(doc(firestore,BOOK_PATH, id), filterData)
    }
)

export const addBookAsync = createAsyncThunk('books/addBook',
    async (props, {}) => {
        const {id, ...filterData} = props
        await addDoc(books, filterData)
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
        searchTerm:'',
        books: [],
        loading: false,
        error: false,
        deletedAlert:false,
        noRecommendBookAlertAlert:false,
        gettingRecommendedBook:false,

    },
    reducers: {
        setGettingRecommendedBook(state,action){
            state.gettingRecommendedBook = action.payload
        },
        setDeleteAlert(state, action){
            state.deletedAlert = action.payload
        },
        setNoRecommendBookAlert(state, action){
            state.noRecommendBookAlertAlert = action.payload
        },
        editBook(state, action) {
            const {id, ...filterData} = action.payload
            const idx = state.books.findIndex((book) => book.id === id)
            console.log(state.books)
            state.books[idx] = {...filterData}
            console.log(state.books[idx])
            console.log(state.books)


        },
        removeBook(state, action) {
            state.books = state.books.filter((book) => book.id !== action.payload)
            removeBookAsync(action.payload)
        },
        setSearchTerm(state, action){
            state.searchTerm = action.payload
            console.log(state.searchTerm)
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
        [editBookAsync.pending]: (state, action) => {
            state.loading = true;
            state.error = null;
        },
        [editBookAsync.fulfilled]: (state, action) => {
            state.loading = false;
        },
        [editBookAsync.rejected]: (state, action) => {
            //    TODO errors handler may be?
        },
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
export const {removeBook,setSearchTerm,editBook,setDeleteAlert, setNoRecommendBookAlert,setGettingRecommendedBook} = counterSlice.actions


export default counterSlice.reducer