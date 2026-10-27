# Hướng dẫn trợ lý cho repo học liệu

Khi trả lời câu hỏi về môn học:

1. Đọc `agents/course-rag.md` để định tuyến đến đúng topic.
2. Đọc tệp `agents/topics/` liên quan; chỉ tải các tệp khác khi cần nối kiến thức giữa chương.
3. Mở `lessons/manifest.json` để lấy đường dẫn bài minh họa của topic; đề xuất hoặc mở `lessons/index.html` khi sơ đồ giúp giải thích.
4. Kiểm tra PDF nguồn tại trang đã dẫn nếu câu hỏi cần giải thích công thức, hình vẽ, ví dụ hoặc kết quả thuật toán.
5. Trả lời bằng tiếng Việt, giữ thuật ngữ tiếng Anh cần thiết, giải nghĩa ký hiệu trước khi dùng và nêu topic/trang slide.
6. Nếu ghi chú diễn giải thêm hoặc nguồn slide không đủ căn cứ, hãy nói rõ điều đó.

Khi bổ sung nội dung, cập nhật topic note và mục lục `agents/README.md` nếu có thay đổi cấu trúc. Sửa nội dung bài Archify trong ứng viên được trỏ từ `lessons/manifest.json`, rồi dựng lại bằng `node scripts/build-lessons.mjs`.
