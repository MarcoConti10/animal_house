/**********************/
/* BACK OFFICE ROUTES */
/**********************/

// setup
const express = require('express')
const fs = require('fs')
const router = express.Router()

// database loading
const db = JSON.parse(fs.readFileSync("./database/users.json"))
const admins_db = JSON.parse(fs.readFileSync("./database/administrators.json"))

// administrators log-in
router.post('/back-log-in', (req, res) => {

    const { user } = req.body
    let found = false

    for (usr of admins_db.admins) {
        if (user.email == usr.email && user.password == usr.password) {
            found = true
        }
    }

    if (found)
        res.sendStatus(200)
    else
        res.sendStatus(403)
})

// load all users data (except for anecdotes and help)
router.get('/load-users', (req, res) => {

    let data = []

    for (usr of db.users) {

        data.push({
            user_name: usr.name,
            user_email: usr.email,
            user_password: usr.password,
            user_favoriteAnimal: usr.favoriteAnimal,
            user_gamescore: usr.gameScore
        })
    }

    var myJson = JSON.stringify(data)
    res.send(myJson)
})

// modify user data
router.patch('/modify-user', (req, res) => {

    const { user } = req.body

    // search by oldName
    for (usr of db.users) {
        if (user.oldName == usr.name) {
            usr.name = user.newName
            usr.email = user.newEmail
            usr.password = user.newPassword
            usr.favoriteAnimal = user.newAnimal
            usr.gameScore = user.newScore
            fs.writeFileSync("./database/users.json", JSON.stringify(db))
            break
        }
    }
    res.sendStatus(200)
})

// delete any user
router.delete('/delete-user', (req, res) => {

    const { user } = req.body

    for (usr of db.users) {
        if (user.name == usr.name) {
            const indexToRemove = db.users.findIndex((pl) => pl.name === user.name)
            db.users.splice(indexToRemove, 1)
            fs.writeFileSync("./database/users.json", JSON.stringify(db))
        }
    }
    res.sendStatus(200)
})

// modify a user anecdote
router.patch('/modify-anecdote', (req, res) => {

    const { user } = req.body

    for (usr of db.users) {
        if (user.name == usr.name) {
            for (let index = 0; index < usr.anecdotes.length; index++) {
                if (user.oldAnecdote == usr.anecdotes[index].content) {
                    usr.anecdotes[index].content = user.newAnecdote
                    fs.writeFileSync("./database/users.json", JSON.stringify(db))
                    break
                }
            }
        }
    }
    res.sendStatus(200)
})

// delete a user anecdote 
router.delete('/delete-anecdote', (req, res) => {

    const { user } = req.body

    for (usr of db.users) {
        if (user.name == usr.name) {
            for (let index = 0; index < usr.anecdotes.length; index++) {
                if (user.targetAnecdote == usr.anecdotes[index].content) {
                    usr.anecdotes.splice(index, 1)
                    fs.writeFileSync("./database/users.json", JSON.stringify(db))
                    break
                }
            }
        }
    }
    res.sendStatus(200)
})

// modify a user help request
router.patch('/modify-help-request', (req, res) => {

    const { user } = req.body

    for (usr of db.users) {
        if (user.email == usr.email) {
            for (let index = 0; index < usr.helpRequests.length; index++) {
                if (user.oldHelpRequest == usr.helpRequests[index].content) {
                    usr.helpRequests[index].content = user.newHelpRequest
                    fs.writeFileSync("database/users.json", JSON.stringify(db))
                    break
                }
            }
        }
    }
    res.sendStatus(200)
})

// delete a user help request
router.delete('/delete-help-request', (req, res) => {

    const { user } = req.body

    for (usr of db.users) {
        if (user.email == usr.email) {
            for (let index = 0; index < usr.helpRequests.length; index++) {
                if (user.targetHelpRequest == usr.helpRequests[index].content) {
                    usr.helpRequests.splice(index, 1)
                    fs.writeFileSync("./database/users.json", JSON.stringify(db))
                    break
                }
            }
        }
    }
    res.sendStatus(200)
})

module.exports = router

