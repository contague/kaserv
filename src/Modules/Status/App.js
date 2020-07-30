import {connect} from "react-redux";
import ModalApp from "./ModalApp";

function mapStateToProps(state) {
    return {
        modalValue: state.modalAction
    }
}

var openAction = {type: "open"};
var closeAction = {type: "close"};

function mapDispatchToProps(dispatch) {
    return{
        openModal: function () {
            return dispatch(openAction);
        },
        closeModal: function () {
            return dispatch(closeAction);
        }
    };
}



var connectedComponent = connect(
    mapStateToProps, mapDispatchToProps
    )(ModalApp);

export default connectedComponent;

