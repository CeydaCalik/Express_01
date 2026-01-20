const authService = require("../services/mongo/auth.service");
const jwUtils = require("../utils/jwt.utils");

const authController = {
    register : async (req, res) => {
        
        try {
          const userToAdd = req.body;

          if (await authService.emailAlreadyExist(userToAdd.email)) {
                res.status(409).json({ statusCode : 409, message : "Cet email est déjà utilisé"})
            
          }

          const userCreated = await authService.create(userToAdd);

          res.location(`/api/user/${userCreated.id}`);

          res.status(201).json({ id : userCreated._id, 
                                    firstname : userCreated.firstname,
                                    lastname : userCreated.lastname});
        } catch (err) {
            res.sendStatus(500);
            
        }
    },

    login : async (req, res) => {
        
        try {
            const credentials = req.body;

            const userFound = await authService.findByCredentials(credentials);

            if (!userFound) {
                res.status(401).json({ statusCode : 401, message : "Les informations de connexion ne sont pas bonne"})
                
            } else {

                const token = await jwUtils.generate(userFound)

                res.status(200).json({
                                        id : userFound._id,
                                        firstname : userFound.firstname,
                                        lastname : userFound.lastname,
                                        token
                                    })
            }
        } catch (err) {
            console.log(err);
            throw new Error(err);
            
            
            
        }
    }
}

module.exports = authController;