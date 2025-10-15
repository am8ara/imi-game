function initAcakKataGame() {
    const wordCounterEl = document.getElementById('word-counter');
    const clueTextSpan = document.querySelector('#clue-text span');
    const scrambledWordH2 = document.getElementById('scrambled-word');
    const guessesTextSpan = document.querySelector('#guesses-text span');
    const feedbackTextP = document.getElementById('feedback-text');
    const guessInput = document.getElementById('guess-input');
    const checkBtn = document.getElementById('check-btn');
    const skipBtn = document.getElementById('skip-btn');
    const inputArea = document.querySelector('.input-area');
    const gameOverArea = document.getElementById('game-over-area');
    const finalMessageEl = document.getElementById('final-message');
    const continueBtn = document.getElementById('continue-btn');
    let wordsForThisRound = [];
    let currentWordIndex = 0;
    let wrongGuessesLeft = 3;
    let score = 0;
    let originalWord = '';

    function buildQuestionList() {
        const easyWords = [...wordScrambleData.mudah.words].sort(() => 0.5 - Math.random()).slice(0, 1);
        const mediumWords = [...wordScrambleData.sedang.words].sort(() => 0.5 - Math.random()).slice(0, 2);
        const hardWords = [...wordScrambleData.sulit.words].sort(() => 0.5 - Math.random()).slice(0, 2);
        wordsForThisRound = [...easyWords, ...mediumWords, ...hardWords].sort(() => 0.5 - Math.random());
    }
    function loadNextWord() {
        if (currentWordIndex >= wordsForThisRound.length) {
            endGame(true);
            return;
        }
        const wordData = wordsForThisRound[currentWordIndex];
        originalWord = wordData.word;
        wordCounterEl.textContent = currentWordIndex + 1;
        scrambledWordH2.textContent = scrambleWord(originalWord);
        clueTextSpan.textContent = wordData.clue;
        feedbackTextP.textContent = '';
        guessInput.value = '';
        guessInput.disabled = false;
        checkBtn.disabled = false;
        skipBtn.disabled = false;
        guessInput.focus();
    }
    function checkGuess() {
        const userGuess = guessInput.value.toUpperCase().trim();
        if (!userGuess) return;
        if (userGuess === originalWord) {
            score++;
            feedbackTextP.textContent = "Benar!";
            feedbackTextP.className = 'feedback-correct';
            guessInput.disabled = true;
            checkBtn.disabled = true;
            skipBtn.disabled = true;
            currentWordIndex++;
            setTimeout(loadNextWord, 1500);
        } else {
            wrongGuessesLeft--;
            guessesTextSpan.textContent = wrongGuessesLeft;
            feedbackTextP.textContent = "Salah, coba lagi!";
            feedbackTextP.className = 'feedback-incorrect';
            if (wrongGuessesLeft <= 0) {
                endGame(false);
            }
        }
        guessInput.value = '';
    }
    function skipWord() {
        wrongGuessesLeft--;
        guessesTextSpan.textContent = wrongGuessesLeft;
        if (wrongGuessesLeft < 0) {
            endGame(false);
        } else {
            currentWordIndex++;
            loadNextWord();
        }
    }
    function endGame(isWin) {
        inputArea.style.display = 'none';
        gameOverArea.style.display = 'block';
        if (isWin) {
            finalMessageEl.textContent = `Selamat! Kamu menyelesaikan tantangan dengan ${score} jawaban benar.`;
        } else {
            finalMessageEl.textContent = `Kesempatan habis! Kamu berhasil menebak ${score} dari 5 kata.`;
        }
    }
    function scrambleWord(word) {
        let chars = word.split('');
        for (let i = chars.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1));[chars[i], chars[j]] = [chars[j], chars[i]]; }
        const scrambled = chars.join('');
        return scrambled === word ? scrambleWord(word) : scrambled;
    }
    function startGame() {
        buildQuestionList();
        currentWordIndex = 0;
        wrongGuessesLeft = 3;
        score = 0;
        guessesTextSpan.textContent = wrongGuessesLeft;
        inputArea.style.display = 'flex';
        gameOverArea.style.display = 'none';
        loadNextWord();
        checkBtn.onclick = checkGuess;
        guessInput.addEventListener('keyup', (e) => { if (e.key === 'Enter' && !checkBtn.disabled) checkGuess(); });
        skipBtn.onclick = skipWord;
        continueBtn.onclick = () => window.gameFinished('Acak Kata', score, 5);
    }
    startGame();
}