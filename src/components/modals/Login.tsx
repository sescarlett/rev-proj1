import * as React from "react";
import { connect } from "react-redux";
import { IUserState, IState } from "../../redux/reducers/rootReducer";
import { userUpdate } from "../../redux/actions/user.action";
import { APIU } from "../../api";

export interface ILoginProps {
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

export interface ILoginState {
  username: string;
  password: string;
  badLogin: boolean;
}

/**
 * This is the component for the login modal
 *
 * contains all state update methods needed
 * as well as axios post function
 */
class Login extends React.Component<ILoginProps, ILoginState> {
  constructor(props: any) {
    super(props);

    this.state = {
      username: "",
      password: "",
      badLogin: false
    };
  }

  updateState(e: any) {
    e.persist();
    this.setState({
      ...this.state,
      [e.target.name]: e.target.value
    });
  }

  /**
   * allows user to search by using enter
   */
  handleKeyPress = (event: any) => {
    if (event.key === "Enter") {
      this.loginUser();
    }
  };

  /**
   * Contains the axios call to the backend to log in a user using
   * the email and password they type in the login modal
   */
  loginUser() {
    const data = {
      username: this.state.username,
      password: this.state.password
    };

    APIU.login(data)
      .then(res => {
        if (res.status === 200 && res.data.token) {
          window.localStorage.setItem("token", res.data.token);
          this.props.userUpdate(
            res.data.loggedIn.firstName,
            res.data.loggedIn.lastName,
            res.data.loggedIn.role,
            res.data.loggedIn.userId,
            res.data.loggedIn.email,
            res.data.loggedIn.username,
            true
          );
        }
      })
      .catch(e => {
        this.setState({
          ...this.state,
          badLogin: true
        });
        throw e;
      });
  }

  public render() {
    return (
      <div className="modal-dialog modal-dialog-centered" role="document">
        <div className="modal-content dk-grey-bg">
          {/* modal header */}
          <div className="modal-header">
            <h3 className="modal-title yellow" id="exampleModalLabel">
              LOGIN
            </h3>
            <button
              type="button"
              className="close yellow"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          {/* modal body */}
          <div className="modal-body">
            <form>
              <div className="form-group">
                <label className="yellow">
                  <strong>Username</strong>
                </label>
                <input
                  name="username"
                  type="username"
                  placeholder="username"
                  className="form-control form-field"
                  onChange={e => this.updateState(e)}
                  required
                />
              </div>
              <div className="form-group">
                <label className="yellow">
                  <strong>Password</strong>
                </label>
                <input
                  name="password"
                  type="password"
                  placeholder="Password"
                  className="form-control form-field"
                  onChange={e => this.updateState(e)}
                  required
                />
              </div>
            </form>
            <div className="yellow" hidden={this.props.user.loggedIn}>
              <div
                className="yellow center margin-5px"
                hidden={!this.state.badLogin}
              >
                Bad username/password
              </div>
            </div>
            <button
              type="button"
              className={
                this.props.user.loggedIn
                  ? "btn btn-block btn-success"
                  : "btn btn-block btn-warning"
              }
              data-dismiss={this.props.user.loggedIn ? "modal" : null}
              onClick={() => this.loginUser()}
              onKeyPress={this.handleKeyPress}
            >
              {this.props.user.loggedIn ? "Logged in" : "Login"}
            </button>
          </div>
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
)(Login);
