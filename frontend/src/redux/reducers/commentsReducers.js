import { FETCH_COMMENTS_REQUEST, FETCH_COMMENTS_SUCCESS, FETCH_COMMENTS_FAILURE, CREATE_COMMENT_REQUEST, CREATE_COMMENT_SUCCESS, CREATE_COMMENT_FAILURE, UPDATE_COMMENT_REQUEST, UPDATE_COMMENT_SUCCESS, UPDATE_COMMENT_FAILURE, DELETE_COMMENT_REQUEST, DELETE_COMMENT_SUCCESS, DELETE_COMMENT_FAILURE } from "../constants/commentConstants";
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
                    created: action.payload
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

        case UPDATE_COMMENT_REQUEST: {
            return {
                ...state,
                updateComment: {
                    loading: true
                }
            }
        }

        case UPDATE_COMMENT_SUCCESS: {
            return {
                ...state,
                updateComment: {
                    loading: false,
                    success: true,
                    message: action.payload
                }
            }
        }

        case UPDATE_COMMENT_FAILURE: {
            return {
                ...state,
                updateComment: {
                    loading: false,
                    success: false,
                    error: action.payload
                }
            }
        }

        case DELETE_COMMENT_REQUEST: {
            return {
                ...state,
                deleteComment: {
                    loading: true
                }
            }
        }

        case DELETE_COMMENT_SUCCESS: {
            return {
                ...state,
                deleteComment: {
                    loading: false,
                    success: true,
                    message: action.payload
                }
            }
        }

        case DELETE_COMMENT_FAILURE: {
            return {
                ...state,
                deleteComment: {
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