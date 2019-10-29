import * as React from "react";
import { Link } from "react-router-dom";
// import NavComp from './nav-comp';
import NavBar from "./nav";
import { IState, IUserState } from "../redux/reducers/rootReducer";
import { connect } from "react-redux";
import Login from "./modals/Login";

export interface IHomeCompProps {
  user: IUserState;
}

class HomeComp extends React.Component<IHomeCompProps> {
  public render() {
    return (
      <div>
        <NavBar />
        <div className="container-fluid grey-bg vertical-fluid">
          <div className="row">
            <div className="display-inline col-2"></div>
            <div className="jumbotron display-inline col-8" id="jumbotron">
              <h1 className="display-4">{`Welcome ${this.props.user.firstname} to your ERS!`}</h1>
              <p className="lead">
                This is your area to handle all your expenses reports.
              </p>
              <hr className="my-4" />
              <p hidden={this.props.user.loggedIn}>
                To begin, please log in to your account
              </p>
              <p
                hidden={!this.props.user.loggedIn}
              >{`Begin by navigating to the user page or reimbursement page!`}</p>
              <div className="row">
                <div
                  hidden={!this.props.user.loggedIn}
                  className="display-inline col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6"
                >
                  <Link
                    to="/users"
                    className="nav-link float-left btn btn-block btn-warning margin-5px"
                  >
                    User Page
                  </Link>
                </div>
                {/* <div className="display-inline col-0 col-sm-0 col-md-2 col-lg-2 col-xl-2"></div> */}
                <div
                  hidden={!this.props.user.loggedIn}
                  className="display-inline col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6"
                >
                  <Link
                    to="/reimbursements"
                    className="nav-link float-left btn btn-block btn-warning margin-5px"
                  >
                    Reimbursement Page
                  </Link>
                </div>
                <div className="col-12">
                  <button
                    className="btn btn-block btn-warning"
                    data-toggle="modal"
                    data-target="#login-modal"
                    hidden={this.props.user.loggedIn}
                  >
                    Log In
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* login modal */}
        <div
          className="modal fade"
          id="login-modal"
          role="dialog"
          aria-labelledby="loginModal"
          aria-hidden="true"
        >
          <Login />
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
)(HomeComp);
