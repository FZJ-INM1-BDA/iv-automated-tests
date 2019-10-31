const {expect} = require('chai')
const {logError} = require('./helpers/logError')
const _ = require('lodash')
const globalVariables = _.pick(global, ['browser', 'expect'])
require('dotenv').config()


let page



exports.selectTAndP = async function selectTAndP() {



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

    //////////////// Big Brain //////////////////////
    // ToDO Cytoarchitectonic Maps First View is Different, After resolving bug we should bring it back
    // ToDo ALso, checkRegionSelectionByTwoRegion Cann't catch Element which has "Area TE 1.0 (HESCHL) (interpolated)" Text and if we catch "Area TE 1.0 (HESCHL)"
    // ToDo And get text from it, Text will "Area TE 1.0 (HESCHL) (interpolated)"
    //  it('Select BigBrain (Parcellation Auto "Cytoarchitectonic Maps")',
    //     async function() {
    //         page = await browser.newPage()
    //         await checkRegionSelectionByTwoRegion(
    //             buttonTextForParcellation = ' Big Brain (Histology) ',
    //             area1Coordinates = [340, 180],
    //             area1Name = 'Area TE 1.0 (HESCHL) (interpolated)',
    //             area2Coordinates = [630, 60],
    //             area2Name = 'Area 6d1 (PreCG)',
    //             waitAfterPageLoads = 3000
    //         )
    //     }
    //  )

    it('Select BigBrain (Parcellation Grey/White matter)',
        async function() {
            page = await browser.newPage()
            await checkRegionSelectionByTwoRegion(
                buttonTextForParcellation = ' Grey/White matter ',
                area1Coordinates = [330, 150],
                area1Name = 'Grey matter',
                area2Coordinates = [650, 100],
                area2Name = 'Grey matter',
                waitAfterPageLoads = 4000
            )
        }
    )

    it('Select BigBrain (Parcellation BigBrain Cortical Layers Segmentation)',
        async function() {
            page = await browser.newPage()
            await checkRegionSelectionByTwoRegion(
                buttonTextForParcellation = ' BigBrain Cortical Layers Segmentation ',
                area1Coordinates = [320, 245],
                area1Name = 'cortical layer 6',
                area2Coordinates = [520, 150],
                area2Name = 'cortical layer 1',
                waitAfterPageLoads = 7000
            )
        }
    )

    /////////////////// MNI Colin 27 ///////////////////
    it('Select MNI Colin 27 (Parcellation JuBrain Cytoarchitectonic Atlas',
        async function() {
            page = await browser.newPage()
            await checkRegionSelectionByTwoRegion(
                buttonTextForParcellation = ' MNI Colin 27 ',
                area1Coordinates = [550, 150],
                area1Name = 'Area 7M (SPL) - left hemisphere',
                area2Coordinates = [540, 550],
                area2Name = 'Area p32 (pACC) - left hemisphere',
                waitAfterPageLoads = 2000,
                area1NameAdditionalComment=' (publicP)',
                area2NameAdditionalComment=' (publicP)'
            )
        }
    )

    /////////////////// ICBM 2009c Nonlinear Asymmetric ///////////////////
    it('Select ICBM 2009c Nonlinear Asymmetric (Parcellation JuBrain Cytoarchitectonic Atlas)',
        async function() {
            page = await browser.newPage()
            await checkRegionSelectionByTwoRegion(
                buttonTextForParcellation = ' ICBM 2009c Nonlinear Asymmetric ',
                area1Coordinates = [550, 270],
                area1Name = 'Fastigial Nucleus (Cerebellum) - right hemisphere',
                area2Coordinates = [600, 490],
                area2Name = 'Area 6ma (preSMA, mesial SFG) - left hemisphere',
                waitAfterPageLoads = 2000
            )
        }
    )

    it('Select ICBM 2009c Nonlinear Asymmetric (Parcellation Fibre Bundle Atlas - Long Bundle)',
        async function() {
            page = await browser.newPage()
            await checkRegionSelectionByTwoRegion(
                buttonTextForParcellation = ' Fibre Bundle Atlas - Long Bundle ',
                area1Coordinates = [300, 210],
                area1Name = 'InferiorFrontoOccipital - Right',
                area2Coordinates = [680, 590],
                area2Name = 'InferiorLongitudinal - Left',
                waitAfterPageLoads = 5000
            )
        }
    )

    it('Select ICBM 2009c Nonlinear Asymmetric (Parcellation Fibre Bundle Atlas - Short Bundle)',
        async function() {
            page = await browser.newPage()
            await checkRegionSelectionByTwoRegion(
                buttonTextForParcellation = ' Fibre Bundle Atlas - Short Bundle ',
                area1Coordinates = [300, 100],
                area1Name = 'rh_SP-SM_0',
                area2Coordinates = [640, 540],
                area2Name = 'lh_PoCi-PrCu_0',
                waitAfterPageLoads = 2000
            )
        }
    )

    /////////////// Waxholm Space rat brain MRI/DTI ///////////////////
    it('Select Waxholm Space rat brain MRI/DTI (Parcellation Auto "Waxholm Space rat brain atlas v3")',
        async function() {
            page = await browser.newPage()
            await checkRegionSelectionByTwoRegion(
                buttonTextForParcellation = ' Waxholm Space rat brain MRI/DTI ',
                area1Coordinates = [350, 170],
                area1Name = 'neocortex',
                area2Coordinates = [320, 560],
                area2Name = 'corpus callosum and associated subcortical white matter',
                waitAfterPageLoads = 10000)
        }
    )

    it('Select Waxholm Space rat brain MRI/DTI (Parcellation Waxholm Space rat brain atlas v2)',
        async function() {
            page = await browser.newPage()
            await checkRegionSelectionByTwoRegion(
                buttonTextForParcellation = ' Waxholm Space rat brain atlas v2 ',
                area1Coordinates = [500, 630],
                area1Name = 'lateral entorhinal cortex',
                area2Coordinates = [300, 200],
                area2Name = 'dentate gyrus',
                waitAfterPageLoads = 15000)
        }
    )

    it('Select Waxholm Space rat brain MRI/DTI (Parcellation Waxholm Space rat brain atlas v1)',
        async function() {
            page = await browser.newPage()
            await checkRegionSelectionByTwoRegion(
                buttonTextForParcellation = ' Waxholm Space rat brain atlas v1 ',
                area1Coordinates = [480, 680],
                area1Name = 'inner ear',
                area2Coordinates = [550, 550],
                area2Name = 'corpus callosum and associated subcortical white matter',
                waitAfterPageLoads = 18000)
        }
    )


    /////////////////  Allen Mouse Common Coordinate Framework v3 2015  //////////////////////
    it('Select Allen Mouse Common Coordinate Framework v3 2015 (Parcellation Allen Mouse Common Coordinate Framework v3 2017)',
        async function() {
            page = await browser.newPage()
            await checkRegionSelectionByTwoRegion(
                buttonTextForParcellation = ' Allen Mouse Common Coordinate Framework v3 2017 ',
                area1Coordinates = [530, 530],
                area1Name = 'Primary somatosensory area, barrel field, layer 4',
                area2Coordinates = [590, 120],
                area2Name = 'Retrosplenial area, ventral part, layer 2/3',
                waitAfterPageLoads = 30000)
        }
    )

    //ToDo Implement after header name will change
    // it('Select Allen Mouse Common Coordinate Framework v3 2015 (Parcellation Allen Mouse Common Coordinate Framework v3 2015 )',
    //     async function() {
    //         page = await browser.newPage()
    //         await checkRegionSelectionByTwoRegion(
    //             buttonTextForParcellation = ' Allen Mouse Common Coordinate Framework v3 2015 ',
    //             area1Coordinates = [520, 530],
    //             area1Name = 'Primary somatosensory area, barrel field, layer 4',
    //             area2Coordinates = [590, 100],
    //             area2Name = 'Retrosplenial area, ventral part, layer 1',
    //             waitAfterPageLoads = 15000)
    //     }
    // )

}


