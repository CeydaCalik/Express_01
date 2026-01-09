const { tasks } = require("./fakeDb");

const fakeTaskService = {

    find : () => { //getAll
        return tasks;
    },

    findById : (id) => { //getById
        return tasks.find(task => task.id === id);
    },

    findUser : (user) => { //getByUser
        return tasks.filter(task => task.to === user);  
    },

    // findGivenBy : (userName) => {
    //     return tasks.filter(task => task.by === userName):
    // },

    create : (taskToAdd) => { //insert
        const idMax = Math.max( ... tasks.map(task => task.id) );

        taskToAdd.id = idMax + 1;
        taskToAdd.isDone = false;

        tasks.push(taskToAdd);

        return taskToAdd;
    },

    changeStatus : (id, newStatus) => { //updateStatus
        const taskToUpdate = tasks.find(task => task.id === id);
        
        taskToUpdate.isDone = newStatus;

        return taskToUpdate;
    },

    changeTask : (id, task) => { //update
        const taskToUpdate = tasks.find(task => task.id === id);
        taskToUpdate.name = task.name;
        taskToUpdate.category = task.category;
        taskToUpdate.before = task.before;
        taskToUpdate.by = task.by;
        taskToUpdate.to = task.to;

        return taskToUpdate;

    },

    delete : (id) => {
        const index = tasks.findIndex(task => task.id === id);
        
        if(index === -1){
            return false;
        }
        tasks.splice(index, 1);
        return true;
        
    }




    


}

module.exports = fakeTaskService;