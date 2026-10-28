import { DEFAULT_H } from './core.mjs';
export const STORAGE_KEY = 'ai-lessons-labs-v1';
export const REVISION = '2026-10-pilot-1';
export const TOPICS = ['topic-02-03', 'topic-04', 'topic-06'];
export const CHECKPOINT_IDS = ['next', 'reason', 'stop'];
const plain = value => !!value && typeof value === 'object' && !Array.isArray(value);
const clamp = (value, min, max, fallback) => Number.isFinite(Number(value)) ? Math.max(min, Math.min(max, Number(value))) : fallback;
export function defaults(topic) {
  return { revision: REVISION, updatedAt: 0, mode: 'guided', unlocked: false, guidedCompleted: false, stepIndex: 0, stepId: 'step-0', speed: 1, view: topic === 'topic-06' ? '3d' : '2d', config: { algorithm: topic === 'topic-06' ? 'hill' : topic === 'topic-04' ? 'astar' : 'bfs', preset: topic === 'topic-06' ? 'peaks' : 'weighted', costs: {}, heuristics: { ...DEFAULT_H }, start: [0, 0], seed: 42 }, checkpoints: Object.fromEntries(CHECKPOINT_IDS.map(id => [id, { passed: false, attempts: 0, revealed: false }])), badge: false };
}
export function normalizeTopic(topic, raw) {
  const state = defaults(topic); if (!plain(raw)) return state;
  for (const id of CHECKPOINT_IDS) {
    const value = raw.checkpoints?.[id];
    if (plain(value)) state.checkpoints[id] = { passed: value.passed === true, attempts: Math.floor(clamp(value.attempts, 0, 100000, 0)), revealed: value.revealed === true };
  }
  state.badge = CHECKPOINT_IDS.every(id => state.checkpoints[id].passed);
  state.guidedCompleted = raw.guidedCompleted === true;
  state.unlocked = state.guidedCompleted || raw.unlocked === true;
  state.updatedAt = clamp(raw.updatedAt, 0, Number.MAX_SAFE_INTEGER, 0);
  if (raw.revision !== REVISION) return { ...state, revisionChanged: !!raw.revision };
  state.mode = raw.mode === 'playground' && state.unlocked ? 'playground' : 'guided';
  state.speed = [0.5, 1, 2].includes(raw.speed) ? raw.speed : 1;
  state.view = topic === 'topic-06' && raw.view === '3d' ? '3d' : '2d';
  state.stepIndex = Math.floor(clamp(raw.stepIndex, 0, 10000, 0)); state.stepId = `step-${state.stepIndex}`;
  const config = plain(raw.config) ? raw.config : {};
  const algorithms = topic === 'topic-06' ? ['hill', 'restart', 'annealing'] : topic === 'topic-04' ? ['greedy', 'astar'] : ['dfs', 'bfs', 'ucs'];
  const presets = topic === 'topic-06' ? ['peaks', 'plateau'] : ['weighted', 'equal', 'cycle', 'unreachable'];
  if (algorithms.includes(config.algorithm)) state.config.algorithm = config.algorithm;
  if (presets.includes(config.preset)) state.config.preset = config.preset;
  if (plain(config.costs)) for (const key of ['S-A', 'S-B', 'A-C', 'C-G', 'B-G', 'C-A']) if (key in config.costs) state.config.costs[key] = Math.round(clamp(config.costs[key], 1, 9, 1));
  if (plain(config.heuristics)) for (const key of ['S', 'A', 'B', 'C']) if (key in config.heuristics) state.config.heuristics[key] = clamp(config.heuristics[key], 0, 20, DEFAULT_H[key]);
  state.config.heuristics.G = 0;
  if (Array.isArray(config.start) && config.start.length === 2) state.config.start = config.start.map(value => Math.round(clamp(value, 0, 6, 0)));
  state.config.seed = Math.round(clamp(config.seed, 0, 4294967295, 42));
  if (plain(raw.playgroundConfig)) state.playgroundConfig = normalizeTopic(topic, { revision: REVISION, config: raw.playgroundConfig }).config;
  return state;
}
function read(storage) {
  try { const value = JSON.parse(storage?.getItem(STORAGE_KEY) || '{}'); return plain(value) && value.version === 1 && plain(value.topics) ? value : { version: 1, topics: {} }; }
  catch { return { version: 1, topics: {} }; }
}
export function loadTopic(storage, topic) { return normalizeTopic(topic, read(storage).topics[topic]); }
export function saveTopic(storage, topic, raw) {
  if (!TOPICS.includes(topic)) return { ok: false, state: raw };
  const record = read(storage), state = normalizeTopic(topic, raw);
  state.updatedAt = Math.max(Date.now(), state.updatedAt + 1);
  record.topics[topic] = state;
  try { if (!storage) throw Error('Storage unavailable'); storage.setItem(STORAGE_KEY, JSON.stringify(record)); return { ok: true, state }; }
  catch { return { ok: false, state }; }
}
export function clearTopic(storage, topic) {
  const record = read(storage); delete record.topics[topic];
  try { storage?.setItem(STORAGE_KEY, JSON.stringify(record)); return !!storage; } catch { return false; }
}
export function checkpointAnswer(raw, id, correct, reveal = false) {
  const state = JSON.parse(JSON.stringify(raw)); if (!CHECKPOINT_IDS.includes(id)) return state;
  const item = state.checkpoints[id];
  if (reveal) item.revealed = true;
  else { item.attempts++; if (correct && !item.revealed) item.passed = true; }
  state.badge = CHECKPOINT_IDS.every(key => state.checkpoints[key].passed);
  return state;
}
export function restartRun(raw) {
  const state = JSON.parse(JSON.stringify(raw)); state.stepIndex = 0; state.stepId = 'step-0';
  for (const item of Object.values(state.checkpoints)) item.revealed = false;
  return state;
}
