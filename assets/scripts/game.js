gamePlay = async () => {
  let response = await fetch("/question", {
    method: "GET",
    headers: {
      "Content-type": "application/json"
    }
  });

  let questions = await response.json();
  console.log(questions);


}