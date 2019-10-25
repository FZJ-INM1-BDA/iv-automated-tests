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

        await page.waitFor(500)
        // Choose MNI Colin 27
        const [ mniColinDefined ] = await page.$x('//mat-card-title[contains(., \'MNI Colin 27\')]')
        if(mniColinDefined) await mniColinDefined.click()
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
