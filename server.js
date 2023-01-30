const express = require('express')
const fs = require('fs')
const fetch = require('node-fetch') 
const request = require('request')

// database loading
const db = JSON.parse(fs.readFileSync("./users.json"))
const admins_db = JSON.parse(fs.readFileSync("./administrators.json"))

const app = express()

 // load my assets
app.use(express.static(__dirname + '/assets/html'))
app.use(express.static(__dirname + '/assets/css'))
app.use(express.static(__dirname + '/assets/scripts'))

// for parsing requests 
app.use(express.json())
app.use(express.urlencoded({extended: true}))

// show <index.html> at the beginning
app.get('/', (_req, res) => {
    res.sendFile(__dirname + '/index.html')
})

/****************/
/*     VIDEO    */
/****************/

app.get('/video', async (_req, res) => {
    
    const API_KEY = "AIzaSyCo-NoyfX2PMR-RM8pQW_7-wO-cRunvqao";
    const searchTerm = 'funny animals';
    
    //Fetch the video list from youtube API
    const videoList = await fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&q=${searchTerm}&type=video&key=${API_KEY}`)
    .then(response => response.json())
    .then(data => data.items);

    // Select a random video
    const randomVideoIndex = Math.floor(Math.random() * videoList.length);
    const videoId = videoList[randomVideoIndex].id.videoId;
    
    //Check the status of the video
    const videoInfo = await fetch(`https://www.googleapis.com/youtube/v3/videos?part=status&id=${videoId}&key=${API_KEY}`)
    .then(response => response.json())
    .then(data => data.items[0]);

    if(videoInfo.status.uploadStatus === "processed" && videoInfo.status.privacyStatus === "public"){

        // return the video id to the client
        res.status(200);
        res.send(JSON.stringify(videoId));
    }else{
        res.status(400).send("The video is not available");
    }
 })



/****************/
/*     GAME     */
/****************/

app.get('/question', (_req, res) => {
    request('https://opentdb.com/api.php?amount=10&category=27&type=boolean', { json: true }, (err, response, body) => {
        if (err) {
            return res.status(500).json({ error: 'Error fetching question' });
        }
        return res.json(body);
    });
});


/****************/
/* FRONT OFFICE */
/****************/ 

// users sign-in
app.post('/sign-in', (req, res) => {

    const {user} = req.body
    let found = false

    for (usr of db.users) {
        if (user.email == usr.email) 
            found = true    
    }

    // if the user already exists, exit with 403 status code
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
        fs.writeFileSync("users.json", JSON.stringify(db))
        res.sendStatus(200)
    }
})

// users log-in
app.post('/front-log-in', (req, res) => {

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
app.get('/get-anecdotes', (req, res) => {

    let data = []  

    for(usr of db.users) {

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
app.post('/new-anecdote', (req, res) => {

    const { anecdote_text, user_email } = req.body
    let i = 0
    let name
    
    for (usr of db.users) {
        if (user_email == usr.email) {
            name = usr.name
            db.users[i].anecdotes.push({content: anecdote_text})
            fs.writeFileSync("users.json", JSON.stringify(db))
            break
            }
        i=i+1
    }
    var myJson = JSON.stringify({name})
    res.send(myJson)
})

// get all help requests posted by users (endpoint both for front and back office)
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

// post a new help request
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

// leaderboard creation
app.get('/create-leaderboard', (_req, res) => {

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

/***************/           
/* BACK OFFICE */
/***************/             

// administrators log-in
app.post('/back-log-in', (req, res) => {

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

// get all users data (except for anecdotes and help, in a separate section)
app.get('/get-users', (_req, res) => {

    let data = []

    for (usr of db.users) {

        data.push({
            user_name: usr.name,
            user_email: usr.email,
            user_password: usr.password,
            user_gamescore: usr.gameScore,
            user_favoriteAnimal: usr.favoriteAnimal
        })
    }

    var myJson = JSON.stringify(data)
    res.send(myJson)
})

// modify user data
app.patch('/modify-user', (req, res) => {

    const {user} = req.body

    // search by oldName
    for (usr of db.users) {
        if (user.oldName == usr.name) {
            usr.name = user.newName
            usr.email = user.newEmail
            usr.password = user.newPassword
            usr.favoriteAnimal = user.newAnimal
            usr.gameScore = user.newScore
            fs.writeFileSync("users.json", JSON.stringify(db))
            break
        }
    }
    res.sendStatus(200)
})

// delete any user
app.delete('/delete-user', (req, res) => {

    const { user } = req.body

    for (usr of db.users) {
        if (user.name == usr.name) {
            const indexToRemove = db.users.findIndex((pl) => pl.name === user.name)
            db.users.splice(indexToRemove, 1)
            fs.writeFileSync("users.json", JSON.stringify(db))
        }
    }
    res.sendStatus(200)
})

// modify a user anecdote
app.patch('/modify-anecdote', (req, res) => {
    
    const { user } = req.body

    for (usr of db.users) {
        if (user.name == usr.name) {
            for (let index = 0; index < usr.anecdotes.length; index++) {
                if (user.oldAnecdote == usr.anecdotes[index].content) {
                    usr.anecdotes[index].content = user.newAnecdote
                    fs.writeFileSync("users.json", JSON.stringify(db))
                    break
                }
            }
        }
    }
    res.sendStatus(200)
})

// delete a user anecdote 
app.delete('/delete-anecdote', (req, res) => {

    const { user } = req.body

    for (usr of db.users) {
        if (user.name == usr.name) {
            for (let index = 0; index < usr.anecdotes.length; index++) {
                if (user.targetAnecdote == usr.anecdotes[index].content) {
                    usr.anecdotes.splice(index, 1)
                    fs.writeFileSync("users.json", JSON.stringify(db))
                    break
                }
            }
        }
    }
    res.sendStatus(200)
})

// modify a user help request
app.patch('/modify-help-request', (req, res) => {

    const { user } = req.body

    for (usr of db.users) {
        if (user.email == usr.email) {
            for (let index = 0; index < usr.helpRequests.length; index++) {
                if (user.oldHelpRequest == usr.helpRequests[index].content) {
                    usr.helpRequests[index].content = user.newHelpRequest
                    fs.writeFileSync("users.json", JSON.stringify(db))
                    break
                }
            }
        }
    }
    res.sendStatus(200)
})

// delete a user help request
app.delete('/delete-help-request', (req, res) => {

    const { user } = req.body

    for (usr of db.users) {
        if (user.email == usr.email) {
            for (let index = 0; index < usr.helpRequests.length; index++) {
                if (user.targetHelpRequest == usr.helpRequests[index].content) {
                    usr.helpRequests.splice(index, 1)
                    fs.writeFileSync("users.json", JSON.stringify(db))
                    break
                }
            }
        }
    }
    res.sendStatus(200)
})


app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000')
})