const {expect} = require('chai')
const {logError} = require('./helpers/logError')
const _ = require('lodash')
const globalVariables = _.pick(global, ['browser', 'expect'])


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
    // it('Select BigBrain (Parcellation Auto "Cytoarchitectonic Maps")',
    //     async function() {
    //         page = await browser.newPage()
    //         await checkRegionSelectionByTwoRegion(
    //             buttonTextForParcellation = ' Big Brain (Histology) ',
    //             area1Coordinates = [340, 180],
    //             area1Name = 'Area TE 1.0',
    //             area2Coordinates = [630, 60],
    //             area2Name = 'Area 6d1',
    //             waitAfterPageLoads = 3000
    //         )
    //     }
    // )
    //
    // it('Select BigBrain (Parcellation Grey/White matter)',
    //     async function() {
    //         page = await browser.newPage()
    //         await checkRegionSelectionByTwoRegion(
    //             buttonTextForParcellation = ' Grey/White matter ',
    //             area1Coordinates = [530, 90],
    //             area1Name = 'White matter',
    //             area2Coordinates = [660, 100],
    //             area2Name = 'Grey matter',
    //             waitAfterPageLoads = 4000)
    //     }
    //
    // )
    //
    // it('Select BigBrain (Parcellation BigBrain Cortical Layers Segmentation)',
    //     async function() {
    //         page = await browser.newPage()
    //         await checkRegionSelectionByTwoRegion(
    //             this,
    //             buttonTextForParcellation = ' BigBrain Cortical Layers Segmentation ',
    //             area1Coordinates = [320, 245],
    //             area1Name = 'cortical layer 6',
    //             area2Coordinates = [500, 250],
    //             area2Name = 'cortical layer 1',
    //             waitAfterPageLoads = 3000
    //         )
    //     }
    // )

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
                waitAfterPageLoads = 2000
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
                this,
                buttonTextForParcellation = ' Fibre Bundle Atlas - Long Bundle ',
                area1Coordinates = [300, 210],
                area1Name = 'InferiorFrontoOccipital - Right',
                area2Coordinates = [680, 590],
                area2Name = 'InferiorLongitudinal - Left',
                waitAfterPageLoads = 2000
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
    it('Select Waxholm Space rat brain MRI/DTI (Parcellation Waxholm Space rat brain atlas v3 )',
        async function() {
            page = await browser.newPage()
            await checkRegionSelectionByTwoRegion(
                buttonTextForParcellation = ' Waxholm Space rat brain MRI/DTI ',
                area1Coordinates = [350, 170],
                area1Name = 'neocortex',
                area2Coordinates = [320, 560],
                area2Name = 'corpus callosum and associated subcortical white matter',
                waitAfterPageLoads = 3000)
        }
    )



}


const checkRegionSelectionByTwoRegion = async (buttonTextForParcellation, area1Coordinates, area1Name, area2Coordinates, area2Name, waitAfterPageLoads) => {
    // page = await browser.newPage()
    await page.setViewport({width: 800, height: 798, deviceScaleFactor: 1})
    // ToDo Implemnt {waitUntil: 'networkidle2'} when it will be implemented
    await page.goto('https://interactive-viewer-next.apps-dev.hbp.eu/', {waitUntil: 'networkidle2'})
    await page.waitFor(waitAfterPageLoads)

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
        expect(TextOfHoverTextCheck1.trim()).to.equal(area1Name)
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
        expect(TextOfHoverTextCheck2.trim()).to.equal(area2Name)
    }
}


