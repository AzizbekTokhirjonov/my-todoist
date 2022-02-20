import { CREATE_LABEL_FAILURE, CREATE_LABEL_REQUEST, CREATE_LABEL_SUCCESS, DELETE_LABEL_FAILURE, DELETE_LABEL_REQUEST, DELETE_LABEL_SUCCESS, FETCH_ALL_LABELS, LABELS_FAILURE, LABELS_REQUEST, UPDATE_LABEL_FAILURE, UPDATE_LABEL_REQUEST, UPDATE_LABEL_SUCCESS } from "../constants/labelConstants";
import { initialStore } from "../store";

export const labelsReducer = (state = {labels: []}, action) => {
    switch(action.type){
        case LABELS_REQUEST:
            return {
                loading: true,
                labels: []
            }
        case FETCH_ALL_LABELS:
            return {
                loading: false,
                labels: action.payload
            }
        case LABELS_FAILURE:
            return {
                loading: false,
                error: action.payload,
                labels: []
            }

        default:
            return state
    }
}

export const labelOpsReducer = (state = initialStore.labelOps, action) => {
    switch(action.type){
        case CREATE_LABEL_REQUEST:
            return {
                ...state,
                createLabel: {
                    loading: true
                }
            }
        case CREATE_LABEL_SUCCESS:
            return {
                ...state,
                createLabel: {
                    loading: false,
                    success: true,
                    createdLable: action.payload
                }
            }
        case CREATE_LABEL_FAILURE:
            return {
                ...state,
                createLabel: {
                    loading: false,
                    error: action.payload,
                    success: false,
                }
            }

        case DELETE_LABEL_REQUEST:
            return {
                ...state,
                deleteLabel: {
                    loading: true,
                }
            }
        case DELETE_LABEL_SUCCESS: 
            return {
                ...state,
                deleteLabel: {
                    loading: false,
                    deleted: action.payload,
                    success: true
                }
            }
        case DELETE_LABEL_FAILURE: 
            return {
                ...state,
                deleteLabel: {
                    loading: false,
                    success: false,
                    error: action.payload
                }
            }
        case UPDATE_LABEL_REQUEST:
            return {
                ...state,
                updateLabel: {
                    loading: true
                }
            }
        case UPDATE_LABEL_SUCCESS:
            return {
                ...state,
                updateLabel: {
                    loading: false,
                    success: true,
                    updatedLable: action.payload
                }
            }
        case UPDATE_LABEL_FAILURE:
            return {
                ...state,
                updateLabel: {
                    loading: false,
                    success: false,
                    error: action.payload
                }
            }
        default:
            return state
    }
}