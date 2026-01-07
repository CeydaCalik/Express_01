const { tasks } = require("./fakeDb");

const fakeTaskService = {

    find : () => {
        return tasks;
    },

    findById : (id) => {
        return tasks.find(task => task.id === id);
    }


}

module.exports = fakeTaskService;