import { LABS } from './content.mjs';
import { loadTopic, STORAGE_KEY } from './storage.mjs';
const base = new URL('.', document.currentScript.src).href;
let storage; try { storage = window.localStorage; } catch { storage = null; }
let runtimePromise;
function loadRuntime() {
  if (window.AILabRuntime) return Promise.resolve(window.AILabRuntime);
  if (!runtimePromise) runtimePromise = new Promise((resolve, reject) => {
    const script = document.createElement('script'); script.src = new URL('runtime.js', base).href;
    script.onload = () => resolve(window.AILabRuntime); script.onerror = () => { runtimePromise = null; script.remove(); reject(Error('Không tải được phòng thí nghiệm. Hãy thử lại; bài học vẫn đọc được bên dưới.')); }; document.head.append(script);
  });
  return runtimePromise;
}
function refreshIndex() {
  document.querySelectorAll('[data-lab-progress]').forEach(element => {
    const topic = element.dataset.labProgress, state = loadTopic(storage, topic), count = Object.values(state.checkpoints).filter(item => item.passed).length;
    element.textContent = state.badge ? `Huy hiệu: ${LABS[topic].badge} · 3/3` : `Thực hành tương tác · ${count}/3 mốc thành thạo`;
    const link = element.parentElement.querySelector('[data-lab-link]');
    if (link) link.textContent = state.updatedAt ? `Tiếp tục học · bước ${state.stepIndex + 1} →` : 'Mở phòng thí nghiệm →';
    if (state.updatedAt) element.textContent += ` · ${new Date(state.updatedAt).toLocaleDateString('vi-VN')}`;
  });
}
for (const root of document.querySelectorAll('[data-learning-lab]')) {
  const original = root.innerHTML, topic = root.dataset.learningLab;
  async function open() {
    const button = root.querySelector('[data-lab-launch]'); if (!button || button.disabled) return;
    button.disabled = true; button.textContent = 'Đang mở ví dụ…';
    try { const runtime = await loadRuntime(); await runtime.mount(root, topic, base, storage); }
    catch (error) { button.disabled = false; button.textContent = 'Thử mở lại'; root.querySelector('[data-lab-preview-status]').textContent = error.message; }
  }
  function preview() {
    root.innerHTML = original; root.classList.remove('lab-ready');
    const state = loadTopic(storage, topic), count = Object.values(state.checkpoints).filter(item => item.passed).length;
    root.querySelector('[data-lab-launch]').textContent = state.updatedAt ? `Tiếp tục từ bước ${state.stepIndex + 1}` : 'Mở phòng thí nghiệm';
    root.querySelector('[data-lab-preview-status]').textContent = state.badge ? `Đã nhận huy hiệu ${LABS[topic].badge}` : state.updatedAt ? `${count}/3 mốc đã đạt · tiến độ được lưu trên trình duyệt này` : 'Có hướng dẫn · tự chỉnh dữ kiện · tự động lưu tiến độ';
    root.querySelector('[data-lab-launch]').addEventListener('click', open);
  }
  root.addEventListener('lab:close', preview); preview();
  if (location.hash === '#interactive-lab') { open(); root.scrollIntoView({ block: 'start' }); }
}
refreshIndex(); window.addEventListener('storage', event => { if (event.key === STORAGE_KEY || event.key === null) refreshIndex(); });
window.addEventListener('lab:progress', refreshIndex);
