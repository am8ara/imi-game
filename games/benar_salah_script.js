function initBenarSalahGame() {
    let statementsForThisRound = [];
    const statementTextElement = document.getElementById("statement-text");
    const trueButton = document.getElementById("true-btn");
    const falseButton = document.getElementById("false-btn");
    const nextButton = document.getElementById("next-btn");
    let currentStatementIndex = 0;
    let score = 0;

    function handleNextButton() {
        currentStatementIndex++;
        if (currentStatementIndex < statementsForThisRound.length) { showStatement(); } else { showScore(); }
    }
    function selectAnswer(userChoice) {
        const correctAnswer = statementsForThisRound[currentStatementIndex].answer;
        trueButton.disabled = true;
        falseButton.disabled = true;
        if (userChoice === correctAnswer) {
            score++;
            userChoice ? trueButton.classList.add("correct") : falseButton.classList.add("correct");
        } else {
            userChoice ? trueButton.classList.add("incorrect") : falseButton.classList.add("incorrect");
            correctAnswer ? trueButton.classList.add("correct") : falseButton.classList.add("correct");
        }
        nextButton.style.display = "block";
    }
    function showStatement() {
        resetState();
        let currentStatement = statementsForThisRound[currentStatementIndex];
        statementTextElement.innerHTML = (currentStatementIndex + 1) + ". " + currentStatement.statement;
    }
    function showScore() {
        resetState();
        statementTextElement.innerHTML = `Skor Anda ${score} dari ${statementsForThisRound.length}! <br><br> Lanjut ke tantangan berikutnya...`;
        trueButton.style.display = 'none';
        falseButton.style.display = 'none';
        nextButton.innerHTML = "Lanjut";
        nextButton.style.display = "block";
        nextButton.onclick = () => window.gameFinished('Benar atau Salah', score, statementsForThisRound.length);
    }
    function resetState() {
        nextButton.style.display = "none";
        trueButton.disabled = false;
        falseButton.disabled = false;
        trueButton.classList.remove("correct", "incorrect");
        falseButton.classList.remove("correct", "incorrect");
        trueButton.style.display = 'inline-block';
        falseButton.style.display = 'inline-block';
    }
    function startQuiz() {
        const shuffled = [...allStatements].sort(() => Math.random() - 0.5); // SUDAH BENAR
        statementsForThisRound = shuffled.slice(0, Math.min(10, shuffled.length));
        currentStatementIndex = 0;
        score = 0;
        nextButton.innerHTML = "Berikutnya";
        trueButton.onclick = () => selectAnswer(true);
        falseButton.onclick = () => selectAnswer(false);
        nextButton.onclick = handleNextButton;
        showStatement();
    }
    startQuiz();
}