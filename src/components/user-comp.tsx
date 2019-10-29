import * as React from 'react';
import { Link } from 'react-router-dom';
import NavBar from './nav';
import jwt from 'jsonwebtoken';

export interface IUserCompState {
  alertVis: boolean;
}

export default class UserComp extends React.Component<any, any> {

  checkPer() {
    const token = window.localStorage.getItem('token');
    const decodeToken: any = jwt.decode(token as string);
    const role = decodeToken.role;
    if(role > 2) {
      return true;
    } else{
      return false;
    }
  }

  handleClick() {
    this.props.history.push('/all-users');
  }
  
  public render() {
    return (
      <div>
        <NavBar />
        <div className="container-fluid grey-bg vertical-fluid card-cont">
          <div className="row padding-top-5">
            <div className="display-inline col-1 col-sm-1 col-md-2 col-lg-3 col-xl-3"></div>
            <div className="card col-10 col-sm-10 col-md-8 col-lg-6 col-xl-6 display-inline">
              <div className="card-body">
                  <h5 className="card-title">User's Profile</h5>
                  <p className="card-text">Access your profile. Can only be accessed by the user and a finance manager.</p>
                  <Link className="btn btn-warning" to="/profile">Profile</Link>
              </div>
            </div>
          </div>
          
          <div className="row padding-top-5" hidden={this.checkPer()}>
          <div className="display-inline col-1 col-sm-1 col-md-2 col-lg-3 col-xl-3"></div>
              <div className="card col-10 col-sm-10 col-md-8 col-lg-6 col-xl-6 display-inline">
                <div className="card-body">
                    <h5 className="card-title">User List</h5>
                    <p className="card-text">Given the list of all users, lists all their information. This action can only be accessed by a finance manager.</p>            
                    <button className="btn btn-warning"
                    disabled={this.checkPer()}
                    onClick={() => this.handleClick()}
                    >User List</button>
                </div>
              </div>
            </div>

        </div>
      </div>
    );
  }
}