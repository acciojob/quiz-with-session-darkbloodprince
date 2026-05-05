// DOM elements
const questionsElement = document.getElementById("questions");
const submitBtn = document.getElementById("submit");
const scoreElement = document.getElementById("score");

// ✅ Load progress from sessionStorage
let userAnswers = JSON.parse(sessionStorage.getItem("progress")) || [];

// ✅ Load score from localStorage (for persistence after reload)
const savedScore = localStorage.getItem("score");
if (savedScore) {
  scoreElement.textContent = savedScore;
}
// Handle answer selection
questionsElement.addEventListener("change", function (e) {
  if (e.target.type === "radio") {
    const name = e.target.name; // question-0, question-1...
    const index = parseInt(name.split("-")[1]);

    userAnswers[index] = e.target.value;

    // Save to sessionStorage
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

  const result = `Your score is ${score} out of 5.`;

  // Display score
  scoreElement.textContent = result;

  // Save in localStorage
  localStorage.setItem("score", result);
});