const argon2 = require("argon2");
const User = require("../../models/user.model");

const authService = {
    
    findByCredentials : async (credentials) => {

        try {
            
            const userFound = await User.findOne( { email : credentials.email});

            if (!userFound) {
                return undefined;
                
            } 
            
            const checkPassword = await argon2.verify( userFound.password, credentials.password);

            if(!checkPassword){
                return undefined;
            } else{
                return userFound;
            }

        } catch (err) {
            console.log(err);
            throw new Error(err);
            
            
            
        }
        
    },

    emailAlreadyExist : async (email) => {
        try {
           const userFound = await User.findOne( { email });
            if (userFound) {
                    return true;
            } else {
                return false;
            }
        } catch (err) {
            console.log(err);
            throw new Error(err);
            
            
        }
    }, 

    create : async (user) => {
        try {
           const hashedPassword = await argon2.hash(user.password);

           user.password = hashedPassword;

           const userToCreate = User(user);
           await userToCreate.save();

           return userToCreate;
           
        } catch (err) {
            console.log(err);
            throw new Error(err);
            
            
            
        }
    }
}

module.exports = authService;