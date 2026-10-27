(function () {
  'use strict';
  let storage;
  try { storage = window.localStorage; } catch { storage = null; }
  const progress = window.ChallengeCore.loadProgress(storage);
  const cards = [...document.querySelectorAll('[data-lesson-id]')];
  const completed = cards.filter(card => progress[card.dataset.lessonId]);
  const total = completed.reduce((sum, card) => sum + progress[card.dataset.lessonId].score, 0);
  const summary = document.getElementById('challenge-summary');
  summary.textContent = completed.length + ' / ' + cards.length + ' thử thách · ' + total + ' / ' + (cards.length * 100) + ' điểm';
  cards.forEach(card => {
    const result = progress[card.dataset.lessonId];
    const status = card.querySelector('.challenge-status');
    status.textContent = result ? '★'.repeat(result.stars) + ' · ' + result.score + '/100 điểm' : 'Chưa hoàn thành';
    if (result) status.setAttribute('aria-label', result.stars + ' trên 3 sao, ' + result.score + ' trên 100 điểm');
  });
})();
