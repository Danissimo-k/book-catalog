import React, {useEffect} from 'react';
import {Box, Grid, Stack, Typography} from "@mui/material";
import BookCard from "./BookCard";

const BookGroup = ({year, books}) => {

    return(
            <Box
                sx={{

                    ml: 'auto',
                    mr: 'auto',
                    width: '95%',
                    backgroundColor: '#FFF',
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