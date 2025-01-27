// Questions data
const questions = [
  {
    question: "What is the capital of France?",
    options: ["Berlin", "Madrid", "Paris", "Rome"],
    correct: 3, // Index of the correct answer
  },
  {
    question: "Which is the largest planet in the solar system?",
    options: ["Earth", "Mars", "Jupiter", "Saturn"],
    correct: 2,
  },
  {
    question: "Who wrote 'Hamlet'?",
    options: ["Charles Dickens", "William Shakespeare", "Mark Twain", "Leo Tolstoy"],
    correct: 1,
  },
  {
    question: "What is the chemical symbol for water?",
    options: ["H2O", "O2", "CO2", "HO"],
    correct: 0,
  },
  {
    question: "What is 5 + 3?",
    options: ["5", "8", "10", "7"],
    correct: 1,
  },
];

// Render questions
const renderQuestions = () => {
  const container = document.getElementById("questions");
  container.innerHTML = "";

  questions.forEach((q, index) => {
    const questionDiv = document.createElement("div");
    questionDiv.classList.add("question");

    const questionText = document.createElement("p");
    questionText.textContent = `${index + 1}. ${q.question}`;
    questionDiv.appendChild(questionText);

    const optionsDiv = document.createElement("div");
    optionsDiv.classList.add("options");

    q.options.forEach((option, optionIndex) => {
      const optionLabel = document.createElement("label");
      const optionInput = document.createElement("input");
      optionInput.type = "radio";
      optionInput.name = `question-${index}`;
      optionInput.value = optionIndex;

      // Restore progress from session storage
      const savedProgress = JSON.parse(sessionStorage.getItem("progress")) || {};
      if (savedProgress[index] == optionIndex) {
        optionInput.checked = true;
      }

      optionInput.addEventListener("change", () => {
        saveProgress(index, optionIndex);
      });

      optionLabel.appendChild(optionInput);
      optionLabel.appendChild(document.createTextNode(option));
      optionsDiv.appendChild(optionLabel);
      optionsDiv.appendChild(document.createElement("br"));
    });

    questionDiv.appendChild(optionsDiv);
    container.appendChild(questionDiv);
  });
};

// Save progress to session storage
const saveProgress = (questionIndex, selectedOption) => {
  const progress = JSON.parse(sessionStorage.getItem("progress")) || {};
  progress[questionIndex] = selectedOption;
  sessionStorage.setItem("progress", JSON.stringify(progress));
};

// Submit quiz and calculate score
const submitQuiz = () => {
  const progress = JSON.parse(sessionStorage.getItem("progress")) || {};
  let score = 0;

  questions.forEach((q, index) => {
    if (progress[index] == q.correct) {
      score++;
    }
  });

  // Display score and save to local storage
  document.getElementById("score").textContent = `Your score is ${score} out of ${questions.length}.`;
  localStorage.setItem("score", score);
};

// Add event listener for submit button
document.getElementById("submit").addEventListener("click", submitQuiz);

// Render questions on page load
renderQuestions();
