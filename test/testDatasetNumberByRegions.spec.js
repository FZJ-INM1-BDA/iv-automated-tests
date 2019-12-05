const {expect} = require('chai')
const {logError} = require('./helpers/logError')
const _ = require('lodash')
const globalVariables = _.pick(global, ['browser', 'expect'])
require('dotenv').config()


let page



exports.testDatasetNumberByRegions = async function testDatasetNumberByRegions() {

    afterEach(async function () {
        if (this.currentTest.state === 'failed') {
            const screenShot = await page.screenshot()
            await logError({
                test: this.test.parent.title,
                case: this.currentTest.title,
                error: this.currentTest.err.message
            }, screenShot)
        }
        await page.close()
    })

//ToDo will be changed after implementing region menu
    it('Check number of datasets of MNI Colin 27 by selection of 2 regions from map',
        async function () {
            page = await browser.newPage()
            await checkNumberofDatasets(
                templateName = ' MNI Colin 27 ',
                area1Coordinates = [600, 125],
                datasetNumberSelection1 = '4',
                area2Coordinates = [643, 130],
                datasetNumberSelection2 = '7',
                waitAfterPageLoads = 20000,
            )
        }
    )

    it('Check number of datasets of MNI Colin 27 by selection of 2 regions from map2',
        async function () {
            page = await browser.newPage()
            await checkNumberofDatasets(
                templateName = ' MNI Colin 27 ',
                area1Coordinates = [500, 200],
                datasetNumberSelection1 = '7',
                area2Coordinates = [510, 120],
                datasetNumberSelection2 = '9',
                waitAfterPageLoads = 20000,
            )
        }
    )

    it('Check number of datasets of MNI Colin 27 by selection of 2 regions from map3',
        async function () {
            page = await browser.newPage()
            await checkNumberofDatasets(
                templateName = ' MNI Colin 27 ',
                area1Coordinates = [325, 128],
                datasetNumberSelection1 = '5',
                area2Coordinates = [310, 150],
                datasetNumberSelection2 = '8',
                waitAfterPageLoads = 20000,
            )
        }
    )

    it('Check number of datasets of ICBM 2009c Nonlinear Asymmetric (Parcellation JuBrain Cytoarchitectonic Atlas) by selection of 2 regions from map',
        async function () {
            page = await browser.newPage()
            await checkNumberofDatasets(
                templateName = ' ICBM 2009c Nonlinear Asymmetric ',
                area1Coordinates = [320, 200],
                datasetNumberSelection1 = '4',
                area2Coordinates = [330, 125],
                datasetNumberSelection2 = '8',
                waitAfterPageLoads = 20000,
            )
        }
    )

    it('Check number of datasets of ICBM 2009c Nonlinear Asymmetric (Parcellation Fibre Bundle Atlas - Long Bundle) by selection of 2 regions from map',
        async function () {
            page = await browser.newPage()
            await checkNumberofDatasets(
                templateName = ' Fibre Bundle Atlas - Long Bundle ',
                area1Coordinates = [300, 100],
                datasetNumberSelection1 = '2',
                area2Coordinates = [300, 130],
                datasetNumberSelection2 = '3',
                waitAfterPageLoads = 20000,
            )
        }
    )


}

    const checkNumberofDatasets = async (templateName, area1Coordinates, datasetNumberSelection1, area2Coordinates, datasetNumberSelection2, waitAfterPageLoads) => {
        await page.setViewport({width: 800, height: 798, deviceScaleFactor: 1})
        await page.goto(process.env.TEST_URL, {waitUntil: 'networkidle2'})
        await page.waitFor(2000)

        const TemplateXPath = "//*[(text() = '" +  templateName + "' or . = '" + templateName + "')]"
        await page.waitForXPath(TemplateXPath, 5000)
        const [templateDefined] = await page.$x(TemplateXPath)
        if (templateDefined) templateDefined.click()

        await page.waitFor(waitAfterPageLoads)

        await page.mouse.click(area1Coordinates[0], area1Coordinates[1], { clickCount: 1 })
        await page.waitFor(1000)
        await page.mouse.click(area1Coordinates[0], area1Coordinates[1], { clickCount: 2 })
        await page.waitFor(5000)

        const datasetNumberSpan = "//*[@id=\"mat-expansion-panel-header-0\"]/span/mat-panel-title/div/small"
        await page.waitForXPath(datasetNumberSpan, 5000)
        const [datasetNumberSpanElement] = await page.$x(datasetNumberSpan)


        await page.waitFor(1000)
        const datasetNumberSpanElement1 = await page.evaluate(element => element.textContent, datasetNumberSpanElement)
        expect(datasetNumberSpanElement1.trim()).to.equal(datasetNumberSelection1 + ' datasets')

        await page.waitFor(500)
        await page.mouse.click(area2Coordinates[0], area2Coordinates[1], { clickCount: 1 })
        await page.waitFor(1000)
        await page.mouse.click(area2Coordinates[0], area2Coordinates[1], { clickCount: 2 })
        await page.waitFor(5000)

        const [datasetNumberSpanElement2] = await page.$x(datasetNumberSpan)
        const datasetNumberSpanElement21 = await page.evaluate(element => element.textContent, datasetNumberSpanElement2)
        expect(datasetNumberSpanElement21.trim()).to.equal(datasetNumberSelection2 + ' datasets')


    }