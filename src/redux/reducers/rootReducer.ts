import { combineReducers } from "redux";
import { userReducer } from "./user.reducer";
import { reimburseReducer } from "./reimburse.reducer";

export interface IUserState {
  firstname: string;
  lastname: string;
  role: string;
  id: string;
  email: string;
  username: string;
  loggedIn: boolean;
}

export interface IReimbursementState {
  reimburseId: string;
  author: string;
  amount: string;
  dateSubmitted: string;
  dateResolved: string;
  description: string;
  resolver: string;
  status: string;
  type: string;
}

export interface IState {
  user: IUserState;
  reimburse: IReimbursementState;
}

export const state = combineReducers<IState>({
  user: userReducer,
  reimburse: reimburseReducer
});
