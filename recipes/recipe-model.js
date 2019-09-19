const  db = require('../data/db-config')

module.exports = {
    find,
    findById,
    findSteps,
    add,
    update,
    remove,
    addStep
}

function find(){
    return db('recipe')
}

function findById(id) {
    return db('recipe')
        .where({ id });
}

function findSteps(id) {
    return db('steps')
        .where({ recipe_id: id });
}

function add({ recipe_name }) {
    return db('recipe').insert({ recipe_name });
}

function update({ recipe_name }, id) {
    return db('recipe')
        .where({ id })
        .update({ recipe_name })
}

function remove(id) {
    return db('recipe')
        .where({ id })
        .del()
}
function addStep({ instructions, step_number }, id) {
    return db('steps')
        .insert({ instructions, step_number, recipe_id: id })
}



