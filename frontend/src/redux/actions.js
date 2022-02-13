export const OPEN_MODAL = "OPEN_MODAL";
export const REMOVE_MODAL = "REMOVE_MODAL"

export const handleOpen = (task) => {
    return {
        type: OPEN_MODAL,
        payload: {
            open: true,
            openTask: task
        }
    } 
}
export const handleCLose = () => {
 return{
    type: REMOVE_MODAL,
    payload: {
        open: false,
        openTask : {}
    }
 }
}