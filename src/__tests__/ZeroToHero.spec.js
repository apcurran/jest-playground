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

test("mock implementation of a function", () => {
  const mock = jest.fn().mockImplementation(() => "United States");

  expect(mock("Location")).toBe("United States");
  expect(mock).toHaveBeenCalledWith("Location");
});

test("spying using original implementation", () => {
  const pizza = {
    name(n) {
      return `Pizza name: ${n}`;
    }
  };

  const spy = jest.spyOn(pizza, "name");
  expect(pizza.name("Veggies")).toBe("Pizza name: Veggies");
  expect(spy).toHaveBeenCalledWith("Veggies");
});

test("spying using mock implementation", () => {
  const pizza = {
    name(n) {
      return `Pizza name: ${n}`;
    }
  };

  const spy = jest.spyOn(pizza, "name");
  spy.mockImplementation(n => `Crazy pizza!`);

  expect(pizza.name("Veggies")).toBe("Crazy pizza!");
  
  spy.mockRestore();
  expect(pizza.name("Veggies")).toBe("Pizza name: Veggies");
});

test("pizza returns New York last", () => {
  const pizza1 = pizzas[0];
  const pizza2 = pizzas[1];
  const pizza3 = pizzas[2];
  const pizza = jest.fn((currentPizza) => currentPizza.name);

  pizza(pizza1); // Chicago Pizza
  pizza(pizza2); // Neapolitan Pizza
  pizza(pizza3); // New York Pizza

  expect(pizza).toHaveLastReturnedWith("New York Pizza");
});

test("pizza data has New York pizza and matches as an object", () => {
  const newYorkPizza = {
    "id": 3,
    "name": "New York Pizza",
    "image": "/images/ny-pizza.jpg",
    "desc": "New York-style pizza has slices that are large and wide with a thin crust that is foldable yet crispy. It is traditionally topped with tomato sauce and veggies.",
    "price": 8
  };

  expect(pizzas[2]).toMatchObject(newYorkPizza);
});

test("expect a promise to resolve", async () => {
  const user = {
    getFullName: jest.fn(() => Promise.resolve("Ben Franklin"))
  };

  await expect(user.getFullName("Ben Franklin")).resolves.toBe("Ben Franklin");
});

test("expect a promise to reject", async () => {
  const user = {
    getFullName: jest.fn(() => {
      const error = new Error("Something went wrong");

      return Promise.reject(error); 
    })
  };

  await expect(user.getFullName("Ben Franklin")).rejects.toThrow("Something went wrong");
});