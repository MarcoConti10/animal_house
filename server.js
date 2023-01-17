const express = require('express')
const fs = require('fs')
// Database loading
const db = JSON.parse(fs.readFileSync("./users.json"))
const administrators_db = JSON.parse(fs.readFileSync("./administrators.json"))

const app = express();

 // Load my assets
app.use(express.static(__dirname + '/assets/html'))
app.use(express.static(__dirname + '/assets/css'))
app.use(express.static(__dirname + '/assets/img'))
app.use(express.static(__dirname + '/assets/scripts'))

// For parsing requests 
app.use(express.json())
app.use(express.urlencoded({extended: true}))

// Show <index.html> at the beginning
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
})

/* FRONT-OFFICE */

// sign-in
app.post('/sign-in', (req, res) => {

    const {user} = req.body
    let found = false

    for (usr of db.users) {
        if (user.email == usr.email) 
            found = true    
    }

    // If the user already exists, exit with 403 status code
    if (found)
        res.sendStatus(403)

    else {
        // Create the new user 
        let newUser = {
            name: user.name,
            email: user.email,
            password: user.password,
            favoriteAnimal: user.favoriteAnimal,
            gameScore: 0,
            administrator: false,
            anecdotes: [], 
            helpRequests: []
        }
        // Push the new user to the database
        db.users.push(newUser)
        // Write the files pushed to db on the .json file 
        fs.writeFileSync("users.json", JSON.stringify(db))
        res.sendStatus(200)
    }
})

// log-in
app.post('/front-log-in', (req, res) => {

    const {user} = req.body
    let found = false
   
    for (usr of db.users) {
        if (user.email == usr.email && user.password == usr.password) {
            found = true
        }
    }
    
    if (found)
        res.sendStatus(200)
    else   
        res.sendStatus(403)
})

// Get all anecdotes posted by users and push them to the load of bacheca inside the container
app.get('/get-anecdotes', (req, res) => {

    let data = []  

    for(usr of db.users) {

        for (user_anecdote of usr.anecdotes) {
            
            data.push({
                anecdote: user_anecdote.content,
                email: usr.email
            })
        }
    }

    var myJson = JSON.stringify(data)
    res.send(myJson)
})

// Post a new anecdote
app.post('/new-anecdote', (req, res) => {

    const { anecdote_text, user_email } = req.body
    let i = 0
    
    for (usr of db.users) {
        if (user_email == usr.email) {
            db.users[i].anecdotes.push({content: anecdote_text})
            fs.writeFileSync("users.json", JSON.stringify(db))
            break
            }
        i=i+1
    }
    res.sendStatus(200)
})

// Get all help requests posted by users
app.get('/get-help-requests', (req, res) => {

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

// Post a new help request
app.post('/new-help-request', (req, res) => {

    const {user_email, help_request_text} = req.body
    let i = 0

    for (usr of db.users) {
        if (user_email == usr.email) {
            db.users[i].helpRequests.push({content: help_request_text})
            fs.writeFileSync("users.json", JSON.stringify(db))
            break
        }
        i = i + 1
    }
    res.sendStatus(200)
})

// Leaderboard
app.get('/create-leaderboard', (req, res) => {

    let data = []

    for (usr of db.users) {

        data.push({
            user_email: usr.email,
            user_gamescore: usr.gameScore,
        })
    }

    var myJson = JSON.stringify(data)
    res.send(myJson)
})

/* BACK OFFICE */ 

// administrators log-in
app.post('/back-log-in', (req, res) => {

    const { user } = req.body
    let found = false

    for (usr of db.users) {
        if (user.email == usr.email && user.password == usr.password) {
            found = true
        }
    }

    if (found)
        res.sendStatus(200)
    else
        res.sendStatus(403)
})


// Vincolato ad amministratori
app.get('/get-users', (req, res) => {

})

// Vincolato ad amministratori
app.put('/modify-user', (req, res) => {

})

// Vincolato ad amminstratori
app.delete('/delete-user', (req, res) => {

})

// Vincolato ad amministratori
app.put('/modify-anecdote', (req, res) => {

})

// Vincolato ad amminstratori
app.delete('/delete-anecdote', (req, res) => {

})

// Vincolato ad amministratori
app.put('/modify-help-req', (req, res) => {

})

// Vincolato ad amminstratori
app.delete('/delete-help-req', (req, res) => {

})



app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000')
})