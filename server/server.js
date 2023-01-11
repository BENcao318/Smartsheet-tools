const express = require('express')
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

// Initialize the client
var client = require('smartsheet')
var smartsheet = client.createClient({
  accessToken: 'JKlMNOpQ12RStUVwxYZAbcde3F5g6hijklM789',
  logLevel: 'info',
})

// The `smartsheet` variable now contains access to all of the APIs

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
    var sheetId = result.data[0].id // Choose the first sheet

    // Load one sheet
    smartsheet.sheets
      .getSheet({ id: sheetId })
      .then(function (sheetInfo) {
        console.log(sheetInfo)
      })
      .catch(function (error) {
        console.log(error)
      })
  })
  .catch(function (error) {
    console.log(error)
  })
