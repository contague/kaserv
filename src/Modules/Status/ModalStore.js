import reduction from "./reducer";
import {createStore} from "redux";

var store = createStore(reduction);

export default store;