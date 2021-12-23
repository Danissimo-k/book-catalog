import React, {useState} from 'react';
import '../themes/BookCard.css'
import {Box, Container, Grid, Rating} from "@mui/material";
import LocalLibraryTwoToneIcon from '@mui/icons-material/LocalLibraryTwoTone';
import BookInfo from "./BookInfo";


const BookCard = ({title,description, isbn, rating,  year, authors, id}) => {
    const  COLORS = ['yellow', 'blue', 'grey', 'green']

    const [openDialog, setOpenDialog] = useState(false);

    const handleClickOpen = () => {
        setOpenDialog(true);
    };

    let editedTitle;

    // Cut description
    if (description?.length > 100) {
        description= description.slice(0,100) + '...'
    }

    //Cut title
    if (title?.length > 55) {
        let counter  = 0
        const sep_text = title.split(' ')
        let i=0;
        for (i; i< sep_text.length; i++){
            if (counter > 55){
                break
            }
                counter += sep_text[i].length
        }
        editedTitle = sep_text.slice(0,i-1).join(' ') + ' ...'
    }else {
        editedTitle = title
    }

    return(
        <Grid container columnSpacing={0} >
            <Grid item xl={5} lg={6} sm={3} xs={6}>
                <figure className='book' style={{
                    marginLeft: '10%'
                }}>
                    {/*Front */}
                    <ul className='hardcover_front'>
                        <li>
                            <div style={{
                                color:'yellow'
                            }}
                                 className={`coverDesign ${COLORS[editedTitle?.charCodeAt(0) % COLORS.length] || 'brown'}`}  >
                                {year === (new Date()).getFullYear() && <span className="ribbon">NEW</span>}

                                <h1>{editedTitle}</h1>
                                {/*<p>TRANSFORM</p>*/}
                            </div>
                        </li>
                        <li/>
                    </ul>

                    {/*Pages*/}

                    <ul className='page'>
                        <li/>
                        <li>
                            <Container sx={{
                                pt:2,
                            }}>

                                <Box sx={{

                                    mr:0 }}>
                                    Rating:
                                </Box>
                                <Rating name="read-only" value={rating/2} precision={0.1} readOnly  />

                                <a onClick={()=> handleClickOpen()} className='btn' >
                                    <LocalLibraryTwoToneIcon fontSize='large'/>
                                </a>

                            </Container>
                            {
                                isbn && (
                                    <Box className='isbn' sx={{
                                        display: 'inline-block',
                                        position: 'absolute',
                                        bottom: '5%',
                                        left: '10%',

                                        textTransform: 'uppercase',
                                        border: '2px solid #2c3e50',
                                        fontSize: '0.7em',
                                        fontWeight: '700',
                                        padding: '0.1em 0.1em',
                                        textAlign: 'center',
                                    }}>
                                        ISBN: {isbn}
                                    </Box>)
                            }

                        </li>
                        <li/>
                        <li/>
                        <li/>
                    </ul>

                    {/*Book*/}

                    <ul className='hardcover_back'>
                        <li/>
                        <li/>
                    </ul>
                    <ul className='book_spine'>
                        <li/>
                        <li/>
                    </ul>

                </figure>
            </Grid>
            <Grid item xl={7} lg={6} sm={9} xs={6}>
                <figcaption style={{
                    width: '100%'
                }}>
                    <h1>{title}</h1>
                    <span>By {authors?.join(', ')} </span>
                    <p>{description}</p>
                </figcaption>
            </Grid>
        <BookInfo authors={authors} rating={rating} isbn={isbn} year={year} description={description} title={title} id={id}  setOpen={setOpenDialog} open={openDialog}/>
        </Grid>
        )
    }


export default BookCard;