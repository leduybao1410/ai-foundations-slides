export const NODE_IDS = ['S', 'A', 'B', 'C', 'G'];
export const SEARCH_ALGORITHMS = ['dfs', 'bfs', 'ucs', 'greedy', 'astar'];
export const EDGE_DATA = [['S', 'A', 1], ['S', 'B', 4], ['A', 'C', 1], ['C', 'G', 3], ['B', 'G', 2]];
export const DEFAULT_H = { S: 4, A: 3, B: 2, C: 2, G: 0 };
const copy = value => JSON.parse(JSON.stringify(value));
function freeze(value) { if (value && typeof value === 'object') { Object.values(value).forEach(freeze); Object.freeze(value); } return value; }
export function graphFor(preset = 'weighted', costs = {}) {
  const edges = EDGE_DATA.map(([from, to, cost]) => ({ from, to, cost: preset === 'equal' ? 1 : cost }));
  if (preset === 'cycle') edges.push({ from: 'C', to: 'A', cost: 1 });
  return edges.filter(edge => preset !== 'unreachable' || edge.to !== 'G').map(edge => ({ ...edge, cost: Math.max(1, Math.min(9, Math.round(Number(costs[`${edge.from}-${edge.to}`]) || edge.cost))) }));
}
export function searchTrace({ algorithm = 'bfs', preset = 'weighted', costs = {}, heuristics = DEFAULT_H, edges: customEdges } = {}) {
  if (!SEARCH_ALGORITHMS.includes(algorithm)) throw new Error('Unknown algorithm');
  const edges = customEdges || graphFor(preset, costs);
  const h = node => Math.max(0, Number(heuristics[node]) || 0);
  let sequence = 0;
  const entry = (node, path, g) => ({ node, path, g, h: h(node), f: g + h(node), depth: path.length - 1, order: sequence++ });
  const frontier = [entry('S', ['S'], 0)], best = new Map([['S', 0]]), closed = new Set(), discovered = new Set(['S']);
  const snapshots = [], selected = []; let expanded = 0, peak = 1, active = null, considered = null;
  const priority = value => algorithm === 'ucs' ? value.g : algorithm === 'astar' ? value.f : value.h;
  function sort() { if (['ucs', 'astar', 'greedy'].includes(algorithm)) frontier.sort((a, b) => priority(a) - priority(b) || a.order - b.order); }
  function emit(event, explanation, codeLine, extra = {}) {
    sort(); peak = Math.max(peak, frontier.length);
    snapshots.push(freeze(copy({ id: `step-${snapshots.length}`, event, explanation, codeLine, active: active?.node || null, activeEntry: active, edge: considered, frontier, closed: [...closed], selected, metrics: { expanded, peak }, ...extra })));
  }
  const strategy = { dfs: 'stack (ngăn xếp, LIFO)', bfs: 'queue (hàng đợi, FIFO)', ucs: 'priority queue theo g', greedy: 'priority queue theo h', astar: 'priority queue theo f = g + h' }[algorithm];
  emit('initial', `Đưa S vào ${strategy}. Chi phí đã đi g(S) = 0.`, 0);
  let result;
  while (frontier.length && selected.length < 100) {
    sort(); active = frontier.shift(); considered = null; selected.push(active.node);
    emit('select', `Lấy ${active.node} ra khỏi ${strategy}: độ sâu ${active.depth}, g=${active.g}${['greedy', 'astar'].includes(algorithm) ? `, h=${active.h}, f=${active.f}` : ''}.`, 1);
    if (active.node === 'G') {
      result = { found: true, path: active.path, cost: active.g, depth: active.depth };
      emit('goal', `G được lấy khỏi frontier. Đường ${active.path.join(' → ')} có ${active.depth} cạnh, tổng chi phí ${active.g}.`, 2, { result }); break;
    }
    closed.add(active.node); expanded++;
    let successors = edges.filter(edge => edge.from === active.node);
    if (algorithm === 'dfs') successors = [...successors].reverse();
    for (const edge of successors) {
      considered = `${edge.from}-${edge.to}`;
      const candidate = entry(edge.to, [...active.path, edge.to], active.g + edge.cost);
      emit('inspect', `Xét ${edge.from} → ${edge.to}: g mới = ${active.g} + ${edge.cost} = ${candidate.g}.`, 3);
      if (algorithm === 'bfs' && !discovered.has(edge.to) && edge.to === 'G') {
        result = { found: true, path: candidate.path, cost: candidate.g, depth: candidate.depth };
        emit('goal', `BFS phát hiện G ở tầng ${candidate.depth}; kiểm tra đích khi sinh nút. Đường ${candidate.path.join(' → ')} có chi phí ${candidate.g}.`, 2, { result }); break;
      }
      const simple = ['dfs', 'bfs', 'greedy'].includes(algorithm);
      if ((simple && discovered.has(edge.to)) || (!simple && candidate.g >= (best.get(edge.to) ?? Infinity))) {
        emit('discard', `Bỏ đường đến ${edge.to}: ${simple ? 'trạng thái đã được phát hiện' : 'không cải thiện chi phí tốt nhất đã biết'}.`, 4); continue;
      }
      const reopened = closed.delete(edge.to), oldIndex = frontier.findIndex(item => item.node === edge.to);
      if (oldIndex !== -1) frontier.splice(oldIndex, 1);
      best.set(edge.to, candidate.g); discovered.add(edge.to);
      if (algorithm === 'dfs') frontier.unshift(candidate); else frontier.push(candidate);
      emit('enqueue', `${reopened ? 'Mở lại' : 'Đưa'} ${edge.to} ${reopened ? 'vì tìm được đường rẻ hơn' : 'vào frontier'} với g=${candidate.g}${['greedy', 'astar'].includes(algorithm) ? `, h=${candidate.h}, f=${candidate.f}` : ''}.`, 4);
    }
    if (result) break;
  }
  if (!result) { result = { found: false, path: [], cost: null, depth: null }; emit('empty', 'Frontier đã rỗng: không có đường từ S đến G trong đồ thị này.', 5, { result }); }
  return freeze({ snapshots, selected, result, edges: copy(edges), metrics: { expanded, peak } });
}
export function heuristicDiagnostics({ preset = 'weighted', costs = {}, heuristics = DEFAULT_H } = {}) {
  const edges = graphFor(preset, costs), distances = Object.fromEntries(NODE_IDS.map(node => [node, node === 'G' ? 0 : Infinity]));
  for (let pass = 0; pass < NODE_IDS.length; pass++) for (const edge of edges) distances[edge.from] = Math.min(distances[edge.from], edge.cost + distances[edge.to]);
  const h = node => Math.max(0, Number(heuristics[node]) || 0);
  return { admissible: NODE_IDS.every(node => h(node) <= distances[node]), consistent: h('G') === 0 && edges.every(edge => h(edge.from) <= edge.cost + h(edge.to)), distances };
}
export function terrainScore(x, y, preset = 'peaks') {
  const score = Math.max(0, 6 - 2 * Math.max(Math.abs(x - 1), Math.abs(y - 1)), 10 - 2 * Math.max(Math.abs(x - 5), Math.abs(y - 5)));
  return preset === 'plateau' ? Math.min(6, score) : score;
}
export function neighborsOf([x, y], preset = 'peaks') {
  const neighbors = [];
  for (let row = Math.max(0, y - 1); row <= Math.min(6, y + 1); row++) for (let column = Math.max(0, x - 1); column <= Math.min(6, x + 1); column++) {
    if (column !== x || row !== y) neighbors.push({ position: [column, row], score: terrainScore(column, row, preset) });
  }
  return neighbors;
}
export function seededRandom(seed = 42) {
  let state = Number(seed) >>> 0;
  return () => { state += 0x6D2B79F5; let t = state; t = Math.imul(t ^ t >>> 15, t | 1); t ^= t + Math.imul(t ^ t >>> 7, t | 61); return ((t ^ t >>> 14) >>> 0) / 4294967296; };
}
export function landscapeTrace({ algorithm = 'hill', preset = 'peaks', start = [0, 0], seed = 42, guided = false } = {}) {
  if (!['hill', 'restart', 'annealing'].includes(algorithm)) throw new Error('Unknown landscape algorithm');
  const random = seededRandom(seed), snapshots = []; let current = guided && algorithm === 'annealing' ? [1, 1] : [...start];
  let best = [...current], visited = [], temperature = 4, accepted = 0, rejected = 0, proposals = 0, restart = 0;
  const score = position => terrainScore(...position, preset);
  function emit(event, explanation, codeLine, proposal = null) {
    if (score(current) > score(best)) best = [...current];
    if (!visited.some(p => p[0] === current[0] && p[1] === current[1])) visited.push([...current]);
    snapshots.push(freeze(copy({ id: `step-${snapshots.length}`, event, explanation, codeLine, position: current, score: score(current), best, bestScore: score(best), neighbors: neighborsOf(current, preset), visited, temperature, proposal, metrics: { proposals, accepted, rejected, restart } })));
  }
  emit('initial', `Bắt đầu tại (${current}), Eval=${score(current)}. Điểm cao hơn là tốt hơn; chỉ di chuyển tới một trong 8 láng giềng.`, 0);
  if (algorithm === 'annealing') {
    const demonstration = [[2, 2], [3, 3], [4, 4], [5, 5]];
    for (let i = 0; i < (guided ? demonstration.length : 100) && temperature >= 0.05; i++) {
      const options = neighborsOf(current, preset), position = guided ? demonstration[i] : options[Math.floor(random() * options.length)].position;
      const delta = score(position) - score(current), probability = delta >= 0 ? 1 : Math.exp(delta / temperature), sample = guided && i === 0 ? 0.4 : random();
      const accept = delta >= 0 || sample < probability;
      proposals++;
      const proposal = { from: [...current], position, score: score(position), delta, probability, sample, accepted: accept, temperature };
      emit('inspect', `Đề xuất (${position}), Δ=Eval(mới)−Eval(hiện tại)=${delta}. T=${temperature.toFixed(2)}.`, 1, proposal);
      if (accept) { current = [...position]; accepted++; } else rejected++;
      emit(accept ? 'accept' : 'reject', `Δ=${delta}: p=${probability.toFixed(3)}, u=${sample.toFixed(3)}. ${accept ? 'Chấp nhận' : 'Từ chối'} vì ${delta >= 0 ? 'điểm không giảm' : `u ${accept ? '<' : '≥'} p`}.`, 2, proposal);
      temperature *= 0.9;
    }
    emit('finish', `Kết thúc: điểm hiện tại ${score(current)}; điểm tốt nhất đã gặp ${score(best)} tại (${best}). Luyện thép không bảo đảm tìm cực đại toàn cục trong một lần chạy.`, 5);
  } else {
    const starts = [current];
    if (algorithm === 'restart') for (let i = 1; i < 5; i++) starts.push(guided && i === 1 ? [4, 4] : [Math.floor(random() * 7), Math.floor(random() * 7)]);
    for (let run = 0; run < starts.length; run++) {
      if (run) { restart = run; current = [...starts[run]]; emit('restart', `Lần khởi động ${run + 1}/5: bắt đầu tại (${current}), Eval=${score(current)}. Giữ lại điểm tốt nhất từ các lần trước.`, 0); }
      for (let i = 0; i < 49; i++) {
        const options = neighborsOf(current, preset).sort((a, b) => b.score - a.score || a.position[1] - b.position[1] || a.position[0] - b.position[0]);
        const candidate = options[0]; proposals++;
        emit('inspect', `So sánh láng giềng: tốt nhất là (${candidate.position}) với Eval=${candidate.score}; hiện tại ${score(current)}.`, 1, { position: candidate.position, score: candidate.score, delta: candidate.score - score(current) });
        if (candidate.score <= score(current)) { emit('stop', `Dừng tại (${current}), Eval=${score(current)}: không có bước cải thiện nghiêm ngặt${candidate.score === score(current) ? '; có láng giềng bằng điểm (plateau)' : ''}.`, 3); break; }
        current = [...candidate.position]; accepted++;
        emit('accept', `Chọn (${current}) vì Eval tăng lên ${score(current)}.`, 2);
      }
    }
    emit('finish', `${algorithm === 'restart' ? 'Sau 5 điểm bắt đầu' : 'Kết thúc leo đồi'}: tốt nhất (${best}), Eval=${score(best)}. ${score(best) < (preset === 'plateau' ? 6 : 10) ? 'Đây là cực trị địa phương, chưa phải điểm cao nhất của ví dụ.' : 'Đã đạt điểm cao nhất của ví dụ này.'}`, 5);
  }
  return freeze({ snapshots, result: { position: best, score: score(best) } });
}
