createLeaderboard = async () => {

    var response = await fetch("/create-leaderboard", {
        method: "GET",
        headers: {
            "Content-type": "application/json"
        }
    })
    
    if (response.status == 200) {

        data = await response.json()
        console.log(data)
        
        // Sort the array of objects based on user_gamescore
        data.sort((a, b) => b.user_gamescore - a.user_gamescore)

        for (let index = 0; index < data.length; index++) {

            email = data[index].user_email
            gameScore = data[index].user_gamescore

            document.querySelector(".leaderboard-container").innerHTML +=
                `
                    <tr>
                        <td class="email">${email}</td>
                        <td class"value">${gameScore}</td>
                    </tr>
                `
        }
    }   
}