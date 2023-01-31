// back office
loadAnecdotes = async () => {

    var response = await fetch("/load-anecdotes", {
        method: "GET",
        headers: {
            "Content-type": "application/json"
        }
    })

    if (response.status == 200) {

        const data = await response.json()

        for (let index = 0; index < data.length; index++) {

            name = data[index].name
            anecdote = data[index].anecdote

            document.querySelector(".anecdotes-container").innerHTML +=
            `
            <tr class="${name}">
                <td class="${name}">${name}</td>
                <td class="${name}" contenteditable="true">${anecdote}</td>

                <td class="${name}" onclick="modifyAnecdote('${anecdote}', this.parentElement)"><button><span class="material-symbols-outlined">edit</span></button></td>
                <td class="${name}" onclick="deleteAnecdote(this.parentElement)"><button><span class="material-symbols-outlined">remove</span></button></td>
            </tr>
            `
        }
    }
}

modifyAnecdote = async (oldAnecdote, parentElement) => {

    name = parentElement.getAttribute("class")
    newAnecdote = parentElement.children[1].textContent
    
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
    console.log(name)
    targetAnecdote = parentElement.children[1].textContent
    console.log(targetAnecdote)

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


