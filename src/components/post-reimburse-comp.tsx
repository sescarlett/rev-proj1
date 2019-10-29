import * as React from "react";
import { Link } from "react-router-dom";
import Axios from "axios";
import jwt from "jsonwebtoken";
import NavBar from "./nav";

export interface IPostReimburseCompState {
  amount: number;
  dateSub: Date;
  desc: string;
  type: number;
}

export default class PostReimburseComp extends React.Component<
  any,
  IPostReimburseCompState
> {
  constructor(props: any) {
    super(props);

    this.state = {
      amount: 0,
      dateSub: new Date(),
      desc: "",
      type: 0
    };
  }

  updateState(e: any) {
    e.persist();
    this.setState({
      ...this.state,
      [e.target.name]: e.target.value
    });
  }

  onSubmitReimbursement() {
    const token = window.localStorage.getItem("token");
    const decodeToken: any = jwt.decode(token as string);
    const userId = decodeToken.userId;
    const url = `http://localhost:3000/reimbursements`;
    Axios({
      method: "post",
      url: url,
      data: {
        author: userId,
        amount: this.state.amount,
        dateSubmitted: this.state.dateSub,
        description: this.state.desc,
        status: 1,
        type: this.state.type
      },
      headers: {
        Authorization: window.localStorage.getItem("token")
      }
    }).then(res => {
      this.props.history.push("/author");
      return res.data;
    });
  }

  public render() {
    return (
      <div>
        <NavBar />

        <div className="container-fluid grey-bg vertical-fluid">
          <Link
            to="/author"
            id="back-btn"
            className="btn btn-warning float-right margin-20px"
          >
            Back
          </Link>
          <h1 className="grey">New Reimbursement</h1>
          <hr className="grey-border" />
          <div className="row">
            <div className="col-1 col-sm-2 col-md-2 col-lg-3 col-xl-3"></div>
            <div className="col-10 col-sm-8 col-md-7 col-lg-6 col-xl-6 display-inline dk-grey-bg margin-top-5 padding-5">
              <div className="input-group mb-3">
                <div className="input-group-prepend">
                  <span className="input-group-text">$</span>
                </div>
                <input
                  type="text"
                  className="form-control"
                  name="amount"
                  onChange={(e: any) => this.updateState(e)}
                  placeholder="Amount"
                />
              </div>
              <div className="input-group mb-3">
                <input
                  type="text"
                  className="form-control"
                  name="desc"
                  onChange={(e: any) => this.updateState(e)}
                  placeholder="Description"
                />
              </div>

              <div className="input-group mb-3">
                <select
                  className="custom-select"
                  id="post-type"
                  onChange={(e: any) => this.updateState(e)}
                  name="type"
                >
                  <option>Choose...</option>
                  <option value={1}>Lodging</option>
                  <option value={2}>Food</option>
                  <option value={3}>Travel</option>
                  <option value={4}>Other</option>
                </select>
              </div>

              <button
                type="submit"
                className="btn btn-block btn-warning margin-top-5"
                onClick={() => this.onSubmitReimbursement()}
              >
                Post Reimbursement
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
