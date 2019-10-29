import * as React from "react";
import { Link } from "react-router-dom";
import { IUserState, IState } from "../redux/reducers/rootReducer";
import { userLogout } from "../redux/actions/user.action";
import { connect } from "react-redux";

export interface INavBarProps {
  user: IUserState;

  //actions
  userLogout: () => void;
}

class NavBar extends React.Component<any> {
  handleLogout() {
    this.props.userLogout();
  }

  public render() {
    return (
      <div>
        <nav className="navbar bg-dark">
          <div className="container-fluid">
            <div className="navbar-header">
              <div className="navbar-brand" id="page-title">
                ERS
              </div>
              <small className="yellow">Expense Reimbursement System</small>
            </div>
            <div className="navbar-right">
              <div className="dropdown" hidden={!this.props.user.loggedIn}>
                <button className="dropbtn btn" id="grey-btn">
                  <div className="menu-bar"></div>
                  <div className="menu-bar"></div>
                  <div className="menu-bar"></div>
                  {/* Menu */}
                </button>
                <div className="dropdown-content">
                  <Link className="nav-link" to="/home">
                    Home
                  </Link>
                  <Link className="nav-link" to="/users">
                    User Info
                  </Link>
                  <Link className="nav-link" to="/reimbursements">
                    Reimbursements
                  </Link>
                  <Link className="nav-link" to="/home">
                    <div onClick={() => this.handleLogout()}>Logout</div>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </div>
    );
  }
}

const mapStateToProps = (state: IState) => ({
  user: state.user
});

const mapDispatchToProps = {
  userLogout: userLogout
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NavBar);
