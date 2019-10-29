import { reimburseTypes } from '../actions/reimburse.actions'

const initialState = {    
    reimburseId: '',
    author: '',
    amount: '',
    dateSubmitted: '',
    dateResolved: '',
    description: '',
    resolver: '',
    status: '',
    type: ''
}

export const reimburseReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case reimburseTypes.UPDATE_REIMBURSE:
            return {
                ...state,
                reimburseId: action.payload.id,
                author: action.payload.author,
                amount: action.payload.amount,
                dateSubmitted: action.payload.dateSub,
                dateResolved: action.payload.dateRes,
                description: action.payload.desc,
                resolver: action.payload.resolver,
                status: action.payload.status,
                type: action.payload.type,
            };
        default:
            break;
    }
    return state;
}