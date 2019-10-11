const puppeteer = require('puppeteer')
const { expect } = require('chai')
const _ = require('lodash')
const globalVariables = _.pick(global, ['browser', 'expect'])
const {logError} = require('./logError')


let page

// puppeteer options
const opts = {
    headless: true,
    slowMo: 100,
    timeout: 10000,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--window-size=800,798'],

};

// expose variables
before (async function () {
    global.expect = expect
    global.browser = await puppeteer.launch(opts)
});


// Mocha test
describe('Check dataset number for selected regions', function () {

    afterEach(async function() {
        if (this.currentTest.state === 'failed') {
            const screenShot = await page.screenshot();
            const callMyFunction = logError({test: this.test.parent.title, case: this.currentTest.title, error: this.currentTest.err.message}, screenShot)
        }
        await page.close()
    })

    // Mocha Case
    it('Should return 4 for Area 4a', async function() {
        page = await browser.newPage()
        await page.setViewport({ width: 800, height: 798, deviceScaleFactor: 1})
        await page.goto('https://iv-dev-next2.apps-dev.hbp.eu/', {waitUntil: 'networkidle2'})

        // Apply Cache
        await page.waitForXPath('//button[contains(.,\'Ok\')]', 5000)
        const [cacheOkButton] = await page.$x('//button[contains(.,\'Ok\')]')
        if(cacheOkButton) cacheOkButton.click()
        await page.waitFor(500)

        // Choose Waxholm brain template
        await page.waitForXPath("/html[1]/body[1]/atlas-viewer[@class=\"ng-tns-c0-0\"]/div[@class=\"atlas-container ng-tns-c0-0 ng-star-inserted\"]/ui-nehuba-container[@class=\"ng-tns-c0-0\"]/ui-splashscreen[@class=\"ng-star-inserted\"]/div[@class=\"m-5 d-flex flex-row flex-wrap justify-content-center align-items-stretch pe-none\"]/mat-card[@class=\"m-3 col-md-12 col-lg-6 pe-all mw-400px mat-card mat-ripple ng-star-inserted\"]/mat-card-header[@class=\"mat-card-header\"][count(. | //*[(text() = ' MNI Colin 27 ' or . = ' MNI Colin 27 ')]) = count(//*[(text() = ' MNI Colin 27 ' or . = ' MNI Colin 27 ')])]", 5000)
        const [mniColinDefined] = await page.$x("/html[1]/body[1]/atlas-viewer[@class=\"ng-tns-c0-0\"]/div[@class=\"atlas-container ng-tns-c0-0 ng-star-inserted\"]/ui-nehuba-container[@class=\"ng-tns-c0-0\"]/ui-splashscreen[@class=\"ng-star-inserted\"]/div[@class=\"m-5 d-flex flex-row flex-wrap justify-content-center align-items-stretch pe-none\"]/mat-card[@class=\"m-3 col-md-12 col-lg-6 pe-all mw-400px mat-card mat-ripple ng-star-inserted\"]/mat-card-header[@class=\"mat-card-header\"][count(. | //*[(text() = ' MNI Colin 27 ' or . = ' MNI Colin 27 ')]) = count(//*[(text() = ' MNI Colin 27 ' or . = ' MNI Colin 27 ')])]")
        if(mniColinDefined) mniColinDefined.click()

        // Select Region
        await page.waitFor(5000)
        await page.mouse.click(205, 130, { clickCount: 2 })
        await page.waitFor(500)

        // Move mouse to search icon
        await page.mouse.move(30, 300)
        await page.waitFor(1000)

        await page.waitForXPath("/html[1]/body[1]/atlas-viewer[@class=\"ng-tns-c0-0\"]/div[@class=\"atlas-container ng-tns-c0-0 ng-star-inserted\"]/div[@class=\"ng-tns-c0-0 ng-star-inserted\"]/menu-icons[@class=\"ng-tns-c0-0\"]/div[@class=\"d-flex align-items-start ng-star-inserted\"]/div[@class=\"position-absolute ng-star-inserted\"]/mat-card[@class=\"p-0 mat-card\"]/search-panel[1]/div[@class=\"search-panel-container\"]/div[3]/div[@class=\"ng-star-inserted\"]/div[@class=\"dataEntry\"]/div[@class=\"ml-2 mr-2 mt-1\"]/i[@class=\"ng-star-inserted\"][count(. | //i[@class = 'ng-star-inserted']) = count(//i[@class = 'ng-star-inserted'])]", 5000)
        const [totalResults] = await page.$x("/html[1]/body[1]/atlas-viewer[@class=\"ng-tns-c0-0\"]/div[@class=\"atlas-container ng-tns-c0-0 ng-star-inserted\"]/div[@class=\"ng-tns-c0-0 ng-star-inserted\"]/menu-icons[@class=\"ng-tns-c0-0\"]/div[@class=\"d-flex align-items-start ng-star-inserted\"]/div[@class=\"position-absolute ng-star-inserted\"]/mat-card[@class=\"p-0 mat-card\"]/search-panel[1]/div[@class=\"search-panel-container\"]/div[3]/div[@class=\"ng-star-inserted\"]/div[@class=\"dataEntry\"]/div[@class=\"ml-2 mr-2 mt-1\"]/i[@class=\"ng-star-inserted\"][count(. | //i[@class = 'ng-star-inserted']) = count(//i[@class = 'ng-star-inserted'])]")
        if(totalResults) {
            const resultText = await page.evaluate(element => element.textContent, totalResults)
            expect(resultText.trim()).to.equal('4 total results.')
        }
    })


    // Mocha Case
    it('Should return 7 for Area 4a and Area PFt', async function() {
        page = await browser.newPage()
        await page.setViewport({ width: 800, height: 798, deviceScaleFactor: 1})
        await page.goto('https://iv-dev-next2.apps-dev.hbp.eu/', {waitUntil: 'networkidle2'})

        // Choose Waxholm brain template
        await page.waitForXPath("/html[1]/body[1]/atlas-viewer[@class=\"ng-tns-c0-0\"]/div[@class=\"atlas-container ng-tns-c0-0 ng-star-inserted\"]/ui-nehuba-container[@class=\"ng-tns-c0-0\"]/ui-splashscreen[@class=\"ng-star-inserted\"]/div[@class=\"m-5 d-flex flex-row flex-wrap justify-content-center align-items-stretch pe-none\"]/mat-card[@class=\"m-3 col-md-12 col-lg-6 pe-all mw-400px mat-card mat-ripple ng-star-inserted\"]/mat-card-header[@class=\"mat-card-header\"][count(. | //*[(text() = ' MNI Colin 27 ' or . = ' MNI Colin 27 ')]) = count(//*[(text() = ' MNI Colin 27 ' or . = ' MNI Colin 27 ')])]", 5000)
        const [mniColinDefined] = await page.$x("/html[1]/body[1]/atlas-viewer[@class=\"ng-tns-c0-0\"]/div[@class=\"atlas-container ng-tns-c0-0 ng-star-inserted\"]/ui-nehuba-container[@class=\"ng-tns-c0-0\"]/ui-splashscreen[@class=\"ng-star-inserted\"]/div[@class=\"m-5 d-flex flex-row flex-wrap justify-content-center align-items-stretch pe-none\"]/mat-card[@class=\"m-3 col-md-12 col-lg-6 pe-all mw-400px mat-card mat-ripple ng-star-inserted\"]/mat-card-header[@class=\"mat-card-header\"][count(. | //*[(text() = ' MNI Colin 27 ' or . = ' MNI Colin 27 ')]) = count(//*[(text() = ' MNI Colin 27 ' or . = ' MNI Colin 27 ')])]")
        if(mniColinDefined) mniColinDefined.click()

        // Select Region
        await page.waitFor(3000)
        await page.mouse.click(205, 130, { clickCount: 2 })
        await page.waitFor(500)
        await page.mouse.click(140, 150, { clickCount: 2 })
        await page.waitFor(3000)

        // Move mouse to search icon
        await page.mouse.move(30, 300)
        await page.waitFor(1000)

        await page.waitForXPath("/html[1]/body[1]/atlas-viewer[@class=\"ng-tns-c0-0\"]/div[@class=\"atlas-container ng-tns-c0-0 ng-star-inserted\"]/div[@class=\"ng-tns-c0-0 ng-star-inserted\"]/menu-icons[@class=\"ng-tns-c0-0\"]/div[@class=\"d-flex align-items-start ng-star-inserted\"]/div[@class=\"position-absolute ng-star-inserted\"]/mat-card[@class=\"p-0 mat-card\"]/search-panel[1]/div[@class=\"search-panel-container\"]/div[3]/div[@class=\"ng-star-inserted\"]/div[@class=\"dataEntry\"]/div[@class=\"ml-2 mr-2 mt-1\"]/i[@class=\"ng-star-inserted\"][count(. | //i[@class = 'ng-star-inserted']) = count(//i[@class = 'ng-star-inserted'])]", 5000)
        const [totalResults] = await page.$x("/html[1]/body[1]/atlas-viewer[@class=\"ng-tns-c0-0\"]/div[@class=\"atlas-container ng-tns-c0-0 ng-star-inserted\"]/div[@class=\"ng-tns-c0-0 ng-star-inserted\"]/menu-icons[@class=\"ng-tns-c0-0\"]/div[@class=\"d-flex align-items-start ng-star-inserted\"]/div[@class=\"position-absolute ng-star-inserted\"]/mat-card[@class=\"p-0 mat-card\"]/search-panel[1]/div[@class=\"search-panel-container\"]/div[3]/div[@class=\"ng-star-inserted\"]/div[@class=\"dataEntry\"]/div[@class=\"ml-2 mr-2 mt-1\"]/i[@class=\"ng-star-inserted\"][count(. | //i[@class = 'ng-star-inserted']) = count(//i[@class = 'ng-star-inserted'])]")
        if(totalResults) {
            const resultText = await page.evaluate(element => element.textContent, totalResults)
            //ToDo - 6 is for showcase - should be 7
            expect(resultText.trim()).to.equal('7 total results.')
        }
    })
})



// close browser and reset global variables
after (function () {
    browser.close()
    global.browser = globalVariables.browser
    global.expect = globalVariables.expect
})