const checkRegionSelectionByTwoRegion = async (buttonTextForParcellation, area1Coordinates, area1Name, area2Coordinates, area2Name, waitAfterPageLoads, area1NameAdditionalComment = '', area2NameAdditionalComment= '') => {
    // page = await browser.newPage()
    await page.setViewport({width: 800, height: 798, deviceScaleFactor: 1})
    // ToDo Implemnt {waitUntil: 'networkidle2'} when it will be implemented
    await page.goto(process.env.TEST_URL, {waitUntil: 'networkidle2'})
    await page.waitFor(2000)

    // Choose ICBM 2009c Nonlinear Asymmetric ( JuBrain Cytoarchitectonic Atlas )
    const TemplateXPath = "//*[(text() = '" +  buttonTextForParcellation + "' or . = '" + buttonTextForParcellation + "')]"
    await page.waitForXPath(TemplateXPath, 5000)
    const [templateDefined] = await page.$x(TemplateXPath)
    if (templateDefined) templateDefined.click()

    await page.waitFor(waitAfterPageLoads)

    await page.mouse.move(area1Coordinates[0], area1Coordinates[1])
    await page.waitFor(2000)

    // Cursor should be on White metter
    const regionHoverTextXPath1 = "//*[text()[contains(.,'" + area1Name + "')]]"
    await page.waitForXPath(regionHoverTextXPath1, 5000)
    await page.waitFor(1000)
    const [hoverTextCheck1] = await page.$x(regionHoverTextXPath1)
    if (hoverTextCheck1) {
        await page.waitFor(500)
        const TextOfHoverTextCheck1 = await page.evaluate(element => element.textContent, hoverTextCheck1)
        expect(TextOfHoverTextCheck1.trim()).to.equal(area1NameAdditionalComment? area1Name + area1NameAdditionalComment : area1Name)
    }

    await page.waitFor(500)

    // await page.mouse.move(500, 250)
    await page.mouse.move(area2Coordinates[0], area2Coordinates[1])
    await page.waitFor(500)

    // Cursor should be on White metter
    const regionHoverTextXPath2 = "//*[text()[contains(.,'" + area2Name + "')]]"
    await page.waitForXPath(regionHoverTextXPath2, 5000)
    await page.waitFor(1000)
    const [hoverTextCheck2] = await page.$x(regionHoverTextXPath2)
    if (hoverTextCheck2) {
        await page.waitFor(500)
        const TextOfHoverTextCheck2 = await page.evaluate(element => element.textContent, hoverTextCheck2)
        expect(TextOfHoverTextCheck2.trim()).to.equal(area2NameAdditionalComment? area2Name + area2NameAdditionalComment : area2Name)
    }
}