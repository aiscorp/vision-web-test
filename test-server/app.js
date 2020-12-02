const express = require('express')
const config = require('config')
const path = require('path')

// get config
const PORT = config.get('port')


const app = express()
// middleware
app.use(express.json({extended: true}))
app.use('/api/clients', require('./routes/clients.routes'))

// server start
async function start() {
  try {
    //
    app.listen(PORT, () => console.log(`App has been started on port ${PORT}...`))
  } catch (e) {
    console.log('Server Error', e.message)
    process.exit(1)
  }
}

start()
