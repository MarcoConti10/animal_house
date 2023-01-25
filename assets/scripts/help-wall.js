// back office
loadHelpRequests = async () => {

    var response = await fetch("/get-help-requests", {
        method: "GET",
        headers: {
            "Content-type": "application/json"
        }
    })
    // modify DOM here
    if (response.status == 200) {

        const data = await response.json()

        for (let index = 0; index < data.length; index++) {

            email = data[index].email
            helpRequest = data[index].help_request

            /*
                <div class="card" style="width: 22rem;">
                    <div class="card-body">
                        <h5 class="id">Aneddoto di ${email} </h5>
                        <p class="card-text">${anecdote}</p>
                    </div>
                </div>
            */
            document.querySelector(".help-requests-container").innerHTML +=
                `
             <div class="${email}" style="border:1px solid black">
                        <p class="${email}" contenteditable="true">${helpRequest}</p>

                        <button class="${email}" onclick="modifyHelpRequest('${helpRequest}', this.parentElement)">Modify Help Request</button>
                        <button class="${email}" onclick="deleteHelpRequest(this.parentElement)">Delete Help Request</button>
                    </div>
        `
        }
    }
} 

modifyHelpRequest = async (oldHelpRequest, parentElement) => {

    email = parentElement.getAttribute("class")
    newHelpRequest = parentElement.children[0].textContent

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

    if (response.status == 200)
        window.location.reload()

}

deleteHelpRequest = async (parentElement) => {

    email = parentElement.getAttribute("class")
    targetHelpRequest = parentElement.children[0].textContent

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
    if (response.status == 200) {
        // Remove the user graphically
        parentElement.remove()
    }
}


// front office
getHelpRequests = async () => {

    var response = await fetch("/get-help-requests", {
        method: "GET",
        headers: {
            "Content-type": "application/json"
        }
    })
    // modify DOM here
    if (response.status == 200) {

        data = await response.json()

        // Clear before showing all help requests to avoid showing them twice
        document.querySelector(".help-requests-container").innerHTML = ''

        for (let index = 0; index < data.length; index++) {

            email = data[index].email
            help_request = data[index].help_request

            document.querySelector(".help-requests-container").innerHTML +=
                `
            <div class="card" style="width: 22rem;">
                    <div class="card-body">
                        <h5 class="id">Richiesta di aiuto di: ${email} </h5>
                        <p class="card-text">${help_request}</p>
                    </div>
            </div>
        `
        }
    }
}

postHelpRequest = async (event) => {

    event.preventDefault();

    const data = new FormData(event.target);
    const value = Object.fromEntries(data.entries());

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
                user_email: params.id,
                help_request_text: value.text,
            }
        )
    })

    if (response.status == 200) {

        document.querySelector(".help-requests-container").innerHTML +=
            `
            <div class="card" style="width: 22rem;">
                    <div class="card-body">
                        <h5 class="id">Richiesta di aiuto di: ${params.id} </h5>
                        <p class="card-text">${value.text}</p>
                    </div>
            </div>
        `
    }
}

const form = document.querySelector('form');
form.addEventListener('submit', postHelpRequest);