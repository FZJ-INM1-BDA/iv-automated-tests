const waitForText = async ({ page, text, options }) => {
  return await page.waitForXPath(`//*[(text() = '${text}' or . = '${text}')]`, options)
}

const acceptCookieIfExists = async ({ page }) => {
  await page.waitFor(200)
  try{
    const cookie = await waitForText({
      page,
      text: 'Cookie Disclaimer',
      options: {
        timeout: 500
      }
    })
  
    if (cookie) {
      const [ok] = await page.$x('//button[contains(.,\'Ok\')]')
      await ok.click()
    }
  }catch (e){
    // no cookie, no biggie
  }
}

const acknowledgeTosIfExists = async ({ page }) => {
  await page.waitFor(200)
  try {
    const exists = await waitForText({ page, text: 'Knowledge Graph ToS', options: { timeout: 500 } })
    if (exists) {
      const [ok] = await page.$x('//button[contains(.,\'Ok\')]')
      await ok.click()
    }
  }catch(e){
    // can't find kg tos, no big deal
  }
}

module.exports = {
  waitForText,
  acceptCookieIfExists,
  acknowledgeTosIfExists
}