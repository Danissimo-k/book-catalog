import React, {useState} from 'react';
import {Box, Typography, ThemeProvider, createTheme, Rating, Dialog, Slide, Grow, Stack, Button} from "@mui/material";
import ShowMoreText from "react-show-more-text";
import {ExpandLess, ExpandMore} from "@mui/icons-material";
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';

const styles = {
    button: {
        width: 64, height: 64,
        padding: 0,
    },
    icon: {
        width: 64, height: 64,
    },
};

const theme = createTheme({
    typography: {
        fontSize:18,
        fontFamily: [
            'Work Sans'
        ].join(','),
    },});

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Grow ref={ref} {...props} />;
});

//DONE MAKE FONTSIZE BIGGER
function BookInfo({title,description, isbn, rating,  year, authors, id, setOpen, open, setExpand, expand}) {


    const handleClose = () => {
        setOpen(false);
    }

    const onClick = () => {
        setExpand(!expand);
    };

    return (
        <Dialog
            sx={{
                // position:'relative',

            }}
            PaperProps={{
                style: {
                    backgroundColor: '#E2E2E2',
                    boxShadow: 'none',
                },
            }}
            fullScreen
            open={open}
            onClose={handleClose}
            TransitionComponent={Transition}
        >
            <IconButton
                sx={{
                    // display:'fixed',
                    left:'2.5%',
                    top:0,
                    width:10,

                }}
                style={styles.button}
                iconStyle={styles.icon}
                edge="start"
                color="inherit"
                onClick={handleClose}
                aria-label="close"
            >
                <CloseIcon />
            </IconButton>
        <Box sx={{
            ml:'25%',
            mr:'25%',
            backgroundColor:'#FFFFFF',
            borderRadius:1,
            padding:2,
        }}>
            <ThemeProvider theme={theme}>
        {/*    Title*/}
            <Typography variant="h3" component="h2" sx={{
                mb:'10px'
            }} >
                {title || 'No title'}
            </Typography>

        {/*    Authors*/}

            <Typography variant="body1" gutterBottom>Authors: {authors || "No authors"}</Typography>
        {/*    Year*/}
            <Typography variant="body2" gutterBottom>Year: {year || 'No year'}</Typography>

        {/*    Rating*/}
            <Typography variant="body1" gutterBottom>Rate: {rating? <Rating name="read-only" value={rating/2} size={'small'} precision={0.1} readOnly  /> :'No rating'}</Typography>

        {/*    ISbn*/}
            <Typography variant="body1" gutterBottom>Isbn : {isbn? isbn : 'Not detected'}</Typography>

        {/*    Description*/}
            <Typography variant="body1" >
                    Description:
            </Typography>
                <Typography variant='body2'>
                    <ShowMoreText
                        lines={3}
                        more={<ExpandMore  sx={{
                            fontSize:15
                        }}/>}
                        less={<ExpandLess sx={{
                            fontSize:15
                        }}/>}
                        onClick={onClick}
                        expanded={expand}
                    >
                        {description || "zero words"}
                    </ShowMoreText>
                </Typography>
            </ThemeProvider>
            <Stack spacing={2} direction={'row'} justifyContent="flex-end">
                <Button variant="outlined" color="error">
                    Delete
                </Button>
                <Button

                    sx={{
                    color:'#000000',
                        border:'1px solid black',
                }}>
                    Edit
                </Button>
            </Stack>
        </Box>
        </Dialog>
    );
}

export default BookInfo;