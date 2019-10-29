import { userTypes } from "../actions/user.action";

const initialState = {
  firstname: "",
  lastname: "",
  role: "",
  id: "",
  email: "",
  username: "",
  loggedIn: false
};

export const userReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case userTypes.USER_UPDATE:
      return {
        ...state,
        firstname: action.payload.firstname,
        lastname: action.payload.lastname,
        role: action.payload.role,
        id: action.payload.id,
        email: action.payload.email,
        username: action.payload.username,
        loggedIn: action.payload.loggedIn
      };
    case userTypes.USER_LOGOUT:
      return {
        ...state,
        firstname: '',
        lastname: '',
        role: '',
        id: '',
        email: '',
        username: '',
        loggedIn: false
      };
    default:
      break;
  }
  return state;
};
