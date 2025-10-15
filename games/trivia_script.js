function initTriviaGame() {
    let questionsForThisRound = [];
    const questionElement = document.getElementById("question");
    const answerButtons = document.getElementById("answer-buttons");
    const nextButton = document.getElementById("next-btn");
    let currentQuestionIndex = 0;
    let score = 0;

    function handleNextButton() {
        currentQuestionIndex++;
        if (currentQuestionIndex < questionsForThisRound.length) { showQuestion(); } else { showScore(); }
    }
    function selectAnswer(e) {
        const selectedBtn = e.target;
        const isCorrect = selectedBtn.dataset.correct === "true";
        if (isCorrect) { selectedBtn.classList.add("correct"); score++; } else { selectedBtn.classList.add("incorrect"); }
        Array.from(answerButtons.children).forEach(button => {
            if (button.dataset.correct === "true") { button.classList.add("correct"); }
            button.disabled = true;
        });
        nextButton.style.display = "block";
    }
    function showQuestion() {
        resetState();
        let currentQuestion = questionsForThisRound[currentQuestionIndex];
        questionElement.innerHTML = (currentQuestionIndex + 1) + ". " + currentQuestion.question;
        currentQuestion.answers.forEach(answer => {
            const button = document.createElement("button");
            button.innerHTML = answer.text;
            button.classList.add("btn");
            if (answer.correct) { button.dataset.correct = "true"; }
            button.addEventListener("click", selectAnswer);
            answerButtons.appendChild(button);
        });
    }
    function showScore() {
        resetState();
        questionElement.innerHTML = `Skor Anda ${score} dari ${questionsForThisRound.length}! <br><br> Lanjut ke tantangan berikutnya...`;
        nextButton.innerHTML = "Lanjut";
        nextButton.style.display = "block";
        nextButton.onclick = () => window.gameFinished('Kuis Trivia', score, questionsForThisRound.length);
    }
    function resetState() {
        nextButton.style.display = "none";
        while (answerButtons.firstChild) { answerButtons.removeChild(answerButtons.firstChild); }
    }
    function startQuiz() {
        const shuffled = [...allTriviaQuestions].sort(() => Math.random() - 0.5); // DIMODIFIKASI
        questionsForThisRound = shuffled.slice(0, Math.min(10, shuffled.length));
        currentQuestionIndex = 0;
        score = 0;
        nextButton.innerHTML = "Berikutnya";
        nextButton.onclick = handleNextButton;
        showQuestion();
    }
    startQuiz();
}