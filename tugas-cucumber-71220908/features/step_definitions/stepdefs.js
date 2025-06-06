import { expect } from "chai";
import { Builder, By, until } from "selenium-webdriver";
import { Given, When, Then, Before, After, setDefaultTimeout } from "@cucumber/cucumber";

setDefaultTimeout(30000);

let driver;

// Hooks: new browser session per scenario
Before(async function () {
  driver = await new Builder().forBrowser("chrome").build();
});

After(async function () {
  if (driver) {
    await driver.quit();
  }
});

// --- Langkah ---

// Skenario: Login Sukses
Given("the user is on the login page", async function () {
  await driver.get("https://www.saucedemo.com/");
});

When("the user enters a valid username and password", async function () {
  await driver.findElement(By.id("user-name")).sendKeys("standard_user");
  await driver.findElement(By.id("password")).sendKeys("secret_sauce");
});

When("the user clicks the login button", async function () {
  await driver.findElement(By.id("login-button")).click();
});

Then("the user should see a success message", async function () {
  const message = await driver.wait(until.elementLocated(By.className("title")), 5000).getText();
  expect(message).to.equal("Products");

  const item = await driver.findElement(By.id("item_4_img_link"));
  expect(item).to.exist;
});

// Skenario: Login Gagal
When("the user enters an invalid username and password", async function () {
  await driver.findElement(By.id("user-name")).sendKeys("invalid_user");
  await driver.findElement(By.id("password")).sendKeys("wrong_password");
});

Then("the user should see a failed message", async function () {
  const errorElement = await driver.wait(
    until.elementLocated(By.css("[data-test='error']")),
    5000
  );
  const errorMessage = await errorElement.getText();
  expect(errorMessage).to.include("Username and password do not match");
});

// Skenario: Tambah ke cart
Given("the user is on the item page", async function () {
  await driver.findElement(By.id("user-name")).sendKeys("standard_user");
  await driver.findElement(By.id("password")).sendKeys("secret_sauce");
  await driver.findElement(By.id("login-button")).click();

  await driver.wait(until.elementLocated(By.className("inventory_list")), 5000);
});

When("the user add item to the cart", async function () {
  await driver.findElement(By.id("add-to-cart-sauce-labs-backpack")).click();
});

When("the user in the item list", async function () {
  await driver.findElement(By.className("shopping_cart_link")).click();
});

Then("item should be seen in the item page", async function () {
  const cartItem = await driver.findElement(By.className("cart_item"));
  expect(cartItem).to.exist;
});

// Skenario: Hapus item dari cart
When("the user remove item to the cart", async function () {
  await driver.findElement(By.id("remove-sauce-labs-backpack")).click();
});

Then("item shouldn't be seen in the item page", async function () {
  const items = await driver.findElements(By.className("cart_item"));
  expect(items.length).to.equal(0);
});

// Skenario: Sort item berdasarkan harga
When("the user selects sort by price low to high", async function () {
  const sortDropdown = await driver.findElement(By.className("product_sort_container"));
  await sortDropdown.sendKeys("Price (low to high)");
});

Then("the first item should be the cheapest", async function () {
  const prices = await driver.findElements(By.className("inventory_item_price"));
  const priceValues = [];

  for (const priceElement of prices) {
    const text = await priceElement.getText(); // "$7.99"
    priceValues.push(parseFloat(text.replace("$", "")));
  }

  expect(priceValues[0]).to.be.at.most(priceValues[1]);
});

// Skenario: Melihat detail item
When("the user clicks on an item", async function () {
  await driver.findElement(By.id("item_4_title_link")).click();
});

Then("the user should see the item detail page", async function () {
  const itemName = await driver.findElement(By.className("inventory_details_name")).getText();
  expect(itemName).to.equal("Sauce Labs Backpack");
});

