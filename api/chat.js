const TOPICS = new Set([
  "topic-01", "topic-02-03", "topic-04", "topic-05", "topic-05-1", "topic-06",
  "topic-07", "topic-08", "topic-09", "topic-10", "topic-11", "topic-12",
]);
const MAX_BODY_BYTES = 24_000;
const MAX_MESSAGE_LENGTH = 1_000;
const MAX_CONTEXT_ITEMS = 6;
const MAX_CONTEXT_LENGTH = 1_000;
const MAX_NOTE_LENGTH = 12_000;
const LOCAL_HOSTS = new Set(["localhost", "127.0.0.1", "[::1]"]);
const recentRequests = new Map();

function reply(res, status, body) {
  res.statusCode = status;
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  res.setHeader("Cache-Control", "no-store");
  res.end(JSON.stringify(body));
}

async function readBody(req) {
  if (req.body && typeof req.body === "object") return req.body;
  const chunks = [];
  let size = 0;
  for await (const chunk of req) {
    size += chunk.length;
    if (size > MAX_BODY_BYTES) throw Object.assign(new Error("too_large"), { status: 413 });
    chunks.push(chunk);
  }
  try { return JSON.parse(Buffer.concat(chunks).toString("utf8")); }
  catch { throw Object.assign(new Error("invalid_json"), { status: 400 }); }
}

function validOrigin(origin, hostnames) {
  if (!origin) return false;
  let parsed;
  try { parsed = new URL(origin); } catch { return false; }
  if (parsed.origin !== origin || parsed.username || parsed.password) return false;
  if (process.env.NODE_ENV !== "production" && LOCAL_HOSTS.has(parsed.hostname)) {
    return parsed.protocol === "http:" || parsed.protocol === "https:";
  }
  return parsed.protocol === "https:" && !parsed.port && hostnames.includes(parsed.hostname.toLowerCase());
}

function allowedByLocalThrottle(key) {
  const now = Date.now();
  const cutoff = now - 60_000;
  const timestamps = (recentRequests.get(key) ?? []).filter((value) => value > cutoff);
  if (timestamps.length >= 12) return false;
  timestamps.push(now);
  recentRequests.set(key, timestamps);
  if (recentRequests.size > 500) {
    for (const [candidate, values] of recentRequests) {
      if (!values.some((value) => value > cutoff)) recentRequests.delete(candidate);
    }
  }
  return true;
}

function parseInput(body) {
  if (!body || typeof body !== "object" || Array.isArray(body)) return null;
  const message = typeof body.message === "string" ? body.message.trim() : "";
  const topicId = typeof body.topicId === "string" ? body.topicId : "";
  if (!message || message.length > MAX_MESSAGE_LENGTH || !TOPICS.has(topicId)) return null;
  if (!Array.isArray(body.context) || body.context.length > MAX_CONTEXT_ITEMS) return null;
  const context = [];
  for (const item of body.context) {
    if (!item || typeof item !== "object" || !["user", "assistant"].includes(item.role)
      || typeof item.content !== "string" || !item.content.trim() || item.content.length > MAX_CONTEXT_LENGTH) return null;
    context.push({ role: item.role, content: item.content.trim() });
  }
  if (typeof body.lessonTitle !== "string" || body.lessonTitle.length > 160
    || typeof body.topicNotes !== "string" || body.topicNotes.length > MAX_NOTE_LENGTH) return null;
  return { message, topicId, lessonTitle: body.lessonTitle, topicNotes: body.topicNotes, context };
}

module.exports = async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return reply(res, 405, { error: "Method not allowed." });
  }

  const hostnames = (process.env.CHAT_ALLOWED_HOSTNAMES ?? "").split(",").map((item) => item.trim().toLowerCase()).filter(Boolean);
  if (!validOrigin(req.headers.origin, hostnames)) return reply(res, 403, { error: "Invalid request origin." });
  if (Number(req.headers["content-length"] ?? 0) > MAX_BODY_BYTES) return reply(res, 413, { error: "Request is too large." });

  let input;
  try { input = parseInput(await readBody(req)); }
  catch (error) { return reply(res, error.status ?? 400, { error: error.status === 413 ? "Request is too large." : "Invalid request." }); }
  if (!input) return reply(res, 400, { error: "Invalid chat message." });

  const webhook = process.env.N8N_CHAT_WEBHOOK_URL;
  const secret = process.env.N8N_CHAT_SHARED_SECRET;
  if (!webhook || !secret || !hostnames.length) return reply(res, 503, { error: "Chat is not configured yet." });
  try {
    const target = new URL(webhook);
    if (target.protocol !== "https:" || target.username || target.password) return reply(res, 503, { error: "Chat is not configured yet." });
  } catch { return reply(res, 503, { error: "Chat is not configured yet." }); }

  const clientKey = String(req.headers["x-forwarded-for"] ?? "unknown").split(",")[0].trim().slice(0, 80);
  if (!allowedByLocalThrottle(clientKey)) return reply(res, 429, { error: "Please wait a moment before sending another message." });

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 20_000);
  try {
    const response = await fetch(webhook, {
      method: "POST",
      headers: { "Content-Type": "application/json", "X-Course-Chat-Key": secret },
      body: JSON.stringify(input),
      cache: "no-store",
      signal: controller.signal,
    });
    if (!response.ok) return reply(res, 502, { error: "The course assistant is temporarily unavailable." });
    const data = await response.json();
    const output = typeof data.output === "string" ? data.output.trim() : "";
    if (!output || output.length > 4_000) return reply(res, 502, { error: "The course assistant returned an invalid answer." });
    return reply(res, 200, { output });
  } catch {
    return reply(res, 502, { error: "The course assistant is temporarily unavailable." });
  } finally { clearTimeout(timeout); }
}
