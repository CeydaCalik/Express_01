const categoryController = require('../controllers/category.controller');
const bodyValidatorMiddleware = require('../middlewares/bodyValidator.middleware');
const { get } = require('./category.router');

const categoryRouter = require('express').Router();


categoryRouter.route('/')
    .get(categoryController.getAll)
    .post(bodyValidatorMiddleware() ,categoryController.insert)

categoryRouter.route('/:id')
    .get(categoryController.getById)
    .put(bodyValidatorMiddleware(), categoryController.update)
    .delete( categoryController.delete)

// categoryRouter.get('/', (req, res) => {
//     res.send({ message : 'Voici toutes les catégories'}, 200);
// })

// categoryRouter.get('/:id', (req, res) => {
//     res.send({ message : `Voici la catégorie dont l\'id est ${req.params.id}`}, 200);
// })

// categoryRouter.post('/', (req, res) => {
//     const categoryToInsert = req.body;
//     res.send(categoryToInsert, 201)

//     //?CODE 201 c'est created
// })


// categoryRouter.put('/:id', (req, res) => {
//     const categoryId = req.params.id;
//     const categoryUpdated = req.body;
//     categoryUpdated.id = categoryId;

//     res.send( categoryUpdated, 200)


//     //? Pour une modification on renvoie que c'est ok
// })

// categoryRouter.delete('/:id', (req, res) => {
//     res.sendStatus(204);
// })

module.exports = categoryRouter;