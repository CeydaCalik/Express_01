//Dans le controller on va faire l'appel des fonctions et ensuite se charger 
// d'envoyer des erreurs 
const {Request, Response} = require('express');

const fakeCategoryService = require('../services/fake/fakeCategory.service');




const categoryController = {


    /**
     * 
     * @param { Request } req 
     * @param { Response } res 
     */


    getAll : (req, res) => {
        const categories = fakeCategoryService.find();
        const dataToSend = {
            count : categories.length,
            categories
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
        const category = fakeCategoryService.findById(id);


        if(!category){
            res.status(404).json({
                                    statusCode : 404,
                                    message : "Tâche non trouvée"} )
        }

        res.status(200).json(category);
    },


    /**
     * 
     * @param { Request } req 
     * @param { Response } res 
     */

    insert : (req, res) => {
        const categoryToAdd = req.body;

        if(fakeCategoryService.alreadyExists(categoryToAdd.name)){
            res.status(409).json({ statusCode : 409, message : 'La catégorie existe déjà' })
        }

        const addedCategory = fakeCategoryService.create(categoryToAdd);

        res.location(`/api/category/${addedCategory.id}`);
        res.status(201).json(addedCategory);
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

    delete : (req, res) => {
        res.sendStatus(501)
    }

}



module.exports = categoryController;