const Task = require("../models/task.model");


const taskService = {
    find : async () => {
        try {
            const tasks = await Task.find().populate({
                                                        path: 'categoryId',
                                                        select : { id : 1, name : 1, icon : 1}
                                         }).populate({
                                                path : 'fromUserId',
                                                select : { id : 1, firstname : 1, lastname : 1}
                                         }).populate({
                                                path : 'toUserId',
                                                select : { id : 1, firstname : 1, lastname : 1}
                                         });
                                        
            return tasks;
        } 
        catch (err) {
            console.log(err);

            throw new Error(err);
            
            
            
        }
    },

    findById : async (id) => {
        try {
            const searchedTask = await Task.findById(id).populate({
                                                                path: 'categoryId',
                                                                select : { id : 1, name : 1, icon : 1}
                                                        }).populate({
                                                                path : 'fromUserId',
                                                                select : { id : 1, firstname : 1, lastname : 1}
                                                        }).populate({
                                                                path : 'toUserId',
                                                                select : { id : 1, firstname : 1, lastname : 1}
                                                        });
            return searchedTask;
        } catch (err) {
            console.log(err);
            throw new Error(err);
        }

    },

    findByUserTo : async (userId) => {
        try {
            const searchedUserId = await Task.find({ toUserId : userId});
            return searchedUserId;
        
        } catch (err) {
            console.log(err);
            throw new Error(err);
        }

    },

    findByUserBy : async (userId) => {
        try {
            const searchedUserId = await Task.find({ fromUserId : userId});
            return searchedUserId;
        
        } catch (err) {
            console.log(err);
            throw new Error(err);
        }

    },

    create : async (task) => {
        try {
            const taskToAdd = Task(task);

            await taskToAdd.save();

            return taskToAdd;
            
        } catch (err) {
            console.log(err);

            
            
        }

    },
    alreadyExists : () => {},

    delete : async (id) => {

        try {
           
            const deleteTask = await Task.findByIdAndDelete(id);
            return deleteTask;
                
        } catch (err) {
            console.log(err);
            throw new Error(err);
            
        }
    }

}

module.exports = taskService;