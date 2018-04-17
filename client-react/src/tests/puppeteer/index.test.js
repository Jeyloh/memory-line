const puppeteer = require('puppeteer');

const isDebugging = () => {
    const debugging_mode = {
        headless: false,
        slowMo: 250,
        devtools: true
    }
    return debugging_mode
}

describe('on page load', () => {
    test('Header text loads correctly', async () => {
        let browser = await puppeteer.launch({isDebugging()})
        let page = await browser.newPage();
    })
})