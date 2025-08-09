document.addEventListener('DOMContentLoaded', function () {
    console.log('Page loaded:', window.location.pathname);
});

function attachWordCounter(textareaSelector, counterSelector) {
    const textarea = document.querySelector(textareaSelector);
    const counter = document.querySelector(counterSelector);
    
    if (!textarea || !counter) {
        console.log('Word counter elements not found:', textareaSelector, counterSelector);
        return;
    }

    function updateCounter() {
        const text = textarea.value.trim();
        const words = text ? text.split(/\s+/).filter(word => word.length > 0) : [];
        counter.textContent = words.length + (words.length === 1 ? ' word' : ' words');
    }

    textarea.addEventListener('input', updateCounter);
    updateCounter();
}

function goToPage(url) {
    console.log('Navigating to:', url);
    window.location.href = url;
}