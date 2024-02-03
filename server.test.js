const { app, inventory, carts } = require("./server");
const fetch = require("isomorphic-fetch");

const apiRoot = "http://localhost:3000";

const addItem = (username, item) => {
  return fetch(`${apiRoot}/carts/${username}/items/${item}`, {
    method: "POST",
  });
};
const getItems = (username) => {
  return fetch(`${apiRoot}/carts/${username}/items`, {
    method: "GET",
  });
};
const removeItem = (username, item) => {
  return fetch(`${apiRoot}/carts/${username}/items/${item}`, {
    method: "DELETE",
  });
};

// test("adding items to cart", async () => {
//   const initialResponse = await getItems("lucas");
//   expect(initialResponse.status).toEqual(404);

//   const addItemResponse = await addItem("lucas", "cheesecake");
//   expect(await addItemResponse.json()).toEqual(["cheesecake"]);

//   const finalItemsResponse = await getItems("lucas");
//   expect(await finalItemsResponse.json()).toEqual(["cheesecake"]);
// });

// test("removing items from a cart", async () => {
//   const initialItemsResponse = await getItems("lucas");
//   expect(initialItemsResponse.status).toBe(404);

//   await addItem("lucas", "cheesecake");

//   const removeItemsResponse = await removeItem("lucas", "cheesecake");
//   expect(await removeItemsResponse.json()).toEqual([]);

//   const finalItemsResponse = await getItems("lucas");
//   expect(await finalItemsResponse.json()).toEqual([]);
// });

describe("addItem", () => {
  beforeEach(() => carts.clear());
  beforeEach(() => inventory.set("cheesecake", 1));

  test("correct response", async () => {
    const addItemResponse = await addItem("lucas", "cheesecake");
    expect(addItemResponse.status).toBe(200);
    expect(await addItemResponse.json()).toEqual(["cheesecake"]);
  });

  test("inventory update", async () => {
    await addItem("lucas", "cheesecake");
    expect(inventory.get("cheesecake")).toBe(0);
  });

  test("cart update", async () => {
    await addItem("keith", "cheesecake");
    expect(carts.get("keith")).toEqual(["cheesecake"]);
  });

  test("sold-out items", async () => {
    inventory.set("cheesecake", 0);
    const failedAddItem = await addItem("lucas", "cheesecake");
    expect(failedAddItem.status).toBe(404);
  });
});

afterAll(() => app.close());
