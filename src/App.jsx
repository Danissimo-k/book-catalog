import React from 'react';
import AppBarSearch from "./components/AppBarSearch";
import WorkSpace from "./components/WorkSpace";
import store from "./store/store";
import {Provider} from 'react-redux'
import {BrowserRouter as Router,Routes , Route} from 'react-router-dom'
import BookInfo from "./components/BookInfo";
import EditBookPage from "./components/EditBookPage";
import './themes/App.css'


function App(props) {
    return (
        <div style={{

            height: '100%',

        }}>
            <EditBookPage/>
            {/*<Router>*/}
            {/*    <Provider store={store}>*/}
            {/*        <Routes>*/}

            {/*                <Route path='/'*/}
            {/*                       element={<>*/}
            {/*                    <AppBarSearch/>*/}
            {/*                    <WorkSpace/>*/}
            {/*                       </>}*/}
            {/*                />*/}

            {/*                <Route*/}
            {/*                    path='/edit/:bookID' element={<EditBookPage />}*/}
            {/*                />*/}

            {/*        </Routes>*/}
            {/*    </Provider>*/}
            {/*</Router>*/}
        </div>



    );
}

export default App;