////////////////// Big Brain //////////////////////
// it('Select BigBrain (Parcellation Auto "Grey/White matter")', async function () {
//     page = await browser.newPage()
//     await page.setViewport({width: 800, height: 798, deviceScaleFactor: 1})
//     // ToDo Implemnt {waitUntil: 'networkidle2'} when it will be implemented
//     await page.goto('https://interactive-viewer-next.apps-dev.hbp.eu/', {waitUntil: 'networkidle2'})
//     await page.waitFor(3000)
//
//     // Choose Big Brain
//     const TemplateXPath = "//*[(text() = ' Big Brain (Histology) ' or . = ' Big Brain (Histology) ')]"
//     await page.waitForXPath(TemplateXPath, 5000)
//     const [templateDefined] = await page.$x(TemplateXPath)
//     if (templateDefined) templateDefined.click()
//
//     await page.waitFor(3000)
//
//     await page.mouse.move(530, 90)
//     await page.waitFor(4000)
//
//     // Cursor should be on White metter
//     // ToDo all regionHoverTextXPath'es need to be united under one For That We need to Give Uniq Class to it in Interactive Viewer
//     const regionHoverTextXPath1 = "//*[(text() = 'White matter' or . = 'White matter')]"
//     await page.waitForXPath(regionHoverTextXPath1, 5000)
//     await page.waitFor(3000)
//     const [hoverTextCheck1] = await page.$x(regionHoverTextXPath1)
//     if (hoverTextCheck1) {
//         await page.waitFor(500)
//         const TextOfHoverTextCheck1 = await page.evaluate(element => element.textContent, hoverTextCheck1)
//         expect(TextOfHoverTextCheck1.trim()).to.equal('White matter')
//     }
//
//     await page.waitFor(500)
//
//     await page.mouse.move(660, 100)
//     await page.waitFor(500)
//
//     // Cursor should be on White metter
//     const regionHoverTextXPath2 = "//*[(text() = 'Grey matter' or . = 'Grey matter')]"
//     await page.waitForXPath(regionHoverTextXPath2, 5000)
//     await page.waitFor(3000)
//     const [hoverTextCheck2] = await page.$x(regionHoverTextXPath2)
//     if (hoverTextCheck2) {
//         await page.waitFor(500)
//         const TextOfHoverTextCheck2 = await page.evaluate(element => element.textContent, hoverTextCheck2)
//         expect(TextOfHoverTextCheck2.trim()).to.equal('Grey matter')
//     }
//
//     // const a = '/html[1]/body[1]/atlas-viewer[@class="ng-tns-c0-0"]/div[@class="atlas-container ng-tns-c0-0 ng-star-inserted"]'
//
// })
// it('Select BigBrain (Parcellation Auto "Grey/White matter")', async function () {
//     page = await browser.newPage()
//     await page.setViewport({width: 800, height: 798, deviceScaleFactor: 1})
//     // ToDo Implemnt {waitUntil: 'networkidle2'} when it will be implemented
//     await page.goto('https://interactive-viewer-next.apps-dev.hbp.eu/', {waitUntil: 'networkidle2'})
//     await page.waitFor(3000)
//
//     // Choose Big Brain Cytoarchitectonic Maps
//     const TemplateXPath = "//*[(text() = ' Cytoarchitectonic Maps ' or . = ' Cytoarchitectonic Maps ')]"
//     await page.waitForXPath(TemplateXPath, 5000)
//     const [templateDefined] = await page.$x(TemplateXPath)
//     if (templateDefined) templateDefined.click()
//
//     await page.waitFor(3000)
//
//     await page.mouse.move(340, 180)
//     await page.waitFor(4000)
//
//     // Cursor should be on White metter
//     // const regionHoverTextXPath1 = "//*[(text() = 'Area TE 1.0 (HESCHL) (interpolated)' or . = 'Area TE 1.0 (HESCHL) (interpolated)')]"
//     const regionHoverTextXPath1 = "//*[text()[contains(.,'Area TE 1.0 (HESCHL)')]]"

