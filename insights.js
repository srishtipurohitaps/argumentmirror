document.addEventListener('DOMContentLoaded', function() {
    console.log('Insights page loaded');
    
    const stance = loadData('stance');
    const counter = loadData('counter');
    const topic = loadData('topic');

    console.log('Loaded data - Topic:', topic, 'Stance:', stance, 'Counter:', counter);

    if (!stance || !counter) {
        alert('Missing data. Please complete the previous steps.');
        goToPage('stance.html');
        return;
    }

    analyzeKeywords(stance, counter);
    analyzeTone(stance, counter);
    calculateBalance(stance, counter);
    calculateBias(stance, counter);

    const downloadBtn = document.getElementById('downloadBtn');
    if (downloadBtn) {
        downloadBtn.addEventListener('click', function() {
            downloadResults();
        });
    }
});

function analyzeKeywords(original, counter) {
    const originalWords = extractKeywords(original);
    const counterWords = extractKeywords(counter);

    const keywordsOriginal = document.getElementById('keywordsOriginal');
    const keywordsCounter = document.getElementById('keywordsCounter');

    if (keywordsOriginal) {
        keywordsOriginal.innerHTML = 
            '<h3>Original Argument Keywords</h3>' + 
            '<p>' + originalWords.slice(0, 10).join(', ') + '</p>';
    }
    
    if (keywordsCounter) {
        keywordsCounter.innerHTML = 
            '<h3>Counter-Argument Keywords</h3>' + 
            '<p>' + counterWords.slice(0, 10).join(', ') + '</p>';
    }
}

function extractKeywords(text) {
    const stopwords = ['the', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for', 'of', 'with', 'by', 'is', 'are', 'was', 'were', 'be', 'been', 'have', 'has', 'had', 'do', 'does', 'did', 'will', 'would', 'could', 'should', 'may', 'might', 'must', 'can', 'this', 'that', 'these', 'those', 'i', 'you', 'he', 'she', 'it', 'we', 'they', 'me', 'him', 'her', 'us', 'them', 'my', 'your', 'his', 'her', 'its', 'our', 'their', 'a', 'an'];
    
    const words = text.toLowerCase()
        .replace(/[^\w\s]/g, '')
        .split(/\s+/)
        .filter(word => word.length > 3 && !stopwords.includes(word));
    
    const frequency = {};
    words.forEach(word => {
        frequency[word] = (frequency[word] || 0) + 1;
    });
    
    return Object.keys(frequency)
        .sort((a, b) => frequency[b] - frequency[a])
        .slice(0, 15);
}

function analyzeTone(original, counter) {
    const originalTone = getTone(original);
    const counterTone = getTone(counter);
    
    const toneOriginal = document.getElementById('toneOriginal');
    const toneCounter = document.getElementById('toneCounter');
    
    if (toneOriginal) {
        toneOriginal.innerHTML = 
            '<h3>Original Tone</h3>' + 
            '<p>Positive: ' + originalTone.positive + '% | Negative: ' + originalTone.negative + '% | Neutral: ' + originalTone.neutral + '%</p>';
    }
    
    if (toneCounter) {
        toneCounter.innerHTML = 
            '<h3>Counter Tone</h3>' + 
            '<p>Positive: ' + counterTone.positive + '% | Negative: ' + counterTone.negative + '% | Neutral: ' + counterTone.neutral + '%</p>';
    }
}

function getTone(text) {
    const positiveWords = ['good', 'great', 'excellent', 'positive', 'beneficial', 'important', 'effective', 'successful', 'valuable', 'helpful'];
    const negativeWords = ['bad', 'terrible', 'negative', 'harmful', 'dangerous', 'wrong', 'failed', 'useless', 'problematic', 'concerning'];
    
    const words = text.toLowerCase().split(/\s+/);
    let positive = 0, negative = 0, neutral = 0;
    
    words.forEach(word => {
        if (positiveWords.some(pw => word.includes(pw))) positive++;
        else if (negativeWords.some(nw => word.includes(nw))) negative++;
        else neutral++;
    });
    
    const total = words.length;
    return {
        positive: Math.round((positive / total) * 100),
        negative: Math.round((negative / total) * 100),
        neutral: Math.round((neutral / total) * 100)
    };
}

function calculateBalance(original, counter) {
    const originalLength = original.split(/\s+/).length;
    const counterLength = counter.split(/\s+/).length;
    const ratio = Math.min(originalLength, counterLength) / Math.max(originalLength, counterLength);
    const balanceScore = Math.round(ratio * 100);
    
    const balanceElement = document.getElementById('balanceScore');
    if (balanceElement) {
        balanceElement.innerHTML = 
            '<h3>Argument Balance</h3>' + 
            '<p>Balance Score: ' + balanceScore + '%</p>' +
            '<p>Original: ' + originalLength + ' words | Counter: ' + counterLength + ' words</p>';
    }
}

function calculateBias(original, counter) {
    const originalKeywords = extractKeywords(original);
    const counterKeywords = extractKeywords(counter);
    const overlap = originalKeywords.filter(word => counterKeywords.includes(word)).length;
    const biasScore = Math.max(0, 100 - (overlap * 10));
    
    let biasLevel = 'Low';
    if (biasScore > 70) biasLevel = 'High';
    else if (biasScore > 40) biasLevel = 'Medium';
    
    const biasElement = document.getElementById('biasCheck');
    if (biasElement) {
        biasElement.innerHTML = 
            '<h3>Bias Assessment</h3>' + 
            '<p>Bias Level: ' + biasLevel + ' (' + biasScore + '%)</p>' +
            '<p>Keyword Overlap: ' + overlap + ' words</p>';
    }
}

function downloadResults() {
    const topic = loadData('topic') || 'Unknown Topic';
    const stance = loadData('stance') || '';
    const counter = loadData('counter') || '';
    const reflection = document.getElementById('reflection');
    const reflectionNotes = document.getElementById('reflectionNotes');
    
    const reflectionValue = reflection ? reflection.value : '';
    const reflectionNotesValue = reflectionNotes ? reflectionNotes.value : '';
    
    const content = `ARGUMENT MIRROR RESULTS
========================

Topic: ${topic}

ORIGINAL STANCE:
${stance}

COUNTER-ARGUMENT:
${counter}

REFLECTION:
Changed perspective: ${reflectionValue || 'Not specified'}
Notes: ${reflectionNotesValue || 'None'}

Generated on: ${new Date().toLocaleDateString()}
`;

    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'argument-mirror-results.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}