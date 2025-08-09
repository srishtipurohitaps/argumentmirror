document.addEventListener('DOMContentLoaded', function() {
    console.log('Stance page loaded');
    
    const topicInput = document.getElementById('topic');
    const stanceText = document.getElementById('stanceText');
    const nextBtn = document.getElementById('nextBtn');
    const wordCounter = document.getElementById('wordCounter');

    if (!topicInput || !stanceText || !nextBtn) {
        console.error('Required elements not found');
        return;
    }

    const savedTopic = loadData('topic');
    const savedStance = loadData('stance');
    
    if (savedTopic) {
        topicInput.value = savedTopic;
    }
    if (savedStance) {
        stanceText.value = savedStance;
    }

    attachWordCounter('#stanceText', '#wordCounter');

    nextBtn.addEventListener('click', function() {
        console.log('Next button clicked');
        
        const topicVal = topicInput.value.trim();
        const stanceVal = stanceText.value.trim();

        console.log('Topic:', topicVal);
        console.log('Stance:', stanceVal);

        if (!topicVal) {
            alert('Please enter a topic before continuing.');
            topicInput.focus();
            return;
        }

        if (!stanceVal) {
            alert('Please enter your argument before continuing.');
            stanceText.focus();
            return;
        }

        const topicSaved = saveData('topic', topicVal);
        const stanceSaved = saveData('stance', stanceVal);

        if (topicSaved && stanceSaved) {
            console.log('Data saved successfully, navigating to counter.html');
            goToPage('counter.html');
        } else {
            alert('Error saving data. Please try again.');
        }
    });
});