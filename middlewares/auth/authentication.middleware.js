const { Request } = require('express');
const jwUtils = require('../../utils/jwt.utils');

const authenticationMiddleware = () => {

    /**
     * @param {Request} req
     * 
     */

    return async(req, res, next) => {

        const authorization = req.headers.authorization;
        
        if (!authorization) {
            res.status(401).json({ statusCode : 401, message : "Vous devez être connecté"});
            
        }

        const token = authorization.split(' ')[1];
        if (!token) {
            res.status(401).json({ statusCode : 401, message : "Vous devez être connecté"});
            
            
        }
        
        try {
            
            const playload = await jwUtils.decode(token);
            req.user = playload;
            next();
        } catch (err) {
            console.log(err);
            
            res.status(401).json( {statusCode : 401, message : "Vou sdeez être connecteé"});
            
            
        }


        
    }
}

module.exports = authenticationMiddleware;