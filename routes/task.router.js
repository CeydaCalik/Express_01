const taskController = require('../controllers/task.controller');
const idValidatorMiddleware = require('../middlewares/idValidator.middleware');
const nameValidatorMiddleware = require('../middlewares/nameValidator.middleware');
const { get } = require('./category.router');

const taskRouter = require('express').Router();


taskRouter.route('/')
    .get(taskController.getAll)
    .post(nameValidatorMiddleware() ,taskController.insert)

taskRouter.route('/:id')
    .get( idValidatorMiddleware()   , taskController.getById)
    .put( idValidatorMiddleware(), nameValidatorMiddleware(),  taskController.update)
    .patch( idValidatorMiddleware() ,  taskController.updateStatus)
    .delete( idValidatorMiddleware() ,  taskController.delete)
    
taskRouter.get('/user/:name', taskController.getByUser)

    
    
    
    //! Ce qu'il reste de l'ancienne structure des routes
    
    
// taskRouter.get('/user/:id', (req, res) => {
//     const user = req.params.id;
//     res.send(`Voici l'utilisateur ${user}`)
// })

// taskRouter.get('/', (req, res) => {
    
// })

// taskRouter.get('/:id', (req, res) => {
    
// })

// taskRouter.post('/', (req, res) => {
    
// })

// taskRouter.put('/:id', (req, res) => {
    
// })

// taskRouter.patch('/:id', (req, res) => {
    
// })

// taskRouter.delete('/:id', (req, res) => {
    
// })

module.exports = taskRouter;