const puppeteer = require('puppeteer');
const faker = require('faker');
const devices = require('puppeteer/DeviceDescriptors');
const iPhone = devices['iPhone 6'];


const waitFor = function(timeToWait) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(true);
    }, timeToWait);
  });
};

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
  page.emulate(iPhone);
});

describe('on page load', () => {
  test('h1 loads correctly', async() => {
    await page.waitFor('body div div header h1');
    await waitFor(3000);
    const html = await page.$eval('.App-title', e => e.innerHTML);
    expect(html).toBe('Welcome to React');
  },
  160000000
  );

  test('nav loads correctly', async () => {
    const navbar = await page.$eval('.navbar', el => el ? true : false);
    const listItems = await page.$$('.nav-li');

    expect(navbar).toBe(true);
    expect(listItems.length).toBe(4);
  });
});

describe('login form', () => {
  test('fills out form and submits', async () => {
    await page.setCookie({ name: 'JWT', value: 'kdkdkddf' });
    const firstNameEl = await page.$('[data-testid="firstName"]');
    const lastNameEl = await page.$('[data-testid="lastName"]');
    const emailEl = await page.$('[data-testid="email"]');
    const passwordEl = await page.$('[data-testid="password"]');
    const submitEl = await page.$('[data-testid="submit"]');
    await firstNameEl.tap();
    await page.type('[data-testid="firstName"]', user.firstName);

    await lastNameEl.tap();
    await page.type('[data-testid="lastName"]', user.lastName);

    await emailEl.tap();
    await page.type('[data-testid="email"]', user.email);

    await passwordEl.tap();
    await page.type('[data-testid="password"]', user.password);

    await submitEl.tap();
    await page.waitForSelector('[data-testid="success"]');
  }, 16000000);

  test('sets firstName cookie', async () => {
    const cookies = await page.cookies()
    const firstNameCookie = cookies.find(c => c.name === 'firstName' && c.value === user.firstName)
    expect(firstNameCookie).not.toBeUndefined()
  })
})

afterAll(() => {
  if (isDebugging()) {
    browser.close();
  }
});
