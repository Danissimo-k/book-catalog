import React from 'react';
import AppBarSearch from "./components/AppBarSearch";
import WorkSpace from "./components/WorkSpace";
import store from "./store/store";
import {Provider} from 'react-redux'


function App(props) {
    return (
        <Provider store={store}>
                <AppBarSearch/>
                <WorkSpace/>
        </Provider>


    );
}

export default App;