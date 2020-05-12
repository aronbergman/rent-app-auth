import React from "react";
import ReactDOM from "react-dom";
import {BrowserRouter} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'antd/dist/antd.css';
import {YMInitializer} from 'react-yandex-metrika';

import App from "./App";
import * as serviceWorker from "./serviceWorker";
import {Provider} from 'react-redux'
import store from './redux/store';


ReactDOM.render(
    <React.Fragment>
        <YMInitializer accounts={[62759980]} options={{clickmap: true, webvisor: true}} version="2" />
        <BrowserRouter>
            <Provider store={store}>
                <App/>
            </Provider>
        </BrowserRouter>
    </React.Fragment>,
    document.getElementById("root")
);

serviceWorker.unregister();
