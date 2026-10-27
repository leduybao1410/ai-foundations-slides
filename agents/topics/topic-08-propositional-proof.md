---
topic: 08
title: Chứng minh trong logic mệnh đề
keywords: [CNF, clause, literal, resolution, contradiction, Davis Putnam, Horn clause, forward chaining, backward chaining]
source: ../../Topic 08 - Chứng minh trong logic mệnh đề.pdf
pages: 1-35
---

# Topic 08 — Chứng minh trong logic mệnh đề

## Câu hỏi của chương

Topic 07 định nghĩa suy dẫn; chương này tập trung cách máy tự tìm chứng minh hiệu quả hơn việc thử mọi bảng chân trị. Các phương pháp chính là hợp giải (resolution), Davis–Putnam và suy diễn trên luật Horn. (Slides 2–3)

## Khái niệm chính

- **CNF (dạng chuẩn hội):** nhiều mệnh đề được nối bằng AND; mỗi mệnh đề/clause là các literal nối bằng OR, ví dụ `(A ∨ ¬B) ∧ (B ∨ C)`. Literal là biến hoặc phủ định của biến. (Slide 4)
- Đổi sang CNF bằng cách bỏ kéo theo/tương đương, đẩy phủ định vào trong bằng De Morgan, rồi phân phối OR lên AND. Một biểu thức tương đương có thể phình lớn khi chuyển dạng. (Slide 5)
- **Resolution:** từ `(A ∨ B)` và `(¬B ∨ C)` khử cặp đối nhau `B, ¬B` để được `(A ∨ C)`. Để chứng minh `KB ⊨ α`, thêm `¬α` vào KB và suy hợp giải đến mâu thuẫn/rỗng. (Slides 7–11)
- Hợp giải mệnh đề là sound and complete: nếu kết luận thật sự theo sau, phép hợp giải có thể tìm ra mâu thuẫn từ KB và phủ định kết luận. (Slide 7)
- **Forward chaining:** với luật Horn, khi mọi tiền đề của luật đã biết thì thêm kết luận; tiếp tục đến khi tìm thấy đích hoặc không còn dữ kiện mới. **Backward chaining:** bắt đầu từ câu hỏi rồi tìm luật có thể suy ra nó, sau đó chứng minh các tiền đề con. (Slides 13–34)
- Davis–Putnam là chủ đề trong chương và dùng dạng chuẩn để kiểm tra tính thỏa mãn; khi học chi tiết, cần theo từng bước xử lý biến mệnh đề trong slide.

## Ví dụ giải thích thêm

KB có `P∨Q`, `P⇒R`, `Q⇒R`. Muốn chứng minh `R`, đổi hai luật thành `¬P∨R` và `¬Q∨R`, rồi thêm `¬R`. Resolution với `¬R` cho `¬P` và `¬Q`; từ `P∨Q` cùng `¬P` nhận được `Q`, rồi `Q` và `¬Q` tạo mâu thuẫn. Vậy giả sử `¬R` không thể đúng cùng KB, nên KB suy dẫn `R`.

## Dễ nhầm

Forward chaining đi **từ dữ kiện đến hệ quả**; backward chaining đi **từ truy vấn về các điều kiện cần chứng minh**. Resolution là một luật chứng minh tổng quát trên clause; chaining được trình bày cho KB dạng Horn.

## Ghi nhớ

1. Resolution cần CNF.
2. Chứng minh phản chứng bằng cách thêm phủ định kết luận.
3. Chọn forward hay backward tùy dữ kiện hay câu hỏi là điểm bắt đầu tự nhiên.

## Nguồn slide

[Topic 08, CNF và resolution](<../../Topic 08 - Chứng minh trong logic mệnh đề.pdf#page=4>) · forward chaining: slides 13–22 · backward chaining và so sánh: slides 23–35.

## Thử thách luyện tập

[Mở khóa bằng hợp giải](../../lessons/challenge.html?topic=topic-08): Chuyển luật về clause và tìm mâu thuẫn. Các tình huống và số liệu trong trò chơi là ví dụ diễn giải thêm; kiến thức liên quan: Topic 08 · slides 4–11.
