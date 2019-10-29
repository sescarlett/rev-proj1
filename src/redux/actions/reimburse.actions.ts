export const reimburseTypes = {
    UPDATE_REIMBURSE: "UPDATE_REIMBURSE"
}

export const reimburseUpdate = (
    id: string,
    author: string,
    amount: string,
    dateSub: string,
    dateRes: string,
    desc: string,
    resolver: string,
    status: string,
    type: string
) => (dispatch: any) => {
    dispatch({
        payload: {
            id,
            author,
            amount,
            dateSub,
            dateRes,
            desc,
            resolver,
            status,
            type
        },
        type: reimburseTypes.UPDATE_REIMBURSE
    })
}