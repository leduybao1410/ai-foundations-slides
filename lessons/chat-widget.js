(() => {
  if (document.getElementById("course-chat-root")) return;

  const widgetScriptUrl = document.currentScript.src;
  const catalogUrl = new URL("lesson-catalog.js", widgetScriptUrl);
  if (Array.isArray(window.LessonCatalog)) mount();
  else {
    const catalogScript = document.createElement("script");
    catalogScript.src = catalogUrl.href;
    catalogScript.onload = mount;
    catalogScript.onerror = mount;
    document.head.append(catalogScript);
  }

  function mount() {
    const catalog = Array.isArray(window.LessonCatalog) ? window.LessonCatalog : [];
    const currentTopic = document.querySelector('meta[name="course-chat-topic"]')?.content ?? "";
    const params = new URLSearchParams(location.search);
    const requestedTopic = params.get("topic") || currentTopic;
    const root = document.createElement("div");
    root.id = "course-chat-root";
    root.innerHTML = `
      <button class="course-chat-launcher" type="button" aria-expanded="false" aria-controls="course-chat-panel">Hỏi trợ lý AI</button>
      <section class="course-chat-panel" id="course-chat-panel" hidden aria-label="Trợ lý học AI">
        <header class="course-chat-header"><div><strong>Trợ lý học AI</strong><span>Hỏi về slide và ví dụ của môn học</span></div><button type="button" class="course-chat-close" aria-label="Đóng">×</button></header>
        <label class="course-chat-topic-label" for="course-chat-topic">Chủ đề</label>
        <select id="course-chat-topic" class="course-chat-topic"></select>
        <div class="course-chat-log" role="log" aria-live="polite"><p class="course-chat-welcome">Chọn chủ đề rồi hỏi về khái niệm, ví dụ hoặc ký hiệu trong bài.</p></div>
        <form class="course-chat-form"><label class="course-chat-sr" for="course-chat-input">Câu hỏi</label><textarea id="course-chat-input" maxlength="1000" rows="2" placeholder="Nhập câu hỏi…" required></textarea><button type="submit">Gửi</button></form>
        <p class="course-chat-note">Câu trả lời AI có thể sai; hãy đối chiếu slide nguồn.</p>
      </section>`;
    document.body.append(root);
    const css = document.createElement("link");
    css.rel = "stylesheet";
    css.href = new URL("chat-widget.css", widgetScriptUrl).href;
    document.head.append(css);

    const select = root.querySelector(".course-chat-topic");
    const blank = document.createElement("option");
    blank.value = "";
    blank.textContent = "Chọn bài học";
    select.append(blank);
    for (const lesson of catalog) {
      const option = document.createElement("option");
      option.value = lesson.id;
      option.textContent = `Topic ${lesson.topic} · ${lesson.title}`;
      select.append(option);
    }
    if (catalog.some((lesson) => lesson.id === requestedTopic)) select.value = requestedTopic;

    const launcher = root.querySelector(".course-chat-launcher");
    const panel = root.querySelector(".course-chat-panel");
    const log = root.querySelector(".course-chat-log");
    const form = root.querySelector(".course-chat-form");
    const input = root.querySelector("#course-chat-input");
    const close = root.querySelector(".course-chat-close");
    const storageKey = () => `ai-foundations-course-chat-v1:${select.value || "unselected"}`;
    let history = [];
    try {
      const saved = JSON.parse(sessionStorage.getItem(storageKey()) || "[]");
      if (Array.isArray(saved)) history = saved.filter((item) => item && ["user", "assistant"].includes(item.role) && typeof item.content === "string").slice(-12);
    } catch { history = []; }
    for (const item of history) appendBubble(item.role, item.content);
    select.addEventListener("change", () => {
      history = [];
      log.replaceChildren();
      const welcome = document.createElement("p");
      welcome.className = "course-chat-welcome";
      welcome.textContent = "Chọn chủ đề rồi hỏi về khái niệm, ví dụ hoặc ký hiệu trong bài.";
      log.append(welcome);
      try { sessionStorage.removeItem(storageKey()); } catch { /* Chat still works without session storage. */ }
    });

    launcher.addEventListener("click", () => {
      panel.hidden = !panel.hidden;
      launcher.setAttribute("aria-expanded", String(!panel.hidden));
      if (!panel.hidden) input.focus();
    });
    close.addEventListener("click", () => { panel.hidden = true; launcher.setAttribute("aria-expanded", "false"); launcher.focus(); });

    form.addEventListener("submit", async (event) => {
      event.preventDefault();
      const message = input.value.trim();
      const lesson = catalog.find((item) => item.id === select.value);
      if (!message || !lesson) {
        if (!lesson) select.focus();
        return;
      }
      appendBubble("user", message);
      history.push({ role: "user", content: message });
      history = history.slice(-12);
      input.value = "";
      input.disabled = true;
      form.querySelector("button").disabled = true;
      const pending = appendBubble("assistant", "Đang tìm câu trả lời…");
      try {
        const noteUrl = new URL(lesson.note, catalogUrl);
        const noteResponse = await fetch(noteUrl, { cache: "no-cache" });
        if (!noteResponse.ok) throw new Error("Không tải được ghi chú topic.");
        const topicNotes = await noteResponse.text();
        const response = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            topicId: lesson.id,
            lessonTitle: lesson.title,
            topicNotes,
            message,
            context: history.slice(0, -1),
          }),
        });
        const data = await response.json();
        if (!response.ok) throw new Error(data.error || "Không gửi được câu hỏi.");
        pending.textContent = data.output;
        history.push({ role: "assistant", content: data.output });
        history = history.slice(-12);
        try { sessionStorage.setItem(storageKey(), JSON.stringify(history)); } catch { /* Chat still works without session storage. */ }
      } catch (error) {
        pending.textContent = error.message || "Trợ lý tạm thời không hoạt động. Vui lòng thử lại sau.";
        pending.classList.add("course-chat-error");
      } finally {
        input.disabled = false;
        form.querySelector("button").disabled = false;
        input.focus();
      }
    });

    function appendBubble(role, content) {
      const bubble = document.createElement("p");
      bubble.className = `course-chat-message course-chat-${role}`;
      bubble.textContent = content;
      log.append(bubble);
      log.scrollTop = log.scrollHeight;
      return bubble;
    }
  }
})();
