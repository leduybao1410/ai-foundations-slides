import { gsap } from 'gsap';
import { searchTrace, landscapeTrace, graphFor, heuristicDiagnostics, terrainScore, DEFAULT_H } from './core.mjs';
import { LABS, ALGORITHM_NAMES, SEARCH_PRESETS, TERRAIN_PRESETS, pseudocode, checkpointIndices } from './content.mjs';
import { STORAGE_KEY, loadTopic, saveTopic, defaults, clearTopic, checkpointAnswer, restartRun } from './storage.mjs';
const escape = text => String(text).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const positions = { S:[55,155], A:[205,65], B:[205,245], C:[365,65], G:[515,155] };
const option = (value,label,selected) => `<option value="${escape(value)}" ${value===selected?'selected':''}>${escape(label)}</option>`;
let terrainPromise;
function loadTerrain(base) {
 if(window.AILabTerrain)return Promise.resolve(window.AILabTerrain);
 return terrainPromise ||= new Promise((resolve,reject)=>{const script=document.createElement('script');script.src=new URL('terrain.js',base).href;script.onload=()=>resolve(window.AILabTerrain);script.onerror=()=>{terrainPromise=null;script.remove();reject(Error('Không tải được 3D; bạn vẫn có thể dùng bản đồ 2D.'));};document.head.append(script);});
}
function graphHTML(trace, snapshot, heuristics, detailed = true) {
 const path=snapshot.result?.path||[], solutionEdges=path.slice(1).map((node,i)=>`${path[i]}-${node}`);
 return `<svg viewBox="0 0 570 310" role="img" aria-label="Đồ thị tìm kiếm. Nút đang chọn ${escape(snapshot.active||'chưa có')}. Đọc frontier và giải thích bên cạnh để theo dõi.">
 <defs><marker id="lab-arrow-${detailed?'main':'compare'}" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse"><path d="M 0 0 L 10 5 L 0 10 z" fill="currentColor"/></marker></defs>
 ${trace.edges.map(edge=>{const [x,y]=positions[edge.from],[tx,ty]=positions[edge.to],dx=tx-x,dy=ty-y,l=Math.hypot(dx,dy),key=`${edge.from}-${edge.to}`,offset=key==='C-A'?12:0;const sx=x+dx/l*27,sy=y+dy/l*27+offset,ex=tx-dx/l*30,ey=ty-dy/l*30+offset;return `<g><path class="lab-map-edge ${snapshot.edge===key?'is-considered':''} ${solutionEdges.includes(key)?'is-solution':''}" d="M${sx},${sy} L${ex},${ey}" marker-end="url(#lab-arrow-${detailed?'main':'compare'})"/><text class="lab-edge-label" x="${(sx+ex)/2}" y="${(sy+ey)/2-9}" text-anchor="middle">${edge.cost}</text></g>`;}).join('')}
 ${Object.entries(positions).map(([node,[x,y]])=>`<g class="lab-map-node ${snapshot.closed.includes(node)?'is-closed':''} ${snapshot.frontier.some(item=>item.node===node)?'is-frontier':''} ${snapshot.active===node?'is-active':''} ${path.includes(node)?'is-solution':''}" data-map-node="${node}" transform="translate(${x},${y})"><circle r="24"/><text text-anchor="middle" dominant-baseline="central" font-size="17">${node}</text>${detailed?`<text class="lab-graph-label" x="0" y="43" text-anchor="middle">${heuristics?`h=${heuristics[node]??0}`:node==='S'?'Bắt đầu':node==='G'?'Đích':''}</text>`:''}</g>`).join('')}
 </svg>`;
}
function terrainGrid(snapshot,preset,editable=false){return `<div class="lab-terrain-grid" role="group" aria-label="Lưới điểm Eval, cột x và hàng y từ 0 tới 6">${Array.from({length:49},(_,i)=>{const x=i%7,y=Math.floor(i/7),value=terrainScore(x,y,preset),current=snapshot.position[0]===x&&snapshot.position[1]===y,best=snapshot.best[0]===x&&snapshot.best[1]===y,visited=snapshot.visited.some(p=>p[0]===x&&p[1]===y);return `<button type="button" data-cell="${x},${y}" ${editable?'':'disabled aria-disabled="true"'} class="${current?'is-position':''} ${best?'is-best':''} ${visited?'is-visited':''}" style="--cell:hsl(${145+value*1.5} 35% ${94-value*3}%)" aria-label="Ô (${x},${y}), Eval ${value}${current?', hiện tại':''}${best?', tốt nhất':''}">${current?'● ':''}${value}</button>`;}).join('')}</div>`;}
function metric(label,value){return `<div class="lab-metric"><dt>${escape(label)}</dt><dd>${escape(value)}</dd></div>`;}
export async function mount(root,topic,base,storage){
 const meta=LABS[topic];if(!meta)return;
 let state=loadTopic(storage,topic),trace,comparisonTraces,comparisonStep=0,playing=false,timer=null,saveTimer=null,question=null,questionFeedback='',questionError=false,terrain=null,terrainLoading=false,disposed=false,modal=null,placeholder=null,external=null,generation=0,saveFailed=false,terrainError='';
 const media=matchMedia('(prefers-reduced-motion: reduce)');
 const savedRevision=state.revisionChanged;
 const $=selector=>root.querySelector(selector), $$=selector=>[...root.querySelectorAll(selector)];
 function config(){return {...state.config,guided:state.mode==='guided'};}
 function rebuild(){
  generation++; if(meta.kind==='terrain')trace=landscapeTrace(config());else trace=searchTrace(config());
  state.stepIndex=Math.min(state.stepIndex,trace.snapshots.length-1);state.stepId=trace.snapshots[state.stepIndex].id;
  comparisonTraces=null;comparisonStep=0;
 }
 rebuild();
 root.classList.add('lab-ready');
 root.innerHTML=`<div class="lab-head"><div><p class="lab-kicker">Phòng thí nghiệm ${meta.number} · ${meta.kind==='terrain'?'KHÁM PHÁ KHÔNG GIAN':'QUAN SÁT THUẬT TOÁN'}</p><h2 tabindex="-1">${meta.title}</h2><p class="lab-subtitle">${meta.objective}</p></div><div class="lab-head-actions"><button type="button" data-action="expand">Mở rộng</button><button type="button" data-action="close">Thu gọn</button></div></div>
 <div class="lab-modes" role="group" aria-label="Chế độ học"><button type="button" data-mode="guided">01 · Có hướng dẫn</button><button type="button" data-mode="playground">02 · Tự khám phá</button></div>
 <div data-external class="lab-notice" hidden></div>
 ${savedRevision?'<p class="lab-revision">Nội dung đã cập nhật: bắt đầu lại vị trí phát, giữ các mốc thành thạo tương thích.</p>':''}
 <div class="lab-settings"><label>Thuật toán<select data-field="algorithm" aria-label="Thuật toán">${meta.algorithms.map(id=>option(id,ALGORITHM_NAMES[id],state.config.algorithm)).join('')}</select></label><label>Dữ kiện<select data-field="preset" aria-label="Dữ kiện">${Object.entries(meta.kind==='terrain'?TERRAIN_PRESETS:SEARCH_PRESETS).map(([key,label])=>option(key,label,state.config.preset)).join('')}</select></label><label>Tốc độ<select data-field="speed" aria-label="Tốc độ">${[.5,1,2].map(n=>option(String(n),n+'×',String(state.speed))).join('')}</select></label>${meta.kind==='terrain'?'<label>Góc nhìn<select data-field="view" aria-label="Góc nhìn"><option value="3d">Địa hình 3D</option><option value="2d">Bản đồ 2D</option></select></label>':`<label>${topic==='topic-04'?'Heuristic':'Đối chiếu'}${topic==='topic-04'?'<select data-field="heuristicPreset" aria-label="Bộ heuristic"><option value="default">h theo ví dụ</option><option value="zero">h = 0 · giống UCS</option><option value="over">Ước lượng quá cao</option><option value="custom">Tự chỉnh từng h</option></select>':'<span style="font-size:13px;padding-top:10px">Frontier · thứ tự trái → phải</span>'}</label>`}</div>
 <details><summary>Ký hiệu và quy tắc của ví dụ</summary><p>${meta.concepts}</p><p>${meta.rules}</p><p>Đây là ví dụ diễn giải thêm, không phải chép nguyên dữ kiện từ slide.</p></details>
 <details data-params><summary>Chỉnh dữ kiện trong chế độ tự khám phá</summary><p data-unlock-help></p><div data-parameter-fields class="lab-param-groups"></div></details>
 <div class="lab-workspace"><section class="lab-visual" aria-label="Hình minh họa thuật toán"><h3 data-scene-title>${meta.kind==='terrain'?'Địa hình điểm số':'Bản đồ trạng thái'}</h3><div class="lab-scene"><div data-scene></div><div class="lab-terrain-3d" data-three hidden></div></div><p class="lab-terrain-tip" data-scene-help></p><div class="lab-legend"><span><i></i>Đang chờ</span><span><i class="active"></i>Đang xét</span><span><i class="done"></i>Đã mở rộng / tốt nhất</span></div></section><section class="lab-state" aria-label="Trạng thái thuật toán"><h3>${meta.kind==='terrain'?'Quan sát láng giềng':'Frontier · nút đầu được lấy trước'}</h3><div data-state></div><dl class="lab-metrics" data-metrics></dl><div data-diagnostics></div></section></div>
 <div class="lab-controls" role="group" aria-label="Điều khiển phát"><button type="button" data-action="prev" aria-label="Bước trước">← Trước</button><button type="button" data-action="play" class="lab-primary" aria-label="Phát">Phát</button><button type="button" data-action="next" aria-label="Bước tiếp">Tiếp →</button><button type="button" data-action="restart">Bắt đầu lại</button>${meta.kind==='terrain'?'<button type="button" data-action="camera-reset">Đặt lại góc nhìn</button>':''}<span data-step-label></span></div>
 <label class="lab-sr" for="lab-scrubber-${topic}">Vị trí bước</label><input id="lab-scrubber-${topic}" type="range" min="0" max="${trace.snapshots.length-1}" step="1" data-scrubber aria-label="Vị trí bước">
 <section class="lab-explain"><div><p class="lab-kicker" data-action-label></p><p data-explanation aria-live="polite" aria-atomic="true"></p><div data-result></div></div><div><h3>Thuật toán đang làm gì?</h3><ol class="lab-code" data-code></ol></div></section>
 <section class="lab-checkpoints" aria-label="Mốc thành thạo"><div class="lab-mastery"><span class="lab-mastery-track" data-mastery-track></span><span data-mastery-label></span></div><div class="lab-checkpoint-nav" data-checkpoint-nav></div><div data-question></div></section>
 ${topic==='topic-04'?'<details class="lab-comparison" data-comparison><summary>So sánh Greedy và A* theo từng lần lấy nút</summary><p>Mỗi lần bấm tiến một lượt chọn ở cả hai thuật toán; các nút cuối giữ nguyên khi thuật toán đã kết thúc.</p><button type="button" data-action="compare">So sánh: mở rộng tiếp</button> <button type="button" data-action="compare-reset">Đặt lại so sánh</button><div class="lab-compare-grid" data-compare-grid></div></details>':''}
 <details><summary>Đọc toàn bộ bản ghi từng bước</summary><ol class="lab-trace-list" data-trace-list></ol></details>
 <div class="lab-footer"><span data-save-status role="status"></span><a href="${escape(root.dataset.source||'#')}" target="_blank" rel="noopener">${meta.source} ↗</a><button type="button" data-action="clear">Xóa tiến độ bài này</button></div><p class="lab-status">Tiến độ lưu lâu dài bằng localStorage trên trình duyệt này. Xóa dữ liệu trình duyệt sẽ xóa tiến độ; không đồng bộ sang thiết bị khác.</p>`;
 function persist(debounce=false){
  clearTimeout(saveTimer);saveTimer=null;if(external||disposed)return;
  if(debounce){saveTimer=setTimeout(()=>persist(),300);return;}
  const result=saveTopic(storage,topic,state);state=result.state;saveFailed=!result.ok;updateSaveLabel();window.dispatchEvent(new CustomEvent('lab:progress'));
 }
 function updateSaveLabel(){ $('[data-save-status]').textContent=saveFailed?'Tiến độ hiện chỉ được giữ trong phiên này.':state.updatedAt?`Đã lưu · ${new Date(state.updatedAt).toLocaleTimeString('vi-VN',{hour:'2-digit',minute:'2-digit'})} · tiếp tục được sau khi đóng trình duyệt`:'Tiến độ sẽ tự lưu khi bạn tương tác.'; }
 function pause(){playing=false;clearTimeout(timer);timer=null;gsap.killTweensOf(root.querySelectorAll('[data-explanation], .lab-frontier li'));gsap.set(root.querySelectorAll('[data-explanation], .lab-frontier li'),{clearProps:'opacity,transform'});terrain?.pause();document.querySelectorAll('.lab-flight').forEach(node=>{gsap.killTweensOf(node);node.remove();});const button=$('[data-action=play]');if(button){button.textContent='Phát';button.setAttribute('aria-label','Phát');}}
 function completeIfLast(){if(state.mode==='guided'&&state.stepIndex===trace.snapshots.length-1){state.guidedCompleted=true;state.unlocked=true;}}
 function renderParameters(){
  const disabled=state.mode!=='playground';
  $('[data-unlock-help]').textContent=disabled?'Đi hết lượt hướng dẫn để mở khóa phần tự chỉnh. Bạn có thể dùng thanh bước để đi tới phần tổng kết.':'Thay dữ kiện sẽ dừng lượt hiện tại và tính lại từ đầu. Các mốc thành thạo vẫn được giữ.';
  let html='';
  if(meta.kind==='terrain')html=`<fieldset class="lab-params" ${disabled?'disabled':''}><legend>Điểm bắt đầu (x, y) và số hạt giống để phát lại</legend><label>Cột x<input type="number" min="0" max="6" value="${state.config.start[0]}" data-param="start-x" aria-label="Cột bắt đầu x"></label><label>Hàng y<input type="number" min="0" max="6" value="${state.config.start[1]}" data-param="start-y" aria-label="Hàng bắt đầu y"></label><label>Seed<input type="number" min="0" max="4294967295" value="${state.config.seed}" data-param="seed" aria-label="Seed"></label></fieldset>`;
  else {
   html=`<fieldset class="lab-params" ${disabled?'disabled':''}><legend>Chi phí cạnh · từ 1 đến 9</legend>${graphFor(state.config.preset,state.config.costs).map(edge=>`<label>${edge.from} → ${edge.to}<input type="number" min="1" max="9" value="${edge.cost}" data-cost="${edge.from}-${edge.to}" aria-label="Chi phí ${edge.from} đến ${edge.to}"></label>`).join('')}</fieldset>`;
   if(topic==='topic-04')html+=`<fieldset class="lab-params" ${disabled?'disabled':''}><legend>h(n) · từ 0 đến 20 · h(G)=0</legend>${['S','A','B','C'].map(node=>`<label>h(${node})<input type="number" min="0" max="20" step="1" value="${state.config.heuristics[node]}" data-heuristic="${node}" aria-label="Heuristic ${node}"></label>`).join('')}</fieldset>`;
  }
  $('[data-parameter-fields]').innerHTML=html;
 }
 function updateMode(){
  $$('[data-mode]').forEach(button=>{const mode=button.dataset.mode;button.setAttribute('aria-pressed',String(state.mode===mode));button.disabled=mode==='playground'&&!state.unlocked;button.textContent=mode==='guided'?'01 · Có hướng dẫn':`02 · Tự khám phá${state.unlocked?'':' · chưa mở khóa'}`;});
  $('[data-field=preset]').disabled=state.mode==='guided';
  const h=$('[data-field=heuristicPreset]');if(h)h.disabled=state.mode==='guided';
  if($('[data-field=view]'))$('[data-field=view]').value=state.view;
  $('[data-field=algorithm]').value=state.config.algorithm;$('[data-field=preset]').value=state.config.preset;$('[data-field=speed]').value=String(state.speed);
 }
 function renderQuestion(){
  const indices=checkpointIndices(trace.snapshots.length),passed=Object.values(state.checkpoints).filter(item=>item.passed).length;
  $('[data-mastery-track]').innerHTML=meta.checkpoints.map(q=>`<i class="${state.checkpoints[q.id].passed?'passed':''}"></i>`).join('');
  $('[data-mastery-label]').textContent=state.badge?`Huy hiệu: ${meta.badge} · 3/3`:`Mốc thành thạo · ${passed}/3`;
  $('[data-checkpoint-nav]').innerHTML=meta.checkpoints.map((q,i)=>`<button type="button" data-question-id="${q.id}" ${state.mode!=='guided'||(state.stepIndex<indices[i]&&!state.checkpoints[q.id].passed)?'disabled':''} aria-pressed="${question===q.id}">${state.checkpoints[q.id].passed?'✓ ':''}${i+1}. ${q.title}</button>`).join('');
  const q=meta.checkpoints.find(item=>item.id===question),item=q&&state.checkpoints[q.id];
  $('[data-question]').innerHTML=q?`<div class="lab-question"><h3>${q.prompt}</h3><div class="lab-question-options">${q.options.map((label,i)=>`<button type="button" data-answer="${i}">${label}</button>`).join('')}</div><div class="lab-question-actions"><button type="button" data-action="skip-question">Bỏ qua / tiếp tục</button><button type="button" data-action="reveal">Xem giải thích</button></div><div class="lab-feedback ${questionError?'is-error':''}" role="status">${escape(questionFeedback|| (item.passed?'Bạn đã đạt mốc này. Có thể thử lại để ôn.':item.revealed?'Đã xem đáp án trong lượt này; bắt đầu lại để tự trả lời và ghi nhận.':'Hãy dự đoán trước khi xem giải thích.'))}</div></div>`:'';
 }
 async function ensureTerrain(){
  if(meta.kind!=='terrain')return;
  const container=$('[data-three]');container.hidden=state.view!=='3d';$('[data-scene]').hidden=state.view==='3d';
  if(state.view!=='3d'){terrain?.pause();return;}
  if(terrain){terrain.update(trace.snapshots[state.stepIndex],state.config.preset,!media.matches, state.speed);return;}
  if(terrainLoading)return;terrainLoading=true;
  try{const module=await loadTerrain(base);if(disposed)return;terrain=module.create(container,{gsap,reducedMotion:()=>media.matches,onSelect:(x,y)=>{if(state.mode==='playground'){state.config.start=[x,y];resetExperiment();}}});terrain.update(trace.snapshots[state.stepIndex],state.config.preset,false,state.speed);if(state.view!=='3d')terrain.pause();}
  catch(error){terrainError='Không mở được hình 3D trên trình duyệt này. Bạn vẫn có thể tiếp tục bằng bản đồ 2D.';state.view='2d';updateMode();$('[data-three]').hidden=true;$('[data-scene]').hidden=false;$('[data-scene-help]').textContent=terrainError;persist();}
  finally{terrainLoading=false;}
 }
 function render(animate=false,oldRect=null){
  const s=trace.snapshots[state.stepIndex];state.stepId=s.id;
  updateMode();
  $('[data-step-label]').textContent=`Bước ${state.stepIndex+1} / ${trace.snapshots.length}`;
  $('[data-scrubber]').max=String(trace.snapshots.length-1);$('[data-scrubber]').value=String(state.stepIndex);
  $('[data-action=prev]').disabled=state.stepIndex===0;$('[data-action=next]').disabled=state.stepIndex===trace.snapshots.length-1;
  $('[data-action=play]').textContent=playing?'Tạm dừng':'Phát';$('[data-action=play]').setAttribute('aria-label',playing?'Tạm dừng':'Phát');
  $('[data-explanation]').textContent=s.explanation;$('[data-action-label]').textContent=`${ALGORITHM_NAMES[state.config.algorithm]} · bước ${state.stepIndex+1}`;
  $('[data-code]').innerHTML=pseudocode(meta.kind,state.config.algorithm).map((line,i)=>`<li class="${i===s.codeLine?'is-current':''}" ${i===s.codeLine?'aria-current="step"':''}>${line}</li>`).join('');
  if(meta.kind==='search'){
   $('[data-scene]').innerHTML=graphHTML(trace,s,topic==='topic-04'?state.config.heuristics:null);
   $('[data-state]').innerHTML=`<p class="lab-status">${state.config.algorithm==='dfs'?'Đỉnh stack ở bên trái':state.config.algorithm==='bfs'?'Đầu queue ở bên trái':`Ưu tiên ${state.config.algorithm==='ucs'?'g':state.config.algorithm==='greedy'?'h':'f'}`} · đang xét: <strong>${s.active||'—'}</strong></p><ol class="lab-frontier">${s.frontier.length?s.frontier.map((item,i)=>`<li data-frontier-node="${item.node}" class="${i===0?'next':''}"><b>${item.node}</b><small>g=${item.g}${topic==='topic-04'?` h=${item.h} f=${item.f}`:''}</small><small>${item.path.join('→')}</small></li>`).join(''):'<li><small>Rỗng</small></li>'}</ol><p class="lab-status">Đã mở rộng: ${s.closed.join(' → ')||'chưa có'}</p><p class="lab-status">Đã lấy: ${s.selected.join(' → ')||'chưa có'}</p>`;
   $('[data-metrics]').innerHTML=metric('Đã mở rộng',s.metrics.expanded)+metric('Frontier lớn nhất',s.metrics.peak)+metric('Độ sâu hiện tại',s.activeEntry?.depth??0)+metric('g hiện tại',s.activeEntry?.g??0);
   $('[data-result]').innerHTML=s.result?`<div class="lab-result">${s.result.found?`Lời giải: <strong>${s.result.path.join(' → ')}</strong><br>${s.result.depth} cạnh · chi phí ${s.result.cost}`:'Không có lời giải: frontier đã rỗng.'}${state.mode==='guided'?' · Đã mở khóa chế độ tự khám phá.':''}</div>`:'';
   if(topic==='topic-04'){
    const d=heuristicDiagnostics(state.config);
    $('[data-diagnostics]').innerHTML=`<div class="lab-result">${d.admissible?'✓ h chấp nhận được':'! h vượt chi phí thật ở ít nhất một nút'}<br>${d.consistent?'✓ h nhất quán':'! h chưa nhất quán'}${!d.admissible?'<br>Không còn bảo đảm đường tối ưu với heuristic này.':''}<details><summary>Đối chiếu h và h*</summary><p>${Object.entries(d.distances).map(([n,v])=>`${n}: h=${state.config.heuristics[n]}, h*=${Number.isFinite(v)?v:'∞'}`).join(' · ')}</p></details></div>`;
   }
   $('[data-scene-help]').textContent='Các vị trí cố định để dễ đối chiếu. Mũi tên chỉ hướng đi; số trên cạnh là chi phí.';
  }else{
   $('[data-scene]').innerHTML=terrainGrid(s,state.config.preset,state.mode==='playground');
   const high=Math.max(...s.neighbors.map(n=>n.score));
   $('[data-state]').innerHTML=`<p class="lab-status">Hiện tại <strong>(${s.position}), Eval=${s.score}</strong> · tốt nhất (${s.best})</p><div class="lab-neighbors">${s.neighbors.map(item=>`<span class="${item.score===high?'best':''}">(${item.position}) = ${item.score}</span>`).join('')}</div>${s.proposal?.probability!==undefined?`<p class="lab-result">Δ=${s.proposal.delta} · T=${s.proposal.temperature.toFixed(2)}<br>p=${s.proposal.probability.toFixed(3)} · u=${s.proposal.sample.toFixed(3)}<br>${s.event==='inspect'?'Đang so sánh':s.proposal.accepted?'Chấp nhận':'Từ chối'}</p>`:''}`;
   $('[data-metrics]').innerHTML=metric('Eval hiện tại',s.score)+metric('Tốt nhất',s.bestScore)+metric('Đề xuất',s.metrics.proposals)+metric('Chấp nhận / từ chối',`${s.metrics.accepted} / ${s.metrics.rejected}`)+metric('Nhiệt độ T',s.temperature.toFixed(2))+metric('Lượt khởi động',s.metrics.restart+1);
   $('[data-result]').innerHTML=s.event==='finish'?`<div class="lab-result">Tốt nhất: (${trace.result.position}) · Eval=${trace.result.score}${state.mode==='guided'?' · Đã mở khóa tự khám phá.':''}</div>`:'';
   $('[data-scene-help]').textContent=terrainError||(state.view==='3d'?'Kéo để xoay, cuộn để thu phóng. Cam: hiện tại · xanh đậm: tốt nhất. Chế độ tự khám phá: chọn một ô làm điểm bắt đầu.':'●: hiện tại · viền đậm: tốt nhất · số trong ô: Eval. Trong chế độ tự khám phá, chọn ô để đặt điểm bắt đầu.');
   ensureTerrain();
  }
  renderQuestion();updateSaveLabel();
  if(animate&&!media.matches){
   gsap.fromTo($('[data-explanation]'),{opacity:.45,y:4},{opacity:1,y:0,duration:.25/state.speed,clearProps:'all'});
   if(s.event==='enqueue')gsap.fromTo($(`[data-frontier-node="${s.edge?.split('-')[1]}"]`),{opacity:0,y:12},{opacity:1,y:0,duration:.4/state.speed,clearProps:'all'});
   if(oldRect&&s.event==='select'){
    const target=$(`[data-map-node="${s.active}"]`)?.getBoundingClientRect();
    if(target){const flight=document.createElement('span');flight.className='lab-flight';flight.textContent=s.active;document.body.append(flight);gsap.fromTo(flight,{left:oldRect.left,top:oldRect.top},{left:target.left+10,top:target.top+10,duration:.5/state.speed,onComplete:()=>flight.remove()});}
   }
  }
 }
 function startQuestionAtCurrent(){if(state.mode!=='guided')return;const i=checkpointIndices(trace.snapshots.length).indexOf(state.stepIndex);if(i<0)return;const id=meta.checkpoints[i].id;if(!state.checkpoints[id].passed&&!skipped.has(id)){question=id;questionFeedback='';questionError=false;pause();}}
 const skipped=new Set();
 function go(index,autoplay=false,debounce=false){
  const bounded=Math.max(0,Math.min(trace.snapshots.length-1,index));if(bounded===state.stepIndex)return;
  if(!autoplay)pause();const next=trace.snapshots[bounded],oldRect=next.event==='select'?$(`[data-frontier-node="${next.active}"]`)?.getBoundingClientRect():null;
  gsap.killTweensOf($$('[data-explanation], .lab-frontier li'));state.stepIndex=bounded;question=null;questionFeedback='';
  completeIfLast();startQuestionAtCurrent();if(bounded===trace.snapshots.length-1)pause();render(true,oldRect);persist(debounce);
 }
 function schedule(){clearTimeout(timer);if(!playing)return;timer=setTimeout(()=>{if(!playing)return;go(state.stepIndex+1,true);schedule();},1400/state.speed);}
 function resetExperiment(){pause();question=null;skipped.clear();state=restartRun(state);rebuild();renderParameters();render();updateFullTrace();renderComparison();persist();}
 function updateFullTrace(){$('[data-trace-list]').innerHTML=trace.snapshots.map(s=>`<li>${escape(s.explanation)}</li>`).join('');}
 function renderComparison(){if(topic!=='topic-04')return;
  comparisonTraces||=['greedy','astar'].map(algorithm=>searchTrace({...state.config,algorithm}));
  $('[data-compare-grid]').innerHTML=comparisonTraces.map((t,i)=>{const selections=t.snapshots.filter(s=>s.event==='select'),step=Math.min(comparisonStep,selections.length-1),s=selections[step];return `<div><h3>${i===0?'Greedy':'A*'} · lượt ${step+1}/${selections.length}</h3>${graphHTML(t,s,null,false).replaceAll('lab-arrow-compare',`lab-arrow-compare-${i}`)}<p>Đang lấy: <strong>${s.active}</strong> · frontier: ${s.frontier.map(e=>`${e.node}(${i===0?e.h:e.f})`).join(', ')||'rỗng'}</p>${s.active==='G'?`<p>Lời giải ${t.result.path.join('→')} · chi phí <strong>${t.result.cost}</strong></p>`:!t.result.found&&step===selections.length-1?'<p>Hết frontier: không có lời giải.</p>':''}</div>`;}).join('');
 }
 function expand(){
  if(modal){modal.close();return;}
  pause();placeholder=document.createComment('lab workspace');root.before(placeholder);
  modal=document.createElement('dialog');modal.className='lab-dialog';modal.setAttribute('aria-label',meta.title);document.body.append(modal);modal.append(root);
  $('[data-action=expand]').textContent='Thu nhỏ';
  modal.addEventListener('close',()=>{placeholder.before(root);placeholder.remove();modal.remove();modal=null;placeholder=null;const control=$('[data-action=expand]');if(control){control.textContent='Mở rộng';control.focus();}else root.querySelector('[data-lab-launch]')?.focus();},{once:true});
  modal.showModal();$('h2').focus();
 }
 function confirmClear(){
  pause();const dialog=document.createElement('dialog');dialog.className='lab-confirm';dialog.setAttribute('aria-label','Xóa tiến độ bài này');dialog.innerHTML='<h2>Xóa tiến độ bài này?</h2><p>Vị trí học, dữ kiện đã chỉnh và huy hiệu thực hành của topic này sẽ bị xóa. Điểm thử thách được giữ.</p><button type="button" data-confirm>Đồng ý xóa</button><button type="button" data-cancel>Giữ tiến độ</button>';document.body.append(dialog);
  dialog.querySelector('[data-cancel]').onclick=()=>dialog.close();
  dialog.querySelector('[data-confirm]').onclick=()=>{clearTimeout(saveTimer);saveTimer=null;clearTopic(storage,topic);state=defaults(topic);external=null;question=null;questionFeedback='';skipped.clear();rebuild();renderParameters();render();updateFullTrace();renderComparison();window.dispatchEvent(new CustomEvent('lab:progress'));dialog.close();};
  dialog.addEventListener('close',()=>{dialog.remove();$('[data-action=clear]').focus();},{once:true});dialog.showModal();dialog.querySelector('[data-cancel]').focus();
 }
 function changeMode(mode){
  if(mode===state.mode||(mode==='playground'&&!state.unlocked))return;
  pause();if(state.mode==='playground')state.playgroundConfig=JSON.parse(JSON.stringify(state.config));
  state.mode=mode;
  if(mode==='guided')state.config={...defaults(topic).config};else if(state.playgroundConfig)state.config=JSON.parse(JSON.stringify(state.playgroundConfig));
  resetExperiment();
 }
 const clickHandler=event=>{
  const button=event.target.closest('button');if(!button||!root.contains(button)||button.disabled)return;
  if(button.dataset.mode){changeMode(button.dataset.mode);return;}
  if(button.dataset.cell&&state.mode==='playground'){state.config.start=button.dataset.cell.split(',').map(Number);resetExperiment();return;}
  if(button.dataset.questionId){pause();question=button.dataset.questionId;questionFeedback='';questionError=false;renderQuestion();return;}
  if(button.dataset.answer!==undefined&&question){
   const q=meta.checkpoints.find(item=>item.id===question),correct=Number(button.dataset.answer)===q.answer;
   state=checkpointAnswer(state,question,correct);questionError=!correct;
   questionFeedback=correct?(state.checkpoints[question].revealed?'Đúng theo lời giải đã xem. Bắt đầu lại lượt hướng dẫn để tự trả lời và ghi nhận. ': 'Chính xác! ')+q.explanation:'Chưa đúng. Hãy nhìn lại dữ kiện và thử lại; bạn không bị trừ điểm.';
   renderQuestion();persist();return;
  }
  switch(button.dataset.action){
   case 'prev':go(state.stepIndex-1);break;
   case 'next':go(state.stepIndex+1);break;
   case 'play':
    if(playing){pause();break;}
    if(state.stepIndex===trace.snapshots.length-1)resetExperiment();
    question=null;playing=true;render();schedule();break;
   case 'restart':resetExperiment();break;
   case 'expand':expand();break;
   case 'close':persist();dispose();root.dispatchEvent(new CustomEvent('lab:close'));root.querySelector('[data-lab-launch]')?.focus();break;
   case 'clear':confirmClear();break;
   case 'skip-question':if(question)skipped.add(question);question=null;renderQuestion();break;
   case 'reveal':{
    const q=meta.checkpoints.find(item=>item.id===question);if(!q)break;
    state=checkpointAnswer(state,question,false,true);questionFeedback='Đáp án:'+` ${q.options[q.answer]}. ${q.explanation} Bắt đầu lại lượt này để tự trả lời và ghi nhận.`;questionError=false;renderQuestion();persist();break;
   }
   case 'camera-reset':terrain?.reset();break;
   case 'compare':pause();comparisonStep++;renderComparison();break;
   case 'compare-reset':comparisonStep=0;renderComparison();break;
   case 'load-external':if(external){state=external;external=null;question=null;rebuild();renderParameters();render();updateFullTrace();renderComparison();$('[data-external]').hidden=true;}break;
   case 'keep-current':external=null;$('[data-external]').hidden=true;persist();break;
  }
 };
 function applyField(event){
  const target=event.target;if(!target.matches('select,input[type=number]'))return;
  const field=target.dataset.field;
  if(field==='speed'){state.speed=Number(target.value);if(playing)schedule();persist();return;}
  if(field==='view'){pause();state.view=target.value;render();persist();return;}
  if(field==='algorithm'){state.config.algorithm=target.value;resetExperiment();return;}
  if(field==='preset'){state.config.preset=target.value;state.config.costs={};resetExperiment();return;}
  if(field==='heuristicPreset'){
   if(target.value==='default')state.config.heuristics={...DEFAULT_H};
   if(target.value==='zero')state.config.heuristics={S:0,A:0,B:0,C:0,G:0};
   if(target.value==='over')state.config.heuristics={S:4,A:8,B:2,C:6,G:0};
   resetExperiment();return;
  }
  if(target.type==='number'){
   if(target.value===''||!target.checkValidity()){target.reportValidity();return;}
   const value=Number(target.value);
   if(target.dataset.cost)state.config.costs[target.dataset.cost]=value;
   if(target.dataset.heuristic){state.config.heuristics[target.dataset.heuristic]=value;$('[data-field=heuristicPreset]').value='custom';}
   if(target.dataset.param==='start-x')state.config.start[0]=value;
   if(target.dataset.param==='start-y')state.config.start[1]=value;
   if(target.dataset.param==='seed')state.config.seed=value;
   resetExperiment();
  }
 }
 function onVisibility(){if(document.hidden){pause();persist();terrain?.pause();}}
 function onPageHide(){pause();persist();terrain?.pause();}
 function onStorage(event){
  if(event.key!==STORAGE_KEY&&event.key!==null)return;
  const incoming=loadTopic(storage,topic);if(incoming.updatedAt===state.updatedAt)return;
  if(incoming.updatedAt<state.updatedAt&&incoming.updatedAt!==0)return;
  clearTimeout(saveTimer);saveTimer=null;
  if(playing){pause();external=incoming;const banner=$('[data-external]');banner.hidden=false;banner.innerHTML='Tiến độ bài này vừa thay đổi ở tab khác. Chọn phiên bạn muốn tiếp tục.<br><button type="button" data-action="load-external">Tải tiến độ mới</button><button type="button" data-action="keep-current">Giữ phiên này</button>';}
  else{state=incoming;question=null;rebuild();renderParameters();render();updateFullTrace();renderComparison();}
 }
 const observer=new IntersectionObserver(entries=>{if(!entries[0].isIntersecting){pause();persist();terrain?.pause();}},{threshold:.02});observer.observe(root);
 function onMotion(){pause();terrain?.pause();}
 function dispose(){
  pause();persist();disposed=true;generation++;clearTimeout(saveTimer);observer.disconnect();terrain?.dispose();
  if(modal)modal.close();root.removeEventListener('click',clickHandler);root.removeEventListener('change',applyField);
  document.removeEventListener('visibilitychange',onVisibility);window.removeEventListener('pagehide',onPageHide);window.removeEventListener('storage',onStorage);media.removeEventListener('change',onMotion);
 }
 root.addEventListener('click',clickHandler);root.addEventListener('change',applyField);
 $('[data-scrubber]').addEventListener('input',event=>go(Number(event.target.value),false,true));
 document.addEventListener('visibilitychange',onVisibility);window.addEventListener('pagehide',onPageHide);window.addEventListener('storage',onStorage);media.addEventListener('change',onMotion);
 renderParameters();render();updateFullTrace();renderComparison();
}
window.AILabRuntime={mount};
