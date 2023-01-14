loadAnecdotesPage = () => {

    // Get the :id params in the url section
    const urlSearchParams = new URLSearchParams(window.location.search);
    const params = Object.fromEntries(urlSearchParams.entries());

    window.location.href = "http://localhost:3000/bacheca.html?id=" + params.id

}

loadHelpPage = () => {

}

loadLeaderboardPage = () => {

    // Get the :id params in the url section
    const urlSearchParams = new URLSearchParams(window.location.search);
    const params = Object.fromEntries(urlSearchParams.entries());

    window.location.href = "leaderboard.html?id=" + params.id

}