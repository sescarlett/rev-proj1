import * as React from 'react';
import { Link } from 'react-router-dom';
import Axios from 'axios';
import NavBar from './nav';

export interface IUpdateReimbursementState {
    id: string;
    amt: number;
    auth: string;
    sub: string;
    res: string;
    desc: string;
    resId: string;
    status: number;
    type: number;
}

export default class UpdateReimbursement 
    extends React.Component<any, IUpdateReimbursementState> {

    constructor(props: any) {
        super(props);

        this.state = {
            id: '',
            amt: 0,
            auth: '',
            sub: '',
            res: '',
            desc: '',
            resId: '',
            status: 0,
            type: 0,
        }
    }

    updateState(e: any) {
        e.persist();
        this.setState({
        ...this.state,
        [e.target.name]: e.target.value,
        });
    }

    handleUpdate() {
        const data = {
            reimbursementId: this.props.location.state.id
        }
        if(this.state.amt !== 0) {
            Object.assign(data, {amount: this.state.amt});
        }
        if(this.state.auth !== '') {
            Object.assign(data, {author: this.state.auth});
        }
        if(this.state.sub !== '') {
            Object.assign(data, {dateSubmitted: this.state.sub});
        }
        if(this.state.res !== '') {
            Object.assign(data, {dateResolved: this.state.res});
        }
        if(this.state.desc !== '') {
            Object.assign(data, {description: this.state.desc});
        }
        if(this.state.resId !== '') {
            Object.assign(data, {resolver: this.state.resId});
        }
        if(this.state.status !== 0) {
            Object.assign(data, {status: this.state.status});
        }
        if(this.state.type !== 0) {
            Object.assign(data, {type: this.state.type});
        }
        console.log(data);
        const url = 'http://localhost:3000/reimbursements'
        Axios({
            method: "patch",
            data: data,
            url: url,      
            headers: {
              "Authorization": window.localStorage.getItem('token')         
            }
        }).then(res => {
            alert('Succesfully updated reimbursement: ' + this.props.location.state.id);
            this.props.history.push(this.props.location.state.back);
            return res.data;
        }).catch(err => {
            console.log(err);
            alert('Unauthorized for this action');
            this.props.history.push(this.props.location.state.back)
        });
    }

    public render() {
        return (
            <div>
                <NavBar />
                <div className="container-fluid grey-bg vertical-fluid">
                    <Link to={this.props.location.state.back} id="back-btn" className="btn btn-warning float-right">Back</Link>
                    <h1 className="grey">Update</h1>
                    <hr className="grey-border"/>
                    <div className="row">
                        <div className="col-1 col-sm-2 col-md-2 col-lg-3 col-xl-3"></div>

                        <div className="col-10 col-sm-8 col-md-7 col-lg-6 col-xl-6 display-inline dk-grey-bg padding-5">
                            <form>
                                <div className="form-row">
                                    <div className="form-group col-4">
                                        <label className="form-label-yellow">ID</label>
                                        <input type="text" className="form-control"
                                            placeholder={this.props.location.state.id || ''}
                                            name="id" id="reimbursement-id" value={this.props.location.state.id}/>
                                    </div>
                                    <div className="form-group col-4">
                                        <label className="form-label-yellow">Author ID</label>
                                        <input type="text" className="form-control"
                                            placeholder={this.props.location.state.author}  
                                            name="auth" id="author-id"
                                            onChange={(e: any) => this.updateState(e)} />
                                    </div>
                                    <div className="form-group col-4">
                                        <label className="form-label-yellow">Amount</label>
                                        <input type="text" className="form-control" 
                                            placeholder={this.props.location.state.amount} 
                                            name="amt" id="amount"
                                            onChange={(e: any) => this.updateState(e)} />
                                    </div>
                                </div>
                                <div className="form-row">
                                    <div className="form-group col-6">
                                        <label className="form-label-yellow">Date Submitted</label>
                                        <input type="text" className="form-control" 
                                            placeholder={this.props.location.state.dateSub} 
                                            name="sub" id="date-submitted"
                                            onChange={(e: any) => this.updateState(e)} />
                                    </div>
                                    <div className="form-group col-6">
                                        <label className="form-label-yellow">Date Resolved</label>
                                        <input type="text" className="form-control" 
                                            placeholder={this.props.location.state.dateRes} 
                                            name="res" id="date-resolved"
                                            onChange={(e: any) => this.updateState(e)} />
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label className="form-label-yellow">Description</label>
                                    <input type="text" className="form-control" 
                                        placeholder={this.props.location.state.desc} 
                                        name="desc" id="description"
                                        onChange={(e: any) => this.updateState(e)}/>
                                </div>
                                <div className="form-row">
                                    <div className="form-group col-4">
                                        <label className="form-label-yellow">Resolver</label>
                                        <input type="text" className="form-control"
                                            placeholder={this.props.location.state.resolver}  
                                            name="resId" id="resolver-id"
                                            onChange={(e: any) => this.updateState(e)}/>
                                    </div>
                                    <div className="form-group col-4">
                                        <label className="form-label-yellow">Status</label>                        
                                            <select className="custom-select" name="status"
                                                placeholder={this.props.location.state.status} 
                                                onChange={(e: any) => this.updateState(e)} id="post-type">
                                                <option selected>Choose...</option>
                                                <option value={1}>Pending</option>
                                                <option value={2}>Approved</option>
                                                <option value={3}>Denied</option>
                                            </select>
                                    </div>
                                    <div className="form-group col-4">
                                        <label className="form-label-yellow">Type</label>
                                        <select className="custom-select" name="type"
                                            placeholder={this.props.location.state.type} 
                                            onChange={(e: any) => this.updateState(e)} id="post-type">
                                            <option selected>Choose...</option>
                                            <option value={1}>Lodging</option>
                                            <option value={2}>Food</option>
                                            <option value={3}>Travel</option>
                                            <option value={4}>Other</option>
                                        </select>
                                    </div>
                                </div>
                            </form>
                            <button className="btn btn-warning float-right" type="button" 
                                onClick={() => this.handleUpdate()} id="button-addon2">Update Reimbursement</button>
                        </div>
                    </div>            
                </div>
            </div>
        );
    }
}
