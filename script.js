document.addEventListener('DOMContentLoaded', () => {

    const instructionBtn = document.getElementById("instructionButton");
    const instructionPanel = document.getElementById("instructionPanel");
    const startButton = document.getElementById("startButton");
    const replayButton = document.getElementById("replayButton");
    const menuButton = document.getElementById("menuButton");

    const menuContainer = document.getElementById("menuContainer");
    const gameContainer = document.getElementById("gameContainer");
    const gameOverContainer = document.getElementById("gameOverContainer");
    const gameArea = document.getElementById("gameArea");
    const scoreDisplay = document.getElementById("scoreDisplay");
    const timerDisplay = document.getElementById("timerDisplay");
    const finalScore = document.getElementById("finalScore");

    const delay = 1500;

    let score = 0;
    let timeLeft = 30;
    let eggsSpawned = 0;
    let timerInterval = null;
    let spawnTimeout = null;

    instructionBtn.addEventListener("click", () => instructionPanel.classList.toggle("visible"));

    document.addEventListener('click', (e) => {
        if (!instructionPanel.contains(e.target) && e.target !== instructionBtn) {
            instructionPanel.classList.remove('visible');
        }
    });

    startButton.addEventListener('click', () => {
        menuContainer.classList.add('hidden');
        gameContainer.classList.remove('hidden');
        lancerPartie();
    });

    replayButton.addEventListener('click', () => {
        gameOverContainer.classList.add('hidden');
        gameContainer.classList.remove('hidden');
        score = 0;
        timeLeft = 30;
        eggsSpawned = 0;
        scoreDisplay.textContent = 0;
        timerDisplay.textContent = 30;
        lancerPartie();
    });

    menuButton.addEventListener('click', () => {
        gameOverContainer.classList.add('hidden');
        menuContainer.classList.remove('hidden');
        score = 0;
        timeLeft = 30;
        eggsSpawned = 0;
    });

    function lancerPartie() {
        timerInterval = setInterval(() => {
            timeLeft--;
            timerDisplay.textContent = timeLeft;
            if (timeLeft <= 0) finPartie();
        }, 1000);

        spawnVague();
    }

    function pickType() {
        eggsSpawned++;
        if (eggsSpawned % 10 === 0) return 'golden';
        return Math.random() < 0.7 ? 'chocolate' : 'broken';
    }

    function spawnVague() {
        if (timeLeft <= 0) return;
        const nb = Math.floor(Math.random() * 3) + 1;
        for (let i = 0; i < nb; i++) {
            spawnOeuf();
        }
        spawnTimeout = setTimeout(spawnVague, delay);
    }

    function spawnOeuf() {
        if (timeLeft <= 0) return;

        const type = pickType();
        const points = type === 'golden' ? 5 : type === 'chocolate' ? 1 : -2;

        const oeuf = document.createElement('img');
        oeuf.src = 'images/' + type + '.png';
        oeuf.classList.add('egg');
        oeuf.style.left = Math.random() * (gameArea.clientWidth - 90) + 'px';
        oeuf.style.top = Math.random() * (gameArea.clientHeight - 90) + 'px';

        oeuf.addEventListener('click', () => {
            score += points;
            if (score < 0) score = 0;
            scoreDisplay.textContent = score;
            oeuf.remove();
        });

        gameArea.appendChild(oeuf);

        setTimeout(() => {
            oeuf.remove();
        }, delay);
    }

    function finPartie() {
        clearInterval(timerInterval);
        clearTimeout(spawnTimeout);
        gameArea.innerHTML = '';
        gameContainer.classList.add('hidden');
        gameOverContainer.classList.remove('hidden');
        finalScore.textContent = score;
    }

});