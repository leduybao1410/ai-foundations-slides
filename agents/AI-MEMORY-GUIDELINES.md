# Hướng dẫn duy trì bộ ghi chú RAG

## Cách truy xuất

1. Tìm cụm từ trong [`README.md`](README.md) hoặc `course-rag.md` để chọn topic.
2. Đọc đúng tệp topic; không nạp cả bộ nếu câu hỏi chỉ thuộc một chương.
3. Nếu cần độ chính xác về công thức, hình hoặc ví dụ gốc, mở PDF nguồn và kiểm tra trang được dẫn trong ghi chú.
4. Với khái niệm cần nhìn quan hệ hoặc theo thuật toán, dùng `lessons/manifest.json` để tìm HTML tương ứng; `lessons/index.html` mở offline và liên kết tới ghi chú/PDF.
5. Trong câu trả lời, chỉ ra topic và số trang liên quan. Nếu slide thiếu chi tiết, nói rõ phần diễn giải là bổ sung.

Trong repo, tìm kiếm toàn văn bằng `rg -n "từ khóa" agents/`. Với truy vấn ngữ nghĩa, dùng `agents/` làm corpus chính, nhưng kiểm chứng kết quả bằng PDF trước khi khẳng định một chi tiết cụ thể.

## Quy tắc nội dung

- Một tệp cho một topic; mỗi tệp độc lập, có tiêu đề rõ và thuật ngữ đồng nghĩa Việt/Anh để tăng khả năng tìm kiếm.
- Ghi nguồn là tên PDF và số trang hoặc khoảng trang, không chỉ ghi tên chương.
- Giữ công thức và các bước cốt lõi ở dạng chữ trong topic note; HTML Archify minh họa quan hệ và thao tác theo bước, không thay corpus văn bản.
- Đánh dấu ví dụ tự tạo là “Ví dụ giải thích”; giữ nguyên kết quả và thuật ngữ trong slide khi dẫn ví dụ của giảng viên.
- Không suy diễn rằng hai thuật toán tương đương chỉ vì chúng cùng tìm lời giải; nêu rõ mục tiêu tối ưu và giả định của từng thuật toán.
- Khi có sửa đổi, cập nhật trang nguồn và chỉ mục `agents/README.md` nếu thêm hoặc đổi topic.
- Sửa ứng viên Archify trong đường dẫn `candidate` của manifest rồi chạy `node scripts/build-lessons.mjs`; chỉ mục lesson được dựng sau khi mọi bài đã qua finalize.
- Không đưa thông tin về phiên học cá nhân vào ghi chú kiến thức lâu dài.

## Phạm vi nguồn

PDF trong thư mục gốc là nguồn chính. Ghi chú là bản tóm lược học tập để truy xuất nhanh, không thay thế hình minh họa hoặc nội dung đầy đủ trong slide.
