// const puppeteer = require('puppeteer-firefox');
// const { expect } = require('chai')
// const _ = require('lodash')
// const {logError} = require('./logError')
//
// let page
// // let expect
// let browser
//
// (async () => {
//
//     const opts = {
//         headless: false,
//         // executablePath:'/home/dgogshelidze/Desktop/Puppeteer/iv-automated-tests/node_modules/puppeteer-firefox/.local-browser/firefox-linux-2f959d575a3d61f5dda12e4e2dca1f46a92ab569/firefox/',
//         args: ['--no-sandbox', '--disable-setuid-sandbox'],
//
//     };
//
//
//     browser = await puppeteer.launch(opts)
//     page = await browser.newPage()
//     await page.goto('https://webglreport.com/?v=1')
//     const screenShot1 = await page.screenshot({path: 'screenshots/webgl1.png'})
//     page = await browser.newPage()
//     await page.goto('https://webglreport.com/?v=2')
//     const screenShot2 = await page.screenshot({path: 'screenshots/webgl2.png'})
//     await browser.close()
//
//
//     //
//     // describe('Check dataset number for selected regions (Firefox)', function () {
//     //
//     //     before (async function () {
//     //         browser = await puppeteer.launch(opts)
//     //     });
//     //
//     //     afterEach(async function() {
//     //         if (this.currentTest.state === 'failed') {
//     //             const screenShot = await page.screenshot({path: 'screenshots/error.png'})
//     //             const callMyFunction = logError({test: this.test.parent.title, case: this.currentTest.title, error: this.currentTest.err.message}, screenShot)
//     //         }
//     //         await page.close()
//     //     })
//     //
//     //
//     //     it('Should return 4 for Area 4a (Firefox)', async function() {
//     //         page = await browser.newPage()
//     //         await page.setViewport({ width: 800, height: 798, deviceScaleFactor: 1})
//     //         // ToDo Implemnt {waitUntil: 'networkidle2'} when it will be implemented
//     //         await page.goto('https://iv-dev-next2.apps-dev.hbp.eu/')
//     //         await page.waitFor(3000)
//     //         // Apply Cache
//     //         await page.waitForXPath('//button[contains(.,\'Ok\')]', 5000)
//     //         const [cacheOkButton] = await page.$x('//button[contains(.,\'Ok\')]')
//     //         if(cacheOkButton) cacheOkButton.click()
//     //         await page.waitFor(500)
//     //
//     //         // Choose Waxholm brain template
//     //         await page.waitForXPath("/html[1]/body[1]/atlas-viewer[@class=\"ng-tns-c0-0\"]/div[@class=\"atlas-container ng-tns-c0-0 ng-star-inserted\"]/ui-nehuba-container[@class=\"ng-tns-c0-0\"]/ui-splashscreen[@class=\"ng-star-inserted\"]/div[@class=\"m-5 d-flex flex-row flex-wrap justify-content-center align-items-stretch pe-none\"]/mat-card[@class=\"m-3 col-md-12 col-lg-6 pe-all mw-400px mat-card mat-ripple ng-star-inserted\"]/mat-card-header[@class=\"mat-card-header\"][count(. | //*[(text() = ' MNI Colin 27 ' or . = ' MNI Colin 27 ')]) = count(//*[(text() = ' MNI Colin 27 ' or . = ' MNI Colin 27 ')])]", 5000)
//     //         const [mniColinDefined] = await page.$x("/html[1]/body[1]/atlas-viewer[@class=\"ng-tns-c0-0\"]/div[@class=\"atlas-container ng-tns-c0-0 ng-star-inserted\"]/ui-nehuba-container[@class=\"ng-tns-c0-0\"]/ui-splashscreen[@class=\"ng-star-inserted\"]/div[@class=\"m-5 d-flex flex-row flex-wrap justify-content-center align-items-stretch pe-none\"]/mat-card[@class=\"m-3 col-md-12 col-lg-6 pe-all mw-400px mat-card mat-ripple ng-star-inserted\"]/mat-card-header[@class=\"mat-card-header\"][count(. | //*[(text() = ' MNI Colin 27 ' or . = ' MNI Colin 27 ')]) = count(//*[(text() = ' MNI Colin 27 ' or . = ' MNI Colin 27 ')])]")
//     //         if(mniColinDefined) mniColinDefined.click()
//     //
//     //         // Select Region
//     //         await page.waitFor(5000)
//     //         await page.mouse.click(205, 130, { clickCount: 2 })
//     //
//     //         await page.waitFor(500)
//     //
//     //         // Move mouse to search icon
//     //         await page.mouse.move(30, 300)
//     //         await page.waitFor(1000)
//     //
//     //         await page.waitForXPath("/html[1]/body[1]/atlas-viewer[@class=\"ng-tns-c0-0\"]/div[@class=\"atlas-container ng-tns-c0-0 ng-star-inserted\"]/div[@class=\"ng-tns-c0-0 ng-star-inserted\"]/menu-icons[@class=\"ng-tns-c0-0\"]/div[@class=\"d-flex align-items-start ng-star-inserted\"]/div[@class=\"position-absolute ng-star-inserted\"]/mat-card[@class=\"p-0 mat-card\"]/search-panel[1]/div[@class=\"search-panel-container\"]/div[3]/div[@class=\"ng-star-inserted\"]/div[@class=\"dataEntry\"]/div[@class=\"ml-2 mr-2 mt-1\"]/i[@class=\"ng-star-inserted\"][count(. | //i[@class = 'ng-star-inserted']) = count(//i[@class = 'ng-star-inserted'])]", 5000)
//     //         const [totalResults] = await page.$x("/html[1]/body[1]/atlas-viewer[@class=\"ng-tns-c0-0\"]/div[@class=\"atlas-container ng-tns-c0-0 ng-star-inserted\"]/div[@class=\"ng-tns-c0-0 ng-star-inserted\"]/menu-icons[@class=\"ng-tns-c0-0\"]/div[@class=\"d-flex align-items-start ng-star-inserted\"]/div[@class=\"position-absolute ng-star-inserted\"]/mat-card[@class=\"p-0 mat-card\"]/search-panel[1]/div[@class=\"search-panel-container\"]/div[3]/div[@class=\"ng-star-inserted\"]/div[@class=\"dataEntry\"]/div[@class=\"ml-2 mr-2 mt-1\"]/i[@class=\"ng-star-inserted\"][count(. | //i[@class = 'ng-star-inserted']) = count(//i[@class = 'ng-star-inserted'])]")
//     //         if(totalResults) {
//     //             const resultText = await page.evaluate(element => element.textContent, totalResults)
//     //             expect(resultText.trim()).to.equal('4 total results.')
//     //         }
//     //     })
//     //
//     //
//     //
//     //     it('Should return 7 for Area 4a and Area PFt (Firefox)', async function() {
//     //         page = await browser.newPage()
//     //         await page.setViewport({ width: 800, height: 798, deviceScaleFactor: 1})
//     //         // ToDo Implemnt {waitUntil: 'networkidle2'} when it will be implemented
//     //         await page.goto('https://iv-dev-next2.apps-dev.hbp.eu/')
//     //         await page.waitFor(3000)
//     //
//     //         // Choose Waxholm brain template
//     //         await page.waitForXPath("/html[1]/body[1]/atlas-viewer[@class=\"ng-tns-c0-0\"]/div[@class=\"atlas-container ng-tns-c0-0 ng-star-inserted\"]/ui-nehuba-container[@class=\"ng-tns-c0-0\"]/ui-splashscreen[@class=\"ng-star-inserted\"]/div[@class=\"m-5 d-flex flex-row flex-wrap justify-content-center align-items-stretch pe-none\"]/mat-card[@class=\"m-3 col-md-12 col-lg-6 pe-all mw-400px mat-card mat-ripple ng-star-inserted\"]/mat-card-header[@class=\"mat-card-header\"][count(. | //*[(text() = ' MNI Colin 27 ' or . = ' MNI Colin 27 ')]) = count(//*[(text() = ' MNI Colin 27 ' or . = ' MNI Colin 27 ')])]", 5000)
//     //         const [mniColinDefined] = await page.$x("/html[1]/body[1]/atlas-viewer[@class=\"ng-tns-c0-0\"]/div[@class=\"atlas-container ng-tns-c0-0 ng-star-inserted\"]/ui-nehuba-container[@class=\"ng-tns-c0-0\"]/ui-splashscreen[@class=\"ng-star-inserted\"]/div[@class=\"m-5 d-flex flex-row flex-wrap justify-content-center align-items-stretch pe-none\"]/mat-card[@class=\"m-3 col-md-12 col-lg-6 pe-all mw-400px mat-card mat-ripple ng-star-inserted\"]/mat-card-header[@class=\"mat-card-header\"][count(. | //*[(text() = ' MNI Colin 27 ' or . = ' MNI Colin 27 ')]) = count(//*[(text() = ' MNI Colin 27 ' or . = ' MNI Colin 27 ')])]")
//     //         if(mniColinDefined) mniColinDefined.click()
//     //
//     //         // Select Region
//     //         await page.waitFor(3000)
//     //         await page.mouse.click(205, 130, { clickCount: 2 })
//     //         await page.waitFor(500)
//     //         await page.mouse.click(140, 150, { clickCount: 2 })
//     //         await page.waitFor(3000)
//     //
//     //         // Move mouse to search icon
//     //         await page.mouse.move(30, 300)
//     //         await page.waitFor(1000)
//     //
//     //         await page.waitForXPath("/html[1]/body[1]/atlas-viewer[@class=\"ng-tns-c0-0\"]/div[@class=\"atlas-container ng-tns-c0-0 ng-star-inserted\"]/div[@class=\"ng-tns-c0-0 ng-star-inserted\"]/menu-icons[@class=\"ng-tns-c0-0\"]/div[@class=\"d-flex align-items-start ng-star-inserted\"]/div[@class=\"position-absolute ng-star-inserted\"]/mat-card[@class=\"p-0 mat-card\"]/search-panel[1]/div[@class=\"search-panel-container\"]/div[3]/div[@class=\"ng-star-inserted\"]/div[@class=\"dataEntry\"]/div[@class=\"ml-2 mr-2 mt-1\"]/i[@class=\"ng-star-inserted\"][count(. | //i[@class = 'ng-star-inserted']) = count(//i[@class = 'ng-star-inserted'])]", 5000)
//     //         const [totalResults] = await page.$x("/html[1]/body[1]/atlas-viewer[@class=\"ng-tns-c0-0\"]/div[@class=\"atlas-container ng-tns-c0-0 ng-star-inserted\"]/div[@class=\"ng-tns-c0-0 ng-star-inserted\"]/menu-icons[@class=\"ng-tns-c0-0\"]/div[@class=\"d-flex align-items-start ng-star-inserted\"]/div[@class=\"position-absolute ng-star-inserted\"]/mat-card[@class=\"p-0 mat-card\"]/search-panel[1]/div[@class=\"search-panel-container\"]/div[3]/div[@class=\"ng-star-inserted\"]/div[@class=\"dataEntry\"]/div[@class=\"ml-2 mr-2 mt-1\"]/i[@class=\"ng-star-inserted\"][count(. | //i[@class = 'ng-star-inserted']) = count(//i[@class = 'ng-star-inserted'])]")
//     //         if(totalResults) {
//     //             const resultText = await page.evaluate(element => element.textContent, totalResults)
//     //             expect(resultText.trim()).to.equal('7 total results.')
//     //         }
//     //     })
//     //
//     //     // close browser and reset global variables
//     //     after (async function () {
//     //         await browser.close()
//     //     })
//     // })
// })();