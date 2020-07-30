function reduction(state, action) {
    if (state === undefined){
        return {modalAction: false};
    }

    var modalAction = state.modalAction;

    switch (action.type) {
        case "open":
            return {modalAction: true};
        case "close":
            return {modalAction: false};
        default:
            return modalAction;
    }
}

export default reduction;