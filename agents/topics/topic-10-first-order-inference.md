---
topic: 10
title: Suy diễn với logic bậc nhất
keywords: [FOL resolution, unification, refutation, forward chaining, backward chaining, Horn clause, knowledge base]
source: ../../Topic 10 - Suy diễn với logic bậc nhất.pdf
pages: 1-22
---

# Topic 10 — Suy diễn với logic bậc nhất

## Onboarding · Định hướng bài học

**Trước khi bắt đầu**

- Ôn clause/resolution ở Topic 08 và phép thế/unification ở Topic 09.
- Phân biệt fact đã biết, luật có biến và truy vấn; đọc phép thế {x/Lan} là thay x bằng Lan.

**Điểm cần lưu ý**

- Hai tiền đề có cùng biến phải dùng cùng phép thế; không ghép facts tùy ý.
- Mỗi lần dùng lại luật cần đổi tên biến riêng để tránh xung đột giữa các lần dùng.
- Backward chaining cần quản lý mục tiêu lặp; tìm chưa ra đáp án không tự động chứng minh phủ định.

**Sau bài học, bạn có thể**

- Kết hợp unification và resolution trong một chứng minh phản chứng FOL nhỏ.
- Sinh fact mới bằng forward chaining khi tất cả tiền đề đều khớp.
- Tách truy vấn thành mục tiêu con và truyền phép thế xuyên suốt backward chaining.

Nguồn khái niệm: Topic 10 · slides 3–10, 11–21. Các tình huống bổ sung bên dưới là ví dụ giải thích, không phải dữ kiện nguyên văn trong slide.

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

## Ví dụ 1 · Chứng minh Lan được dự thi bằng hợp giải

Ví dụ giải thích thêm · Topic 10 · slides 3–10, 11–21.

Gọi Dat(x) là “x đạt điều kiện”, DuThi(x) là “x được dự thi”. KB chứa Dat(Lan) và ∀x (Dat(x)⇒DuThi(x)).

1. Đổi luật thành clause ¬Dat(x)∨DuThi(x); thêm ¬DuThi(Lan) để chứng minh phản chứng.
2. Dùng phép thế {x/Lan}, hợp giải Dat(Lan) với clause của luật để nhận DuThi(Lan).
3. Hợp giải DuThi(Lan) với ¬DuThi(Lan) được clause rỗng.

**Kết luận:** KB suy dẫn DuThi(Lan); phép thế nối luật tổng quát với fact của cá thể cụ thể.

## Ví dụ 2 · Không được ghép hai tiền đề của hai người

Ví dụ giải thích thêm · Topic 10 · slides 3–10, 11–21.

Facts là Dat(Lan), NopBai(Minh). Luật Dat(x)∧NopBai(x)⇒QuaMon(x). Truy vấn QuaMon(Lan).

1. Backward chaining thế x=Lan, tạo hai mục tiêu Dat(Lan) và NopBai(Lan).
2. Dat(Lan) khớp fact, nhưng NopBai(Minh) không chứng minh được NopBai(Lan).
3. Nếu thêm fact NopBai(Lan), cả hai mục tiêu đều thỏa và forward chaining cũng sinh QuaMon(Lan).

**Kết luận:** Phải giữ cùng x xuyên suốt luật. Với KB ban đầu, chưa suy ra QuaMon(Lan); cũng chưa suy ra ¬QuaMon(Lan).

## Dễ nhầm

Resolution là chứng minh bằng clause và phản chứng; chaining làm việc thuận tiện với luật Horn. Forward chaining có thể sinh nhiều fact không liên quan truy vấn; backward chaining thường tập trung hơn nhưng cần quản lý vòng lặp và mục tiêu lặp.

## Ghi nhớ

1. FOL cần unification khi khớp các literal chứa biến.
2. Forward: dữ kiện → kết luận; backward: truy vấn → điều kiện.
3. Theo dõi phép thế và tránh lặp mục tiêu.

## Nguồn slide

[Topic 10, hợp giải FOL](<../../Topic 10 - Suy diễn với logic bậc nhất.pdf#page=3>) · forward chaining: slides 11–16 · backward chaining: slides 17–21.

## Thử thách luyện tập

[Truy tìm kết luận](../../lessons/challenge.html?topic=topic-10): Áp dụng phép thế và suy diễn tiến trên luật Horn. Các tình huống và số liệu trong trò chơi là ví dụ diễn giải thêm; kiến thức liên quan: Topic 10 · slides 3–4, 11–20.
