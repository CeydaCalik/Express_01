const User = require("../models/user.model");

const userService  = {

    find : async () => {
        try {
            
            const users = await User.find();
            return users;

        } catch (err) {
            console.log(err);
            throw new Error(err);
            
            
            
        }
    }

}

module.exports = userService;