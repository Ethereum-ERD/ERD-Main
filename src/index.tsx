import React from "react";
import ReactDOM from "react-dom/client";

import { BrowserRouter } from "react-router-dom";
import { Provider } from "mobx-react";

import Store from "src/store";
import App from "src/App";

import "./index.css";

const root = ReactDOM.createRoot(
    document.getElementById("root") as HTMLElement
);

root.render(
    <React.StrictMode>
        <BrowserRouter>
            <Provider store={new Store()}>
                <App />
            </Provider>
        </BrowserRouter>
    </React.StrictMode>
);
