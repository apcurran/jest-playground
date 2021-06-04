import pizzas from "../data.json";

test("the pizza data is correct", () => {
  expect(pizzas).toMatchSnapshot();
  expect(1).toEqual(1);
  
  expect(pizzas.map((pizza) => pizza.name)).toEqual([
    "Chicago Pizza",
    "Neapolitan Pizza",
    "New York Pizza",
    "Sicilian Pizza"
  ]);
});

pizzas.forEach((pizza, index) => {
  test(`pizza[${index}] should have properties (id, name, image, desc, price)`, () => {
    expect(pizzas[index]).toHaveProperty("id");
    expect(pizzas[index]).toHaveProperty("name");
    expect(pizzas[index]).toHaveProperty("image");
    expect(pizzas[index]).toHaveProperty("desc");
    expect(pizzas[index]).toHaveProperty("price");
  });
});