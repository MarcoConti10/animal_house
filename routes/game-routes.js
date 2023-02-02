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


router.get('/curiosita', async (req, res) => {
  const data = curiosity_db;

  // Selecting random element from 
  const randomIndex = Math.floor(Math.random() * data.curiosity.length);
  const curiosita = data.curiosity[randomIndex];

  res.json({ curiosita });
})


router.get('/info-legali', async (req, res) => {
  const data = info_db;

  // Selecting random element from 
  const randomIndex = Math.floor(Math.random() * data.info.length);
  const info = data.info[randomIndex];

  res.json({ info });
})


//visualize video from yt
router.get('/video', async (_req, res) => {
    
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

// Take questions from the API and send them to the client
router.get("/question", async (req, res) => {
  
  const url_api = "https://opentdb.com/api.php?amount=10&category=27&type=boolean"

  let response = await fetch(url_api)
  let data = await response.json()
  res.send(data)
  
});

module.exports = router;