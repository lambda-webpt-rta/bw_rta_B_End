
exports.up = function(knex) {
  return knex.schema.createTable("receipt",(table) =>{
      table.increments();
      table.timestamp(true,false);
      table.string('amount',255);

  })
};

exports.down = function(knex) {
  return knex.schema.dropTable("receipt");
};
