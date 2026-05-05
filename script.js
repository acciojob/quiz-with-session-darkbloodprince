// ===============================
// 🔥 REQUIRED SETUP (DO NOT MOVE)
// ===============================

// DOM elements
const questionsElement = document.getElementById("questions");
const submitBtn = document.getElementById("submit");
const scoreElement = document.getElementById("score");

// ✅ MUST be defined BEFORE renderQuestions
let userAnswers = JSON.parse(sessionStorage.getItem("progress")) || [];

// ===============================
// GIVEN QUESTIONS (DO NOT MODIFY)
// ===============================
const questions = [
  {
    question: "What is the capital of France?",
    choices: ["Paris", "London", "Berlin", "Madrid"],
    answer: "Paris",
  },
  {
    question: "What is the highest mountain in the world?",
    choices: ["Everest", "Kilimanjaro", "Denali", "Matterhorn"],
    answer: "Everest",
  },
  {
    question: "What is the largest country by area?",
    choices: ["Russia", "China", "Canada", "United States"],
    answer: "Russia",
  },
  {
    question: "Which is the largest planet in our solar system?",
    choices: ["Earth", "Jupiter", "Mars"],
    answer: "Jupiter",
  },
  {
    question: "What is the capital of Canada?",
    choices: ["Toronto", "Montreal", "Vancouver", "Ottawa"],
    answer: "Ottawa",
  },
];

// ===============================
// RENDER QUESTIONS (DO NOT BREAK)
// ===============================
function renderQuestions() {
  questionsElement.innerHTML = ""; // ensure clean render

  for (let i = 0; i < questions.length; i++) {
    const question = questions[i];

    const questionElement = document.createElement("div");
    questionElement.appendChild(document.createTextNode(question.question));

    for (let j = 0; j < question.choices.length; j++) {
      const choice = question.choices[j];

      const choiceElement = document.createElement("input");
      choiceElement.setAttribute("type", "radio");
      choiceElement.setAttribute("name", `question-${i}`);
      choiceElement.setAttribute("value", choice);

      // ✅ restore checked state
      if (userAnswers[i] === choice) {
        choiceElement.setAttribute("checked", "true");
      }

      questionElement.appendChild(choiceElement);
      questionElement.appendChild(document.createTextNode(choice));
    }

    questionsElement.appendChild(questionElement);
  }
}

renderQuestions();

// ===============================
// SAVE PROGRESS (sessionStorage)
// ===============================
questionsElement.addEventListener("change", function (e) {
  if (e.target.type === "radio") {
    const index = parseInt(e.target.name.split("-")[1]);

    userAnswers[index] = e.target.value;

    sessionStorage.setItem("progress", JSON.stringify(userAnswers));
  }
});

// ===============================
// SUBMIT QUIZ (score + localStorage)
// ===============================
submitBtn.addEventListener("click", function () {
  let score = 0;

  for (let i = 0; i < questions.length; i++) {
    if (userAnswers[i] === questions[i].answer) {
      score++;
    }
  }

  // ✅ EXACT format required
  scoreElement.textContent = `Your score is ${score} out of 5.`;

  // ✅ IMPORTANT: store ONLY number
  localStorage.setItem("score", String(score));
});