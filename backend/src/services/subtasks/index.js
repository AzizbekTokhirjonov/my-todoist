import express from "express";
import createHttpError from "http-errors";
import { requireAuth } from "../../middleware/authMiddleware.js";
import TaskModel from "../tasks/scheme.js";
import SubTaskModel from "../subtasks/schema.js"

const router = express.Router()


router.post('/:taskId/subtasks', async(req, res) => {
    const {taskId} = req.params
    const user = JSON.parse(req.cookies.user) 
    const taskExists = await TaskModel.exists({_id: taskId})
    console.log(taskExists)
    if (taskExists){
        // TODO: when project level access is established, write code to 
        // verify whether the user posting the subtask is in 
        // either project collaborators list or owner
        try {
            const subtaskObj = req.body
            const newSubTask = new SubTaskModel({...subtaskObj, author: user, task: taskId})
            const saved = await newSubTask.save()
            res.status(201).send(saved)
        } catch (error) {
            console.log(`ERROR WHILE POSTING SUBTASK: ${error}`)
            res.status(500).json({error: 'Internal server error'})  
        }
    } else {
        next(createHttpError(404, "Task with id: " + taskId + " not found"));
    }
})


router.get('/:taskId/subtasks', async(req, res) => {
    const {taskId} = req.params
    const taskExists = await TaskModel.exists({_id: taskId})
    if (taskExists){
        // TODO: when project level access is established, write code to 
        // verify whether the user requesting subtasks is in 
        // either project collaborators list or owner
        try {
            const subTasks = await SubTaskModel.find({parentTask: taskId}).populate('label')
            res.send(subTasks)
        } catch (error) {
            console.log(`ERROR WHILE FETCHING SUBTASKS: ${error}`)
            res.status(500).json({error: 'Internal server error'})  
        }
    } else {
        next(createHttpError(404, "Task with id: " + taskId + " not found"));
    }
})


router.delete('/:taskId/subtasks/:subtaskId', async(req, res) => {
    const {taskId, subtaskId} = req.params
    const user = JSON.parse(req.cookies.user) 
    const taskExists = await TaskModel.exists({_id: taskId})
    if (taskExists){
        // TODO: when project level access is established, write code to 
        // verify whether the user deleting subtask is in 
        // either project collaborators list or owner
        try {
            await SubTaskModel.deleteOne({_id: subtaskId, parentTask: taskId})
            res.json({message: 'Resource has been successfully deleted!'})
        } catch (error) {
            console.log(`ERROR WHILE DELETING SUBTASK: ${error}`)
            res.status(500).json({error: 'Internal server error'})  
        }
    } else {
        next(createHttpError(404, "Task with id: " + taskId + " not found"));
    }
})


router.put('/:taskId/subtasks/:subtaskId', async(req, res) => {
    const {taskId, subtaskId} = req.params
    const user = JSON.parse(req.cookies.user) 
    const taskExists = await TaskModel.exists({_id: taskId})
    if (taskExists){
        // TODO: when project level access is established, write code to 
        // verify whether the user updating subtask is in 
        // either project collaborators list or owner
        try {
            const subtaskObj = req.body
            const response = await SubTaskModel.updateOne({_id: subtaskId, parentTask: taskId}, {...subtaskObj})
            if(response.acknowledged){
                res.json({message: 'Resource has been successfully updated!'})
            } else {
                res.status(404).json({error: 'Something went wrong! This could be because the resource you accessed might not exist or you don`t have permission to do this operation'})
            }  
        } catch (error) {
            console.log(`ERROR WHILE DELETING SUBTASK: ${error}`)
            res.status(500).json({error: 'Internal server error'})  
        }
    } else {
        next(createHttpError(404, "Task with id: " + taskId + " not found"));
    }
})


export default router