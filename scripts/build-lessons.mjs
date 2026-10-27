import { spawnSync } from 'node:child_process';
import { readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const defaultArchifyRoot = '/Volumes/data/Work/Tool/archify/archify';
const archifyRoot = path.resolve(process.env.ARCHIFY_PACKAGE_ROOT || defaultArchifyRoot);
const cli = path.join(archifyRoot, 'bin', 'archify.mjs');
const manifestPath = path.join(repoRoot, 'lessons', 'manifest.json');
const indexPath = path.join(repoRoot, 'lessons', 'index.html');

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, character => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
  })[character]);
}

function localHref(fromDirectory, repositoryPath, fragment = '') {
  const absoluteTarget = path.resolve(repoRoot, repositoryPath);
  const relativeTarget = path.relative(path.resolve(repoRoot, fromDirectory), absoluteTarget).split(path.sep).join('/');
  const encoded = relativeTarget.split('/').map(encodeURIComponent).join('/');
  return `${encoded}${fragment}`;
}

function renderIndex(manifest) {
  const groups = new Map();
  for (const lesson of manifest.lessons) {
    if (!groups.has(lesson.group)) groups.set(lesson.group, []);
    groups.get(lesson.group).push(lesson);
  }

  const sections = [...groups.entries()].map(([group, lessons]) => `
    <section class="group" aria-labelledby="${escapeHtml(group)}">
      <h2 id="${escapeHtml(group)}">${escapeHtml(group)}</h2>
      <div class="cards">${lessons.map(lesson => {
        const pdfPage = `#page=${lesson.sourcePages[0]}`;
        return `
          <article class="lesson" data-lesson-id="${escapeHtml(lesson.id)}">
            <div class="lesson-top"><span class="topic">Topic ${escapeHtml(lesson.topic)}</span><span class="arrow" aria-hidden="true">↗</span></div>
            <h3><a href="${escapeHtml(localHref('lessons', lesson.output))}">${escapeHtml(lesson.title)}</a></h3>
            <p>${escapeHtml(lesson.summary)}</p>
            <p class="challenge-status">Đang tải tiến độ…</p>
            <div class="links">
              <a href="challenge.html?topic=${encodeURIComponent(lesson.id)}">Chơi thử thách →</a>
              <a href="${escapeHtml(localHref('lessons', lesson.note))}">Ghi chú RAG</a>
              <a href="${escapeHtml(localHref('lessons', lesson.sourcePdf, pdfPage))}">PDF · slide ${lesson.sourcePages[0]}–${lesson.sourcePages[1]}</a>
            </div>
          </article>`;
      }).join('')}</div>
    </section>`).join('\n');

  return `<!doctype html>
