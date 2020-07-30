import React, {Component} from "react";
import {Provider} from "react-redux";
import App from "./App";
import store from "./ModalStore";


class IndexModal extends Component {
    render() {
        return(
            <Provider store={store}>
                <App/>
            </Provider>
        )
    }
}

export default IndexModal;