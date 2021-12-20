import React, {useState} from 'react';
import {useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";

import {IMaskInput} from 'react-imask'

import { Formik } from 'formik'

import * as yup from 'yup'

import {
    Box,
    Button,
    Container,
    FormControl,
    Grid,
    Input,
    InputLabel,
    Rating,
    TextField,
    Typography
} from "@mui/material";
import NumberFormat from 'react-number-format';
import SaveIcon from '@mui/icons-material/Save';
import IconButton from "@mui/material/IconButton";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';


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
    description: yup.string().typeError("Should be a string"),
    authors:yup.string().typeError("Should be a string").required('Required'),
    year:yup.number()
        .test('len', 'Must be exactly 4 characters',
            val => val && val.toString().length === 4 ).max((new Date().getFullYear()) , 'Year must be current year or less than current year'),
    isbn: yup.string().test('len', 'Must be exactly 13 or 0 numbers',
        val => val && val.toString().length === 4 )


})

function EditBookPage({title, authors, year,rating = 5, isbn, description}) {
    //TODO Editing from params
    let editing = true;
    // const {bookID} = useParams()
    // const books = useSelector((state=> state.books.books))
    // const loading = useSelector((state=> state.books.loading))
    //
    // const dispatch = useDispatch()

    // const [title, setTitle] = useState('')
    // const [authors, setAuthors] = useState([])
    // const [year, setYear] = useState(0)
    // const [description, setDescription] = useState('')

    const [rate, setRate] = useState(rating||0)
    const [newIsbn, setNewIsbn] = useState(isbn );

    // if (loading) return  "Loading"
    return (
        <>
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
            aria-label="close"
        >
            <ArrowBackIcon />
        </IconButton>
        <Box  sx={{
            ml:'25%',
            mr:'25%',
            backgroundColor:'#FFFFFF',
            borderRadius:1,
            padding:2,


        }}>
            <Grid
                container
                spacing={0}
                direction="column"
                alignItems="center"
                justifyContent="center"

            >

                <Grid item xs={3}>
                    <Typography variant={'h2'}>{editing ? "Editing":"Creating"}</Typography>
                </Grid>

            </Grid>

            <Box sx={{
                ml:'5%',
                mr:'5%',
            }}>
            <Formik initialValues={{
                title: '',
                authors: '',
                year:'',
                rate:'',
                isbn:'',
                description:''
            }} validateOnBlur onSubmit={(values => {console.log(values)})} validationSchema={validationSchema}>
                {({values, errors, touched,
                      handleChange,
                      handleBlur,isValid, handleSubmit, dirty },  )=>(
                          <div className={'forms'}>


                                  {/*Title input*/}
                                  <div style={{
                                      marginTop:10
                                  }}>
                            <TextField

                                className={'title'}
                                name={'title'}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                label="Title"
                                defaultValue={title}
                                variant="standard"
                                error={touched.title && errors.title}
                                helperText={touched.title && errors.title}
                            />
                                  </div>
                                  {/*Authors*/}
                                  <div style={{
                                      marginTop:10
                                  }}>
                                  <TextField
                                className={'authors'}
                                name={'authors'}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                label="Authors"
                                defaultValue={authors}
                                variant="standard"
                                error={touched.authors && errors.authors}
                                helperText={touched.authors && errors.authors}
                            />
                                </div>


                                  {/*Year input*/}
                                  <div style={{
                                      marginTop:10
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
                                          defaultValue={year}
                                          variant="standard"
                                          error={touched.year && errors.year}
                                          helperText={touched.year && errors.year}
                                      />
                                  </div>
                                    {/*Rate input*/}
                                     <div style={{
                                         marginTop:10
                                     }}>
                                      Rate: <Rating name="read-only" defaultValue={rate/2} size={'small'} precision={0.1} precision={0.5} onChange={(e, newValue)=> {setRate(newValue*2)}}  />
                                      </div>

                                        {/*ISBN*/}
                                        <div style={{
                                            marginTop:10
                                        }}>
                                            <FormControl variant="standard">
                                            <InputLabel htmlFor="formatted-text-mask-input">Isbn</InputLabel>
                                            <Input
                                                value={newIsbn}
                                                onChange={(event)=> setNewIsbn(event.target.value)}
                                                name="textmask"
                                                inputComponent={IsbnMask}
                                            />
                                            </FormControl>
                                        </div>

                                        {/*Description*/}
                                  <div style={{
                                      marginTop:10
                                  }}>
                                      <TextField

                                          className={'description'}
                                          name={'description'}
                                          onChange={handleChange}
                                          onBlur={handleBlur}
                                          label="Description"
                                          defaultValue={description}
                                          variant="standard"
                                          error={touched.description && errors.description}
                                          helperText={touched.description && errors.description }
                                          multiline
                                          fullWidth
                                      />
                                  </div>


                              <Button variant="outlined" startIcon={<SaveIcon />} disabled={!isValid || !dirty} onClick={handleSubmit} type={'submit'}>
                                  Save
                              </Button>
                          </div>


                    )}

            </Formik>
            </Box>

        </Box>
        </>
    );
}

export default EditBookPage;