const express = require('express')
const fs = require('fs');
// Database loading
const db = JSON.parse(fs.readFileSync("./users.json"))

const app = express();

 // Load my assets
app.use(express.static(__dirname + '/assets/html'));
app.use(express.static(__dirname + '/assets/css'));
app.use(express.static(__dirname + '/assets/img'));
app.use(express.static(__dirname + '/assets/scripts'));

// For parsing requests 
app.use(express.json())
app.use(express.urlencoded({extended: true}))

// TO-DO: 
//      1) separating routing from server
//      2) variables 
//      3) fix .JSON double creation  
//      4) language, english/italian coherence
//      5) add favorite animal in form registration    

// Show <index.html> at the beginning
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
})

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
            administrator: false
        }
        // Push the new user to the database
        db.users.push(newUser)
        // Write the files pushed to db on the .json file 
        fs.writeFileSync("users.json", JSON.stringify(db))
        res.sendStatus(200)
    }
})

// log-in
app.post('/log-in', (req, res) => {

    const {user} = req.body
    let found = false

    for (usr of db.users) {
        if (user.email == usr.email && user.password == usr.password) 
            found = true
    }

    if (found) 
        res.sendStatus(200)
    else 
        res.sendStatus(403)
})

// Vincolato ad amministratori
app.put('/modifyUser', (req, res) => {

})

// Vincolato ad amminstratori
app.delete('deleteUser', (req, res) => {

})

app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000')
})