const scoreMapping = {
    'VR': {0: 300, 14: 330, 18: 350, 20: 380, 25: 400, 27: 430, 32: 450, 34: 480, 39: 500, 41: 530, 45: 550, 48: 580, 52: 600, 55: 630, 59: 650, 61: 680, 66: 700, 68: 730, 73: 750, 75: 780, 80: 800, 82: 830, 86: 850, 89: 880, 93: 900},
    'AR': {0: 300, 11: 330, 15: 350, 18: 380, 22: 400, 25: 430, 29: 450, 33: 480, 36: 500, 40: 530, 44: 550, 47: 580, 51: 600, 55: 630, 58: 650, 62: 680, 65: 700, 69: 730, 73: 750, 77: 780, 82: 800, 85: 830, 89: 850, 91: 880, 94: 900},
    'QR': {0: 300, 11: 330, 17: 350, 22: 380, 28: 400, 33: 430, 39: 450, 44: 480, 47: 500, 50: 530, 53: 550, 56: 580, 58: 600, 61: 630, 64: 650, 67: 680, 69: 700, 72: 730, 75: 750, 78: 780, 81: 800, 83: 830, 86: 850, 89: 880, 92: 900},
    'DM': {0: 300, 15: 330, 19: 350, 22: 380, 26: 400, 30: 430, 33: 450, 37: 480, 41: 500, 44: 530, 48: 550, 52: 580, 56: 600, 59: 630, 63: 650, 67: 680, 70: 700, 74: 730, 78: 750, 81: 780, 85: 800, 89: 830, 93: 850, 96: 880, 100: 900}
};

function calculateScore(section) {
    const rawInput = document.getElementById(`${section.toLowerCase()}Raw`).value;
    const totalInput = document.getElementById(`${section.toLowerCase()}Total`).value;
    const scoreElement = document.getElementById(`${section.toLowerCase()}Score`);

    if (rawInput && totalInput) {
        const percentage = (rawInput / totalInput) * 100;
        const scaledScore = findNearestScore(percentage, section);
        scoreElement.textContent = scaledScore;
    } else {
        scoreElement.textContent = '-';
    }

    calculateTotalScore();
}

function findNearestScore(percentage, section) {
    const keys = Object.keys(scoreMapping[section]).map(key => parseFloat(key)).sort((a, b) => a - b);
    let closest = keys[0];
    keys.forEach(key => {
        if (Math.abs(key - percentage) < Math.abs(closest - percentage)) {
            closest = key;
        }
    });
    return scoreMapping[section][closest];
}

function calculateTotalScore() {
    const sections = ['VR', 'AR', 'QR', 'DM'];
    let total = 0;
    sections.forEach(section => {
        const score = document.getElementById(`${section.toLowerCase()}Score`).textContent;
        if (score !== '-') {
            total += parseInt(score);
        }
    });
    document.getElementById('totalScore').textContent = total;
}
