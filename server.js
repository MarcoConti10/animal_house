// express setup
const express = require('express')
const app = express()

// routing settings
const gameRouter = require('./routes/game-routes')
const frontRouter = require('./routes/front-routes')
const backRouter = require('./routes/back-routes')

// for parsing requests, otherwise req.body is undefined
// 10mb, otherwise normal limit is 1mb
app.use(express.json({ limit: '10mb' }))

// assets loading
app.use(express.static(__dirname + '/assets/html'))
app.use(express.static(__dirname + '/assets/css'))
app.use(express.static(__dirname + '/assets/scripts'))

// routes loading
app.use(gameRouter)
app.use(frontRouter)
app.use(backRouter)

// show <index.html> at the beginning
app.get('/', (_req, res) => {
    res.sendFile(__dirname + '/index.html')
})

app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000')
})