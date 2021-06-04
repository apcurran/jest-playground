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

test("mock implementation of a basic function", () => {
  const mock = jest.fn(() => "I am a mock func.");

  expect(mock("Calling my mock function!")).toBe("I am a mock func.");
  expect(mock).toHaveBeenCalledWith("Calling my mock function!");
});

test("mock return value of a function one time", () => {
  const mock = jest.fn();

  mock
    .mockReturnValueOnce("Hello")
    .mockReturnValueOnce("there!");

  mock();
  mock();

  expect(mock).toHaveBeenCalledTimes(2);

  mock("Hello", "there", "Steve");
  expect(mock).toHaveBeenCalledWith("Hello", "there", "Steve");

  mock("Steve");
  expect(mock).toHaveBeenCalledWith("Steve");
});