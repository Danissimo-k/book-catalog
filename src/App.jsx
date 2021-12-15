import React from 'react';
import AppBarSearch from "./components/AppBarSearch";
import WorkSpace from "./components/WorkSpace";
import store from "./store/store";
import {Provider} from 'react-redux'
import BookInfo from "./components/BookInfo";


function App(props) {
    return (
        <div style={{
            backgroundColor:'#E2E2E2',

        }}>
            <Provider store={store}>
                <AppBarSearch/>
                <WorkSpace/>

            </Provider>
        </div>



    );
}

export default App;