// puppeteer options
exports.opts = {
  headless: false,
  slowMo: 100,
  timeout: 10000,
  args: ['--no-sandbox', '--disable-setuid-sandbox', '--window-size=800,798'],

}

exports.pageOpts = {
  width: 800,
  height: 796,
  deviceScaleFactor: 1
}

exports.TEST_URL = process.env.TEST_URL || 'https://interactive-viewer.apps.hbp.eu'