const Workout = require('../models/workout')
const mongoose = require('mongoose')
//GET all workouts
const getAllworkouts = async(req,res)=>{
    const workouts = await Workout.find({}).sort({createdAt:-1})
    res.status(200).json(workouts)
}
//GET a single workout 
const getAworkout = async(req,res)=>{
    const {id}= req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error:'No such workout'})
    }
    const workout = await Workout.findById(id)
    if(!workout){
        return res.status(404).json({error:'NO such workout'})
    }
    res.status(200).json(workout)
}
//CREATE a workout 
const createWorkout = async (req,res)=>{
    //add doc to db
    const {title,load,reps}=req.body
    let emptyFiels=[]
    if(!title){
        emptyFiels.push('title')
    }
    if(!load){
        emptyFiels.push('load')
    }
    if(!reps){
        emptyFiels.push('reps')
    }
    if(emptyFiels.length>0){
         return res.status(400).json({
            error:'PLEASE FILL IN ALL THE INPUTS',emptyFiels
         })
    }
    try{
        const workout = await Workout.create({title,load,reps})
        res.status(200).json(workout)
    }catch(error){
       res.status(400).json({error:error.message})
    }
    
}
//DELETE a workout

const deleteAworkout =async (req,res)=>{
    const {id}= req.params

    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error:"No such workout"})
    }
    const workout = await Workout.findOneAndDelete({_id:id})
    if (!workout){
        return res.status(404).json({error:"No such workout"})
    }
    res.status(200).json(workout)
}
//UPDATE a workout
const updateworkout =async (req,res)=>{
    const {id}= req.params

    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error:"No such workout"})
    }
    const workout = await Workout.findOneAndUpdate({_id:id},{
        ...req.body
    })
    if (!workout){
        return res.status(404).json({error:"No such workout"})
    }
    res.status(200).json(workout)
}

module.exports={
    createWorkout,
    getAllworkouts,
    getAworkout,
    deleteAworkout,
    updateworkout
}