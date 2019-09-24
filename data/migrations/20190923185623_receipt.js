
exports.up = function(knex) {
  return knex.schema.createTable("receipt",(table) =>{
      table.increments();
      table.timestamp(true,false);

  })
};

exports.down = function(knex) {
  return knex.schema.dropTable("receipt");
};
