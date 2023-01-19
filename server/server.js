const express = require('express')
require('dotenv').config()
const app = express(),
  bodyParser = require('body-parser')
port = 3080

// place holder for the data
const users = []

app.use(bodyParser.json())

app.get('/api/users', (req, res) => {
  console.log('api/users called!!!!')
  res.json(users)
})

app.post('/api/user', (req, res) => {
  const user = req.body.user
  console.log('Adding user::::::::', user)
  users.push(user)
  res.json('user addedd')
})

app.get('/', (req, res) => {
  res.send('App Works !!!!')
})

app.listen(port, () => {
  console.log(`Server listening on the port::${port}`)
})

// Initialize the smartsheet client
var client = require('smartsheet')
const smartsheetAccessToken = process.env.SMARTSHEET_API_BEARER_TOKEN
var smartsheet = client.createClient({
  accessToken: smartsheetAccessToken,
  logLevel: 'info',
})

// The `smartsheet` variable is now containing access to all of the APIs

// Set queryParameters for `include` and pagination
var options = {
  queryParameters: {
    include: 'attachments',
    includeAll: true,
  },
}

// List all sheets
smartsheet.sheets
  .listSheets(options)
  .then(function (result) {
    var sheetId = result.data[1].id // Choose the first sheet

    // Load one sheet
    smartsheet.sheets
      .getSheet({ id: sheetId })
      .then((sheetInfo) => {
        console.log(sheetInfo)
      })
      .catch(function (error) {
        console.log('error:', error)
      })
  })
  .catch(function (error) {
    console.log('error:', error)
  })
