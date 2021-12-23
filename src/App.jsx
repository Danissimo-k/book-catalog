import React from 'react';
import AppBarSearch from "./components/AppBarSearch";
import WorkSpace from "./components/WorkSpace";
import store from "./store/store";
import {Provider} from 'react-redux'
import {BrowserRouter as Router, Routes, Route,  Navigate } from 'react-router-dom'
import EditBookPage from "./components/EditBookPage";
import './themes/App.css'


function App() {
    return (
        <div style={{

            height: '100%',

        }}>
            <Router >
                <Provider store={store}>
                    <Routes>

                            <Route path='/'
                                   element={<>
                                <AppBarSearch/>
                                <WorkSpace/>
                                   </>}
                            />

                            <Route
                                path='/edit/:bookID' element={<EditBookPage />}
                            />

                            <Route
                                path='/create' element={<EditBookPage editing={false} />}
                            />

                            <Route path="*" element={<Navigate to ="/" />}/>

                    </Routes>
                </Provider>
            </Router>
        </div>



    );
}

export default App;