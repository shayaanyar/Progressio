//the questions for the quiz
//sing Javascript
const questions = [
    {
        question: "What is the goal of sustainable development?",
        options: ["Economic growth", "Environmental preservation", "Social justice"],
        correctAnswer: "B"
    },
    {
        question: "Which UN Sustainable Development Goal focuses on sustainable cities and communities?",
        options: ["UNSDG 7", "UNSDG 11", "UNSDG 17"],
        correctAnswer: "B"
    },
    {
        question: "How many people already live in cities today?",
        options: ["more than a 25% of the world population", "more than a 33% of the world population", "more than the 50% of the world population"],
        correctAnswer: "C"
    },
    {
        question: "Especially in cities it is getting hotter and hotter as a result of climate change. Which measure does NOT help to cool down?",
        options: ["Abandonment of pesticides on municipal grounds", "Greening roofs", "Paint streets white"],
        correctAnswer: "A"
    },
    {
        question: "The US has taken their commitment to sustainability to a new level. While the rest of the country has a recycling rate of around 20 percent, the US surpasses its neighbors with a staggering 80 percent. After becoming aware of the dangers of carbon monoxide associated with burning garbage, the town instated the Zero Waste Declaration with the goal of being completely waste-free by 2020.",
        options: ["True", "False"],
        correctAnswer: "B"
    },
    {
        question: "What must be taken into account in sustainable building?",
        options: ["ecological and regional building materials", "digital equipment", "large garden", "All of the above"],
        correctAnswer: "A"
    },
    {
        question: "Which transport measure does NOT increase sustainability?",
        options: ["The establishment of car-free zones", "The rental of electric scooters per app", "The development of cycle paths"],
        correctAnswer: "B"
    },
    {
        question: "Which UN organisation aims to promote sustainable cities?",
        options: ["UNEP", "UN-HABITAT", "UNESCO"],
        correctAnswer: "B"
    },
    {
        question: "How many UNSDG's are there?",
        options: ["11", "16", "17", "None of the above"],
        correctAnswer: "C"
    },
    {
        question: "Is accelerating the design and delivery of the next phase of the Smart Cities Challenge (Minister of Intergovernmental Affairs, Infrastructure and Communities) the only best practice?",
        options: ["Yes", "I don't know", "Most probably", "No"],
        correctAnswer: "D"
    }
];

let currentQuestion = 0;
let score = 0;

const questionElement = document.getElementById('question');
const optionsContainer = document.getElementById('options-container');
const nextButton = document.getElementById('next-button');
const resultElement = document.getElementById('result');
//function to load the question
function loadQuestion() {
    const currentQ = questions[currentQuestion];
    questionElement.textContent = `Question ${currentQuestion + 1}: ${currentQ.question}`;

    optionsContainer.innerHTML = '';
    currentQ.options.forEach((option, index) => {
        const radioBtn = document.createElement('input');
        radioBtn.type = 'radio';
        radioBtn.name = 'answer';
        radioBtn.id = `option${index + 1}`;
        radioBtn.value = String.fromCharCode(65 + index); // A, B, C, ...
        const label = document.createElement('label');
        label.textContent = `${String.fromCharCode(65 + index)}) ${option}`;
        optionsContainer.appendChild(radioBtn);
        optionsContainer.appendChild(label);
        optionsContainer.appendChild(document.createElement('br'));
    });
}
//function to check the answer
function checkAnswer() {
    const selectedOption = document.querySelector('input[name="answer"]:checked');
    if (!selectedOption) {
        return;
    }

    if (selectedOption.value === questions[currentQuestion].correctAnswer) {
        score++;
    }

    currentQuestion++;

    if (currentQuestion < questions.length) {
        loadQuestion();
    } else {
        showResult();
    }
}
//outputs the results
function showResult() {
    questionElement.textContent = '';
    optionsContainer.innerHTML = '';
    nextButton.style.display = 'none';
    resultElement.textContent = `You scored ${score} out of ${questions.length}!`;
    // Example JavaScript in quiz.js
const totalQuestions = 10; // Total number of quiz questions

// Calculate the percentage of correct answers
const percentage = (score / totalQuestions) * 100;

// Update the progress bar and knowledge level text
const progressBar = document.getElementById('progress-bar');
const knowledgeLevel = document.getElementById('knowledge-level');

progressBar.style.width = percentage + '%';
knowledgeLevel.textContent = percentage.toFixed(2) + '%';
}
loadQuestion();
 
nextButton.addEventListener('click', checkAnswer);
