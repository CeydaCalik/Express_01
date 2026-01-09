const { Request, Response} = require("express")
const nameValidatorMiddleware = () => {
    /**
     * @param {Request} req
     * @param {Response} res
     */

    return (req, res, next) => {
        const name = req.body.name.toLocaleLowerCase();
        let motOffensant = ['trump', 'elon', 'musk'];

        for (let i = 0; i < motOffensant.length; i++) {
            
            if(name.includes(motOffensant[i])){
                res.status(400).json( {statusCode : 400, message : "Vous avez employé un mot offenssant"} )

            }else {
                next();
            }
            
        }  

    }
}

module.exports = nameValidatorMiddleware;