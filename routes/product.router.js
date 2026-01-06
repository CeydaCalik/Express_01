const productRouter = require('express').Router();

productRouter.get('/', (req, res) => {
    res.send({ message : 'Voici tous nos produits'}, 200);
})

module.exports = productRouter;