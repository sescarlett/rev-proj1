import * as React from "react";
import { Link } from "react-router-dom";
import Axios from "axios";
import NavBar from "./nav";
import { IUserState, IState } from "../redux/reducers/rootReducer";
import { connect } from "react-redux";
import { userUpdate } from "../redux/actions/user.action";

export interface IAllUsersCompState {
  userId: string;
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  updated: boolean;
}

export interface IReimburseCompProps {
  user: IUserState;

  //actions
  userUpdate: (
    firstname: string,
    lastname: string,
    role: string,
    id: string,
    email: string,
    username: string,
    loggedIn: boolean
  ) => void;
}

let isAdmin: boolean;
class AllUsersComp extends React.Component<
  IReimburseCompProps,
  IAllUsersCompState
> {
  constructor(props: any) {
    super(props);

    this.state = {
      userId: "",
      username: "",
      firstName: "",
      lastName: "",
      email: "",
      role: "",
      updated: false
    };
  }

  componentWillMount() {
    isAdmin = this.props.user.role == "2";
  }

  updateUserId(e: any) {
    e.persist();
    this.setState({
      ...this.state,
      userId: e.target.value
    });
    this.clearForm();
    this.populateForm(e.target.value);
    this.clearUser();
  }

  clearUser() {
    this.setState({
      ...this.state,
      updated: false
    });
  }

  updateState(e: any) {
    this.setState({
      ...this.state,
      [e.currentTarget.name]: e.currentTarget.value
    });
    console.log(`Updated ${e.currentTarget.name} to: ${e.currentTarget.value}`);
  }

  handleClick() {
    const data = {
      userId: this.state.userId,
      username: this.state.username,
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      email: this.state.email,
      role: this.state.role
    };
    const url = "http://localhost:3000/users";
    Axios({
      method: "patch",
      url: url,
      headers: {
        Authorization: window.localStorage.getItem("token")
      },
      data: data
    })
      .then(res => {
        if (this.props.user.id === this.state.userId) {
          this.props.userUpdate(
            this.state.firstName,
            this.state.lastName,
            this.state.role,
            this.state.userId,
            this.state.email,
            this.state.username,
            true
          );
        } else {
        }
        this.setState({
          ...this.state,
          updated: true
        });
        return res.data;
      })
      .catch(err => {
        console.log(err);
      });
  }

  clearForm() {
    this.setState({
      ...this.state,
      userId: "",
      username: "",
      firstName: "",
      lastName: "",
      email: "",
      role: ""
    });
  }

  populateForm(value: string) {
    const url = `http://localhost:3000/users/userId/${value}`;
    Axios({
      method: "get",
      url: url,
      headers: {
        Authorization: window.localStorage.getItem("token")
      }
    })
      .then(res => {
        this.setState({
          ...this.state,
          userId: res.data.userId,
          username: res.data.username,
          firstName: res.data.firstName,
          lastName: res.data.lastName,
          email: res.data.email,
          role: res.data.role
        });
      })
      .catch(err => {
        console.log(err);
      });
  }

  public render() {
    return (
      <div>
        <NavBar />
        <div className="container-fluid grey-bg vertical-fluid">
          <Link
            to="/users"
            id="back-btn"
            className="btn btn-warning float-right"
          >
            Back
          </Link>
          <h1 className="grey">All users</h1>
          <hr className="grey-border" />
          <div className="row col-12 margin-media-0">
            <div className="col-12 col-sm-12 col-md-5 col-lg-3 col-xl-3 margin-bot-5">
              <label>User ID</label>
              <input
                type="text"
                className="form-control"
                onChange={(e: any) => this.updateUserId(e)}
                id="get-user-id"
              />
            </div>
            <div className="col-12 col-sm-12 col-md-7 col-lg-6 col-xl-6 display-inline dk-grey-bg padding-5">
              <div className="form-row">
                <div className="form-group mb-3 col-3">
                  <label className="form-label-yellow">ID</label>
                  <input
                    type="text"
                    className="form-control"
                    id="userId"
                    placeholder="User ID"
                    readOnly
                    value={this.state.userId}
                  />
                </div>

                <div className="form-group mb-3 col-9">
                  <label className="form-label-yellow">Username</label>
                  <input
                    type="text"
                    name="username"
                    className="form-control"
                    placeholder="Username"
                    readOnly={!isAdmin}
                    value={this.state.username}
                    onChange={(e: any) => this.updateState(e)}
                  />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group mb-3 col">
                  <label className="form-label-yellow">First name</label>
                  <input
                    type="text"
                    name="firstName"
                    className="form-control"
                    placeholder="First name"
                    readOnly={!isAdmin}
                    value={this.state.firstName}
                    onChange={(e: any) => this.updateState(e)}
                  />
                </div>

                <div className="form-group mb-3 col">
                  <label className="form-label-yellow">Last name</label>
                  <input
                    type="text"
                    name="lastName"
                    className="form-control"
                    placeholder="Last name"
                    readOnly={!isAdmin}
                    value={this.state.lastName}
                    onChange={(e: any) => this.updateState(e)}
                  />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group mb-3 col-9">
                  <label className="form-label-yellow">Email</label>
                  <input
                    type="text"
                    name="email"
                    className="form-control"
                    placeholder="Email"
                    readOnly={!isAdmin}
                    value={this.state.email}
                    onChange={(e: any) => this.updateState(e)}
                  />
                </div>

                <div className="form-group mb-3 col-3">
                  <label className="form-label-yellow">Role</label>
                  <input
                    type="text"
                    name="role"
                    className="form-control"
                    placeholder="Role"
                    readOnly={!isAdmin}
                    value={this.state.role}
                    onChange={(e: any) => this.updateState(e)}
                  />
                </div>
              </div>
              <button
                className={
                  this.state.updated
                    ? "btn btn-block btn-success margin-top-5 float-right"
                    : "btn btn-block btn-warning margin-top-5 float-right"
                }
                hidden={!isAdmin}
                onClick={() => this.handleClick()}
              >
                {this.state.updated ? "User Updated!" : "Update"}
              </button>
            </div>
          </div>
          s
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state: IState) => ({
  user: state.user
});

const mapDispatchToProps = {
  userUpdate: userUpdate
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AllUsersComp);
