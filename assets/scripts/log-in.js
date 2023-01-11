// Client side javascript 

handleSubmit = async (event) => {

    event.preventDefault();

    // FormData API
    const data = new FormData(event.target);

    // Get all the entries from the form 
    // Still a javascript object here
    const value = Object.fromEntries(data.entries());

    // Send the POST request to the server
    var response = await fetch("/log-in", {
        method: "POST",
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify(
            {
                user: {
                    email: value.email,
                    password: value.password
                }
            }
        )
    })
    //console.log(response.status)
    if (response.status == 200)
        // move to http://localhost:3000/bacheca.html after the 200 server's response
        window.location.replace("http://localhost:3000/bacheca.html")
    else
        alert("Email o password sbagliati.");
}

const form = document.querySelector('form');
form.addEventListener('submit', handleSubmit);