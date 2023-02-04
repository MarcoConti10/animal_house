// front office
getHelpRequests = async () => {

    var response = await fetch("/get-help-requests", {
        method: "GET",
        headers: {
            "Content-type": "application/json"
        }
    })

    if (response.status == 200) {

        data = await response.json()

        // Clear before showing all help requests to avoid showing them twice
        document.querySelector(".help-requests-container").innerHTML = ''

        for (let index = 0; index < data.length; index++) {

            email = data[index].email
            help_request = data[index].help_request

            document.querySelector(".help-requests-container").innerHTML +=
            `
              <br>
                <div class="col-md-12">
                    <div class="card mx-auto" style="width: 20%; color: black">
                        <div class="card-body">
                            <p class="card-text" style="font-size: 1.2rem">${help_request}</p>
                            <p style="color:blue;"> Help this user at: <br> ${email} </p> 
                        </div>
                    </div>
                </div>
             <br>
            `
        }
    }
}

postHelpRequest = async () => {

    const text = document.getElementById("textArea").value

    // Get the :id params in the url section
    const urlSearchParams = new URLSearchParams(window.location.search);
    const params = Object.fromEntries(urlSearchParams.entries());

    var response = await fetch("/new-help-request", {
        method: "POST",
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify(
            {
                // Pass the :id in the url to the server for simple retrieving of information
                help_request_text: text,
                user_email: params.id
            }
        )
    })

    if (response.status == 200) {

        document.querySelector(".help-requests-container").innerHTML +=
        `
            <br>
                <div class="col-md-12">
                    <div class="card mx-auto" style="width: 20%; color: black">
                        <div class="card-body">
                            <p class="card-text" style="font-size: 1.2rem">${text}</p>
                            <p style="color:blue;"> Help this user at: <br> ${params.id} </p> 
                        </div>
                    </div>
                </div>
             <br>
        `
    }
}


// back office
loadHelpRequests = async () => {

    var response = await fetch("/get-help-requests", {
        method: "GET",
        headers: {
            "Content-type": "application/json"
        }
    })

    if (response.status == 200) {

        const data = await response.json()

        for (let index = 0; index < data.length; index++) {

            email = data[index].email
            helpRequest = data[index].help_request

            const list = document.querySelector("#help-requests-list")
            const row = document.createElement("tr")

            row.innerHTML =
                `
                <td>${email}</td>
                <td>${helpRequest}</td>
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
document.querySelector("#help-requests-list").addEventListener("click", (e) => {

    target = e.target

    if (target.classList.contains("edit")) {

        selectedRow = target.parentElement.parentElement
        document.querySelector("#formHelpReq").value = selectedRow.children[1].textContent

        email = selectedRow.children[0].textContent
        oldHelpRequest = selectedRow.children[1].textContent

        document.querySelector("#submitButton").onclick = async function () {

            newHelpRequest = document.querySelector("#formHelpReq").value

            var response = await fetch("/modify-help-request", {

                method: "PATCH",
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify(
                    {
                        user:
                        {
                            email: email,
                            oldHelpRequest: oldHelpRequest,
                            newHelpRequest: newHelpRequest
                        }
                    })
            })

            selectedRow.children[1].textContent = document.querySelector("#formHelpReq").value
            document.querySelector("#formHelpReq").value = ""
        }
    }
})

// delete
document.querySelector("#help-requests-list").addEventListener("click", async (e) => {

    target = e.target

    if (target.classList.contains("delete")) {

        selectedRow = target.parentElement.parentElement
        email = selectedRow.children[0].textContent
        targetHelpRequest = selectedRow.children[1].textContent

        var response = await fetch("/delete-help-request", {

            method: "DELETE",
            headers: {
                "Content-type": "application/json"
            },

            body: JSON.stringify(
                {
                    user:
                    {
                        email: email,
                        targetHelpRequest: targetHelpRequest
                    }
                })
        })

        // delete the help request graphically
        target.parentElement.parentElement.remove()
    }
})

