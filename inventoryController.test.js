const {
  inventory,
  addToInventory,
  getInventory,
} = require("./inventoryController");

beforeEach(() => inventory.clear());

test("returned value", () => {
  const result = addToInventory("cheesecake", 2);
  expect(result).toBe(2);
});

test("inventory contents", () => {
  inventory
    .set("cheesecake", 1)
    .set("macarroon", 3)
    .set("croissant", 3)
    .set("eclaire", 7);
  const result = getInventory();

  expect(result).toEqual({
    cheesecake: 1,
    macarroon: 3,
    croissant: 3,
    eclaire: 7,
    generatedAt: expect.any(Date),
  });
});

test("generatedAt in the past", () => {
  const result = getInventory();
  const currentTime = new Date(Date.now() + 1);
  expect(result.generatedAt).toBeAfter(currentTime);
});
