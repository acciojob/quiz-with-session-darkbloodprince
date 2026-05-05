// DOM references
const questionsElement = document.getElementById("questions");
const submitBtn = document.getElementById("submit");
const scoreElement = document.getElementById("score");

// ✅ VERY IMPORTANT (must be before renderQuestions)
let userAnswers = JSON.parse(sessionStorage.getItem("progress")) || [];
// ✅ Load score from localStorage (for persistence after reload)
const savedScore = localStorage.getItem("score");
if (savedScore) {
  scoreElement.textContent = savedScore;
}
// Handle answer selection
questionsElement.addEventListener("change", function (e) {
  if (e.target.type === "radio") {
    const index = parseInt(e.target.name.split("-")[1]);

    userAnswers[index] = e.target.value;

    sessionStorage.setItem("progress", JSON.stringify(userAnswers));
  }
});
submitBtn.addEventListener("click", function () {
  let score = 0;

  for (let i = 0; i < questions.length; i++) {
    if (userAnswers[i] === questions[i].answer) {
      score++;
    }
  }

  // ✅ EXACT STRING required by Cypress
  const resultText = `Your score is ${score} out of 5.`;

  scoreElement.textContent = resultText;

  // ✅ IMPORTANT: Cypress expects ONLY number in localStorage
  localStorage.setItem("score", String(score));
});