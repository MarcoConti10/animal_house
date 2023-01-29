getUsers = async () => {

    var response = await fetch("/get-users", {
        method: "GET",
        headers: {
            "Content-type": "application/json"
        }
    })

    if (response.status == 200) {

        data = await response.json()

        for (let index = 0; index < data.length; index++) {

            name = data[index].user_name
            email = data[index].user_email
            password = data[index].user_password
            gameScore = data[index].user_gamescore
            favoriteAnimal = data[index].user_favoriteAnimal

            document.querySelector(".users-container").innerHTML +=
            `
                <tr class="${name}">
                    <td class="${name}" contenteditable="true">${name}</td>
                    <td class="${name}" contenteditable="true">${email}</td>
                    <td class="${name}" contenteditable="true">${password}</td>
                    <td class="${name}" contenteditable="true">${favoriteAnimal}</td>
                    <td class="${name}" contenteditable="true">${gameScore}</td>

                    <td class="${name}" onclick="modifyUser(this.className)"><button><span class="material-symbols-outlined">edit</span></button></td>
                    <td class="${name}" onclick="deleteUser(this.className)"><button><span class="material-symbols-outlined">remove</span></button></td>
                </tr>
            `
        }
    }
}

modifyUser = async (clicked_class) => {

    /*  
        quando clicca, significa che vuole mandare la modifica (PATCH)
        quindi significa che ha già modificato i valori che vuole modificare
        mettiamo caso clicked_class sia test1 inizialmente
        di questo, prendo i valori, e mettiamo abbia cambiato la mail con test3@gmail.com
        al click, prendo il nuovo valore (anche tutti se vengono modificati), li mando al server assieme al valore test1 ("oldName")
        nel server, prendo i valori
        cerco il test1, modifico con i parametri mandati nuovi, e poi ritorno sul client
        a questo punto, nel client, modifico anche il nome del div iniziale in test3 e tutti i suoi discendenti e finito
    */

    oldName = document.getElementsByClassName(clicked_class)[0].getAttribute("class")
    newName = document.getElementsByClassName(clicked_class)[0].children[0].textContent
    newEmail = document.getElementsByClassName(clicked_class)[0].children[1].textContent
    newPassword = document.getElementsByClassName(clicked_class)[0].children[2].textContent
    newAnimal = document.getElementsByClassName(clicked_class)[0].children[3].textContent
    newScore = document.getElementsByClassName(clicked_class)[0].children[4].textContent

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
    
    if (response.status == 200) {

        // per applicare i cambiamenti su users.json
        window.location.reload()

        //dovrebbe salvare tutti i figli con questo setAttribute, quindi il resto non serve
        /*
        document.getElementsByClassName(oldName)[0].setAttribute("class", newName)
        */


        // qui il parent ha già il nome nuovo, cerca per newName sul parent
        /*
        document.getElementsByClassName(newName)[0].children[0].setAttribute("class", newName)
        document.getElementsByClassName(newName)[0].children[1].setAttribute("class", newName)
        document.getElementsByClassName(newName)[0].children[2].setAttribute("class", newName)
        document.getElementsByClassName(newName)[0].children[3].setAttribute("class", newName)
        document.getElementsByClassName(newName)[0].children[4].setAttribute("class", newName)
        document.getElementsByClassName(newName)[0].children[5].setAttribute("class", newName)
        */
 
        
        // contestualmente ad un alert di 1-2 secondi che dice "utente modificato"
        /*
        setTimeout(() => {
            // alert here
            window.location.reload()
        }, 1000)
        */     
    }
}

deleteUser = async (clicked_class) => {

    let userToDelete = document.getElementsByClassName(clicked_class)[0].getAttribute("class")

    var response = await fetch("/delete-user", {

        method: "DELETE",
        headers: {
            "Content-type": "application/json"
        },

        body: JSON.stringify(
            {
                user: 
                {
                    name: userToDelete
                }
            })
        })
    
    if(response.status == 200) {
        // Remove the user graphically
        userToDelete = document.getElementsByClassName(clicked_class)[0]
        userToDelete.parentNode.removeChild(userToDelete)
    }
}


