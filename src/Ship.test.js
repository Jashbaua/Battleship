import Ship from "./Ship";

test("Ship sinking", () => {
  let ship = new Ship(3);
  ship.hit();
  ship.hit();
  ship.hit();
  expect(ship.isSunk()).toBe(true);
});

test("Ship not sinking", () => {
    let ship = new Ship(4);
    ship.hit();
    ship.hit();
    expect(ship.isSunk()).toBe(false);
  });