//     await page.waitForXPath(regionHoverTextXPath1, 5000)
//     await page.waitFor(3000)
//     const [hoverTextCheck1] = await page.$x(regionHoverTextXPath1)
//     if (hoverTextCheck1) {
//         await page.waitFor(500)
//         const TextOfHoverTextCheck1 = await page.evaluate(element => element.textContent, hoverTextCheck1)
//         expect(TextOfHoverTextCheck1.trim()).to.equal('Area TE 1.0 (HESCHL) (interpolated)')
//     }
//
//     await page.waitFor(500)
//
//     // await page.mouse.move(500, 250)
//     await page.mouse.move(630, 60)
//     await page.waitFor(500)
//
//     // Cursor should be on White metter
//     // const regionHoverTextXPath2 = "//*[(text() = 'Area 6d1 (PreCG) (interpolated)' or . = 'Area 6d1 (PreCG) (interpolated)')]"
//     const regionHoverTextXPath2 = "//*[text()[contains(.,'Area 6d1 (PreCG)')]]"
//     await page.waitForXPath(regionHoverTextXPath2, 5000)
//     await page.waitFor(3000)
//     const [hoverTextCheck2] = await page.$x(regionHoverTextXPath2)
//     if (hoverTextCheck2) {
//         await page.waitFor(500)
//         const TextOfHoverTextCheck2 = await page.evaluate(element => element.textContent, hoverTextCheck2)
//         expect(TextOfHoverTextCheck2.trim()).to.equal('Area 6d1 (PreCG) (interpolated)')
//     }
//
// })


// it('Select BigBrain (Parcellation Auto "BigBrain Cortical Layers Segmentation")', async function () {
//     page = await browser.newPage()
//     await page.setViewport({width: 800, height: 798, deviceScaleFactor: 1})
//     // ToDo Implemnt {waitUntil: 'networkidle2'} when it will be implemented
//     await page.goto('https://interactive-viewer-next.apps-dev.hbp.eu/', {waitUntil: 'networkidle2'})
//     await page.waitFor(3000)
//
//     // Choose Big Brain Cytoarchitectonic Maps
//     const TemplateXPath = "//*[(text() = ' BigBrain Cortical Layers Segmentation ' or . = ' BigBrain Cortical Layers Segmentation ')]"
//     await page.waitForXPath(TemplateXPath, 5000)
//     const [templateDefined] = await page.$x(TemplateXPath)
//     if (templateDefined) templateDefined.click()
//
//     await page.waitFor(3000)
//
//     await page.mouse.move(320, 245)
//     await page.waitFor(4000)
//
//     // Cursor should be on White metter
//     const regionHoverTextXPath1 = "//*[text()[contains(.,'cortical layer 6')]]"
//     await page.waitForXPath(regionHoverTextXPath1, 5000)
//     await page.waitFor(3000)
//     const [hoverTextCheck1] = await page.$x(regionHoverTextXPath1)
//     if (hoverTextCheck1) {
//         await page.waitFor(500)
//         const TextOfHoverTextCheck1 = await page.evaluate(element => element.textContent, hoverTextCheck1)
//         expect(TextOfHoverTextCheck1.trim()).to.equal('cortical layer 6')
//     }
//
//     await page.waitFor(500)
//
//     // await page.mouse.move(500, 250)
//     await page.mouse.move(580, 530)
//     await page.waitFor(500)
//
//     // Cursor should be on White metter
//     const regionHoverTextXPath2 = "//*[text()[contains(.,'cortical layer 1')]]"
//     await page.waitForXPath(regionHoverTextXPath2, 5000)
//     await page.waitFor(3000)
//     const [hoverTextCheck2] = await page.$x(regionHoverTextXPath2)
//     if (hoverTextCheck2) {
//         await page.waitFor(500)
//         const TextOfHoverTextCheck2 = await page.evaluate(element => element.textContent, hoverTextCheck2)
//         expect(TextOfHoverTextCheck2.trim()).to.equal('cortical layer 1')
//     }
//
// })


/////////////////// MNI Colin 27 ///////////////////

