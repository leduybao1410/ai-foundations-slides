---
topic: 10
title: Suy diễn với logic bậc nhất
keywords: [FOL resolution, unification, refutation, forward chaining, backward chaining, Horn clause, knowledge base]
source: ../../Topic 10 - Suy diễn với logic bậc nhất.pdf
pages: 1-22
---

# Topic 10 — Suy diễn với logic bậc nhất

## Câu hỏi của chương

Khi tri thức có biến và quan hệ giữa đối tượng, làm sao kiểm tra một kết luận hoặc trả lời truy vấn? Chương này áp dụng hợp giải và chaining trong FOL, kết hợp với phép đồng nhất ở Topic 09. (Slides 2–4)

## Khái niệm chính

- **Hợp giải FOL:** muốn chứng minh `KB ⊨ α`, chuẩn hóa `KB ∧ ¬α` thành clause rồi tìm phép hợp giải dẫn đến mâu thuẫn. Trước khi khử literal đối nhau, dùng **unification** để tìm thế cho các biến. (Slides 3–10)
- Ví dụ mẫu: từ `P(x)⇒Q(x)` và `P(A)` có thể suy ra `Q(A)`; trong chứng minh phản chứng, phủ định câu hỏi buộc ta đồng nhất biến với hằng `A`. (Slides 4–10)
- **Forward chaining trên Horn:** khớp các tiền đề của luật với facts hiện có, thế biến bằng các đối tượng khớp được, rồi thêm fact mới. Lặp lại cho đến khi trả lời truy vấn hoặc hết fact mới. (Slides 11–16)
- **Backward chaining:** chọn luật có kết luận khớp với truy vấn, biến truy vấn thành các mục tiêu con, rồi lần lượt chứng minh chúng. Biến cần đổi tên giữa các lần dùng luật để tránh đụng nhau; thế được truyền xuyên suốt lời giải. (Slides 17–20)
- Backward chaining dùng tìm kiếm đệ quy theo chiều sâu; lặp mục tiêu có thể gây vòng lặp, còn mục tiêu con lặp lại gây tính toán dư thừa. Theo dõi stack và ghi nhớ mục tiêu đã xét giúp hạn chế vấn đề. (Slide 21)

## Ví dụ giải thích thêm

Facts: `Cha(Art,Bob)`, `Cha(Bob,Coe)`. Luật ông nội: `Cha(x,y) ∧ Cha(y,z) ⇒ Ong(x,z)`. Truy vấn `Ong(Art,?)` khớp `x=Art`; dữ kiện thứ nhất cho `y=Bob`, dữ kiện thứ hai cho `z=Coe`, vậy câu trả lời là `Coe`. Forward chaining sẽ sinh quan hệ ông từ các facts; backward chaining bắt đầu từ truy vấn và tìm hai quan hệ cha cần có.

## Dễ nhầm

Resolution là chứng minh bằng clause và phản chứng; chaining làm việc thuận tiện với luật Horn. Forward chaining có thể sinh nhiều fact không liên quan truy vấn; backward chaining thường tập trung hơn nhưng cần quản lý vòng lặp và mục tiêu lặp.

## Ghi nhớ

1. FOL cần unification khi khớp các literal chứa biến.
2. Forward: dữ kiện → kết luận; backward: truy vấn → điều kiện.
3. Theo dõi phép thế và tránh lặp mục tiêu.

## Nguồn slide

[Topic 10, hợp giải FOL](<../../Topic 10 - Suy diễn với logic bậc nhất.pdf#page=3>) · forward chaining: slides 11–16 · backward chaining: slides 17–21.
