const mongoose = require("mongoose");

const express = require('express');
const server = express();


const { PORT, DB_CONNECTION } = process.env;


server.use(express.json());

const logMiddleware = require('./middlewares/log.middleware');
server.use(logMiddleware());

server.use( async (req, res, next) => {
    
    try{
        await mongoose.connect(DB_CONNECTION, {dbName : 'TaskManager'});
        console.log("Successfully connected to the DB 🎆");
        next();
        

    }catch(err){
        console.log(`Connection failed \n[Reason]\n ${err} ⚠️`);
        res.status(500).json( {statusCode : 500, message : 'Impossible de se connecter à la base de donnée' });
        
    }
})



const router = require("./routes");
server.use('/api', router);




server.listen(PORT, () => {
    console.log(`Express server started on port ${ PORT }`);
})