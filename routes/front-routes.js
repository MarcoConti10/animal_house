/***********************/
/* FRONT OFFICE ROUTES */
/***********************/

// setup
const express = require('express')
const fs = require('fs')
const FormData = require('form-data')
const got = require('got') 
const router = express.Router()

// database loading
const db = JSON.parse(fs.readFileSync("./database/users.json"))
const admins_db = JSON.parse(fs.readFileSync("./database/administrators.json"))

// Imagga API credentials
const apiKey = 'acc_3f8b1921aca229f'
const apiSecret = 'f0813daaebd476831b89f2379547b360'

// users sign-in
router.post('/sign-in', (req, res) => {

    const { user } = req.body
    let found = false

    for (usr of db.users) {
        // check for same name or same email
        if (user.name == usr.name || user.email == usr.email)
            found = true
    }

    // if the email already exists, exit with 403 status code
    if (found)
        res.sendStatus(403)

    else {
        // create the new user 
        let newUser = {
            name: user.name,
            email: user.email,
            password: user.password,
            favoriteAnimal: user.favoriteAnimal,
            gameScore: 0,
            anecdotes: [],
            helpRequests: []
        }
        // push the new user to the database
        db.users.push(newUser)
        // write the files pushed to db on the .json file 
        fs.writeFileSync("./database/users.json", JSON.stringify(db))
        res.sendStatus(200)
    }
})

// users log-in
router.post('/front-log-in', (req, res) => {

    const { user } = req.body
    let found = false

    for (usr of db.users) {
        if (user.email == usr.email && user.password == usr.password) {
            found = true
            break
        }
    }

    if (found == true)
        res.sendStatus(200)
    else
        res.sendStatus(403)
})

// get all anecdotes posted by users (endpoint both for front and back office)
router.get('/get-anecdotes', (req, res) => {

    let data = []

    for (usr of db.users) {

        for (user_anecdote of usr.anecdotes) {

            data.push({
                name: usr.name,
                anecdote: user_anecdote.content
            })
        }
    }

    var myJson = JSON.stringify(data)
    res.send(myJson)
})

// post a new anecdote
router.post('/new-anecdote', (req, res) => {

    const { anecdote_text, user_email } = req.body
    let i = 0
    let name

    for (usr of db.users) {
        if (user_email == usr.email) {
            name = usr.name
            db.users[i].anecdotes.push({ content: anecdote_text })
            fs.writeFileSync("./database/users.json", JSON.stringify(db))
            break
        }
        i = i + 1
    }
    var myJson = JSON.stringify({ name })
    res.send(myJson)
})

// get all help requests posted by users (endpoint both for front and back office)
router.get('/get-help-requests', (req, res) => {

    let data = []

    for (usr of db.users) {

        for (user_help of usr.helpRequests) {

            data.push({
                email: usr.email,
                help_request: user_help.content
            })
        }
    }
    var myJson = JSON.stringify(data)
    res.send(myJson)
})

// post a new help request
router.post('/new-help-request', (req, res) => {

    const { user_email, help_request_text } = req.body
    let i = 0

    for (usr of db.users) {
        if (user_email == usr.email) {
            db.users[i].helpRequests.push({ content: help_request_text })
            fs.writeFileSync("./database/users.json", JSON.stringify(db))
            break
        }
        i = i + 1
    }
    res.sendStatus(200)
})

// leaderboard creation
router.get('/create-leaderboard', (req, res) => {

    let data = []

    for (usr of db.users) {

        data.push({
            user_name: usr.name,
            user_gamescore: usr.gameScore
        })
    }

    var myJson = JSON.stringify(data)
    res.send(myJson)
})

// add score of auth game play
router.post('/add-score', (req, res) => {

    const {user_email} = req.body
    
    for (usr of db.users) {
        if (user_email == usr.email) {
            numerical_score = Number(usr.gameScore)
            numerical_score += 1
            usr.gameScore = numerical_score.toString()
            fs.writeFileSync("./database/users.json", JSON.stringify(db))
            break
        }
    }
    res.sendStatus(200) 
})

// showcase the user's animal
router.post('/my-animal', async (req, res) => {

    const { base64_image } = req.body

    // split string at the comma and take the second part
    let clear_b64_image = base64_image.split(',')[1]

    const formData = new FormData()
    formData.append('image_base64', clear_b64_image)

    const response = await got.post('https://api.imagga.com/v2/tags', { body: formData, username: apiKey, password: apiSecret })
    let data = await response.body

    res.send(data)
})



module.exports = router