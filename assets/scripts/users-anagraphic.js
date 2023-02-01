/* back office */

loadUsers = async () => {

    var response = await fetch("/load-users", {
        method: "GET",
        headers: {
            "Content-type": "application/json"
        }
    })

    if (response.status == 200) {

        const data = await response.json()

        for (let index = 0; index < data.length; index++) {

            name = data[index].user_name
            email = data[index].user_email
            password = data[index].user_password
            favoriteAnimal = data[index].user_favoriteAnimal
            gameScore = data[index].user_gamescore

            const list = document.querySelector("#users-list")
            const row = document.createElement("tr")

            row.innerHTML =
                `
                <td>${name}</td>
                <td>${email}</td>
                <td>${password}</td>
                <td>${favoriteAnimal}</td>
                <td>${gameScore}</td>
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
document.querySelector("#users-list").addEventListener("click", (e) => {

    target = e.target

    if (target.classList.contains("edit")) {

        selectedRow = target.parentElement.parentElement
        document.querySelector("#formName").value = selectedRow.children[0].textContent
        document.querySelector("#formEmail").value = selectedRow.children[1].textContent
        document.querySelector("#formPassword").value = selectedRow.children[2].textContent
        document.querySelector("#formAnimal").value = selectedRow.children[3].textContent
        document.querySelector("#formScore").value = selectedRow.children[4].textContent

        oldName = selectedRow.children[0].textContent
    
        document.querySelector("#submitButton").onclick = async function () {

            newName = document.querySelector("#formName").value
            newEmail = document.querySelector("#formEmail").value
            newPassword = document.querySelector("#formPassword").value
            newAnimal = document.querySelector("#formAnimal").value
            newScore = document.querySelector("#formScore").value

            var response = await fetch("/modify-user", {

                method: "PATCH",
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify(
                    {
                        user:
                        {
                            oldName: oldName,
                            newName: newName,
                            newEmail: newEmail,
                            newPassword: newPassword,
                            newAnimal: newAnimal,
                            newScore: newScore
                        }
                    })
            })

            // update values
            selectedRow.children[0].textContent = document.querySelector("#formName").value
            selectedRow.children[1].textContent = document.querySelector("#formEmail").value
            selectedRow.children[2].textContent = document.querySelector("#formPassword").value
            selectedRow.children[3].textContent = document.querySelector("#formAnimal").value
            selectedRow.children[4].textContent = document.querySelector("#formScore").value

            //clear fields
            document.querySelector("#formName").value = ""
            document.querySelector("#formEmail").value = ""
            document.querySelector("#formPassword").value = ""
            document.querySelector("#formAnimal").value = ""
            document.querySelector("#formScore").value = ""
        }
    }
})

// delete
document.querySelector("#users-list").addEventListener("click", async (e) => {

    target = e.target

    if (target.classList.contains("delete")) {

        selectedRow = target.parentElement.parentElement
        targetUser = selectedRow.children[0].textContent

        var response = await fetch("/delete-user", {

            method: "DELETE",
            headers: {
                "Content-type": "application/json"
            },

            body: JSON.stringify(
                {
                    user:
                    {
                        name: targetUser
                    }
                })
        })

        // remove the user graphically
        target.parentElement.parentElement.remove()
    }
})



