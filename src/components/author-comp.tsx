import * as React from "react";
import { Link } from "react-router-dom";
import Axios from "axios";
import ListItemComp from "./ListItemComp";
import NavBar from "./nav";
import {
  IUserState,
  IState,
  IReimbursementState
} from "../redux/reducers/rootReducer";
import { userUpdate } from "../redux/actions/user.action";
import { connect } from "react-redux";
import { reimburseUpdate } from "../redux/actions/reimburse.actions";
import Update from "./modals/Update";

export interface IAuthorCompProps {
  user: IUserState;
  reimburse: IReimbursementState;

  reimburseUpdate: (
    id: string,
    author: string,
    amount: string,
    dateSub: string,
    dateRes: string,
    desc: string,
    resolver: string,
    status: string,
    type: string
  ) => void;

  //actions
  userUpdate: (
    firstname: string,
    lastname: string,
    role: string,
    id: string,
    email: string,
    username: string
  ) => void;
}

export interface IAuthorCompState {
  authId: string;
  listId: number[];
  id: string;
  author: string;
  amount: string;
  dateSub: string;
  dateRes: string;
  desc: string;
  resolver: string;
  status: string;
  type: string;
  updated: boolean;
}

let isFinanceManager = false;
class AuthorComp extends React.Component<IAuthorCompProps, IAuthorCompState> {
  constructor(props: any) {
    super(props);

    this.state = {
      authId: "",
      listId: [],
      id: "",
      author: "",
      amount: "",
      dateSub: "",
      dateRes: "",
      desc: "",
      resolver: "",
      status: "",
      type: "",
      updated: false
    };
  }

  componentWillMount() {
    isFinanceManager = this.props.user.role == "1";
    if (!isFinanceManager) {
      this.setState({
        ...this.state,
        authId: this.props.user.id
      });
      this.populateList(this.props.user.id);
    }
  }

  updateID(e: any) {
    e.persist();
    this.setState({
      ...this.state,
      authId: e.target.value
    });
    this.populateList(e.currentTarget.value);
    this.clearForm();
  }

  clearForm() {
    this.setState({
      ...this.state,
      id: "",
      author: "",
      amount: "",
      dateSub: "",
      dateRes: "",
      desc: "",
      resolver: "",
      status: "",
      type: ""
    });
    this.props.reimburseUpdate(
      this.state.id,
      this.state.author,
      this.state.amount,
      this.state.dateSub,
      this.state.dateRes,
      this.state.desc,
      this.state.resolver,
      this.state.status,
      this.state.type
    );
  }

  populateForm(val: string) {
    const url = `http://localhost:3000/reimbursements/${val}`;
    Axios({
      method: "get",
      url: url,
      headers: {
        Authorization: window.localStorage.getItem("token")
      }
    }).then(res => {
      let resolved = "";
      if (res.data.dateResolved !== null) {
        resolved = res.data.dateResolved.substring(0, 10);
      }
      this.setState({
        author: res.data.author,
        amount: res.data.amount,
        dateSub: res.data.dateSubmitted.substring(0, 10),
        dateRes: resolved,
        desc: res.data.description,
        resolver: res.data.resolver || "",
        status: res.data.status,
        type: res.data.type
      });
      this.props.reimburseUpdate(
        val,
        res.data.author,
        res.data.amount,
        res.data.dateSubmitted.substring(0, 10),
        resolved,
        res.data.description,
        res.data.resolver || "",
        res.data.status,
        res.data.type
      );
    });
  }

  handleUpdate() {
    const url = "http://localhost:3000/reimbursements";
    Axios({
      method: "patch",
      url: url,
      data: {
        author: this.state.author,
        amount: this.state.amount,
        dateSubmitted: this.state.dateSub,
        dateResolved: this.state.dateRes,
        description: this.state.desc,
        resolver: this.state.resolver,
        status: this.state.status,
        type: this.state.type
      }
    });
  }

  populateList(val: string) {
    const url = `http://localhost:3000/reimbursements/author/userId/${val}`;
    Axios({
      method: "get",
      url: url,
      headers: {
        Authorization: window.localStorage.getItem("token")
      }
    })
      .then(res => {
        const tempArray = [];
        for (let i = 0; i < res.data.length; i++) {
          tempArray[i] = res.data[i].reimbursementId;
        }

        this.setState({
          ...this.state,
          listId: tempArray
        });
      })
      .catch(err => {
        console.log(err);
      });
  }

  handleListSelect = (select: string) => {
    this.setState({ id: select });
    this.populateForm(select);
  };

