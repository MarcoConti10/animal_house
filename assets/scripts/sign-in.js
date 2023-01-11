handleSubmit = async (event) => {

    event.preventDefault();

    // FormData API
    const data = new FormData(event.target);

    // Get all the entries from the form 
    // Still a javascript object here
    const value = Object.fromEntries(data.entries());

    // Send the POST request to the server
    var response = await fetch("/sign-in", {
        method: "POST",
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify(
            {
                user: {
                    name: value.name,
                    email: value.email,
                    password: value.password,
                    favoriteAnimal: value.favoriteAnimal
                }
            }
        )
    })
    //console.log(response.status)
    if (response.status == 200)
        // Move to http://localhost:3000/bacheca.html after the 200 server's response
        window.location.replace("http://localhost:3000/bacheca.html")
    else
        alert("Email già esistente. Scegline un'altra.");
}

const form = document.querySelector('form');
form.addEventListener('submit', handleSubmit);