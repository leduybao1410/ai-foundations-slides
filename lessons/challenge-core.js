(function (root, factory) {
  const api = factory();
  if (typeof module === 'object' && module.exports) module.exports = api;
  else root.ChallengeCore = api;
})(typeof globalThis === 'object' ? globalThis : this, function () {
  'use strict';
  const storageKey = 'ai-lessons-progress-v1';
  function resultForMistakes(mistakes) {
    const score = Math.max(40, 100 - Math.max(0, Math.floor(mistakes)) * 10);
    return { score, stars: score >= 80 ? 3 : score >= 60 ? 2 : 1 };
  }
  function recordBest(progress, id, result) {
    if (progress[id] && progress[id].score >= result.score) return { ...progress };
    return { ...progress, [id]: result };
  }
  function totalScore(progress) {
    return Object.values(progress).reduce((sum, result) => sum + (Number.isFinite(result.score) ? result.score : 0), 0);
  }
  function isCorrect(step, answer) {
    if (step.type === 'choice') return answer === step.answer;
    if (step.type === 'order') return Array.isArray(answer) && answer.length === step.answer.length && answer.every((item, i) => item === step.answer[i]);
    if (step.type === 'number') return String(answer).trim() !== '' && Number.isFinite(Number(answer)) && Math.abs(Number(answer) - step.answer) < 0.000001;
    return false;
  }
  function loadProgress(storage) {
    try {
      const parsed = JSON.parse(storage.getItem(storageKey) || '{}');
      if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) return {};
      return Object.fromEntries(Object.entries(parsed).filter(([id, value]) =>
        /^topic-[a-z0-9-]+$/.test(id) && value && Number.isInteger(value.score) && value.score >= 40 && value.score <= 100 && Number.isInteger(value.stars) && value.stars >= 1 && value.stars <= 3));
    } catch { return {}; }
  }
  function saveProgress(storage, progress) {
    try { storage.setItem(storageKey, JSON.stringify(progress)); return true; } catch { return false; }
  }
  return { resultForMistakes, recordBest, totalScore, isCorrect, loadProgress, saveProgress };
});
