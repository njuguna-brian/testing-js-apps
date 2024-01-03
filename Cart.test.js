const { db, closeConnection } = require("./dbConnection");
const { createCart, addItem } = require("./Cart.js");

beforeEach(async () => {
  await db("carts").truncate();
  await db("cart_items").truncate();
});
afterAll(async () => await closeConnection());

test("createCart creates a cart for a username", async () => {
  await createCart("test");
  const results = await db.select("username").from("carts");

  expect(results).toEqual([{ username: "test" }]);
});

test("addItems add item to a cart", async () => {
  const username = "test";
  await createCart(username);
  const { id: CartId } = await db.select().from("carts").where({ username });
  await addItem(CartId, "cheesecake");
  results = await db.select("ItemName").from("cart_items");

  expect(results).toEqual([{ CartId, itemName: "cheesecake" }]);
});
