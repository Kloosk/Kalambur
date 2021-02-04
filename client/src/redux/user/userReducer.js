import {ADD_USER} from "./userTypes";

const initialState = {
    name: ""
};

const userReducer = (state=initialState,action) => {
    switch(action.type){
        case ADD_USER:{
            return{
                name: action.payload
            }
        }
        default: return state
    }
};


export default userReducer;


