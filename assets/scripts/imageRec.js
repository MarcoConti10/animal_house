// outputs the image charged by the user and the animal type
imageRec = (event) => {

    var reader = new FileReader()

    reader.onload = async () => {

        var response = await fetch("/my-animal", {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(
                {
                    base64_image: reader.result
                }
            )
        })

        let data = await response.json()

        if (response.status == 200) {

            // getting the animal from the JSON
            animal = data.result.tags[0].tag.en

            // show img to screen
            var output = document.getElementById('output_image')
            output.src = reader.result

            // choose a random welcoming phrase
            let phrases = ["This is a great", "Wow, nice", "Straordinary"]
            const random = Math.floor(Math.random() * phrases.length)

            // show results
            document.querySelector("#imgInfo").innerHTML = `${phrases[random]} ${animal}!`
        }
        // 403 (Forbidden)
        else {
            alert("You've reached your limit of 30 images for today. Try again tomorrow")
        }
    }
    reader.readAsDataURL(event.target.files[0])
}
