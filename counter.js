document.addEventListener('DOMContentLoaded', function() {
    console.log('Counter page loaded');
    
    const originalBox = document.getElementById('originalText');
    const counterText = document.getElementById('counterText');
    const promptBtn = document.getElementById('randomPromptBtn');
    const promptDisplay = document.getElementById('promptDisplay');
    const nextBtn = document.getElementById('nextBtn');

    if (!originalBox || !counterText || !nextBtn) {
        console.error('Required elements not found');
        return;
    }

    const stance = loadData('stance');
    if (stance) {
        originalBox.textContent = stance;
    } else {
        originalBox.textContent = 'No original argument found. Please go back and fill it in.';
        console.warn('No stance data found');
    }

    const savedCounter = loadData('counter');
    if (savedCounter) {
        counterText.value = savedCounter;
    }

    attachWordCounter('#counterText', '#wordCounter');

    if (promptBtn && promptDisplay) {
        promptBtn.addEventListener('click', function() {
            const prompt = getRandomPrompt();
            promptDisplay.textContent = prompt;
            promptDisplay.style.display = 'block';
        });
    }

    nextBtn.addEventListener('click', function() {
        console.log('Counter next button clicked');
        
        const counterVal = counterText.value.trim();
        console.log('Counter argument:', counterVal);

        if (!counterVal) {
            alert('Please enter your counter-argument before proceeding.');
            counterText.focus();
            return;
        }

        const saved = saveData('counter', counterVal);
        if (saved) {
            console.log('Counter saved, navigating to compare.html');
            goToPage('compare.html');
        } else {
            alert('Error saving counter-argument. Please try again.');
        }
    });
});