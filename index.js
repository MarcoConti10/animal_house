// Initial settings
const express = require('express')
const app = express()

// In the <index.html> file, use the image <animalHouseLogo> under the /public/images path
// Use all the files found in public/html and public/css
app.use(express.static(__dirname + '/public/html'));
app.use(express.static(__dirname + '/public/css'));
app.use(express.static(__dirname + '/public/img'));

// Show <index.html> when going to the / path 
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
})

// Go to localhost:3000 to visualize the website
app.listen(3000, () => {
    console.log('App listening on port 3000')
})