document.addEventListener('DOMContentLoaded', function() {
    console.log('Compare page loaded');
    
    const originalBox = document.getElementById('originalText');
    const counterBox = document.getElementById('counterText');
    const refineBtn = document.getElementById('refineBtn');
    const nextBtn = document.getElementById('nextBtn');

    if (!originalBox || !counterBox || !nextBtn) {
        console.error('Required elements not found');
        return;
    }

    const stance = loadData('stance');
    const counter = loadData('counter');

    console.log('Loaded stance:', stance);
    console.log('Loaded counter:', counter);

    if (stance) {
        originalBox.textContent = stance;
    } else {
        originalBox.textContent = 'No original argument found.';
    }

    if (counter) {
        counterBox.textContent = counter;
    } else {
        counterBox.textContent = 'No counter-argument found.';
    }

    if (refineBtn) {
        refineBtn.addEventListener('click', function() {
            console.log('Refine button clicked');
            goToPage('stance.html');
        });
    }

    nextBtn.addEventListener('click', function() {
        console.log('Compare next button clicked');
        
        if (!stance || !counter) {
            alert('Missing arguments. Please complete the previous steps.');
            return;
        }
        
        goToPage('insights.html');
    });
});