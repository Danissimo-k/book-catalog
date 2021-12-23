import React, {useEffect, useState} from 'react';
import BookGroup from "./BookGroup";
import {Stack, Paper, Fab, Alert, Collapse, CircularProgress} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import {styled} from '@mui/material/styles';
import {useDispatch, useSelector} from "react-redux";
import {
    getBooksAsync,
    setDeleteAlert,
    setGettingRecommendedBook,
    setNoRecommendBookAlert,
} from "../store/booksSlice";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import BookInfo from "./BookInfo";
import Loader from "react-loader-spinner";

const Item = styled(Paper)(({theme}) => ({
    padding: theme.spacing(1),
    background: 'none',
    variant: 'outlined'
}));

const onlyUnique = (value, index, self) => {
    return self.indexOf(value) === index;
}

const WorkSpace = () => {

    const [recommendedBook, setRecommendedBook] = useState({});
    // Get books from redux
    const booksList = useSelector((state => state.books.books))
    const loading = useSelector((state => state.books.loading))
    const gettingRecommendedBook = useSelector((state => state.books.gettingRecommendedBook))
    const searchTerm = useSelector((state => state.books.searchTerm))
    const alertDelete = useSelector((state => state.books.deletedAlert))
    const noRecommendBookAlertAlert = useSelector((state => state.books.noRecommendBookAlertAlert))
    const dispatch = useDispatch()

    const [openDialog, setOpenDialog] = useState(false);

    const [books, setBooks] = useState(booksList);
    const [years, setYears] = useState(booksList?.map(({year}) => year)?.filter(year => {
        if (year !== 'undefined') return true
    }).sort().reverse())

    //Recommend book----------------------------------------------------------------------------------------------------
    const noBookHandler = () =>{
        dispatch(setNoRecommendBookAlert(true))
        setTimeout(()=>{
            dispatch(setNoRecommendBookAlert(false))
        },5000)
    }
    const getRecommendBook= () => {
        let recommendedBooks = booksList?.filter(book=> book?.year<=(new Date()).getFullYear()-3)
        if (!recommendedBooks.length){
            dispatch(setNoRecommendBookAlert(true))
            setTimeout(()=>{
                dispatch(setNoRecommendBookAlert(false))
            }, 5000)
        }else{
            let maxRate = Math.max.apply(Math, recommendedBooks.map(function(o) { return o.rating; }))
            recommendedBooks = recommendedBooks?.filter(book=> book.rating === maxRate)
            setRecommendedBook(recommendedBooks[Math.floor(Math.random()*recommendedBooks.length)])
            setOpenDialog(true)


        }

    }
    useEffect(()=>{


        if (gettingRecommendedBook){
            getRecommendBook()
            dispatch(setGettingRecommendedBook(false))
        }
    },[gettingRecommendedBook])

    useEffect(() => {
        if (booksList) {
            let editedBooks = [...booksList]
            editedBooks = editedBooks?.sort((a, b) => (
                a?.title?.toLowerCase().localeCompare(b?.title?.toLowerCase())
            ))?.filter((book) => book?.title?.toLowerCase().includes((searchTerm.toLowerCase())))
            setBooks(editedBooks)
        }
    }, [booksList, searchTerm])

    useEffect(async () => {
        dispatch(getBooksAsync())

    }, [])


    useEffect(async () => {
        // Get unique and sort
        setYears(booksList?.map(({year}) => year).filter(year => {
            if (typeof year !== 'undefined') return true
        }).sort().reverse())
    }, [booksList])

    if (loading) return <Loader type="Oval"
                                style={{
                                    position:'fixed',
                                    left:'50%',
                                    top:'50%'
                                }}
                                color="#a94b00"
                                height={80} width={80}/>

    return (
        <>
            <Stack
                sx={{
                    mt: 2
                }}
                direction="column"
                justifyContent="flex-start"
                alignItems="stretch"
                spacing={2}
                position='static'
            >
                {years.filter(onlyUnique).map((year) => {
                        const yearBooks = books.filter(book => book.year === year)
                        if (yearBooks.length !== 0) {
                            return (<Item variant='0'>
                                <BookGroup year={year} books={yearBooks}/>
                            </Item>)
                        }
                    }
                )
                }
            </Stack>

            {/*Add Fab -----------------------------------------------------------------------------------------------*/}
            <Fab href={'/create'} aria-label={'Add'} sx={{
                position: 'fixed',
                bottom: 16,
                right: 16,
                backgroundColor: '#964b00',
            }}>
                <AddIcon/>
            </Fab>

            {/*Delete Alert-------------------------------------------------------------------------------------------*/}
            <Collapse in={alertDelete} sx={{
                position: 'fixed',
                bottom: 16,
                right: 16,
            }}>
                <Alert
                    action={
                        <IconButton
                            variant="outlined" severity="success"
                            onClick={() => {
                                dispatch(setDeleteAlert(false));
                            }}
                        >
                            <CloseIcon fontSize="inherit" />
                        </IconButton>
                    }
                    sx={{ mb: 2 }}
                >
                    Successfully deleted
                </Alert>
            </Collapse>

            {/*No Book Alert-----------------------------------------------------------------------------------------*/}
            <Collapse in={noRecommendBookAlertAlert} sx={{
                position: 'fixed',
                bottom: 16,
                right: 16,
            }}>
                <Alert
                    severity="warning"
                    action={
                        <IconButton
                            variant="outlined"
                            onClick={() => {
                                dispatch(setNoRecommendBookAlert(false));
                            }}
                        >
                            <CloseIcon fontSize="inherit" />
                        </IconButton>
                    }
                    sx={{ mb: 2 }}
                >
                    No book for recommendation
                </Alert>
            </Collapse>

        {/*Recommend book dialog --------------------------------------------------------------------------------*/}
            <BookInfo year={recommendedBook?.year}
                      title={recommendedBook?.title}
                      description={recommendedBook?.description}
                      rating={recommendedBook?.rating}
                      isbn={recommendedBook?.isbn}
                      open={openDialog}
                      setOpen={setOpenDialog}
                      recommend = {true}
            />
        </>
    );
};

export default WorkSpace;