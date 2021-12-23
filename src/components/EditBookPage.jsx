import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import {useDispatch, useSelector,} from "react-redux";

import {IMaskInput} from 'react-imask'

import {Formik} from 'formik'

import * as yup from 'yup'

import {
    Box,
    Button,
    FormControl,
    Grid,
    Input,
    InputLabel,
    Rating, Stack,
    TextField,
    Typography
} from "@mui/material";
import SaveIcon from '@mui/icons-material/Save';
import IconButton from "@mui/material/IconButton";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import {getBooksAsync, addBookAsync, editBook, editBookAsync,} from "../store/booksSlice";
import Loader from 'react-loader-spinner'


//Styles for back icon--------------------------------------------------------------------------------------------------
const styles = {
    button: {
        width: 64, height: 64,
        padding: 0,
    },
    icon: {
        width: 64, height: 64,
    },
};

//Mask------------------------------------------------------------------------------------------------------------------
const IsbnMask = React.forwardRef(function TextMaskCustom(props, ref) {
    const {onChange, ...other} = props;
    return (
        <IMaskInput
            {...other}
            mask="000-0-000-00000-0"
            inputRef={ref}
            onAccept={(value) => onChange({target: {name: props.name, value}})}
            overwrite
        />
    )
})

//Schema----------------------------------------------------------------------------------------------------------------
const validationSchema = yup.object().shape({
    title: yup.string().typeError('Should be a string').required('Required'),
    description: yup.string(),
    authors: yup.string().typeError("Should be a string").required('Required'),
    year: yup.number()
        .test('len', 'Must be exactly 4 characters',
            val => val && val.toString().length === 4).max((new Date().getFullYear()), 'Year must be current year or less than current year'),
    isbn: yup.string().test('len', 'Must be exactly 13 or 0 numbers',
        val => !val || val?.length === 17)


})

function EditBookPage({editing = true}) {
    //TODO Editing from params
    let book;
    const {bookID} = useParams()
    const books = useSelector((state => state.books.books))
    if (editing) {
        book = books.filter(book => book.id === bookID)[0]
    } else {
        book = {}
    }

    const loading = useSelector((state => state.books.loading))

    const dispatch = useDispatch()

    const [rate, setRate] = useState(book?.rating )

    useEffect(async () => {
        dispatch(getBooksAsync())
    }, []);

    useEffect(async () => {
        if (editing) {
            book = books.filter(book => book.id === bookID)[0]
            setRate(book?.rating )

        } else {
            book = {}
            setRate(0)
        }
    }, [books]);

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
            <IconButton
                href={'/'}
                sx={{
                    left: '2.5%',
                    top: 0,
                    width: 10,

                }}
                style={styles.button}
                iconStyle={styles.icon}
                edge="start"
                color="inherit"
                aria-label="close"
            >
                <ArrowBackIcon/>
            </IconButton>
            <Box sx={{
                ml: '25%',
                mr: '25%',
                backgroundColor: '#FFFFFF',
                borderRadius: 1,
                padding: 2,


            }}>
                <Grid
                    container
                    spacing={0}
                    direction="column"
                    alignItems="center"
                    justifyContent="center"

                >

                    <Grid item xs={3}>
                        <Typography variant={'h2'}>{editing ? "Editing" : "Creating"}</Typography>
                    </Grid>

                </Grid>

                <Box sx={{
                    ml: '5%',
                    mr: '5%',
                }}>
                    <Formik initialValues={{
                        title: book?.title,
                        authors: book?.authors?.join(', '),
                        year: book?.year,
                        rate: book?.rating,
                        isbn: book?.isbn ,
                        description: book?.description
                    }} validateOnBlur onSubmit={(values => {
                        let authors = values.authors.split(",").map(author=> author.trim()).filter(author=>author)
                        const newBook = {
                            id: bookID,
                            authors,
                            title: values.title,
                            rating: rate,
                            isbn: values.isbn ||'',
                            year: values.year,
                            description: values.description || '',

                        }
                        if (editing){
                            let {id, ...props} = newBook
                            dispatch(editBookAsync(newBook))
                            dispatch(getBooksAsync())
                        }else{
                            dispatch(addBookAsync(newBook))

                        }
                    })
                    } validationSchema={validationSchema}>
                        {({
                              values, errors, touched,
                              handleChange,
                              handleBlur, isValid, handleSubmit, dirty
                          },) => (
                            <div className={'forms'}>


                                {/*Title input*/}
                                <div style={{
                                    marginTop: 10
                                }}>
                                    <TextField

                                        className={'title'}
                                        name={'title'}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        label="Title"
                                        variant="standard"
                                        error={touched.title && errors.title}
                                        helperText={touched.title && errors.title}
                                        value={values.title}
                                    />
                                </div>
                                {/*Authors*/}
                                <div style={{
                                    marginTop: 10
                                }}>
                                    <TextField
                                        className={'authors'}
                                        name={'authors'}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        label="Authors"
                                        variant="standard"
                                        error={touched.authors && errors.authors}
                                        helperText={(touched.authors && errors.authors) || 'Print authors split by ","'}
                                        value={values.authors}
                                    />
                                </div>


                                {/*Year input*/}
                                <div style={{
                                    marginTop: 10
                                }}>
                                    <TextField
                                        className={'year'}
                                        name={'year'}
                                        onChange={handleChange}
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        type="number"
                                        onBlur={handleBlur}
                                        label="Year"
                                        variant="standard"
                                        error={touched.year && errors.year}
                                        helperText={touched.year && errors.year}
                                        value={values.year}
                                    />
                                </div>
                                {/*Rate input*/}
                                <div style={{
                                    marginTop: 10
                                }}>
                                    Rate: <Rating value={rate / 2} size={'small'}
                                                  precision={0.1} onChange={(e, newValue) => {
                                    setRate(newValue * 2)
                                }}/>
                                </div>

                                {/*ISBN*/}
                                <div style={{
                                    marginTop: 10
                                }}>
                                    <FormControl variant="standard">
                                        <InputLabel htmlFor="formatted-text-mask-input">Isbn</InputLabel>
                                        <Input
                                            error={touched.isbn && errors.isbn}
                                            helperText={touched.isbn && errors.isbn}
                                            value={values.isbn}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            name="isbn"
                                            inputComponent={IsbnMask}
                                        />
                                        {touched.isbn && errors.isbn &&
                                        <Typography sx={{fontSize: 12, color: '#d32f2f'}}>
                                            {touched.isbn && errors.isbn}
                                        </Typography>
                                        }
                                    </FormControl>
                                </div>
                                {/*Description*/}
                                <div style={{
                                    marginTop: 10
                                }}>
                                    <TextField

                                        className={'description'}
                                        name={'description'}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        label="Description"
                                        variant="standard"
                                        error={touched.description && errors.description}
                                        helperText={touched.description && errors.description}
                                        multiline
                                        fullWidth
                                    />
                                </div>

                                <Stack spacing={2} direction={'row'} justifyContent="flex-end" sx={{
                                    mt: 3,

                                }}>
                                    <Button variant="outlined" startIcon={<SaveIcon/>} disabled={!isValid }
                                            onClick={handleSubmit} type={'submit'}>
                                        {editing ? "Save" : "Create"}
                                    </Button>
                                </Stack>

                            </div>


                        )}
                    </Formik>
                </Box>

            </Box>
        </>
    );
}

export default EditBookPage;