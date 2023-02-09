const nodemailer = require('nodemailer');
const { google } = require('googleapis');

// These id's and secrets should come from .env file.
const CLIENT_ID = '742488974530-pgn9qislnfn6g3665grfgrps08bmb9c5.apps.googleusercontent.com';
const CLEINT_SECRET = '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';
const REDIRECT_URI = 'https://developers.google.com/oauthplayground';
const REFRESH_TOKEN = '1//04x10GVPikPolCgYIARAAGAQSNwF-L9IrKhP8YVYhptyDdpqV_Fouc4JwlnnwRwkrdA7Km4C7Z48MLydfj_IXZyWER1UPjJI-So0';
const oAuth2Client = new google.auth.OAuth2(
    CLIENT_ID,
    CLEINT_SECRET,
    REDIRECT_URI
);
oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

export async function sendMail(token, email) {
    try {
        const accessToken = await oAuth2Client.getAccessToken();

        const transport = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                type: 'OAuth2',
                user: 'shashankrathore606@gmail.com',
                clientId: CLIENT_ID,
                clientSecret: CLEINT_SECRET,
                refreshToken: REFRESH_TOKEN,
                accessToken: accessToken,
            },
        });

        const mailOptions = {
            from: 'shashank <shashankrathore606@gmail.com>',
            to: email,
            subject: 'Hello from gmail using API',
            text: 'Hello from gmail email using API',
            html: `<h1>Hello,<br><br>Click on given link to reset your password!</h1><br><h1>Link:><a href="http://localhost:${process.env.APP_PORT}/${token}">click here</a></h1>`,
        };

        const result = await transport.sendMail(mailOptions);
        return result;
    } catch (error) {
        return error;
    }
}

// sendMail()
//     .then((result) => console.log('Email sent...', result))
//     .catch((error) => console.log(error.message));