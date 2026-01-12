const { Request, Response} = require("express")
const nameValidatorMiddleware = () => {
    /**
     * @param {Request} req
     * @param {Response} res
     */

    return (req, res, next) => {
        const name = req.body.name.toLocaleLowerCase();
        let motOffensant = ['trump', 'elon', 'musk'];


        if( motOffensant.some(mot => name.includes(mot))) {
            res.status(400).json( {statusCode : 400, message : "Vous avez employé un mot offenssant"}, 400 )

        } else {
            next();
        }

        // for (let i = 0; i < motOffensant.length; i++) {
        //     console.log(motOffensant[i]);
            
        //     if(name.includes(motOffensant[i])){

        //     }else {
        //         next();
        //     }
            
        // }  

    }
}

module.exports = nameValidatorMiddleware;