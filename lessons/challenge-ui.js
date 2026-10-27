(function () {
  'use strict';
  const core = window.ChallengeCore;
  const id = new URLSearchParams(location.search).get('topic');
  const challenge = window.LessonChallenges[id];
  const lesson = window.LessonCatalog.find(item => item.id === id);
  const $ = name => document.getElementById(name);
  const storage = (() => { try { return window.localStorage; } catch { return null; } })();
  const card = document.querySelector('.challenge-card');
  if (!challenge || !lesson) {
    $('challenge-title').textContent = 'Không tìm thấy thử thách';
    $('mission').textContent = 'Hãy chọn một bài từ mục lục.';
    card.hidden = true;
    return;
  }
  document.title = challenge.title + ' · Thử thách AI';
  $('topic-label').textContent = 'TOPIC ' + lesson.topic + ' · THỬ THÁCH';
  $('challenge-title').textContent = challenge.title;
  $('mission').textContent = challenge.mission;
  $('lesson-link').href = lesson.output;
  const sourceLink = document.createElement('a');
  const firstSlide = challenge.source.match(/slides? (\d+)/);
  sourceLink.href = lesson.source + (firstSlide ? '#page=' + firstSlide[1] : '');
  sourceLink.textContent = challenge.source + ' ↗';
  $('source').append(sourceLink);

  let stage = 0, mistakes = 0, selection = null, locked = false;
  const interaction = $('interaction'), feedback = $('feedback'), check = $('check'), next = $('next');
  function button(text, className, action) {
    const element = document.createElement('button');
    element.type = 'button'; element.className = className; element.textContent = text;
    element.addEventListener('click', action);
    return element;
  }
  function render() {
    const step = challenge.steps[stage];
    selection = step.type === 'order' ? [] : null; locked = false;
    feedback.textContent = ''; feedback.className = 'feedback';
    interaction.replaceChildren();
    $('stage-count').textContent = 'Bước ' + (stage + 1) + ' / ' + challenge.steps.length;
    $('mistake-count').textContent = 'Lượt sai: ' + mistakes;
    $('stage-title').textContent = step.prompt;
    $('instruction').textContent = step.type === 'order' ? 'Chọn từng mục theo thứ tự. Có thể bỏ mục cuối để sửa.' : step.type === 'number' ? 'Nhập kết quả rồi bấm Kiểm tra.' : 'Chọn một phương án rồi bấm Kiểm tra.';
    document.querySelector('.progress-track').setAttribute('aria-valuenow', String(stage));
    $('progress-fill').style.width = (stage / challenge.steps.length * 100) + '%';
    check.hidden = false; next.hidden = true;
    if (step.type === 'number') {
      const input = document.createElement('input');
      input.type = 'number'; input.step = 'any'; input.inputMode = 'decimal';
      input.setAttribute('aria-label', 'Kết quả của bạn');
      input.addEventListener('input', () => { selection = input.value; });
      interaction.append(input);
      return;
    }
    const options = document.createElement('div'); options.className = 'options';
    if (step.type === 'order') {
      const display = document.createElement('p'); display.className = 'selected-order'; display.setAttribute('aria-live', 'polite');
      const update = () => {
        display.textContent = selection.length ? selection.map(i => step.options[i]).join(' → ') : 'Thứ tự của bạn sẽ hiện ở đây.';
        [...options.children].forEach((element, i) => { element.disabled = selection.includes(i); });
      };
      interaction.append(display);
      step.options.forEach((label, index) => options.append(button(label, 'option', () => { selection.push(index); update(); })));
      interaction.append(options, button('Bỏ mục cuối', 'secondary', () => { selection.pop(); update(); }));
      update();
    } else {
      step.options.forEach((label, index) => {
        const option = button(label, 'option', () => {
          selection = index;
          [...options.children].forEach((element, i) => element.setAttribute('aria-pressed', String(i === index)));
        });
        option.setAttribute('aria-pressed', 'false'); options.append(option);
      });
      interaction.append(options);
    }
  }
  check.addEventListener('click', () => {
    if (locked) return;
    const step = challenge.steps[stage];
    const missing = selection === null || selection === '' || (step.type === 'order' && selection.length !== step.options.length);
    if (missing) { feedback.className = 'feedback error'; feedback.textContent = 'Hãy hoàn tất lựa chọn trước khi kiểm tra; bạn chưa bị trừ điểm.'; return; }
    if (!core.isCorrect(step, selection)) {
      mistakes++;
      $('mistake-count').textContent = 'Lượt sai: ' + mistakes;
      feedback.className = 'feedback error'; feedback.textContent = 'Chưa đúng. Hãy xem lại dữ kiện và thử lại.';
      return;
    }
    locked = true;
    interaction.querySelectorAll('button, input').forEach(element => { element.disabled = true; });
    feedback.className = 'feedback'; feedback.textContent = 'Chính xác! ' + step.explanation;
    check.hidden = true; next.hidden = false;
    next.textContent = stage === challenge.steps.length - 1 ? 'Xem kết quả →' : 'Bước tiếp theo →';
    next.focus();
  });
  next.addEventListener('click', () => {
    stage++;
    if (stage < challenge.steps.length) { render(); $('stage-title').setAttribute('tabindex', '-1'); $('stage-title').focus(); return; }
    const result = core.resultForMistakes(mistakes);
    const old = core.loadProgress(storage);
    const progress = core.recordBest(old, id, result);
    const saved = core.saveProgress(storage, progress);
    document.querySelector('.progress-track').setAttribute('aria-valuenow', String(challenge.steps.length));
    $('progress-fill').style.width = '100%';
    $('stage-count').textContent = 'Hoàn thành'; $('mistake-count').textContent = 'Lượt sai: ' + mistakes;
    $('stage-title').textContent = 'Bạn đã hoàn thành thử thách!';
    $('stage-title').setAttribute('tabindex', '-1'); $('stage-title').focus();
    $('instruction').textContent = 'Điểm cao nhất của topic: ' + progress[id].score + ' / 100.';
    interaction.replaceChildren();
    const score = document.createElement('p'); score.className = 'result-score'; score.textContent = result.score + ' / 100';
    const stars = document.createElement('p'); stars.className = 'stars'; stars.setAttribute('aria-label', result.stars + ' trên 3 sao'); stars.textContent = '★'.repeat(result.stars) + '☆'.repeat(3 - result.stars);
    const note = document.createElement('p'); note.textContent = saved ? 'Đã lưu điểm cao nhất trên trình duyệt này.' : 'Không thể lưu tiến độ trong trình duyệt này; bạn vẫn có thể chơi lại.';
    interaction.append(score, stars, note);
    feedback.textContent = ''; check.hidden = true; next.hidden = true;
    const replay = button('Chơi lại', 'secondary', () => { stage = 0; mistakes = 0; replay.remove(); render(); $('stage-title').focus(); });
    document.querySelector('.actions').append(replay);
  });
  render();
})();
