import * as React from "react";
import {
  IUserState,
  IState,
  IReimbursementState
} from "../../redux/reducers/rootReducer";
import { connect } from "react-redux";
import Axios from "axios";

export interface IUpdateProps {
  user: IUserState;
  reimburse: IReimbursementState;
}
/**
 * This is the component for the update modal
 *
 * contains all state update methods needed
 * as well as axios post function
 */
class Update extends React.Component<IUpdateProps> {

  handleUpdate(val: string) {
    const today = new Date();
    const date =
      today.getFullYear() +
      "-" +
      (today.getMonth() + 1) +
      "-" +
      today.getDate();
    const resolver = this.props.user.id;
    const data = {
      reimbursementId: parseInt(this.props.reimburse.reimburseId),
      author: parseInt(this.props.reimburse.author),
      amount: parseInt(this.props.reimburse.amount),
      dateSubmitted: this.props.reimburse.dateSubmitted,
      dateResolved: date,
      description: this.props.reimburse.description,
      resolver: parseInt(resolver),
      status: parseInt(val),
      type: parseInt(this.props.reimburse.type)
    };
    const url = "http://localhost:3000/reimbursements";
    Axios({
      method: "patch",
      data: data,
      url: url,
      headers: {
        Authorization: window.localStorage.getItem("token")
      }
    })
      .then(res => {
        console.log(res.data);
        return res.data;
      })
      .catch(err => {
        console.log(err);
      });
  }

  public render() {
    return (
      <div className="modal-dialog modal-dialog-centered" role="document">
        <div className="modal-content dk-grey-bg">
          {/* modal header */}
          <div className="modal-header">
            <h3 className="modal-title yellow" id="exampleModalLabel">
              Update Reimbursement
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
                <div className="form-row">
                  <button
                    className="btn col btn-success margin-5px"
                    onClick={() => this.handleUpdate("2")}
                    data-dismiss="modal"
                  >
                    Approved
                  </button>
                  <button
                    className="btn btn-danger col margin-5px"
                    onClick={() => this.handleUpdate("3")}
                    data-dismiss="modal"
                  >
                    Denied
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state: IState) => ({
  user: state.user,
  reimburse: state.reimburse
});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Update);
