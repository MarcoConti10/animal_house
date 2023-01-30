/****************/
/* front office */
/****************/

loadAnecdotesWall = () => {

    // Get the :id params in the url section
    const urlSearchParams = new URLSearchParams(window.location.search);
    const params = Object.fromEntries(urlSearchParams.entries());

    window.location.href = "anecdotes-wall.html?id=" + params.id

}

loadHelpWall = () => {

    // Get the :id params in the url section
    const urlSearchParams = new URLSearchParams(window.location.search);
    const params = Object.fromEntries(urlSearchParams.entries());

    window.location.href = "help-wall.html?id=" + params.id

}

loadLeaderboard = () => {

    // Get the :id params in the url section
    const urlSearchParams = new URLSearchParams(window.location.search);
    const params = Object.fromEntries(urlSearchParams.entries());

    window.location.href = "leaderboard.html?id=" + params.id

}

/***************/ 
/* back office */
/***************/

loadUsersAnagraphic = () => {
    window.location.href = "users-anagraphic.html"
}

loadAnecdotesChange = () => {
    window.location.href = "anecdotes-change.html"
}

loadHelpChange = () => {
    window.location.href = "help-change.html"
}