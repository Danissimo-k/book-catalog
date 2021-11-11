import React from 'react';
import AppBarSearch from "./components/AppBarSearch";
// import 'normalize.css'
import {Box} from "@mui/material";
import WorkSpace from "./components/WorkSpace";
import BookCard from "./components/BookCard";


function App(props) {
    return (
        <div>
            <AppBarSearch/>
            <WorkSpace/>
        </div>

    );
}

export default App;