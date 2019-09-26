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
    return db('receipt')
}

function findById(id) {
    return db('receipt')
        .where({ id });
}

function findSteps(id) {
    return db('steps')
        .where({ receipt_id: id });
}

function add({ receipt }) {
    return db('receipt').insert({ receipt });
}

function update({ receipt_name }, id) {
    return db('receipt')
        .where({ id })
        .update({ receipt_name })
}

function remove(id) {
    return db('receipt')
        .where({ id })
        .del()
}
function addStep({ instructions, step_number }, id) {
    return db('steps')
        .insert({ instructions, step_number, receipt_id: id })
}



