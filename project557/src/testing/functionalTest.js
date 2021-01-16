/* eslint-disable*/
const { default: SelectInput } = require("@material-ui/core/Select/SelectInput");
const {Builder, By, Key, until} = require("selenium-webdriver");
require("selenium-webdriver/chrome");
require("chromedriver");
require("geckodriver");
require("isomorphic-fetch"); // this line is very important for corporate with other test.js, without this line, other will raise timeout error

let driver;

beforeAll(async () => {
    driver = await new Builder().forBrowser("chrome").build();
});

afterAll(async() => {
    await driver.quit();
});

test ("test register page", async () => {
    driver.wait(until.urlIs("http://localhost:3000/register"));
    await driver.get("http://localhost:3000/register");
    await driver.findElement(By.id("register_username")).sendKeys("forTest", Key.RETURN);
    await driver.findElement(By.id("register_password")).sendKeys("abc123", Key.RETURN);
    await driver.findElement(By.id("register_confirm")).sendKeys("abc123", Key.RETURN);
    await driver.findElement(By.id("register_button")).click();
    let res = await driver.findElement(By.id("root"), 10000).getText();
    expect(res).not.toBe(null);
});

test ("test login page", async () => {
    driver.wait(until.urlIs("http://localhost:3000/login"));
    await driver.get("http://localhost:3000/login");
    await driver.findElement(By.id("LoginUsername")).sendKeys("forTest", Key.RETURN);
    await driver.findElement(By.id("loginPassword")).sendKeys("abc123", Key.RETURN);
    await driver.findElement(By.id("loginButton")).click();
    let res = await driver.findElement(By.id("root"), 10000).getText();
    expect(res).not.toBe(null);
});

test ("test chat & videocall page", async () => {
    driver.wait(until.urlIs("http://localhost:3000/login"));
    await driver.get("http://localhost:3000/login");
    await driver.findElement(By.id("LoginUsername")).sendKeys("Liam", Key.RETURN);
    await driver.findElement(By.id("loginPassword")).sendKeys("abc123", Key.RETURN);
    await driver.findElement(By.id("loginButton")).click();
    await driver.sleep(2000);
    await driver.findElement(By.id("William")).click();
    await driver.sleep(2000);
    await driver.findElement(By.id("msg")).sendKeys("Testing", Key.RETURN);
    await driver.sleep(2000);
    await driver.findElement(By.id("messagebtn")).click();
    let res = await driver.findElement(By.id("root"), 10000).getText();
    expect(res).not.toBe(null);
    await driver.sleep(2000);
    await driver.findElement(By.id("videocallbtn")).click();
    res = await driver.findElement(By.id("root"), 10000).getText();
    expect(res).not.toBe(null);
}, 200000);
