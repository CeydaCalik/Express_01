const { Request, Response } = require('express')
const { tasks } = require("../services/fake/fakeDb")
const fakeTaskService = require("../services/fake/fakeTask.service")

const taskController = {

    /**
     * 
     * @param { Request } req 
     * @param { Response } res 
     */

    getAll: (req, res) => {
        const tasks = fakeTaskService.find();

        //version 1
        // res.status(200).json(tasks)
        //res.status(json, 200)

        //version 2
        const dataToSend = {
            count: tasks.length,
            tasks /*revient à écrire tasks : tasks*/
        };
        res.status(200).json(dataToSend);

    },

    /**
    * 
    * @param { Request } req 
    * @param { Response } res 
    */

    getById: (req, res) => {
        const id = parseInt(req.params.id);
        const task = fakeTaskService.findById(id);

        if (!task) {
            res.status(404).json({
                statusCode: 404,
                message: "Tâche non trouvée"
            })
        }

        res.status(200).json(task);

    },

    /**
    * 
    * @param { Request } req 
    * @param { Response } res 
    */

    getByUser: (req, res) => {
        const user = req.params.name; //recup le nom qu'il a dans le lien de la route /:name
        const tasks = fakeTaskService.findUser(user);//interagie avec le service


        res.status(200).json(tasks);//renvoie la réponse obtenue par celui-ci

    },

    /**
    * 
    * @param { Request } req 
    * @param { Response } res 
    */

    insert: (req, res) => {
        const taskToAdd = req.body;
        const addedTask = fakeTaskService.create(taskToAdd);

        res.location(`/api/task/${addedTask.id}`);
        res.status(201).json(addedTask);


    },

    /**
    * 
    * @param { Request } req 
    * @param { Response } res 
    */

    update: (req, res) => {
        const id = +req.params.id;
        const newInfo = req.body;

        const task = fakeTaskService.findById(id);
        if (!task) {
            res.status(404).json({
                statusCode: 404,
                message: "La tâche que vous essayez de modifier n'existe pas"
            });
        }

        const updatedTask = fakeTaskService.changeTask(id, newInfo);
        res.status(200).json(updatedTask);


    },

    /**
    * 
    * @param { Request } req 
    * @param { Response } res 
    */

    updateStatus: (req, res) => {
        const id = +req.params.id; //le "+" transforme en parseInt()
        const newStatus = req.body.isDone;

        const task = fakeTaskService.findById(id);
        if (!task) {
            res.status(404).json({ statusCode: 404, message: "Cette tâche n'existe pas" })
        }

        const taskUpdated = fakeTaskService.changeStatus(id, newStatus);


        res.status(200).json(taskUpdated);


    },

    /**
    * 
    * @param { Request } req 
    * @param { Response } res 
    */

    delete: (req, res) => {
        const id = +req.params.id;

        if (fakeTaskService.delete(id)) {
            res.sendStatus(204);
        }
        else {
            res.status(404).json({ statusCode: 404, message: 'Suppression impossible la tâche n\' existe pas' });




        }

    }


}





module.exports = taskController;