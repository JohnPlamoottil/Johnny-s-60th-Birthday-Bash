let poll = {
    question: "RSVP?"
    answers:[
        "Attending", "Maybe", "Not Attending"
    ]
    pollCount:20,
    answersweight:[4, 4, 2, 10]
    selectedAnswer:-1
};

let pollDOM = {
    question:document.querySelector(".poll .question"),
    answers:document.querySelector(.poll.answers")
};

pollDOM.question.innerText = poll.question;
