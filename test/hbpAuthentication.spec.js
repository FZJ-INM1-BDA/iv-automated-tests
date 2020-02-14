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

            const username = process.env.HBP_AUTHENTICATION_USERNAME
            const password = process.env.HBP_AUTHENTICATION_PASSWORD

            await page.evaluate((username, password) => {
                document.getElementById('j_username').value = username
                document.getElementById('j_password').value = password
                document.getElementsByName('submit')[0].click()
            }, username, password)

            await page.waitFor(2000)

            await page.waitForXPath(loginButton, 1000)
            const [loginButtonObj2] = await page.$x(loginButton)
            if (loginButtonObj2) loginButtonObj2.click()

            await page.waitFor(1000)


            const loggedIn = "//*[@id=\"cdk-overlay-1\"]/div/div/mat-card/mat-card-content/signin-modal/div"
            await page.waitForXPath(loggedIn, 1000)
            const [loggedInObj] = await page.$x(loggedIn)

            const loggedInObjText = await page.evaluate(element => element.textContent, loggedInObj)

            await page.waitFor(1000)

            expect(loggedInObjText.trim()).to.equal('Logged in as inm1-bda service account.  Logout')

        }
    )


    it('Log out from Interactive Viewer',
        async function () {

            const logoutButton = "//*[@id=\"cdk-overlay-1\"]/div/div/mat-card/mat-card-content/signin-modal/div/a/button"
            await page.waitForXPath(logoutButton, 1000)
            const [logoutButtonObj] = await page.$x(logoutButton)
            if (logoutButtonObj) logoutButtonObj.click()

            await page.waitFor(2000)

            const loginButton = "/html/body/atlas-viewer/div/div[2]/signin-banner/div/div[2]/button"
            await page.waitForXPath(loginButton, 1000)
            const [loginButtonObj] = await page.$x(loginButton)
            if (loginButtonObj) loginButtonObj.click()

            await page.waitFor(1000)

            const hbpLoginButton = "//*[(text() = ' HBP OIDC ')]"
            await page.waitForXPath(hbpLoginButton, 2000)

            await page.close()
        }
    )
}
