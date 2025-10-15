function initStudiKasusGame() {
    let casesForThisRound = [];
    const scenarioElement = document.getElementById("scenario-text");
    const answerButtons = document.getElementById("answer-buttons");
    const nextButton = document.getElementById("next-btn");
    let currentCaseIndex = 0;
    let score = 0;

    function handleNextButton() {
        currentCaseIndex++;
        if (currentCaseIndex < casesForThisRound.length) { showCase(); } else { showScore(); }
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
    function showCase() {
        resetState();
        let currentCase = casesForThisRound[currentCaseIndex];
        scenarioElement.innerHTML = (currentCaseIndex + 1) + ". " + currentCase.scenario;
        currentCase.answers.forEach(answer => {
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
        scenarioElement.innerHTML = `Skor Anda ${score} dari ${casesForThisRound.length} kasus! <br><br> Lanjut ke tantangan berikutnya...`;
        nextButton.innerHTML = "Lanjut";
        nextButton.style.display = "block";
        nextButton.onclick = () => window.gameFinished('Studi Kasus', score, casesForThisRound.length);
    }
    function resetState() {
        nextButton.style.display = "none";
        while (answerButtons.firstChild) { answerButtons.removeChild(answerButtons.firstChild); }
    }
    function startQuiz() {
        const shuffled = [...allCases].sort(() => Math.random() - 0.5); // SUDAH BENAR
        casesForThisRound = shuffled.slice(0, Math.min(10, shuffled.length));
        currentCaseIndex = 0;
        score = 0;
        nextButton.innerHTML = "Berikutnya";
        nextButton.onclick = handleNextButton;
        showCase();
    }
    startQuiz();
}