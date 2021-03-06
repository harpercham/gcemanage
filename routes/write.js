var express = require('express');
var router = express.Router();
const bodyParser = require('body-parser');
var secured = require('../lib/middleware/secured');

router.use(bodyParser.urlencoded({ extended: true }))
router.use(bodyParser.json())

const fs = require('fs');
const readline = require('readline');
const { google } = require('googleapis');
// If modifying these scopes, delete token.json.
const SCOPES = ['https://www.googleapis.com/auth/spreadsheets'];
// The file token.json stores the user's access and refresh tokens, and is
// created automatically when the authorization flow completes for the first
// time.
const TOKEN_PATH = './routes/token.json';
/**
 * Create an OAuth2 client with the given credentials, and then execute the
 * given callback function.
 * @param {Object} credentials The authorization client credentials.
 * @param {function} callback The callback to call with the authorized client.
 */
function authorize(credentials, callback) {
    const { client_secret, client_id, redirect_uris } = credentials.installed;
    const oAuth2Client = new google.auth.OAuth2(
        client_id, client_secret, redirect_uris[0]);

    // Check if we have previously stored a token.
    fs.readFile(TOKEN_PATH, (err, token) => {
        if (err) return getNewToken(oAuth2Client, callback);
        oAuth2Client.setCredentials(JSON.parse(token));
        callback(oAuth2Client);
    });
}

/**
 * Get and store new token after prompting for user authorization, and then
 * execute the given callback with the authorized OAuth2 client.
 * @param {google.auth.OAuth2} oAuth2Client The OAuth2 client to get token for.
 * @param {getEventsCallback} callback The callback for the authorized client.
 */
function getNewToken(oAuth2Client, callback) {
    const authUrl = oAuth2Client.generateAuthUrl({
        access_type: 'offline',
        scope: SCOPES,
    });
    console.log('Authorize this app by visiting this url:', authUrl);
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });
    rl.question('Enter the code from that page here: ', (code) => {
        rl.close();
        oAuth2Client.getToken(code, (err, token) => {
            if (err) return console.error('Error while trying to retrieve access token', err);
            oAuth2Client.setCredentials(token);
            // Store the token to disk for later program executions
            fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
                if (err) return console.error(err);
                console.log('Token stored to', TOKEN_PATH);
            });
            callback(oAuth2Client);
        });
    });
}

/**
 * Prints the names and majors of students in a sample spreadsheet:
 * @see https://docs.google.com/spreadsheets/d/1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms/edit
 * @param {google.auth.OAuth2} auth The authenticated Google OAuth client.
 */

function listMajors(auth) {
    const sheets = google.sheets({ version: 'v4', auth });
    // get original value from spreadsheet
    sheets.spreadsheets.values.get({
        spreadsheetId: '1HWOemDHYnj3s5QhuvpZ-9p2ODuykSDTlURsn9qXr6WA',
        range: ['Data!A:H'],
    }, (err, res) => {
        if (err) return console.log('The API returned an error: ' + err);
        items = res.data.values;
        //update spreadsheet
        function inputList(p) {
            if (p >= items.length) { return }
            //filter data by tag
            if (items[p][4] == values[0][4]) {
                var dataRange = 'Data!A'.concat((p + 1), ':H', (p + 1));
                sheets.spreadsheets.values.update({
                    spreadsheetId: '1HWOemDHYnj3s5QhuvpZ-9p2ODuykSDTlURsn9qXr6WA',
                    range: [dataRange],
                    valueInputOption: 'raw',
                    resource: { values },
                }, (err, res) => {
                    if (err) return console.log('The API returned an error: ' + err);
                });
            }
            inputList(p + 1)
        }
        inputList(0)
    });
}

//global variable
var values;//data from ajax post
var reslistMajors;//respond from router post

//router post
router.post('/input', secured(), function (req, res) {
    daten = (req.body);
    //json to array
    var jsontoArray = function (obj) {
        var arr = [];
        for (var x in obj) if (obj.hasOwnProperty(x)) {
            arr.push(obj[x]);
        }
        return arr;
    }
    var result = jsontoArray(daten);
    values = [];
    values.push(result)
    reslistMajors = res;
    fs.readFile('./routes/credentials.json', (err, content) => {
        if (err) return console.log('Error loading client secret file:', err);
        // Authorize a client with credentials, then call the Google Sheets API.
        authorize(JSON.parse(content), listMajors);
    });
});



module.exports = router;
