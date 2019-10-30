const { expect } = require('chai')
const { opts, pageOpts, TEST_URL } = require('./helpers/constants')
const { waitForText, acceptCookieIfExists, acknowledgeTosIfExists } = require('./helpers/fn')
const pptr = require('puppeteer')

const templates = [
  'MNI Colin 27',
  'ICBM 2009c Nonlinear Asymmetric'
]

const areasShouldHaveRecptor = [
  'Area 7A (SPL)',
  'Area 3b (PostCG)',
  'Area PFm (IPL)',
  'Area PFop (IPL)',
  'Area PF (IPL)',
  'Area PGp (IPL)',
  'Area PGa (IPL)',
  'Area PFt (IPL)',
  'Area PFcm (IPL)',
  'Area hOc1 (V1, 17, CalcS)',
  'Area 44 (IFG)',
  'Area 45 (IFG)',
  'Area 4p (PreCG)',
  'Area TE 1.0 (HESCHL)',
  'Area FG1 (FusG)',
  'Area FG2 (FusG)'
]

let browser, page
describe('databrowser', () => {
  before(async () => {
    browser = await pptr.launch({
      ...opts,
      headless: false
    })
  })

  after(async () => {
    await browser.close()
  })

  for (const template of templates){
    describe(`in template ${template}`, () => {
      before(async () => {

        page = await browser.newPage()
        await page.setViewport(pageOpts)
        await page.goto(TEST_URL, {waitUntil: 'networkidle2'})
        await acceptCookieIfExists({ page })

        const [ mni27, ...rest ] = await page.$x(`//mat-card-title[contains(.,'${template}')]`)
        
        await mni27.click()
        await page.waitFor(500)
      })

      after(async () => {

        await page.close()
      })
  
      beforeEach(async () => {
        const input = await page.$(`input[placeholder="Search for regions"]`)
        await input.click()
  
        // ctrl + a > backspace
        await page.keyboard.down('ControlLeft')
        await page.keyboard.press('KeyA')
        await page.keyboard.up('ControlLeft')
        await page.keyboard.press('Backspace')
        await page.keyboard.press('Escape')
  
        await page.waitFor(100)
  
        const [databrowser] = await page.$x(`//data-browser`)
        if (!databrowser) return
        while(await databrowser.$(`.fa-trash`)){
          const trash = await databrowser.$(`.fa-trash`)
          await trash.click()
          await page.waitFor(100)
        }
      })
  
      for (const area of areasShouldHaveRecptor){
  
        it(`can display receptor data for area ${area}`, async () => {
          await page.type(`input[placeholder="Search for regions"]`, area )
          await page.waitFor(500)
          
          // should be two, left and right hemisphere
    
          const [hoc1] = await page.$x(`//mat-option[contains(.,'${area}')]`)
          
          const sq = await hoc1.$('.fa-square')
          await sq.click()
          
          await acknowledgeTosIfExists({ page })
  
          const receptors = await page.$x(`//single-dataset-list-view[contains(.,'receptor')]`)
  
          expect(receptors.length).to.be.greaterThan(1)
        })
      }
  
    })
  }
})
