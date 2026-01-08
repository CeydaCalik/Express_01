const { tasks } = require("./fakeDb");

const fakeTaskService = {

    find : () => {
        return tasks;
    },

    findById : (id) => {
        return tasks.find(task => task.id === id);
    },

    findUser : (user) => {
        return tasks.filter(task => task.to === user);  
    },

    create : (taskToAdd) => {
        const idMax = Math.max( ... tasks.map(task => task.id) );

        taskToAdd.id = idMax + 1;
        taskToAdd.isDone = false;

        tasks.push(taskToAdd);

        return taskToAdd;
    },

    changeStatus : (id, newStatus) => {
        const taskToUpdate = tasks.find(task => task.id === id);
        taskToUpdate.isDone = newStatus;

        return taskToUpdate;
    },

    changeTask : (id, newName, newCategory, newMaster, newSlave, newDate) => {
        const taskToUpdate = tasks.find(task => task.id === id);
        const nameUpdate = tasks.find(task => task.name === newName);
        const categoryUpdate = tasks.find(task => task.category === newCategory);
        const masterUpdate = tasks.find(task => task.by === newMaster);
        const slaveUpdate = tasks.find(task => task.to === newSlave);
        const dateUpdate = tasks.find(task => task.before === newDate);

        return taskToUpdate, nameUpdate, categoryUpdate, masterUpdate, slaveUpdate, dateUpdate;


    },




    


}

module.exports = fakeTaskService;