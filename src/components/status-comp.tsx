import * as React from "react";
import { Link } from "react-router-dom";
import Axios from "axios";
import ListItemComp from "./ListItemComp";
import NavBar from "./nav";
import {
  IUserState,
  IReimbursementState,
  IState
} from "../redux/reducers/rootReducer";
import Update from "./modals/Update";
import { reimburseUpdate } from "../redux/actions/reimburse.actions";
import { connect } from "react-redux";

export interface IStatusCompState {
  statusId: number;
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
  pending: boolean;
}

export interface IStatusCompProps {
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
}

class StatusComp extends React.Component<IStatusCompProps, IStatusCompState> {
  constructor(props: any) {
    super(props);

    this.state = {
      statusId: 1,
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
      updated: false,
      pending: false
    };
  }

  componentWillMount() {
    this.populateList(this.state.statusId);
    this.statusPending(`${this.state.statusId}`);
  }

  updateStatus(e: any) {
    this.setState({
      ...this.state,
      statusId: e.currentTarget.value
    });
    this.populateList(e.currentTarget.value);
    this.clearForm();
    this.statusPending(e.currentTarget.value);
  }

  statusPending(val: string) {
    if (val === "1") {
      this.setState({
        pending: true
      });
    } else {
      this.setState({
        pending: false
      });
    }
  }

  populateList(val: number) {
    const url = `http://localhost:3000/reimbursements/status/${val}`;
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
        id: val,
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

  handleListSelect = (select: string) => {
    this.setState({ ...this.state, id: select });
    this.populateForm(select);
    this.setState({ ...this.state, updated: false });
  };

  handleStatus(val: string) {
    this.setState({
      ...this.state,
      status: val
    });
  }

  public render() {
    return (
      <div>
        <NavBar />
        <div className="container-fluid grey-bg vertical-fluid col-12">
          <Link
            to="/reimbursements"
            id="back-btn"
            className="btn btn-warning float-right"
          >
            Back
          </Link>
          <h1 className="grey">Get by Status</h1>
          <hr className="grey-border" />
          <div className="row col-12 margin-media-0">
            <div className="col-12 col-sm-12 col-md-5 col-lg-3 col-xl-3 display-inline">
              <div>
                <label>Status:</label>
                <select
                  className="custom-select"
                  id="post-type"
                  onChange={e => this.updateStatus(e)}
                  value={this.state.statusId}
                >
                  <option value={1}>Pending</option>
                  <option value={2}>Approved</option>
                  <option value={3}>Denied</option>
                </select>
              </div>

              <div className="margin-top-10 margin-bot-10">
                <ListItemComp
                  onListSelect={this.handleListSelect}
                  listIDs={this.state.listId}
                />
              </div>
            </div>

            <div className="col-12 col-sm-12 col-md-7 col-lg-6 col-xl-6 display-inline dk-grey-bg padding-5">
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
                  <div
                    className={
                      this.state.pending
                        ? "form-group col-12"
                        : "form-group col-6"
                    }
                  >
                    <label className="form-label-yellow">Submitted</label>
                    <input
                      type="text"
                      className="form-control"
                      value={this.state.dateSub}
                      id="date-submitted"
                      readOnly
                    />
                  </div>
                  <div
                    className="form-group col-6"
                    hidden={this.state.pending ? true : false}
                  >
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
                  <div
                    className="form-group col-4"
                    hidden={this.state.pending ? true : false}
                  >
                    <label className="form-label-yellow">Resolver</label>
                    <input
                      type="text"
                      className="form-control"
                      value={this.state.resolver}
                      id="resolver-id"
                      readOnly
                    />
                  </div>
                  <div
                    className={
                      this.state.pending
                        ? "form-group col-6"
                        : "form-group col-4"
                    }
                  >
                    <label className="form-label-yellow">Status</label>
                    <select
                      name="status"
                      className="custom-select"
                      value={this.state.status}
                      id="post-type"
                      disabled
                    >
                      <option value={"1"}>Pending</option>
                      <option value={"2"}>Approved</option>
                      <option value={"3"}>Denied</option>
                    </select>
                  </div>
                  <div
                    className={
                      this.state.pending
                        ? "form-group col-6"
                        : "form-group col-4"
                    }
                  >
                    <label className="form-label-yellow">Type</label>
                    <select
                      name="type"
                      className="custom-select"
                      value={this.state.type}
                      id="post-type"
                      disabled
                    >
                      <option value={"1"}>Lodging</option>
                      <option value={"2"}>Food</option>
                      <option value={"3"}>Travel</option>
                      <option value={"4"}>Other</option>
                    </select>
                  </div>
                </div>

                <div className="form-row">
                  <div className="col-12">
                    <button
                      type="button"
                      className={
                        this.state.updated
                          ? "btn btn-block btn-success margin-top-5 float-right"
                          : "btn btn-block btn-warning margin-top-5 float-right"
                      }
                      data-toggle="modal"
                      data-target="#update-modal"
                      hidden={this.state.id === ""}
                    >
                      {this.state.updated ? "Updated!" : "Approve/Deny"}
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
  reimburseUpdate: reimburseUpdate
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StatusComp);
