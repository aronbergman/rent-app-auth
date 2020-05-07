import React from "react";
import ReactDOM from "react-dom";
import {BrowserRouter} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'antd/dist/antd.css';

import App from "./App";
import * as serviceWorker from "./serviceWorker";
import {Provider} from 'react-redux'
import store from './redux/store';


ReactDOM.render(
    <BrowserRouter>
        <Provider store={store}>
            <App/>
        </Provider>
    </BrowserRouter>,
    document.getElementById("root")
);

serviceWorker.unregister();
