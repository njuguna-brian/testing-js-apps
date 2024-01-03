/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function (knex) {
  await knex.schema.createTable("carts", (table) => {
    table.increments("id").primary();
    table.string("username");
  });

  await knex.schema.createTable("cart_items", (table) => {
    table.integer("cardId").references("carts.id");
    table.string("itemName");
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function (knex) {
  await knex.schema.dropTable("carts");
  await knex.schema.dropTable("cart_items");
};
