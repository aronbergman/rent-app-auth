import React from "react";
import ReactDOM from "react-dom";
import {BrowserRouter} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'antd/dist/antd.css';
import {YMInitializer} from 'react-yandex-metrika';
import * as Sentry from '@sentry/browser';

import App from "./App";
import * as serviceWorker from "./serviceWorker";
import {Provider} from 'react-redux'
import store from './redux/store';

if (process.env.NODE_ENV === 'production') {
    Sentry.init({dsn: "https://80ec2091533941ef80154e3220bae060@o392602.ingest.sentry.io/5240421"});
}

ReactDOM.render(
    <React.Fragment>
        {process.env.NODE_ENV === 'production'
            ? <YMInitializer accounts={[62759980]} options={{clickmap: true, webvisor: true}} version="2"/>
            : null}
        <BrowserRouter>
            <Provider store={store}>
                <App/>
            </Provider>
        </BrowserRouter>
    </React.Fragment>,
    document.getElementById("root")
);

serviceWorker.unregister();
