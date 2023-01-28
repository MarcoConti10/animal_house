// back office
loadAnecdotes = async () => {

    var response = await fetch("/get-anecdotes", {
        method: "GET",
        headers: {
            "Content-type": "application/json"
        }
    })
    // modify DOM here
    if (response.status == 200) {

        const data = await response.json()

        for (let index = 0; index < data.length; index++) {

            name = data[index].name
            anecdote = data[index].anecdote

            /*
                <div class="card" style="width: 22rem;">
                    <div class="card-body">
                        <h5 class="id">Aneddoto di ${email} </h5>
                        <p class="card-text">${anecdote}</p>
                    </div>
                </div>
            */
            document.querySelector(".anecdotes-container").innerHTML +=
                `
             <div class="${name}" style="border:1px solid black">
                        <p class="${name}" contenteditable="true">${anecdote}</p>

                        <button class="${name}" onclick="modifyAnecdote('${anecdote}', this.parentElement)">Modify Anecdote</button>
                        <button class="${name}" onclick="deleteAnecdote(this.parentElement)">Delete Anecdote</button>
                    </div>
        `
        }
    }
}

modifyAnecdote = async (oldAnecdote, parentElement) => {

    name = parentElement.getAttribute("class")
    newAnecdote = parentElement.children[0].textContent
    
    var response = await fetch("/modify-anecdote", {

        method: "PATCH",
        headers: {
            "Content-type": "application/json"
        },

        body: JSON.stringify(
            {
                user:
                {
                    name: name,
                    oldAnecdote: oldAnecdote,
                    newAnecdote: newAnecdote
                }
            })
    })
    if (response.status == 200) 
        window.location.reload() 
}

deleteAnecdote = async (parentElement) => {

    name = parentElement.getAttribute("class")
    targetAnecdote = parentElement.children[0].textContent

    var response = await fetch("/delete-anecdote", {

        method: "DELETE",
        headers: {
            "Content-type": "application/json"
        },

        body: JSON.stringify(
            {
                user:
                {
                    name: name,
                    targetAnecdote: targetAnecdote,
                }
            })
    })
        if (response.status == 200) {
            // Remove the user graphically
            parentElement.remove()
    }
}

// front office
getAnecdotes = async () => {

    var response = await fetch("/get-anecdotes", {
        method: "GET",
        headers: {
            "Content-type": "application/json"
        }
    })

    if (response.status == 200) {

        const data = await response.json()

        // Clear before showing all anecdotes to avoid showing them twice
        document.querySelector(".anecdotes-container").innerHTML = ''

        for (let index = 0; index < data.length; index++) {

            name = data[index].name
            anecdote = data[index].anecdote

            document.querySelector(".anecdotes-container").innerHTML +=
           /* give each card 12 columns, and with mx-auto, put them at the center of these columns */ 
            `
            <br>
                <div class="col-md-12">
                    <div class="card mx-auto" style="width: 20%; color: black">
                        <div class="card-body">
                            <h5 class="id">Aneddoto di ${name} </h5>
                            <p class="card-text">${anecdote}</p>
                        </div>
                    </div>
                </div>
            <br>
            `
        }
    }
}

postAnecdote = async () => {

    const text = document.getElementById("textArea").value

    // Get the :id params in the url section
    const urlSearchParams = new URLSearchParams(window.location.search)
    const params = Object.fromEntries(urlSearchParams.entries())

    var response = await fetch("/new-anecdote", {
        method: "POST",
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify(
            {
            // Pass the :id in the url to the server for simple retrieving of information
                    anecdote_text: text,
                    user_email: params.id
                }
        )
    })

    if (response.status == 200) {

        let user = await response.json()

        document.querySelector(".anecdotes-container").innerHTML += 

            `
            <br>
                <div class="col-md-12">
                    <div class="card mx-auto" style="width: 20%; color: black">
                        <div class="card-body">
                            <h5 class="id">Aneddoto di ${user.name} </h5>
                            <p class="card-text">${text}</p>
                        </div>
                    </div>
                </div>
            <br>
            `
    }
}


