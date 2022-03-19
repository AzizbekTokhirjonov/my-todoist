import express from "express";
import createHttpError from "http-errors";
import { requireAuth } from "../../middleware/authMiddleware.js";
import CommentModel from "./schema.js"
import TaskModel from "../tasks/scheme.js"


const router = express.Router()


// route -> POST /tasks/:taskId/comments
router.post('/:taskId/comments', requireAuth, async (req, res, next) => {
    const {taskId} = req.params
    const user = JSON.parse(req.cookies.user) 
    const taskExists = await TaskModel.exists({_id: taskId})
    if (taskExists){
        // TODO: when project level access is established, write code to 
        // verify whether the user posting the comment is in 
        // either project collaborators list or owner
        try {
            const {comment} = req.body
            const newComment = new CommentModel({comment, author: user, task: taskId})
            const savedComment = await newComment.save()
            res.status(201).send(savedComment)
        } catch (error) {
            console.log(`ERROR WHILE POSTING COMMENT: ${error}`)
            res.status(500).json({error: 'Internal server error'})  
        }
    } else {
        next(createHttpError(404, "Task with id: " + taskId + " not found"));
    }
})

// route -> GET /tasks/:taskId/comments
router.get('/:taskId/comments', requireAuth, async (req, res, next) => {
    const {taskId} = req.params
    const taskExists = await TaskModel.exists({_id: taskId})

    if (taskExists){
        // TODO: when project level access is established, write code to 
        // verify whether the user fetching the comments is in 
        // either project collaborators list or owner
        try {
            const comments = await CommentModel.find({task: taskId}).populate({path : "author"})
            res.status(201).send(comments)
        } catch (error) {
            console.log(`ERROR WHILE FETCHING COMMENTS: ${error}`)
            res.status(500).json({error: 'Internal server error'})  
        }
    } else {
        next(createHttpError(404, "Task with id: " + taskId + " not found"));
    }
})


// route -> POST /tasks/:taskId/comments/:commentId
router.put('/:taskId/comments/:commentId', requireAuth, async (req, res, next) => {
    const {taskId, commentId} = req.params
    const user = JSON.parse(req.cookies.user) 
    const taskExists = await TaskModel.exists({_id: taskId})
    if (taskExists){
        // TODO: when project level access is established, write code to 
        // verify whether the user updating the comment is in 
        // project collaborators list 
        try {
            const {comment} = req.body
            const response = await CommentModel.updateOne({_id: commentId, author: user._id}, { comment: comment })
            if(response.acknowledged){
                res.status(200).json({message: 'Resource has been successfully updated!'})
            } else {
                res.status(404).json({error: 'Something went wrong! This could be because the resource you accessed might not exist or you don`t have permission to do this operation'})
            }    
        } catch (error) {
            console.log(`ERROR WHILE POSTING COMMENT: ${error}`)
            res.status(500).json({error: 'Internal server error'})  
        }
    } else {
        next(createHttpError(404, "Task with id: " + taskId + " not found"));
    }
})



// route -> DELETE /tasks/:taskId/comments/:commentId
router.delete('/:taskId/comments/:commentId', requireAuth, async (req, res, next) => {
    const {taskId, commentId} = req.params
    const user = JSON.parse(req.cookies.user) 
    const taskExists = await TaskModel.exists({_id: taskId})
    if (taskExists){
        // TODO: when project level access is established, write code to 
        // verify whether the user updating the comment is in 
        // project collaborators list 
        try {
            await CommentModel.deleteOne({_id: commentId, author: user._id})
            res.status(204).json({message: 'Resource has been successfully deleted!'})
        } catch (error) {
            console.log(`ERROR WHILE POSTING COMMENT: ${error}`)
            res.status(500).json({error: 'Internal server error'})  
        }
    } else {
        next(createHttpError(404, "Task with id: " + taskId + " not found"));
    }
})





export default router