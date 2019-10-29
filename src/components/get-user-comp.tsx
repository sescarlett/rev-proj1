import * as React from 'react';
import { Link } from 'react-router-dom';
import NavBar from './nav';
import { IUserState, IState } from "../redux/reducers/rootReducer";
import { connect } from 'react-redux';

export interface IGetUserCompProps {
  user: IUserState
}

class GetUserComp extends React.Component<IGetUserCompProps> {
  
  public render() {
    return (
      <div>
          <NavBar />
          <div className="container-fluid grey-bg vertical-fluid">            
            <Link to="/users" id="back-btn" className="btn btn-warning float-right">Back</Link>
            <h1 className="grey">Profile</h1>
            <hr className="grey-border"/>
            <div className="row">
              <div className="col-1 col-sm-2 col-md-2 col-lg-3 col-xl-3"></div>
              <div className="col-10 col-sm-8 col-md-7 col-lg-6 col-xl-6 display-inline dk-grey-bg padding-5">
                <div className="form-row">
                  <div className="form-group mb-3 col-3">
                    <label className="form-label-yellow">ID</label>
                    <input type="text" className="form-control" id="userId" 
                    placeholder="User ID" value={this.props.user.id} readOnly/>
                  </div>
                  
                  <div className="form-group mb-3 col-9">
                    <label className="form-label-yellow">Username</label>
                    <input type="text" className="form-control" 
                    placeholder="Username" value={this.props.user.username} readOnly/>
                  </div>
                </div>
                <div className="form-row">  
                  <div className="form-group mb-3 col">
                    <label className="form-label-yellow">First name</label>
                    <input type="text" className="form-control" 
                    placeholder="First name" value={this.props.user.firstname} readOnly/>
                  </div>
                  
                  <div className="form-group mb-3 col">
                    <label className="form-label-yellow">Last name</label>
                    <input type="text" className="form-control" 
                    placeholder="Last name" value={this.props.user.lastname} readOnly/>
                  </div>
                </div>
                <div className="form-row">  
                  <div className="form-group mb-3 col-9">
                    <label className="form-label-yellow">Email</label>
                    <input type="text" className="form-control" 
                    placeholder="Email" value={this.props.user.email} readOnly/>
                  </div>
                  
                  <div className="form-group mb-3 col-3">
                    <label className="form-label-yellow">Role</label>
                    <input type="text" className="form-control" 
                    placeholder="Role" value={this.props.user.role} readOnly/>
                  </div>
                </div>
              </div>
            </div>
          </div>
        
      </div>
    );
  }
}

const mapStateToProps = (state: IState) => ({
  user: state.user
});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GetUserComp);
