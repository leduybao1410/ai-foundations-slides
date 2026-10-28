---
topic: 08
title: Chứng minh trong logic mệnh đề
keywords: [CNF, clause, literal, resolution, contradiction, Davis Putnam, Horn clause, forward chaining, backward chaining]
source: ../../Topic 08 - Chứng minh trong logic mệnh đề.pdf
pages: 1-35
---

# Topic 08 — Chứng minh trong logic mệnh đề

## Onboarding · Định hướng bài học

**Trước khi bắt đầu**

- Ôn các phép nối, suy dẫn và modus ponens ở Topic 07.
- Literal là biến mệnh đề hoặc phủ định của nó; clause là OR các literal; CNF là AND các clause.

**Điểm cần lưu ý**

- Để chứng minh R bằng phản chứng, thêm ¬R chứ không thêm R vào KB.
- Hợp giải khử cặp literal đối nhau, không xóa hai literal chỉ vì chúng giống nhau.
- Clause rỗng biểu thị mâu thuẫn; forward/backward chaining trong bài dùng luật Horn.

**Sau bài học, bạn có thể**

- Đổi một luật kéo theo đơn giản sang CNF.
- Viết các bước hợp giải dẫn tới clause rỗng để chứng minh kết luận.
- Theo dõi cùng một bộ luật theo cả hướng tiến và hướng lùi.

Nguồn khái niệm: Topic 08 · slides 4–11, 13–22, 23–35. Các tình huống bổ sung bên dưới là ví dụ giải thích, không phải dữ kiện nguyên văn trong slide.

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

## Ví dụ 1 · Từ quy tắc báo cháy tới clause rỗng

Ví dụ giải thích thêm · Topic 08 · slides 4–11, 13–22, 23–35.

Gọi K là “có khói”, B là “chuông báo”. KB chứa K và K⇒B; cần chứng minh B. Ký hiệu ⊥ chỉ clause rỗng.

1. Đổi K⇒B thành ¬K∨B; thêm phủ định kết luận ¬B.
2. Hợp giải K với ¬K∨B, khử K và ¬K để nhận B.
3. Hợp giải B với ¬B nhận ⊥; KB cùng ¬B không thể đồng thời đúng.

**Kết luận:** KB suy dẫn B. Clause rỗng xuất hiện từ KB và phủ định kết luận là chứng cứ của phép phản chứng.

## Ví dụ 2 · Cùng bộ luật, hai hướng suy diễn

Ví dụ giải thích thêm · Topic 08 · slides 4–11, 13–22, 23–35.

Gọi D là “đã đăng ký”, H là “đã đóng học phí”, V là “được vào lớp”. Facts là D, H; luật là D∧H⇒V; truy vấn là V.

1. Forward chaining bắt đầu ở D và H, thấy đủ hai tiền đề nên sinh V.
2. Backward chaining bắt đầu ở V, chọn luật rồi tạo hai mục tiêu con D và H.
3. Cả hai mục tiêu con đều có trong facts nên chứng minh được V; nếu chỉ có D thì luật này chưa đủ để suy ra V.

**Kết luận:** Hướng suy diễn khác nhau, nhưng cả hai phải thỏa đầy đủ tiền đề; thiếu chứng minh V cũng chưa có nghĩa đã chứng minh ¬V.

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