<html lang="vi">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${escapeHtml(manifest.title)}</title>
  <script defer src="challenge-core.js"></script>
  <script defer src="index-progress.js"></script>
  <script defer src="lesson-catalog.js"></script>
  <script defer src="chat-widget.js"></script>
  <style>
    :root { color-scheme: light; --ink:#192d36; --muted:#5c7078; --line:#dce6e7; --accent:#0a706b; --paper:#f4f8f7; }
    * { box-sizing:border-box; }
    body { margin:0; background:var(--paper); color:var(--ink); font-family:ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif; line-height:1.55; }
    main { width:min(1100px,calc(100% - 40px)); margin:0 auto; padding:58px 0 72px; }
    header { padding:34px 38px 32px; border-radius:24px; color:#f4fbfa; background:linear-gradient(125deg,#153a42,#117c73); box-shadow:0 18px 45px #16443d20; }
    .eyebrow { margin:0 0 10px; color:#bde9dc; font-size:12px; font-weight:700; letter-spacing:.12em; text-transform:uppercase; }
    h1 { max-width:720px; margin:0; font-size:clamp(30px,5vw,48px); line-height:1.12; letter-spacing:-.035em; }
    header p:last-child { max-width:650px; margin:15px 0 0; color:#d8ecea; font-size:16px; }
    .stats { display:flex; gap:10px; margin:22px 0 0; flex-wrap:wrap; }
    .stats span { padding:7px 11px; border:1px solid #b9e6db60; border-radius:999px; background:#ffffff12; font-size:13px; }
    .group { margin-top:38px; }
    .group h2 { margin:0 0 14px; font-size:18px; letter-spacing:-.01em; }
    .cards { display:grid; grid-template-columns:repeat(2,minmax(0,1fr)); gap:14px; }
    .lesson { min-width:0; padding:21px 22px 18px; border:1px solid var(--line); border-radius:17px; background:#fff; box-shadow:0 3px 13px #153d3710; }
    .lesson-top { display:flex; justify-content:space-between; align-items:center; color:var(--accent); }
    .topic { font-size:12px; font-weight:750; letter-spacing:.04em; }
    .arrow { font-size:20px; opacity:.65; }
    h3 { margin:9px 0 7px; font-size:19px; line-height:1.3; }
    h3 a { color:var(--ink); text-decoration:none; }
    h3 a:hover { color:var(--accent); text-decoration:underline; text-underline-offset:3px; }
    .lesson p { min-height:48px; margin:0; color:var(--muted); font-size:14px; }
    .lesson p.challenge-status { min-height:0; margin-top:12px; color:#075e59; font-weight:700; }
    .links { display:flex; flex-wrap:wrap; gap:9px 16px; margin-top:18px; padding-top:13px; border-top:1px solid #edf1f1; }
    .links a { color:var(--accent); font-size:13px; font-weight:650; text-decoration:none; }
    .links a:hover { text-decoration:underline; text-underline-offset:3px; }
    footer { margin-top:34px; color:var(--muted); font-size:13px; }
    @media (max-width:680px) { main { width:min(100% - 24px,580px); padding:18px 0 44px; } header { padding:27px 24px; border-radius:19px; } .cards { grid-template-columns:1fr; } .lesson p { min-height:0; } }
  </style>
</head>
<body>
  <main>
    <header>
      <p class="eyebrow">Bộ học liệu · bản local</p>
      <h1>${escapeHtml(manifest.title)}</h1>
      <p>Mở một topic, bấm qua ví dụ theo từng bước, rồi quay lại ghi chú hoặc trang slide tương ứng.</p>
      <div class="stats"><span>${manifest.lessons.length} bài minh họa</span><span id="challenge-summary" aria-live="polite">Đang tải tiến độ…</span><span>Mở được khi không có mạng</span></div>
    </header>
    ${sections}
    <footer>Các bài minh họa là ví dụ học tập gắn với slide nguồn. Số liệu minh họa được ghi rõ trong từng bài.</footer>
  </main>
</body>
</html>
`;
}

const manifest = JSON.parse(await readFile(manifestPath, 'utf8'));
if (!Array.isArray(manifest.lessons) || manifest.lessons.length !== 12) {
  throw new Error(`Expected 12 lessons; found ${manifest.lessons?.length ?? 'none'}.`);
}
const missingFiles = [];
for (const lesson of manifest.lessons) {
  for (const repositoryPath of [lesson.candidate, lesson.note, lesson.sourcePdf]) {
    try { await readFile(path.resolve(repoRoot, repositoryPath)); }
    catch { missingFiles.push(repositoryPath); }
  }
}
if (missingFiles.length) throw new Error(`Missing lesson inputs:\n${missingFiles.join('\n')}`);
try { await readFile(cli); }
catch { throw new Error(`Archify CLI not found at ${cli}. Set ARCHIFY_PACKAGE_ROOT to its installed package directory.`); }

const built = [];
for (const lesson of manifest.lessons) {
  const candidate = path.resolve(repoRoot, lesson.candidate);
  const output = path.resolve(repoRoot, lesson.output);
  const result = spawnSync(process.execPath, [cli, 'finalize', 'explainer', candidate, output, '--json'], {
    cwd: repoRoot,
    encoding: 'utf8',
    maxBuffer: 8 * 1024 * 1024,
  });
  if (result.error || result.status !== 0) {
    const details = [result.stderr, result.stdout].filter(Boolean).join('\n').slice(-7000);
    throw new Error(`Archify failed for Topic ${lesson.topic} (exit ${result.status ?? 'unknown'}).\n${details}`);
  }
  const generated = await readFile(output, 'utf8');
  const anchor = '</main><footer>';
  if (generated.split(anchor).length !== 2) throw new Error(`Cannot locate a unique lesson footer for ${lesson.id}`);
  const challengeHref = `${localHref(path.dirname(lesson.output), 'lessons/challenge.html')}?topic=${encodeURIComponent(lesson.id)}`;
  const challengeCta = `<section aria-label="Thử thách luyện tập" style="margin:24px auto;padding:22px;max-width:1000px;border:1px solid #b9d9d0;border-radius:16px;background:#edf8f3;color:#153a42;font-family:system-ui,sans-serif"><h2 style="margin:0 0 8px">Sẵn sàng thử sức?</h2><p>Áp dụng kiến thức qua ba bước, nhận phản hồi và lưu điểm cao nhất trên trình duyệt này.</p><a href="${escapeHtml(challengeHref)}" style="display:inline-block;padding:12px 18px;border-radius:10px;background:#086c64;color:white;font-weight:700;text-decoration:none">Chơi thử thách →</a></section>`;
  const chatMeta = `<meta name="course-chat-topic" content="${escapeHtml(lesson.id)}"><link rel="stylesheet" href="${escapeHtml(localHref(path.dirname(lesson.output), 'lessons/chat-widget.css'))}">`;
  const chatScripts = `<script defer src="${escapeHtml(localHref(path.dirname(lesson.output), 'lessons/lesson-catalog.js'))}"></script><script defer src="${escapeHtml(localHref(path.dirname(lesson.output), 'lessons/chat-widget.js'))}"></script>`;
  if (generated.split('</head>').length !== 2 || !generated.endsWith('</script></body></html>')) throw new Error(`Cannot locate the unique document head and body ending for ${lesson.id}`);
  const withChatHead = generated.replace('</head>', `${chatMeta}</head>`);
  const withChallenge = withChatHead.replace(anchor, `${challengeCta}${anchor}`);
  const bodyEnd = '</script></body></html>';
  const bodyEndPosition = withChallenge.lastIndexOf(bodyEnd);
  await writeFile(output, `${withChallenge.slice(0, bodyEndPosition)}${chatScripts}${withChallenge.slice(bodyEndPosition)}`, 'utf8');
  const record = { id: lesson.id, output: lesson.output, stdout: result.stdout.trim() };
  built.push(record);
  process.stdout.write(`Built Topic ${lesson.topic}: ${path.relative(repoRoot, output)}\n`);
}

for (const lesson of manifest.lessons) {
  try { await readFile(path.resolve(repoRoot, lesson.output)); }
  catch { throw new Error(`Archify reported success but did not create ${lesson.output}.`); }
}
await writeFile(indexPath, renderIndex(manifest), 'utf8');
const catalog = manifest.lessons.map(lesson => ({
  id: lesson.id, topic: lesson.topic, title: lesson.title,
  output: localHref('lessons', lesson.output),
  source: localHref('lessons', lesson.sourcePdf),
  note: localHref('lessons', lesson.note),
}));
await writeFile(path.join(repoRoot, 'lessons', 'lesson-catalog.js'), `window.LessonCatalog = ${JSON.stringify(catalog, null, 2)};\n`, 'utf8');
const receipt = {
  generatedAt: new Date().toISOString(),
  archifyRoot,
  lessonCount: built.length,
  index: path.relative(repoRoot, indexPath),
  lessons: built,
};
await writeFile(path.join(repoRoot, 'lessons', 'build-receipt.json'), `${JSON.stringify(receipt, null, 2)}\n`, 'utf8');
process.stdout.write(`Built offline index: ${path.relative(repoRoot, indexPath)}\n`);
