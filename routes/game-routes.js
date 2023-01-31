/***************/
/* GAME ROUTES */
/***************/

// setup
const express = require('express')
const path = require('path')
const fs = require('fs')
const fetch = require('node-fetch')
const router = express.Router()

// database loading
const db = JSON.parse(fs.readFileSync("./database/users.json"))
const admins_db = JSON.parse(fs.readFileSync("./database/administrators.json"))
const info_db = JSON.parse(fs.readFileSync("./database/info-legali.json"))
const curiosity_db = JSON.parse(fs.readFileSync("./database/curiosità.json"))

router.get('/get-questions', async (req, res) => {

    const url_api = "https://opentdb.com/api.php?amount=10&category=27&type=boolean"

    // async/await
    let response = await fetch(url_api)
    let data = await response.json()
    // attenzione ai caratteri &quot e altri non codificati perfettamente
    //console.log(data.results[2].question)
    res.send(data)
})

router.get('/curiosità', async (req, res) => {
    // 
})

router.get('/info-legale', async (req, res) => {
    // 
})

module.exports = router