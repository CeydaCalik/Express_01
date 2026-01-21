

const router = require('express').Router();

router.get('/', (req, res) => {
res.send("Bienvenue sur notre API de gestion de tâches", 200)
});

const productRouter = require('./product.router');
router.use('/products', productRouter);

const taskRouter = require('./task.router');
router.use('/tasks', taskRouter);

const categoryRouter = require('./category.router');
router.use('/categories', categoryRouter);

const authRouter = require('./auth.router');
router.use('/auth', authRouter);

const userRouter = require('./user.router');
router.use('/users', userRouter);

module.exports = router;