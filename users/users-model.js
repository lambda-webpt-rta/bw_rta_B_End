const db = require('../data/db-config');

module.exports = {
  find,
  findById,
  findBy,
  findReceipt,
  add,
  update,
  remove
};

function find() {
  return db('users');
}

// resolves to a single user OR null
function findById(id) {
  return db('users').where({ id }).first();
}

// SELECT r.id, r.contents, u.username FROM Receipt AS r
// JOIN users AS u ON r.user_id = u.id; 
function findReceipt(user_id) {
  return db('receipt as r')
    .join('users as u', 'u.id', 'r.user_id')
    .select('r.id', 'r.contents', 'u.username')
    .where({ user_id });
}
function findBy(filter) {
  console.log(filter);
  return db('users').where(filter);
}

// resolves to newly created user
function add(user) {
  return db('users').insert(user)
  .then(ids => {
    return findById(ids[0]);
  });
}

// resolves to updated user
function update(changes, id) {
  return db('users').where({ id }).update(changes)
  .then(count => {
    return findById(id);
  });
}

// resolves to a count
function remove(id) {
  return db('users').where({ id }).del();
}