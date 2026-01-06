const taskRouter = require('express').Router();

taskRouter.get('/', (req, res) => {
    res.send({ message : 'Voici toutes nos tasks'}, 200);
})

taskRouter.get('/:id', (req, res) => {
    const id = req.params.id;
    res.send(`Voici la tâche numero ${id}`)
})

taskRouter.get('/user/:id', (req, res) => {
    const user = req.params.id;
    res.send(`Voici l'utilisateur ${user}`)
})


taskRouter.post('/', (req, res) => {
    const taskToInsert = req.body;
    res.send(taskToInsert, 201)

    //?CODE 201 c'est created
})

taskRouter.put('/:id', (req, res) => {
    const taskId = req.params.id;
    const taskUpdated = req.body;
    taskUpdated.id = taskId;

    res.send( taskUpdated, 200)


    //? Pour une modification on renvoie que c'est ok
})

taskRouter.patch('/:id', (req, res) => {
    const id = req.params.id;
    const newStatus = req.body.isDone;
    

    res.send( { id , isDone : newStatus } , 200)
})

taskRouter.delete('/:id', (req, res) => {
    res.sendStatus(204);

    //? Succès et rien à renvoyer
})

module.exports = taskRouter;