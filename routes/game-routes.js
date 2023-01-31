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

//startig the game 
let gameScore = 0;

router.get("/question", (req, res) => {
  fetch("https://opentdb.com/api.php?amount=10&category=27&type=boolean")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      res.json(data);
    })
    .catch((error) => {
      console.error("There was a problem with the fetch operation:", error);
      res.status(500).json({ error });
    });
});

router.post("/answer", (req, res) => {
  const { answer } = req.body;

  // Increment gameScore if answer is correct
  if (answer === "true") {
    gameScore++;
  }

  // Check if game is over
  if (gameScore === 5) {
    // Game won
    res.json({ gameOver: true, gameWon: true, gameScore });
  } else if (gameScore < 5) {
    // Game not over
    res.json({ gameOver: false, gameWon: false, gameScore });
  } else {
    // Game lost
    res.json({ gameOver: true, gameWon: false, gameScore });
  }
});

module.exports = router;