const {Request, Response} = require('express')
const { tasks } = require("../services/fake/fakeDb")
const fakeTaskService = require("../services/fake/fakeTask.service")

const taskController = {

    /**
     * 
     * @param { Request } req 
     * @param { Response } res 
     */
    
    getAll : (req, res) => {
        const tasks = fakeTaskService.find();

        //version 1
        // res.status(200).json(tasks)
        //res.status(json, 200)

        //version 2
        const dataToSend = {
            count : tasks.length,
            tasks /*revient à écrire tasks : tasks*/
        };
        res.status(200).json(dataToSend);

    },

     /**
     * 
     * @param { Request } req 
     * @param { Response } res 
     */

    getById : (req, res) => {
        const id = parseInt(req.params.id);
        const task = fakeTaskService.findById(id);
        
        if(!task){
            res.status(404).json({
                                statusCode : 404,
                                message : "Tâche non trouvée"} )
        }

        res.status(200).json(task);

    },

     /**
     * 
     * @param { Request } req 
     * @param { Response } res 
     */

    getByUser : (req, res) => {
        res.sendStatus(501)

    },

     /**
     * 
     * @param { Request } req 
     * @param { Response } res 
     */

    insert : (req, res) => {
        res.sendStatus(501)

    },

     /**
     * 
     * @param { Request } req 
     * @param { Response } res 
     */

    update : (req, res) => {
        res.sendStatus(501)
        
    },

     /**
     * 
     * @param { Request } req 
     * @param { Response } res 
     */

    updateStatus : (req, res) => {
        res.sendStatus(501)

    },

     /**
     * 
     * @param { Request } req 
     * @param { Response } res 
     */

    delete : (req, res) => {
        res.sendStatus(501)


    }
    
}





module.exports = taskController;