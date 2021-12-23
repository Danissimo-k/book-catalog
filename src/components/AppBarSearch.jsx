import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import SearchIcon from '@mui/icons-material/Search';
import logo from '../assets/books-stack-of-three.png'
import { Typography, InputBase, Toolbar, Box, Button} from "@mui/material";
import {setGettingRecommendedBook, setSearchTerm} from "../store/booksSlice"
import {useDispatch, useSelector} from "react-redux";


const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(1),
        width: 'auto',
    },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));
const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: '12ch',
            '&:focus': {
                width: '20ch',
            },
        },
    },
}));

const AppBarSearch = () => {
    const dispatch = useDispatch()
    const searchTerm = useSelector((state => state.books.searchTerm))
    return (
        // <Box sx={{ flexGrow: 1 }}>
        <React.Fragment>
            <AppBar position="static"
                    style={{
                        background:'#ac6730'
                    }}

            >
                <Toolbar>
                    <img src={logo} alt={'Nice logo'} style={{
                        height:64,
                        width:64,
                        paddingRight: 10
                    }}/>
                    <Typography
                        variant="h6"
                        noWrap
                        component="div"
                        sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' },}}
                    >
                        Book catalog
                    </Typography>
                        <Search >
                            <SearchIconWrapper>
                                <SearchIcon />
                            </SearchIconWrapper>
                            <StyledInputBase
                                onChange={(e)=> dispatch(setSearchTerm(e.target.value))}
                                placeholder="Search…"
                                inputProps={{ 'aria-label': 'search' }}
                                value={searchTerm}
                            />
                        </Search>
                    <Box sx={{ flexGrow:1.2, display: { xs: 'none', md: 'flex' }}}>

                    </Box>
                    <Button
                        onClick={()=> dispatch(setGettingRecommendedBook(true))}
                        sx={{ my: 2, color: 'white', display: 'block' }}
                    >
                        Recommended Book
                    </Button>

                </Toolbar>
            </AppBar>
        </React.Fragment>
        // {/*</Box>*/}
    );
}

export default AppBarSearch;