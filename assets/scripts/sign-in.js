signIn = async () => {

    const name = document.getElementById('name').value
    const email = document.getElementById('email').value
    const password = document.getElementById('password').value
    const favoriteAnimal = document.getElementById('favoriteAnimal').value

    var response = await fetch("/sign-in", {
        method: "POST",
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify(
            {
                user: {
                    name: name,
                    email: email,
                    password: password,
                    favoriteAnimal: favoriteAnimal
                }
            }
        )
    })

    if (response.status == 200)
        window.location.href =
            "http://localhost:3000/front-intro.html?id=" + email
    else
        alert("Email già esistente. Scegline un'altra.")
}