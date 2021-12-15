import React, {useState} from 'react';
import {Box, Typography, ThemeProvider, createTheme, Rating, Dialog, Slide, Grow} from "@mui/material";
import ShowMoreText from "react-show-more-text";
import {ExpandLess, ExpandMore} from "@mui/icons-material";
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';

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

//TODO MAKE FONTSIZE BIGGER
function BookInfo({title,description, isbn, rating,  year, authors, id}) {
    const [expand, setExpand] = useState(false);
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    }

    const onClick = () => {
        setExpand(!expand);
    };
    rating = 6.4
    return (
        <Dialog
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
            <Typography variant="body1" gutterBottom>Rate: {rating? <Rating name="read-only" value={rating/2} precision={0.1} readOnly  /> :'No rating'}</Typography>

        {/*    ISbn*/}
            <Typography variant="body1" gutterBottom>Isbn : {isbn? isbn : 'Not detected'}</Typography>

        {/*    Description*/}
            <Typography variant="body1" >
                    Description:
            </Typography>
                <Typography variant='body2' >
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
                        {description || "zero words lorem sdfasdfasdfa lorem sdfasdfasdfa lorem sdfasdfasdfa lorem sdfasdfasdfa lorem sdfasdfasdfa lorem sdfasdfasdfa lorem sdfasdfasdfalorem sdfasdfasdfalorem sdfasdfasdfalorem sdfasdfasdfalorem sdfasdfasdfalorem sdfasdfasdfalorem sdfasdfasdfa"}
                    </ShowMoreText>
                </Typography>
            </ThemeProvider>
        </Box>
        </Dialog>
    );
}

export default BookInfo;