  public render() {
    return (
      <div>
        <NavBar />
        <div className="container-fluid grey-bg vertical-fluid">
          <Link
            to="/reimbursements"
            id="back-btn"
            className="btn btn-warning float-right"
          >
            Back
          </Link>
          <h1 className="grey">Get by Author</h1>
          <hr className="grey-border" />
          <div className="row col-12 margin-media-0">
            <div className="col-12 col-sm-12 col-md-5 col-lg-3 col-xl-3 display-inline">
              <div hidden={!isFinanceManager} className="margin-bot-5">
                <label>User ID</label>
                <input
                  type="text"
                  className="form-control"
                  onChange={(e: any) => this.updateID(e)}
                  id="get-user-id"
                />
              </div>

              <div className="margin-bot-5">
                <ListItemComp
                  onListSelect={this.handleListSelect}
                  listIDs={this.state.listId}
                />
              </div>
            </div>

            <div
              className="col-12 col-sm-12 col-md-7 col-lg-6 col-xl-6 
                        display-inline dk-grey-bg padding-5"
            >
              <form>
                <div className="form-row">
                  <div className="form-group col-4">
                    <label className="form-label-yellow">ID</label>
                    <input
                      type="text"
                      className="form-control"
                      value={this.state.id}
                      id="reimbursement-id"
                      readOnly
                    />
                  </div>
                  <div className="form-group col-4">
                    <label className="form-label-yellow">Author</label>
                    <input
                      type="text"
                      className="form-control"
                      value={this.state.author}
                      id="author-id"
                      readOnly
                    />
                  </div>
                  <div className="form-group col-4">
                    <label className="form-label-yellow">Amount</label>
                    <input
                      type="text"
                      className="form-control"
                      value={this.state.amount}
                      id="amount"
                      readOnly
                    />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group col-6">
                    <label className="form-label-yellow">Submitted</label>
                    <input
                      type="text"
                      className="form-control"
                      value={this.state.dateSub}
                      id="date-submitted"
                      readOnly
                    />
                  </div>
                  <div className="form-group col-6">
                    <label className="form-label-yellow">Resolved</label>
                    <input
                      type="text"
                      className="form-control"
                      value={this.state.dateRes}
                      id="date-resolved"
                      readOnly
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label className="form-label-yellow">Description</label>
                  <input
                    type="text"
                    className="form-control"
                    value={this.state.desc}
                    id="description"
                    readOnly
                  />
                </div>
                <div className="form-row">
                  <div className="form-group col-4">
                    <label className="form-label-yellow">Resolver</label>
                    <input
                      type="text"
                      className="form-control"
                      value={this.state.resolver}
                      id="resolver-id"
                      readOnly
                    />
                  </div>
                  <div className="form-group col-4">
                    <label className="form-label-yellow">Status</label>
                    <select
                      className="custom-select"
                      value={this.state.status}
                      id="post-type"
                      disabled
                    >
                      <option value={1}>Pending</option>
                      <option value={2}>Approved</option>
                      <option value={3}>Denied</option>
                    </select>
                  </div>
                  <div className="form-group col-4">
                    <label className="form-label-yellow">Type</label>
                    <select
                      className="custom-select"
                      value={this.state.type}
                      id="post-type"
                      disabled
                    >
                      <option value={1}>Lodging</option>
                      <option value={2}>Food</option>
                      <option value={3}>Travel</option>
                      <option value={4}>Other</option>
                    </select>
                  </div>
                </div>

                <div className="form-row">
                  <div className={!isFinanceManager ? "col-12" : "col-6"}>
                    <Link
                      to="/new-reimbursement"
                      id="new-reimbursement-link"
                      className="btn btn-block btn-warning margin-top-5 "
                    >
                      New
                    </Link>
                  </div>
                  <div className="col-6" hidden={!isFinanceManager}>
                    <button
                      className="btn btn-block btn-warning margin-top-5"
                      data-toggle="modal"
                      data-target="#update-modal"
                    >
                      {this.state.updated ? "User Updated!" : "Update"}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
        {/* update modal */}
        <div
          className="modal fade"
          id="update-modal"
          role="dialog"
          aria-labelledby="updateModal"
          aria-hidden="true"
        >
          <Update />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state: IState) => ({
  user: state.user,
  reimburse: state.reimburse
});

const mapDispatchToProps = {
  userUpdate: userUpdate,
  reimburseUpdate: reimburseUpdate
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AuthorComp);
