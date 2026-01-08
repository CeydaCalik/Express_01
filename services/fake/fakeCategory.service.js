//Dans le service on se charge de faire les fonctions qui seront ensuite récupéré dans le controller
const { categories } = require("./fakeDb");

const fakeCategoryService = {

    find: () => {
        return categories;
    },

    findById: (id) => {
        return categories.find(category => category.id === id);

    },

    create: (categoryToAdd) => {
        const idMax = Math.max(...categories.map(category => category.id));
        

        categoryToAdd.id = idMax + 1;


        categories.push(categoryToAdd);

        return categoryToAdd;
    },
    
    alreadyExists : (name) => { /*Il vaut mieux faire une fonction à part pour chaque vérif*/
        return categories.some( /*le .some() renvoie un booleen*/
            category => category.name === name);/**on vérifie que dans la catégorie, un des noms soit 
            le même que celui qui est en paramètre*/
    },



}

module.exports = fakeCategoryService;