const { db } = require("./dbConnection");

const createCart = (username) => {
  return db("carts").insert({ username });
};

const addItem = (cardId, itemName) => {
  return db("cart_items").insert({ cardId, itemName });
};

module.exports = { createCart, addItem };
