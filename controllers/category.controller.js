//Dans le controller on va faire l'appel des fonctions et ensuite se charger 
// d'envoyer des erreurs 
const { Request, Response } = require('express');

const fakeCategoryService = require('../services/fake/fakeCategory.service');

const categoryService = require('../mongo/category.service');


const categoryController = {


    /**
     * 
     * @param { Request } req 
     * @param { Response } res 
     */


    getAll: async (req, res) => {

        try {
            const categories = await categoryService.find();

            res.status(200).json(categories);

        }
        catch (err) {

            console.log(err);
            res.status(500).json({ statusCode: 500, message: "Erreur avec la DB" })

        }

        const dataToSend = {
            count: categories.length,
            categories
        };
        res.status(200).json(dataToSend);
    },

    /**
     * 
     * @param { Request } req 
     * @param { Response } res 
     */

    getById: async (req, res) => {
        const id = req.params.id;

        try {
            const category = await categoryService.findById(id);

            if (!category) {
                res.status(404).json({
                    statusCode: 404,
                    message: "Tâche non trouvée"
                })
            }

            res.status(200).json(category);
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

    insert: async (req, res) => {
        const categoryToAdd = req.body;

        try {

            const exists = await categoryService.alreadyExists(categoryToAdd.name);

            if (exists) {
                res.status(409).json({ statusCode: 409, message: 'La catégorie existe déjà' })
            }
            else {
                const addedCategory = await categoryService.create(categoryToAdd);

                res.location(`/api/category/${addedCategory.id}`);
                res.status(201).json(addedCategory);

            }

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

    update: (req, res) => {
        res.sendStatus(501)
    },


    /**
     * 
     * @param { Request } req 
     * @param { Response } res 
     */

    delete: (req, res) => {
        res.sendStatus(501)
    }

}



module.exports = categoryController;