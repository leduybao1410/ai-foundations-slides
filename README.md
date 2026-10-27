# Cơ sở Trí tuệ Nhân tạo — ghi chú học và truy xuất

Repo ghi chú tiếng Việt dựa trên bộ slide của môn Cơ sở Trí tuệ Nhân tạo. Mỗi topic có một trang ngắn để ôn nhanh, hiểu bằng ví dụ và lần ngược về số trang trong PDF gốc.

## Bắt đầu

1. Mở [`agents/README.md`](agents/README.md) để xem mục lục.
2. Mở [`agents/course-rag.md`](agents/course-rag.md) để định tuyến câu hỏi đến topic phù hợp.
3. Đọc ghi chú trong `agents/topics/`; khi cần chi tiết, xem slide nguồn được ghi cuối mỗi trang.

## Cấu trúc

- `agents/`: chỉ mục và ghi chú đã chuẩn hóa cho truy xuất RAG.
- `agents/topics/`: một tệp Markdown cho mỗi topic, để truy xuất theo chương.
- `Topic *.pdf`: tài liệu nguồn hiện có trong repo.

Nội dung giải thích dùng tiếng Việt, giữ thuật ngữ tiếng Anh thường gặp và tách rõ kiến thức theo slide với ví dụ diễn giải thêm.

## Trợ lý chat trong bài học

Chat nổi ở mục lục, trang minh họa và thử thách. Khi gửi câu hỏi, trình duyệt tải ghi chú của topic đang chọn rồi gọi `/api/chat`; Vercel Function chuyển câu hỏi và ghi chú giới hạn kích thước tới n8n. Secret chỉ nằm ở Vercel và credential n8n. Workflow này dùng n8n hiện có tại `https://epic-n8n.n1.tinhgon.xyz`.

### Kết nối n8n

1. Trong n8n, import [`integrations/n8n/course-chat.workflow.json`](integrations/n8n/course-chat.workflow.json).
2. Tạo credential **Header Auth** cho node **Website chat webhook**: header `X-Course-Chat-Key`, value là một chuỗi bí mật dài, sinh riêng cho app này.
3. Chọn credential **Header Auth** có header `Authorization` và domain `api.deepseek.com` cho node **DeepSeek course answer**. Workflow dùng model `deepseek-flash`, theo cách EPIC đang gọi DeepSeek.
4. Chọn credential mới ở node webhook và credential DeepSeek hiện có ở node model, lưu rồi activate workflow. Dùng **Production URL** của webhook: `https://epic-n8n.n1.tinhgon.xyz/webhook/ai-foundations-chat`.
5. Trong Vercel Project → Settings → Environment Variables, đặt `N8N_CHAT_WEBHOOK_URL` (Production URL), `N8N_CHAT_SHARED_SECRET` (đúng giá trị ở bước 2), và `CHAT_ALLOWED_HOSTNAMES=ai-foundations-slides.vercel.app`. Thêm custom domain vào danh sách nếu có. Redeploy sau khi cập nhật biến môi trường.

Tên biến có trong [`.env.example`](.env.example). Không commit giá trị bí mật. Workflow nhập vào ở trạng thái **inactive** để credentials được thiết lập trước khi kích hoạt. API trả `503` tới khi đủ biến môi trường. Endpoint kiểm tra `Origin`, giới hạn kích thước nội dung, thời gian chờ và độ dài câu trả lời; bộ giới hạn 12 tin/phút trong function chỉ có tính best-effort theo từng instance Vercel. Trước khi mở chat công khai ở quy mô lớn, hãy bật rate limit ở Vercel Firewall hoặc lớp gateway có bộ đếm dùng chung.

Chat trả lời dựa trên ghi chú topic, giữ tối đa sáu lượt gần nhất trong sessionStorage của tab và không lưu lịch sử hội thoại ở server. Workflow tắt lưu kết quả chạy thành công/lỗi trong n8n execution history. Dù vậy, người học không nên gửi thông tin cá nhân; câu trả lời AI cần được đối chiếu với slide nguồn.
