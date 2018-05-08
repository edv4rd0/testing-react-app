const puppeteer = require('puppeteer');
const faker = require('faker');
const devices = require('puppeteer/DeviceDescriptors');
const iPhone = devices['iPhone 6'];


const user = {
  email: faker.internet.email(),
  password: 'test',
  firstName: faker.name.firstName(),
  lastName: faker.name.lastName()
};

const isDebugging = () => {
  const debugging_mode = {
    headless: false,
    slowMo: 250,
    devtools: true,
  }
  return process.env.NODE_ENV === 'debug' ? debugging_mode : {}
}

let browser;
let page;
beforeAll(async () => {
  browser = await puppeteer.launch(isDebugging());
  page = await browser.newPage();
  await page.goto('http://localhost:3000/');
  page.setViewport({ width: 500, height: 2400 });
});

describe('on page load', () => {
  test('h1 loads correctly', async() => {
    const html = await page.$eval('.App-title', e => e.innerHTML);
    expect(html).toBe('Welcome to React');
  },
  16000
  );

  test('nav loads correctly', async () => {
    const navbar = await page.$eval('.navbar', el => el ? true : false);
    const listItems = await page.$$('.nav-li');

    expect(navbar).toBe(true);
    expect(listItems.length).toBe(4);
  });

  test('login form works correctly', async () => {
    const firstNameEl = await page.$('[data-testid="firstName"]');
    const lastNameEl = await page.$('[data-testid="lastName"]');
    const emailEl = await page.$('[data-testid="email"]');
    const passwordEl = await page.$('[data-testid="password"]');
    const submitEl = await page.$('[data-testid="submit"]');

    await firstNameEl.tap();
    await page.type('[data-testid="lastName"]', user.firstName);

    await lastNameEl.tap();
    await page.type('[data-testid="lastName"]', user.lastName);

    await emailEl.tap();
    await page.type('[data-testid="email"]', user.email);

    await passwordEl.tap();
    await page.type('[data-testid="password"]', user.password);

    await submitEl.tap();
    await page.waitForSelector('[data-testid="success"]');
  }, 160000)
});

afterAll(() => {
  if (isDebugging()) {
    browser.close();
  }
});
