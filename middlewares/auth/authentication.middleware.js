const { Request } = require('express')

const authenticationMiddleware = () => {

    /**
     * @param {Request} req
     * 
     */

    return (req, res, next) => {

        const authorization = req.headers.authorization;
        
        if (!authorization) {
            res.status(401).json({ statusCode : 401, message : "Vous devez être connecté"});
            
        }


        const token = authorization.split(' ')[1];
        if (!token) {
            res.status(401).json({ statusCode : 401, message : "Vous devez être connecté"});

        }

        next();


        
    }
}

module.exports = authenticationMiddleware;