const questions = [ // array of objects to allow for page by page format 
    { // Questions string and options object for multiple choise
        question: "The phrase 'Back to square one' originates from what older board game?",
        options: {
            a: "Monopoly",
            b: "Chess",
            c: "Snakes and Ladders",
            d: "Checkers"
        },
        correct: "c" // correct answer 
    },
    {
        question: "What movie is Pixar's only prequel?",
        options: {
            a: "Cars",
            b: "Monsters University",
            c: "Finding Dory",
            d: "Up"
        },
        correct: "b"
    },
    {
        question: "What mystical blade is in virtually every Legend of Zelda game?",
        options: {
            a: "Excalibur",
            b: "Master Sword",
            c: "Soul Edge",
            d: "Frostmourne"
        },
        correct: "b"
    },
    {
        question: "What original Avengers were not part of the team when they assembled in the 2012 movie?",
        options: {
            a: "Spider-Man and Thor",
            b: "Ant-Man and Wasp",
            c: "Vision and Scarlet Witch",
            d: "Black Panther and Iron Man"
        },
        correct: "b"
    },
    {
        question: "What film kicked off the Disney Renaissance?",
        options: {
            a: "Beauty and the Beast",
            b: "The Lion King",
            c: "The Little Mermaid",
            d: "Aladdin"
        },
        correct: "c"
    }
];

let currentQuestionIndex = 0; // no question displayed
let score = 0; // score for quiz answers

const quizContainer = document.getElementById("quiz-container"); // stores DOM results for reference
const nextButton = document.getElementById("next-btn"); // reference for button to enable listeners
const resultContainer = document.getElementById("result"); // to display results

// function to display the current question based on index
function displayQuestion(index) {
    quizContainer.innerHTML = ""; // clears previous questions to show the next one
    const question = questions[index]; // retrieves next object from question array

    const questionElement = document.createElement("div"); //new div to show question
    questionElement.classList.add("question"); // assigns class to allow for specific box styling 
    questionElement.style.display = "block"; // visible block element
    questionElement.innerHTML = `
        <h2>${question.question}</h2> 
        ${Object.entries(question.options) //takes object and puts into an array or pairs (a. option 1)
            .map(([key, value]) => `
                <label>
                    <input type="radio" name="answer" value="${key}"> 
                    ${value}
                </label><br>
            `)
            .join("")}
        <button id="submit-btn"> Next Question </button>
    `;
    quizContainer.appendChild(questionElement); //appends questions to the quizContainer

    const submitButton = document.getElementById("submit-btn");
    submitButton.addEventListener("click", () => handleSubmit(index));
}

// Function to handle answer submission
function handleSubmit(index) {
    const selectedOption = document.querySelector('input[name="answer"]:checked');
    if (!selectedOption) {
        alert("Please select an answer.");
        return;
    }

    const userAnswer = selectedOption.value;
    if (userAnswer === questions[index].correct) {
        score++;
    }

    currentQuestionIndex++;

    if (currentQuestionIndex < questions.length) {
        displayQuestion(currentQuestionIndex);
    } else {
        showResult();
    }
}

// Function to display the final result
function showResult() {
    quizContainer.style.display = "none";
    resultContainer.style.display = "block";
    const percentage = (score / questions.length) * 100;
    resultContainer.textContent = `You got ${score} out of ${questions.length} correct (${percentage}%).`;
}

// Start the quiz
displayQuestion(currentQuestionIndex);

