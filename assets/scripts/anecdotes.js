getAnecdotes = async () => {

    var response = await fetch("/get-anecdotes", {
        method: "GET",
        headers: {
            "Content-type": "application/json"
        }
    })
    // modify DOM here
    if (response.status == 200) {

        // try without const too
        data = await response.json()

        // Clear before showing all anecdotes to avoid showing them twice
        document.querySelector(".anecdotes-container").innerHTML = ''

        for (let index = 0; index < data.length; index++) {

            email = data[index].email
            anecdote = data[index].anecdote

            document.querySelector(".anecdotes-container").innerHTML +=
                `
            <div class="card" style="width: 22rem;">
                    <div class="card-body">
                        <h5 class="id">Aneddoto di ${email} </h5>
                        <p class="card-text">${anecdote}</p>
                    </div>
            </div>
        `
        }
    }
}

postAnecdote = async (event) => {

    event.preventDefault();

    const data = new FormData(event.target);

    const value = Object.fromEntries(data.entries());

    // Get the :id params in the url section
    const urlSearchParams = new URLSearchParams(window.location.search);
    const params = Object.fromEntries(urlSearchParams.entries());

    var response = await fetch("/new-anecdote", {
        method: "POST",
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify(
            {
            // Pass the :id in the url to the server for simple retrieving of information
                    anecdote_text: value.text,
                    user_email: params.id
                }
        )
    })
    // modify DOM here
    if (response.status == 200) {

        document.querySelector(".anecdotes-container").innerHTML += 
        `
            <div class="card" style="width: 22rem;">
                    <div class="card-body">
                        <h5 class="id">Aneddoto di ${params.id} </h5>
                        <p class="card-text">${value.text}</p>
                    </div>
            </div>
        `
    }
}

const form = document.querySelector('form');
form.addEventListener('submit', postAnecdote);

