const promptsList = [
    "Imagine you are a historian 100 years in the future evaluating the impact of this issue.",
    "Argue as if you are directly affected by the opposite outcome.",
    "Consider the environmental impacts and argue from that viewpoint.",
    "Take the perspective of an economic analyst focused only on costs and benefits.",
    "Explain the other side as if to a curious 10-year-old.",
    "Defend the opposite position as if you were running for political office.",
    "Present the counter-argument as an expert witness in court.",
    "Scrutinize your original stance as a skeptical journalist.",
    "Speak from the viewpoint of a community most impacted by this issue.",
    "Write for an audience that firmly disagrees with you.",
    "Argue the opposite using only data and statistics.",
    "Take the stance of someone with a different cultural background.",
    "Assume unlimited resources—how does that change your opposition?",
    "Argue from a humanitarian perspective, focusing on human rights.",
    "Support the opposite as if you were a scientist seeking peer review."
];

function getRandomPrompt() {
    if (!promptsList || promptsList.length === 0) {
        return 'No prompts available. Please try again later.';
    }
    const index = Math.floor(Math.random() * promptsList.length);
    return promptsList[index];
}