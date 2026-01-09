const express = require('express');
const server = express();


const { PORT } = process.env;


server.use(express.json());

const logMiddleware = require('./middlewares/log.middleware');
server.use(logMiddleware());

const router = require("./routes");
server.use('/api', router);




server.listen(PORT, () => {
    console.log(`Express server started on port ${ PORT }`);
})