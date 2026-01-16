const { Request, Response } = require('express')

const fakeTaskService = require("../services/fake/fakeTask.service");

const taskService = require('../mongo/task.service');
const Task = require('../models/task.model');



const taskController = {

    /**
     * 
     * @param { Request } req 
     * @param { Response } res 
     */

    getAll: async (req, res) => {
        try {
            const tasks = await taskService.find();
            const dataToSend = {
                count: tasks.length,
                tasks /*revient à écrire tasks : tasks*/
            };
            res.status(200).json(dataToSend);

        } catch (err) {

            console.log(err);
            res.status(500).json({ statusCode: 500, message: 'Erreur avec la DB' });
        }



    },

    /**
    * 
    * @param { Request } req 
    * @param { Response } res 
    */

    getById: async (req, res) => {
        const id = req.params.id;
        try {

            const task = await taskService.findById(id);

            if (!task) {
                res.status(404).json({
                    statusCode: 404,
                    message: "Tâche non trouvée"
                })
            }

            res.status(200).json(task);

        } catch (err) {
            console.log(err);
            throw new Error(err);
        }
    },

    /**
    * 
    * @param { Request } req 
    * @param { Response } res 
    */

    getByUser: async (req, res) => {

        try {
            const userId = req.params.id; //recup l'id qu'il a dans le lien de la route /:id

            const taskUserTo = await taskService.findByUserTo(userId);
            const taskUserBy = await taskService.findByUserBy(userId);

            const dataToSend = {
                taskUserTo,
                taskUserBy
            };

            res.status(200).json(dataToSend);

        } catch (err) {
            console.log(err);
            res.status(500).json({ statusCode: 500, message: "Erreur dans la DB" });


        }
    },
    /**
    * 
    * @param { Request } req 
    * @param { Response } res 
    */

    insert: async (req, res) => {

        const taskToAdd = req.body;

        try {
            const exists = await taskService.alreadyExists(taskToAdd.name);

            if (exists) {
                res.status(409).json({ statusCode: 409, message: "Cette tâche existe déjà" });
            } else {

                const addedTask = await taskService.create(taskToAdd);

                res.location(`api/task/${addedTask.id}`);
                res.status(201).json(addedTask);
            }


        } catch (err) {
            console.log(err);
            throw new Error(err);

        }


        // res.location(`/api/task/${addedTask.id}`);
        // res.status(201).json(addedTask);
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

    delete: async (req, res) => {

        const id = req.params.id;

        try {
            const count = await Task.countDocuments();
            if(count === 0){
                res.status(409).json({ statusCode : 409, message : 'Il n\'y a plus de tâches dans la db'})
            }
            
            const deletedTask = await taskService.delete(id);
            if (deletedTask) {

                res.sendStatus(204);
            }
            else {
                res.status(404).json({ statusCode: 404, message: 'Suppression impossible la tâche n\' existe pas' });

            }
        } catch (err) {
            res.sendStatus(500);

        }

    }

}



module.exports = taskController;