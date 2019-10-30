const puppeteer = require('puppeteer')
const { expect } = require('chai')
const _ = require('lodash')
const globalVariables = _.pick(global, ['browser', 'expect'])
const {prepareForTesting} = require('./prepare.spec')
const {selectTAndP} = require('./template-and-parcellation-selections.spec')

const { opts } = require('./helpers/constants')

describe('Interactive Viewer Tests', function() {
    describe('Making ready browsers', prepareForTesting.bind())
    describe('Template and Parcellation Selection', selectTAndP.bind())
    // expose variables
    before (async function () {
        global.expect = expect
        global.browser = await puppeteer.launch(opts)
    })
    // Close page and if filed log + send email with screenshot
    after (function () {
        global.browser.close()
        global.browser = globalVariables.browser
        global.expect = globalVariables.expect
    })
})
