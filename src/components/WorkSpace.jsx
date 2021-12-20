import React, {useEffect, useState} from 'react';
import BookGroup from "./BookGroup";
import {Stack, Paper } from "@mui/material";
import { styled } from '@mui/material/styles';
import {useDispatch, useSelector} from "react-redux";
import {getBooksAsync} from "../store/booksSlice";

const Item = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(1),
    background:'none',
    variant:'outlined'
    }));

const WorkSpace = (props) => {
    // Get books from redux
    const books = useSelector((state => state.books.books))
    const loading = useSelector((state => state.books.loading))
    const dispatch = useDispatch()
    const [years, setYears] = useState(books?.map(({year})=> year )?.filter(year => {
        if (year !== 'undefined') return true
    }).sort().reverse())

    useEffect( async ()=> {
        dispatch(getBooksAsync())
        console.log(years)
        console.log(loading)

    }, [])


    useEffect(async () => {
        // Get unique and sort
        setYears(books?.map(({year})=> year).filter(year => {
            if (typeof year !== 'undefined') return true
        }).sort().reverse())
        console.log(years)
    }, [books])

    return(
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
            {years.map((year) =>
                (<Item variant='0'>
                    <BookGroup year={year} books={books.filter(book => book.year === year)}/>
                </Item>)
            )
            }


        </Stack>
    );
};

export default WorkSpace;