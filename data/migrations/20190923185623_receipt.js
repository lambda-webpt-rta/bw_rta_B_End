
exports.up = function(knex) {
  return knex.schema.createTable("receipt",(table) =>{
      table.increments();
      table.integer('user_id')
      .notNullable()
      .references('id')
      .inTable('users')
      .index()
      .onDelete('CASCADE');
      table.timestamp('receipt_date').defaultTo(knex.fn.now());
      table.string('amount',255)
      .notNullable();
      table.text('receipt_url');
    
  })
  
};

exports.down = function(knex) {
  return knex.schema.dropTable("receipt");
};
