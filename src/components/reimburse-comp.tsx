import * as React from 'react';
import { Link } from 'react-router-dom';
import NavBar from './nav';
import { IUserState, IState } from '../redux/reducers/rootReducer';
import { connect } from 'react-redux';

export interface IReimburseCompProps {
  user: IUserState
}

let isAdmin: boolean;
class ReimburseComp extends React.Component<any, any> {

  componentWillMount() {
    isAdmin = (this.props.user.role === 1);
    console.log(`reimburse is admin: ${isAdmin} role: ${this.props.user.role}`);
  }

  public render() {
    return (
      <div>
        <NavBar />
        <nav className="container-fluid grey-bg vertical-fluid card-cont">

          <div className="row padding-top-5">
            <div className="display-inline col-1 col-sm-1 col-md-2 col-lg-3 col-xl-3"></div>
            <div className="card col-10 col-sm-10 col-md-8 col-lg-6 col-xl-6 display-inline">
              <div className="card-body">
                <h5 className="card-title">Reimbursements by user</h5>
                <p className="card-text">Given an user's ID, get all reimbursements posted by the same user.</p>
                <Link className="btn btn-warning" to="/author">Get Reimbursements</Link>
              </div>
            </div>
          </div>
          
          <div className="row padding-top-5" >
            <div className="display-inline col-1 col-sm-1 col-md-2 col-lg-3 col-xl-3"></div>
            <div className="card col-10 col-sm-10 col-md-8 col-lg-6 col-xl-6 display-inline">
                <div className="card-body"  hidden={!isAdmin}>
                    <h5 className="card-title">Reimbursements by status</h5>
                    <p className="card-text">Given a specific status, gets all reimbursements that share that status.</p>
                    <Link className="btn btn-warning" to="/status">Get Reimbursements</Link>
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

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ReimburseComp);