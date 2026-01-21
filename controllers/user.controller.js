const { Request, Response } = require('express');

const userService = require('../mongo/user.service');
const User = require('../models/user.model');



const userController = {

    /**
     * @param { Request } req
     * @param { Response } res 
     */

    getAll: async (req, res) => {

        try {
            
            const users = await userService.find();
            const dataToSend = {
                count : users.lenght,
                users
            };
            res.status(200).json(dataToSend);

        } catch (err) {
            console.log(err);
            res.status(500).json({ statusCode: 500, message: 'Erreur avec la DB' });
        }
    }



}

module.exports = userController;