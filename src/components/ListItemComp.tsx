import * as React from 'react';

export interface IListItemCompState {
    listID: string;
}

export default class ListItemComp extends React.Component<any, IListItemCompState> {
    constructor(props: any) {    
        super(props);

        this.state = { listID: '' }
    }

    handleSelect = (event: any) => {
        this.setState({ 
            ...this.state,
            listID: event.target.value,
        });
        this.props.onListSelect(event.currentTarget.value);
    }

    handleSubmit = () => {
        const value = this.state.listID;        
        this.props.onListSelect(value);
    }

    public render() {    

        const listIDs = this.props.listIDs;
        const listItems = listIDs.map((id: number) =>
            <option key={id} value={id}>{id}</option>            
        );
        return (
            <form>
                <label>Select Reimbursement:</label>
                <div>
                    <select className="custom-select col-12" onChange={this.handleSelect.bind(this)}>
                        <option key={0} value={0}>Choose ID...</option>
                        {listItems}
                    </select>
                </div>
            </form>
        );
    }
}