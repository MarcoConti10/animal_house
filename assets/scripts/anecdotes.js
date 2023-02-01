/* front office */ 

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

/* back office */

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

            const list = document.querySelector("#anecdotes-list")
            const row = document.createElement("tr")

            row.innerHTML =
            `
                <td>${name}</td>
                <td>${anecdote}</td>
                <td>
                    <a class="btn btn-warning edit">Edit</a>
                    <a class="btn btn-danger delete">Delete</a>
                <td>
            `
        list.appendChild(row)
        }
    }
}
// edit
document.querySelector("#anecdotes-list").addEventListener("click", (e) => {

    target = e.target

    if (target.classList.contains("edit")) {

        selectedRow = target.parentElement.parentElement
        document.querySelector("#formAnecdote").value = selectedRow.children[1].textContent

        name = selectedRow.children[0].textContent
        oldAnecdote = selectedRow.children[1].textContent

        // submit Button può anche fare la delete, se inserito in contains "delete"
        document.querySelector("#submitButton").onclick = async function() {

            newAnecdote = document.querySelector("#formAnecdote").value

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

            selectedRow.children[1].textContent = document.querySelector("#formAnecdote").value
            document.querySelector("#formAnecdote").value = ""
        }
    }
})

// delete
document.querySelector("#anecdotes-list").addEventListener("click", async (e) => {
    
    target = e.target

    if (target.classList.contains("delete")) {

        selectedRow = target.parentElement.parentElement
        name = selectedRow.children[0].textContent
        targetAnecdote = selectedRow.children[1].textContent

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
                        targetAnecdote: targetAnecdote
                    }
            })
        })

        // delete the anecdote graphically
        target.parentElement.parentElement.remove()
    }
})






