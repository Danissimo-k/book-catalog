import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import React, {useEffect} from 'react';
import {Box, Grid, Stack, Typography} from "@mui/material";
import BookCard from "./BookCard";

import {useSelector, useDispatch} from 'react-redux';
import {editBookAsync, getBooksAsync} from '../store/booksSlice'

const BookGroup = ({year, books}) => {

    return(
            <Box
                sx={{

                    ml: 'auto',
                    mr: 'auto',
                    width: '95%',
                    backgroundColor: '#E2E2E2',
                    borderRadius:4

                }}>
                <Typography variant='h4' gutterBottom component='div' pl={4}>
                    {year || 'oops'}
                </Typography>

                <Grid container rowSpacing={{lg: 4, md: 10, xs: 10}} columnSpacing={0} >

                    {books.map(book =>
                        (
                        <Grid item lg={4} md={12} xs={12}>
                            <BookCard
                                title={book.title}
                                description={book.description}
                                year={book.year}
                                isbn={book.isbn}
                                rating={book.rating}
                                authors={book.authors}
                                sx={{
                                ml:10
                            }}
                            />
                        </Grid>
                        )
                    )}


                </Grid>
                <Box sx={{
                    height:40
                }}/>
            </Box>
)
}

export default BookGroup;