// it('Select MNI Colin 27 (Parcellation JuBrain Cytoarchitectonic Atlas)', async function () {
//     page = await browser.newPage()
//     await page.setViewport({width: 800, height: 798, deviceScaleFactor: 1})
//     // ToDo Implemnt {waitUntil: 'networkidle2'} when it will be implemented
//     await page.goto('https://interactive-viewer-next.apps-dev.hbp.eu/', {waitUntil: 'networkidle2'})
//     await page.waitFor(3000)
//
//     // Choose MNI Colin 27 ( JuBrain Cytoarchitectonic Atlas )
//     const TemplateXPath = "//*[(text() = ' MNI Colin 27 ' or . = ' MNI Colin 27 ')]"
//     await page.waitForXPath(TemplateXPath, 5000)
//     const [templateDefined] = await page.$x(TemplateXPath)
//     if (templateDefined) templateDefined.click()
//
//     await page.waitFor(3000)
//
//     await page.mouse.move(550, 150)
//     await page.waitFor(2000)
//
//     // Cursor should be on White metter
//     const regionHoverTextXPath1 = "//*[text()[contains(.,'Area 7M (SPL) - left hemisphere')]]"
//     await page.waitForXPath(regionHoverTextXPath1, 5000)
//     await page.waitFor(1000)
//     const [hoverTextCheck1] = await page.$x(regionHoverTextXPath1)
//     if (hoverTextCheck1) {
//         await page.waitFor(500)
//         const TextOfHoverTextCheck1 = await page.evaluate(element => element.textContent, hoverTextCheck1)
//         expect(TextOfHoverTextCheck1.trim()).to.equal('Area 7M (SPL) - left hemisphere')
//     }
//
//     await page.waitFor(500)
//
//     // await page.mouse.move(500, 250)
//     await page.mouse.move(540, 550)
//     await page.waitFor(500)
//
//     // Cursor should be on White metter
//     const regionHoverTextXPath2 = "//*[text()[contains(.,'Area p32 (pACC) - left hemisphere')]]"
//     await page.waitForXPath(regionHoverTextXPath2, 5000)
//     await page.waitFor(1000)
//     const [hoverTextCheck2] = await page.$x(regionHoverTextXPath2)
//     if (hoverTextCheck2) {
//         await page.waitFor(500)
//         const TextOfHoverTextCheck2 = await page.evaluate(element => element.textContent, hoverTextCheck2)
//         expect(TextOfHoverTextCheck2.trim()).to.equal('Area p32 (pACC) - left hemisphere')
//     }
//
// })



/////////////////// ICBM 2009c Nonlinear Asymmetric ///////////////////

// it('Select ICBM 2009c Nonlinear Asymmetric (Parcellation JuBrain Cytoarchitectonic Atlas)', async function () {
//     page = await browser.newPage()
//     await page.setViewport({width: 800, height: 798, deviceScaleFactor: 1})
//     // ToDo Implemnt {waitUntil: 'networkidle2'} when it will be implemented
//     await page.goto('https://interactive-viewer-next.apps-dev.hbp.eu/', {waitUntil: 'networkidle2'})
//     await page.waitFor(3000)
//
//     // Choose ICBM 2009c Nonlinear Asymmetric ( JuBrain Cytoarchitectonic Atlas )
//     const TemplateXPath = "//*[(text() = ' ICBM 2009c Nonlinear Asymmetric ' or . = ' ICBM 2009c Nonlinear Asymmetric ')]"
//     await page.waitForXPath(TemplateXPath, 5000)
//     const [templateDefined] = await page.$x(TemplateXPath)
//     if (templateDefined) templateDefined.click()
//
//     await page.waitFor(3000)
//
//     await page.mouse.move(550, 270)
//     await page.waitFor(2000)
//
//     // Cursor should be on White metter
//     const regionHoverTextXPath1 = "//*[text()[contains(.,'Fastigial Nucleus (Cerebellum) - right hemisphere')]]"
//     await page.waitForXPath(regionHoverTextXPath1, 5000)
//     await page.waitFor(1000)
//     const [hoverTextCheck1] = await page.$x(regionHoverTextXPath1)
//     if (hoverTextCheck1) {
//         await page.waitFor(500)
//         const TextOfHoverTextCheck1 = await page.evaluate(element => element.textContent, hoverTextCheck1)
//         expect(TextOfHoverTextCheck1.trim()).to.equal('Fastigial Nucleus (Cerebellum) - right hemisphere')
//     }
//
//     await page.waitFor(500)
//
//     // await page.mouse.move(500, 250)
//     await page.mouse.move(600, 490)
//     await page.waitFor(500)
//
//     // Cursor should be on White metter
//     const regionHoverTextXPath2 = "//*[text()[contains(.,'Area 6ma (preSMA, mesial SFG) - left hemisphere')]]"
//     await page.waitForXPath(regionHoverTextXPath2, 5000)
//     await page.waitFor(1000)
//     const [hoverTextCheck2] = await page.$x(regionHoverTextXPath2)
//     if (hoverTextCheck2) {
//         await page.waitFor(500)
//         const TextOfHoverTextCheck2 = await page.evaluate(element => element.textContent, hoverTextCheck2)
//         expect(TextOfHoverTextCheck2.trim()).to.equal('Area 6ma (preSMA, mesial SFG) - left hemisphere')
//     }
//
// })



