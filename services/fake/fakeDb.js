const categories = [
    {
        id : 1,
        name : "Administratif",
        icon : "🗑️"
    },
    {
        id : 2,
        name : "Décin",
        icon : "👩‍🎨"
    }

]

const tasks = [
    {
        id : 1,
        name : "Faire ses impôts",
        before : "2026-06-01",
        by : "Joël",
        to : "Christine",
        category : 1,
        isDone : false
    },
    {
        id : 2,
        name : "Fer une aquarelle de paysage enneigé",
        before : "2026-01-31",
        by : "Aude",
        to : "Aurélien",
        category : 2,
        isDone : false
    }
]


module.exports = { categories, tasks };