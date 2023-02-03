createLeaderboard = async () => {

    var response = await fetch("/create-leaderboard", {
        method: "GET",
        headers: {
            "Content-type": "application/json"
        }
    })
    
    if (response.status == 200) {

        data = await response.json()
        
        // Sort the array of objects based on user_gamescore in descending order
        data.sort((a, b) => b.user_gamescore - a.user_gamescore)

        for (let index = 0; index < data.length; index++) {

            userName = data[index].user_name
            gameScore = data[index].user_gamescore

            const list = document.querySelector("#players-list")
            const row = document.createElement("tr")

            row.innerHTML =
                `
                <td>${userName}</td>
                <td>${index + 1}</td>
                <td>${gameScore}</td>
            `
            list.appendChild(row)
        }
    }   
}