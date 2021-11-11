import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import React from 'react';
import {Box, Grid, Stack, Typography} from "@mui/material";
import BookCard from "./BookCard";

const BookGroup = (props) => (
            <Box
                sx={{
                    position:'absolute',

                    width: '90%',
                    height: 300,
                    backgroundColor: '#E2E2E2',
                    '&:hover': {
                        backgroundColor: 'primary.main',
                        opacity: [0.9, 0.8, 0.7],
                    },
                    borderRadius:4

                }}>
                <Typography variant='h4' gutterBottom component='div' pl={4}>
                    Year
                </Typography>

                <Grid container rowSpacing={{md: 4, sx: 2}} columnSpacing={4} >
                    <Grid item xs={12} md={4}  >
                        <BookCard sx={{
                            ml:10
                        }}/>
                    </Grid>

                    <Grid item xs={12} md={4} >
                        sdfsdfsdf
                    </Grid>

                    <Grid item xs={12} md={4} >
                        sdfsdfsdf
                    </Grid>

                </Grid>
            </Box>
);

export default BookGroup;