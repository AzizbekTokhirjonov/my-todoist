import { LABELS_REQUEST, LABELS_FAILURE, FETCH_ALL_LABELS, CREATE_LABEL_REQUEST, CREATE_LABEL_FAILURE, CREATE_LABEL_SUCCESS, DELETE_LABEL_REQUEST, DELETE_LABEL_SUCCESS, DELETE_LABEL_FAILURE, UPDATE_LABEL_REQUEST, UPDATE_LABEL_SUCCESS, UPDATE_LABEL_FAILURE } from "../constants/labelConstants";
import baseUrl from "../API/baseUrl";

export const fetchAllLabels = () => {
    return async(dispatch)=>{
        try {
            dispatch({type: LABELS_REQUEST})

            const response = await fetch(`${baseUrl}/labels`, {
                method: 'GET',
                headers: {
                  "Content-Type": "application/json",
                },
            });
            const data = await response.json();

            dispatch({type: FETCH_ALL_LABELS, payload:data})
        } catch (error) {
            dispatch({type: LABELS_FAILURE, payload: error})
            
        }
    }
}

export const createLabel = (labelObj) => {
    return async (dispatch) => {
        try {
            dispatch({type: CREATE_LABEL_REQUEST})
            const response = await fetch(`${baseUrl}/labels`, {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({...labelObj}),
            });

            const data = await response.json()
            dispatch({type: CREATE_LABEL_SUCCESS, payload: data})
            dispatch(fetchAllLabels())
        } catch (error) {
            dispatch({type: CREATE_LABEL_FAILURE,  payload: error})
        }
    }
}


export const deleteLabel = (labelId) => {
    return async (dispatch) => {
        try {
            dispatch({type: DELETE_LABEL_REQUEST})
            const response = await fetch(`${baseUrl}/labels/${labelId}`, {
                method: "DELETE",
                headers: {
                  "Content-Type": "application/json",
                },
            });

            if(response.ok){
                const data = response.json()
                dispatch({type: DELETE_LABEL_SUCCESS, payload: data})

            } else {
                const data = response.json()
                dispatch({type: DELETE_LABEL_FAILURE, payload: data})
            }

            dispatch(fetchAllLabels())

        } catch (error) {
            console.log(error)
            dispatch({type: DELETE_LABEL_FAILURE, payload: error})
        }
    }
}

export const updateLabel = ( labelObj) => {
    return async (dispatch) => {
        try {
            dispatch({type: UPDATE_LABEL_REQUEST})
            const response = await fetch(`${baseUrl}/labels/${labelObj._id}`, {
                method: "PUT",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({...labelObj}),
            });

            if(response.ok){
                const data = response.json()
                dispatch({type: UPDATE_LABEL_SUCCESS, payload: data})

            } else {
                const data = response.json()
                dispatch({type: UPDATE_LABEL_FAILURE, payload: data})
            }

            dispatch(fetchAllLabels())

        } catch (error) {
            console.log(error)
            dispatch({type: UPDATE_LABEL_FAILURE, payload: error})
        }
    }
}