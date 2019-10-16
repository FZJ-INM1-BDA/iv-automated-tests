const {logError} = require('./helpers/logError')
require('dotenv').config()

let page


exports.prepareForTesting = function() {
    afterEach(async function() {
        if (this.currentTest.state === 'failed') {
            const screenShot = await page.screenshot();
            await logError({test: this.test.parent.title, case: this.currentTest.title, error: this.currentTest.err.message}, screenShot)
        }
        await page.close()
    })


    it('Agreement of cache', async function() {
        page = await browser.newPage()
        await page.setViewport({ width: 800, height: 798, deviceScaleFactor: 1})
        await page.goto(process.env.TEST_URL, {waitUntil: 'networkidle2'})

        // Apply Cache
        await page.waitForXPath('//button[contains(.,\'Ok\')]', 5000)
        const [cacheOkButton] = await page.$x('//button[contains(.,\'Ok\')]')
        if(cacheOkButton) cacheOkButton.click()

        await page.waitFor(1000)
    })


    it('agreement of using Datasets', async function() {
        page = await browser.newPage()
        await page.setViewport({ width: 800, height: 798, deviceScaleFactor: 1})
        await page.goto(process.env.TEST_URL, {waitUntil: 'networkidle2'})

        // Choose MNI Colin 27
        await page.waitForXPath("/html[1]/body[1]/atlas-viewer[@class=\"ng-tns-c0-0\"]/div[@class=\"atlas-container ng-tns-c0-0 ng-star-inserted\"]/ui-nehuba-container[@class=\"ng-tns-c0-0\"]/ui-splashscreen[@class=\"ng-star-inserted\"]/div[@class=\"m-5 d-flex flex-row flex-wrap justify-content-center align-items-stretch pe-none\"]/mat-card[@class=\"m-3 col-md-12 col-lg-6 pe-all mw-400px mat-card mat-ripple ng-star-inserted\"]/mat-card-header[@class=\"mat-card-header\"][count(. | //*[(text() = ' MNI Colin 27 ' or . = ' MNI Colin 27 ')]) = count(//*[(text() = ' MNI Colin 27 ' or . = ' MNI Colin 27 ')])]", 5000)
        const [mniColinDefined] = await page.$x("/html[1]/body[1]/atlas-viewer[@class=\"ng-tns-c0-0\"]/div[@class=\"atlas-container ng-tns-c0-0 ng-star-inserted\"]/ui-nehuba-container[@class=\"ng-tns-c0-0\"]/ui-splashscreen[@class=\"ng-star-inserted\"]/div[@class=\"m-5 d-flex flex-row flex-wrap justify-content-center align-items-stretch pe-none\"]/mat-card[@class=\"m-3 col-md-12 col-lg-6 pe-all mw-400px mat-card mat-ripple ng-star-inserted\"]/mat-card-header[@class=\"mat-card-header\"][count(. | //*[(text() = ' MNI Colin 27 ' or . = ' MNI Colin 27 ')]) = count(//*[(text() = ' MNI Colin 27 ' or . = ' MNI Colin 27 ')])]")
        if(mniColinDefined) mniColinDefined.click()
        await page.waitFor(500)

        // Open Dataset collapse
        await page.waitForXPath("//*[(text() = ' Explore the current view ' or . = ' Explore the current view ')]", 5000)
        const [collapseDataset] = await page.$x("//*[(text() = ' Explore the current view ' or . = ' Explore the current view ')]")
        if(collapseDataset) collapseDataset.click()
        await page.waitFor(500)

        // Agreement of Dataset use
        await page.waitForXPath("id(\"mat-dialog-0\")/mat-dialog-actions[@class=\"justify-content-end mat-dialog-actions ng-tns-c0-0 ng-star-inserted\"]/button[@class=\"ng-tns-c0-0 mat-raised-button mat-primary cdk-focused cdk-program-focused\"]/span[@class=\"mat-button-wrapper\"][count(. | //*[(text() = ' Ok ' or . = ' Ok ')]) = count(//*[(text() = ' Ok ' or . = ' Ok ')])]", 5000)
        const [agreeDataset] = await page.$x("id(\"mat-dialog-0\")/mat-dialog-actions[@class=\"justify-content-end mat-dialog-actions ng-tns-c0-0 ng-star-inserted\"]/button[@class=\"ng-tns-c0-0 mat-raised-button mat-primary cdk-focused cdk-program-focused\"]/span[@class=\"mat-button-wrapper\"][count(. | //*[(text() = ' Ok ' or . = ' Ok ')]) = count(//*[(text() = ' Ok ' or . = ' Ok ')])]")
        if(agreeDataset) agreeDataset.click()

        await page.waitFor(500)
    })

}
