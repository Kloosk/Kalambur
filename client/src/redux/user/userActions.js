import {ADD_USER} from "./userTypes";

export const addUser = payload => {
  return{
      type: ADD_USER,
      payload
  }
};