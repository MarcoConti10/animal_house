handleSubmit = async (event) => {

    event.preventDefault();

    // FormData API
    const data = new FormData(event.target);

    // Still a javascript object here
    const value = Object.fromEntries(data.entries());

    var response = await fetch("/front-log-in", {
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
    // console.log(response.status)
    if (response.status == 200) 
        window.location.href = "http://localhost:3000/front-intro.html?id=" + value.email
    else 
        alert("Email o password sbagliati.") 
}

const form = document.querySelector('form');
form.addEventListener('submit', handleSubmit);