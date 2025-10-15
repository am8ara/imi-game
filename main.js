// File: main.js (VERSI DENGAN SKOR)
document.addEventListener('DOMContentLoaded', () => {
    const gameContainer = document.getElementById('game-container');
    const startScreen = document.getElementById('start-screen');
    const endScreen = document.getElementById('end-screen');
    const startGameBtn = document.getElementById('start-game-btn');
    const restartAllBtn = document.getElementById('restart-all-btn');
    
    // BARU: Elemen untuk menampilkan skor
    const finalScoresBreakdown = document.getElementById('final-scores-breakdown');
    const totalScoreDisplay = document.getElementById('total-score-display');

    const allGames = [ 'trivia', 'benar_salah', 'studi_kasus', 'acak_kata', 'urutkan_proses' ];
    let shuffledGames = [];
    let currentGameIndex = 0;
    
    // BARU: Array untuk menyimpan hasil setiap game
    let gameResults = [];

    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    async function loadGame(gameName) {
        try {
            const response = await fetch(`./games/${gameName}.html`);
            if (!response.ok) throw new Error(`File ${gameName}.html tidak ditemukan.`);
            gameContainer.innerHTML = await response.text();
            switch (gameName) {
                case 'trivia': initTriviaGame(); break;
                case 'benar_salah': initBenarSalahGame(); break;
                case 'studi_kasus': initStudiKasusGame(); break;
                case 'acak_kata': initAcakKataGame(); break;
                case 'urutkan_proses': initUrutkanProsesGame(); break;
            }
        } catch (error) {
            console.error('Gagal memuat game:', error);
            gameContainer.innerHTML = `<p style="color:red; font-weight:bold;">Oops, terjadi kesalahan. Periksa Console (F12) untuk detail.</p>`;
        }
    }

    function startGameFlow() {
        // BARU: Reset hasil saat game baru dimulai
        gameResults = []; 
        startScreen.style.display = 'none';
        endScreen.style.display = 'none';
        gameContainer.style.display = 'block';
        shuffledGames = [...allGames];
        shuffleArray(shuffledGames);
        currentGameIndex = 0;
        loadGame(shuffledGames[currentGameIndex]);
    }

    // BARU: Fungsi untuk menampilkan hasil akhir
    function displayFinalScores() {
        finalScoresBreakdown.innerHTML = ''; // Kosongkan hasil sebelumnya
        let totalScore = 0;
        let totalPossible = 0;

        gameResults.forEach(result => {
            const p = document.createElement('p');
            p.innerHTML = `<strong>${result.name}:</strong> ${result.score} / ${result.total}`;
            finalScoresBreakdown.appendChild(p);
            totalScore += result.score;
            totalPossible += result.total;
        });

        totalScoreDisplay.textContent = `Total Skor: ${totalScore} / ${totalPossible}`;
    }

    // DIMODIFIKASI: Sekarang menerima parameter skor
    window.gameFinished = function(gameName, score, totalPossible) {
        // Simpan hasil
        gameResults.push({ name: gameName, score: score, total: totalPossible });

        currentGameIndex++;
        if (currentGameIndex < shuffledGames.length) {
            loadGame(shuffledGames[currentGameIndex]);
        } else {
            // BARU: Panggil fungsi untuk menampilkan skor
            displayFinalScores(); 
            gameContainer.innerHTML = '';
            gameContainer.style.display = 'none';
            endScreen.style.display = 'block';
        }
    };
    
    startGameBtn.addEventListener('click', startGameFlow);
    restartAllBtn.addEventListener('click', startGameFlow);
});