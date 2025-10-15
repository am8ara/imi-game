function initUrutkanProsesGame() {
    const processTitleEl = document.getElementById('process-title');
    const sortableListEl = document.getElementById('sortable-list');
    const checkOrderBtn = document.getElementById('check-order-btn');
    const nextProcessBtn = document.getElementById('next-process-btn');
    const feedbackMessageEl = document.getElementById('feedback-message');
    let currentProcessIndex = 0, correctOrder = [], sortableInstance, score = 0;

    function loadProcess(index) {
        if (sortableInstance) sortableInstance.option("disabled", false);
        sortableListEl.innerHTML = '';
        feedbackMessageEl.textContent = '';
        nextProcessBtn.style.display = 'none';
        checkOrderBtn.style.display = 'inline-block';
        const process = allProcesses[index]; // DIMODIFIKASI
        processTitleEl.textContent = process.title;
        correctOrder = process.steps;
        const shuffledSteps = [...correctOrder].sort(() => Math.random() - 0.5);
        shuffledSteps.forEach(stepText => {
            const li = document.createElement('li');
            li.className = 'sortable-item';
            li.dataset.step = stepText;
            li.innerHTML = `<span class="item-number">?</span> ${stepText}`;
            sortableListEl.appendChild(li);
        });
    }
    function checkOrder() {
        if (sortableInstance) sortableInstance.option("disabled", true);
        const currentItems = [...sortableListEl.querySelectorAll('.sortable-item')];
        const currentUserOrder = currentItems.map(item => item.dataset.step);
        const isCorrect = currentUserOrder.every((step, i) => step === correctOrder[i]);
        checkOrderBtn.style.display = 'none';
        nextProcessBtn.style.display = 'inline-block';
        if (isCorrect) {
            score++;
            feedbackMessageEl.textContent = "Benar! Urutannya Tepat Sekali!";
            feedbackMessageEl.className = 'correct';
            currentItems.forEach((item, i) => {
                item.querySelector('.item-number').textContent = i + 1;
            });
        } else {
            feedbackMessageEl.textContent = "Kurang tepat. Urutan yang benar ditandai di bawah ini.";
            feedbackMessageEl.className = 'incorrect';
            currentItems.forEach((item, i) => {
                const userStep = item.dataset.step;
                const correctStepForThisPosition = correctOrder[i];
                item.querySelector('.item-number').textContent = i + 1;
                if (userStep !== correctStepForThisPosition) {
                    item.classList.add('wrong-position');
                }
            });
        }
    }
    function loadNextProcess() {
        currentProcessIndex++;
        if (currentProcessIndex < allProcesses.length) { // DIMODIFIKASI
            loadProcess(currentProcessIndex);
        } else {
            processTitleEl.textContent = "Semua Proses Selesai!";
            sortableListEl.innerHTML = '<p style="color: green; font-weight: bold;">Kamu Hebat!</p>';
            feedbackMessageEl.textContent = 'Lanjut ke tantangan berikutnya...';
            checkOrderBtn.style.display = 'none';
            nextProcessBtn.textContent = 'Lanjut';
            nextProcessBtn.style.display = 'inline-block';
            nextProcessBtn.onclick = () => window.gameFinished('Urutkan Proses', score, allProcesses.length); // DIMODIFIKASI
        }
    }
    score = 0;
    if (sortableListEl) { sortableInstance = new Sortable(sortableListEl, { animation: 150, ghostClass: 'sortable-ghost' }); }
    checkOrderBtn.onclick = checkOrder;
    nextProcessBtn.onclick = loadNextProcess;
    loadProcess(currentProcessIndex);
}