function saveData(key, value) {
    try {
        localStorage.setItem(key, JSON.stringify(value));
        console.log('Saved:', key, value);
        return true;
    } catch (err) {
        console.error('Error saving:', key, err);
        return false;
    }
}

function loadData(key) {
    try {
        const raw = localStorage.getItem(key);
        const result = raw ? JSON.parse(raw) : null;
        console.log('Loaded:', key, result);
        return result;
    } catch (err) {
        console.error('Error loading:', key, err);
        return null;
    }
}

function removeData(key) {
    try {
        localStorage.removeItem(key);
        return true;
    } catch (err) {
        console.error('Error removing:', key, err);
        return false;
    }
}

function clearAllData() {
    const keys = ['topic', 'stance', 'counter'];
    keys.forEach(k => removeData(k));
}