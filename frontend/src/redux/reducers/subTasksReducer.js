import { initialStore } from "../store";
import { 
    FETCH_SUBTASKS_REQUEST, 
    FETCH_SUBTASKS_SUCCESS, 
    FETCH_SUBTASKS_FAILURE,
    CREATE_SUBTASK_REQUEST,
    CREATE_SUBTASK_SUCCESS,
    CREATE_SUBTASK_FAILURE,

} from "../constants/subtaskConstants";



const subTasksReducer = (state = initialStore.subtasksOps, action) => {
    switch(action.type){
        case FETCH_SUBTASKS_REQUEST:
            return {
                ...state,
                fetchSubtasks:{
                    loading: true
                }
            }
        case FETCH_SUBTASKS_SUCCESS:
            return {
                ...state,
                subtasks: action.payload,
                fetchSubtasks:{
                    loading: false,
                    success: true,
                }
            }
        case FETCH_SUBTASKS_FAILURE:
            return {
                ...state,
                subtasks: [],
                fetchSubtasks: {
                    loading: false,
                    success: false,
                    error: action.payload
                }
            }
        case CREATE_SUBTASK_REQUEST:
            return {
                ...state,
                createSubtask: {
                    loading: true
                }
            }
        case CREATE_SUBTASK_SUCCESS:
            return {
                ...state,
                createSubtask: {
                    loading: false,
                    success: true,
                    created: action.payload
                }
            }
        case CREATE_SUBTASK_FAILURE: 
            return {
                ...state,
                createSubtask: {
                    loading: false,
                    success: false,
                    error: action.payload
                }
            }
        default:
            return state
    }
}

export default subTasksReducer