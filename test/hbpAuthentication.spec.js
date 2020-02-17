const {expect} = require('chai')
const {logError} = require('./helpers/logError')
const _ = require('lodash')
const globalVariables = _.pick(global, ['browser', 'expect'])
require('dotenv').config()
let page

exports.hbpAuthentication = async function hbpAuthentication() {
    afterEach(async function () {
        if (this.currentTest.state === 'failed') {
            const screenShot = await page.screenshot()
            await logError({
                test: this.test.parent.title,
                case: this.currentTest.title,
                error: this.currentTest.err.message
            }, screenShot)
        }
    })

    it('Log in with HBP Authentication',
        async function () {
            page = await browser.newPage()
            await page.setViewport({width: 800, height: 798, deviceScaleFactor: 1})
            await page.goto(process.env.TEST_URL, {waitUntil: 'networkidle2'})
            await page.waitFor(1000)

            const loginButton = "/html/body/atlas-viewer/div/div[2]/signin-banner/div/div[2]/button"
            await page.waitForXPath(loginButton, 1000)
            const [loginButtonObj] = await page.$x(loginButton)
            if (loginButtonObj) loginButtonObj.click()

            await page.waitFor(1000)

            const hbpLoginButton = "//*[(text() = ' HBP OIDC ')]"
            await page.waitForXPath(hbpLoginButton, 2000)
            const [hbpLoginButtonObj] = await page.$x(hbpLoginButton)
            if (hbpLoginButtonObj) hbpLoginButtonObj.click()

            await page.waitFor(1000)

            await page.waitForSelector('#j_username')
            await page.waitForSelector('#j_password')

            await page.waitFor(1000)
        }
    )
}
