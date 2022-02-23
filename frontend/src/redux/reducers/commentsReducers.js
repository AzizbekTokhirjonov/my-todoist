import { FETCH_COMMENTS_REQUEST, FETCH_COMMENTS_SUCCESS, FETCH_COMMENTS_FAILURE, CREATE_COMMENT_REQUEST, CREATE_COMMENT_SUCCESS, CREATE_COMMENT_FAILURE } from "../constants/commentConstants";
import { initialStore } from "../store";


const commentsOpsReducer = (state = initialStore.commentsOps, action) => {
    switch(action.type){
        case FETCH_COMMENTS_REQUEST: {
            return {
                ...state,
                fetchComments: {
                    loading: true
                }
            }
        }

        case FETCH_COMMENTS_SUCCESS: {
            return {
                ...state,
                comments: action.payload,
                fetchComments: {
                    loading: false,
                    success: true
                }
            }
        }

        case FETCH_COMMENTS_FAILURE: {
            return {
                ...state,
                comments: [],
                fetchComments: {
                    loading: false,
                    success: false,
                    error: action.payload
                }
            }
        }

        case CREATE_COMMENT_REQUEST: {
            return {
                ...state,
                createComment: {
                    loading: true
                }
            }
        }

        case CREATE_COMMENT_SUCCESS: {
            return {
                ...state,
                createComment: {
                    loading: false,
                    success: true,
                    createdComment: action.payload
                }
            }
        }

        case CREATE_COMMENT_FAILURE: {
            return {
                ...state,
                createComment: {
                    loading: false,
                    success: false,
                    error: action.payload
                }
            }
        }
        
        default:
            return state
    }
}

export default commentsOpsReducer