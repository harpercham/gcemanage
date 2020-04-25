
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

var i = [2];//project no
function listMajors(auth) {
  const sheets = google.sheets({ version: 'v4', auth });

  //get project code
  sheets.spreadsheets.values.get({
    spreadsheetId: '1PCT7qZgOgK4uQo_p_S6LMuafu6MpKcuhdz9NSRzClQI',
    range: ['Data!C:C']
  }, (err, res) => {
    if (err) return console.log('The API returned an error: ' + err);
    PROJECTINFO = res.data.values;
    PROJECTCODE = PROJECTINFO[i];

    //get sheet info
    sheets.spreadsheets.values.get({
      spreadsheetId: '1HWOemDHYnj3s5QhuvpZ-9p2ODuykSDTlURsn9qXr6WA',
      range: ['Data!A:H']
    }, (err, res) => {
      if (err) return console.log('The API returned an error: ' + err);
      SHEETINFO = res.data.values;
      var SHEETLINK = [];
      var SHEETNAME = [];
      var SHEETID = [];
      var TABNUMBER = [];
      var TAG = [];
      var API = [];
      var RANGE = [];
      var TITLE = [];

      //map sheetinfo 
      for (a = 0; a < SHEETINFO.length; a++) {
        for (b = 0; b < SHEETINFO.length; b++) {
          if ((SHEETINFO[b][0] == PROJECTCODE) && (SHEETINFO[b][4] == 'content'.concat(i, '-', a))) {
            SHEETLINK.push(SHEETINFO[b][1]);
            SHEETNAME.push(SHEETINFO[b][2]);
            try {
              spreadsheetId = new RegExp("/spreadsheets/d/([a-zA-Z0-9-_]+)").exec(SHEETINFO[b][1])[1];
              SHEETID.push(spreadsheetId);
            }
            catch (err) {
              SHEETID.push('');
            }
            TABNUMBER.push(SHEETINFO[b][3]);
            TAG.push(SHEETINFO[b][4]);
            API.push(SHEETINFO[b][5]);
            RANGE.push(SHEETINFO[b][6]);
            TITLE.push(SHEETINFO[b][7]);
          }
        }
      }

      //////////////////////////////////////////////////////////////////////GoogleSpreadsheet API//////////////////////////////////////////
      const { GoogleSpreadsheet } = require('google-spreadsheet');
      var content = []; var title = [];
      var content1 = []; var title1 = [];
      var content2 = []; var title2 = [];
      var content3 = []; var title3 = [];
      var content4 = []; var title4 = [];
      var content5 = []; var title5 = [];
      var content6 = []; var title6 = [];
      var content7 = []; var title7 = [];
      var content8 = []; var title8 = [];

      //load data via access API key and spreadsheet key in sheetinfo
      function loadData() {
        var n = SHEETID.length;
        //START/////async api with iteration////START//
        async function tryNextURL(c) {

          //render after finished map data
          if (c >= n) {
            respond.render('project',
              {
                i: i, sheetname: SHEETNAME,
                sheetlink: SHEETLINK,
                content1: content1,
                content2: content2,
                content3: content3,
                content4: content4,
                content5: content5,
                content5: content5,
                content7: content7,
                content8: content8,
                title1: title1,
                title2: title2,
                title3: title3,
                title4: title4,
                title5: title5,
                title6: title6,
                title7: title7,
                title8: title8,
              });
            return;
          }

          // go through URL in sheetinfo to map data  
          if (c < n) {
            title = TITLE[c];
            try {

              // spreadsheet key is the long id in the sheets URL (use GoogleSpreadsheet API)
              var doc = new GoogleSpreadsheet(SHEETID[c]);

              //  use API key -- only for read-only access to public sheets
              doc.useApiKey(API[c]);
              var range = RANGE[c];
              var loadRange = 'a:z';//loaded range 
              await doc.loadInfo(); // load doc
              const sheet = doc.sheetsByIndex[0];
              await sheet.loadCells(loadRange);

              // map data 
              var rowLENGTH = range.match(/\d+/g).map(Number)[1];
              var str = range.replace(/[0-9]/g, '');
              var res = str.split(":");
              var column = res[1];
              var alphabet = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
              var columnLENGTH = alphabet.indexOf(column) + 1;
              k = columnLENGTH - 1;
              j = rowLENGTH - 1;
              var cell = sheet.getCell(j, k);
              content.push(cell.value)
              if (c == 0) { content1.push(content); title1.push(title) };
              if (c == 1) { content2.push(content); title2.push(title) };
              if (c == 2) { content3.push(content); title3.push(title) };
              if (c == 3) { content4.push(content); title4.push(title) };
              if (c == 4) { content5.push(content); title5.push(title) };
              if (c == 5) { content6.push(content); title6.push(title) };
              if (c == 6) { content7.push(content); title7.push(title) };
              if (c == 7) { content8.push(content); title8.push(title) };
              content = []; title = [];
            }
            catch{
              if (c == 0) { content1.push('NAN'); title1.push(title) };
              if (c == 1) { content2.push('NAN'); title2.push(title) };
              if (c == 2) { content3.push('NAN'); title3.push(title) };
              if (c == 3) { content4.push('NAN'); title4.push(title) };
              if (c == 4) { content5.push('NAN'); title5.push(title) };
              if (c == 5) { content6.push('NAN'); title6.push(title) };
              if (c == 6) { content7.push('NAN'); title7.push(title) };
              if (c == 7) { content8.push('NAN'); title8.push(title) };
            }
            tryNextURL(c + 1);
          }
        }
        //END/////async api with iteration////END//

        tryNextURL(0);
      }
      loadData()
    });

  });
}

// Load client secrets from a local file.
var respond;//global res
router.get('/project'.concat(i), secured(), function (req, res, next) {
  respond = res;
  fs.readFile('./routes/credentials.json', (err, content) => {
    if (err) return console.log('Error loading client secret file:', err);
    // Authorize a client with credentials, then call the Google Sheets API.
    authorize(JSON.parse(content), listMajors);
  });
});

module.exports = router;