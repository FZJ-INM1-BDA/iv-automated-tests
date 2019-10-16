const fetch = require('node-fetch')
const nodemailer = require('nodemailer')
require('dotenv').config()


const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD
    }
})

const maillist = process.env.TEAM_EMAILS.split(';')

const logError = async (data = {}, screenShot, url = 'http://logger-pmap-service.apps-dev.hbp.eu/ivautomated.testing.error') => {

    sendEmail(data, screenShot)

    const response = await fetch(url, {
        method: 'POST',
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        body: 'json=' + JSON.stringify(data)
    })
    return response
}

const sendEmail = (data, screenShot) => {
    transporter.sendMail({
        from: process.env.EMAIL,
        to: maillist,
        subject: 'Interactive Viewer Automated test error',
        text: 'There is error founded with Automated testing of Interactive Viewer. \n\nTest: ' + data.test + '\nCase: ' + data.case + '\nError: ' + data.error,
        attachments: [{
            filename: 'errorImage.png',
            content: screenShot,
        }]
    }, function(error, info){
        if (error) {
            fetch('http://logger-pmap-service.apps-dev.hbp.eu/ivautomated.testing.email', {
                method: 'POST',
                headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                body: 'json={"error": "Email not send"}'
            })
            console.log('Email not sent')
            console.log(error)
        }
    })
}

module.exports = {logError}
