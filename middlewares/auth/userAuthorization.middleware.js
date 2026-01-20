const User = require("../../models/user.model");

const userAuthorizationMiddleware = () => {
    return async (req, res, next) => {

        const userRouterId = req.params.id;
        console.log('userRouterId : ' + userRouterId);

        const userId = req.user.id;
        console.log('userId : ' + userId);

        try {
            const tokenUser = await User.findById(userId);

            if (!tokenUser) {
                res.status(404).json({ statusCode: 404, message : 'Vous n\'existez plus dommage'})
                
            } else {

                if (tokenUser.role === 'Admin') {
                    next();
                }else if(userId === userRouterId){
                    next();

                }else {
                    res.status(403).json({ statusCode : 403, message : 'Vous n\'avaez pas les droits pour accéder à ces données'})
                }
            }
            
        } catch (err) {
            res.status(500).json({ statusCode : 500, message : "Une erreur est survenu à la DB"})
            
        }
        
        

    }
}

module.exports = userAuthorizationMiddleware;