// it('Select ICBM 2009c Nonlinear Asymmetric (Parcellation Fibre Bundle Atlas - Long Bundle)', async function () {
//     page = await browser.newPage()
//     await page.setViewport({width: 800, height: 798, deviceScaleFactor: 1})
//     // ToDo Implemnt {waitUntil: 'networkidle2'} when it will be implemented
//     await page.goto('https://interactive-viewer-next.apps-dev.hbp.eu/', {waitUntil: 'networkidle2'})
//     await page.waitFor(3000)
//
//     // Choose ICBM 2009c Nonlinear Asymmetric ( JuBrain Cytoarchitectonic Atlas )
//     const TemplateXPath = "//*[(text() = ' Fibre Bundle Atlas - Long Bundle ' or . = ' Fibre Bundle Atlas - Long Bundle ')]"
//     await page.waitForXPath(TemplateXPath, 5000)
//     const [templateDefined] = await page.$x(TemplateXPath)
//     if (templateDefined) templateDefined.click()
//
//     await page.waitFor(3000)
//
//     await page.mouse.move(300, 120)
//     await page.waitFor(2000)
//
//     // Cursor should be on White metter
//     const regionHoverTextXPath1 = "//*[text()[contains(.,'Fastigial Nucleus (Cerebellum) - right hemisphere')]]"
//     await page.waitForXPath(regionHoverTextXPath1, 5000)
//     await page.waitFor(1000)
//     const [hoverTextCheck1] = await page.$x(regionHoverTextXPath1)
//     if (hoverTextCheck1) {
//         await page.waitFor(500)
//         const TextOfHoverTextCheck1 = await page.evaluate(element => element.textContent, hoverTextCheck1)
//         expect(TextOfHoverTextCheck1.trim()).to.equal('Fastigial Nucleus (Cerebellum) - right hemisphere')
//     }
//
//     await page.waitFor(500)
//
//     // await page.mouse.move(500, 250)
//     await page.mouse.move(600, 490)
//     await page.waitFor(500)
//
//     // Cursor should be on White metter
//     const regionHoverTextXPath2 = "//*[text()[contains(.,'Area 6ma (preSMA, mesial SFG) - left hemisphere')]]"
//     await page.waitForXPath(regionHoverTextXPath2, 5000)
//     await page.waitFor(1000)
//     const [hoverTextCheck2] = await page.$x(regionHoverTextXPath2)
//     if (hoverTextCheck2) {
//         await page.waitFor(500)
//         const TextOfHoverTextCheck2 = await page.evaluate(element => element.textContent, hoverTextCheck2)
//         expect(TextOfHoverTextCheck2.trim()).to.equal('Area 6ma (preSMA, mesial SFG) - left hemisphere')
//     }
//
// })
