---
topic: 09
title: Logic bậc nhất
keywords: [first-order logic, predicate, term, constant, variable, function, quantifier, substitution, unification, MGU, Skolemization]
source: ../../Topic 09 - Logic bậc nhất.pdf
pages: 1-29
---

# Topic 09 — Logic bậc nhất

## Câu hỏi của chương

Logic mệnh đề chỉ xem một câu nguyên vẹn là đúng hoặc sai. Logic bậc nhất (First-Order Logic, FOL) thêm đối tượng, quan hệ, biến và lượng từ để biểu diễn quy luật tổng quát như “mọi người đều chết”. (Slides 3–5)

## Khái niệm chính

- **Term:** hằng (Lan), biến (`x`) hoặc hàm áp dụng lên term (`cha(x)`). **Predicate/vị từ:** quan hệ hay thuộc tính, ví dụ `SinhVien(Lan)` hoặc `Cha(An,Binh)`. (Slides 5–6)
- **Lượng từ phổ quát `∀x`:** mệnh đề đúng với mọi đối tượng trong miền. **Lượng từ tồn tại `∃x`:** có ít nhất một đối tượng làm mệnh đề đúng. Phạm vi lượng từ và cách nối các mệnh đề rất quan trọng. (Slides 7–12)
- Muốn dùng hợp giải, chuyển công thức về **clausal form**: bỏ kéo theo, đưa phủ định vào trong, chuẩn hóa biến, Skolem hóa lượng từ tồn tại, bỏ lượng từ phổ quát và đưa về CNF. (Slides 16–19)
- **Phép thế (substitution):** thay biến bằng term, như `{x/Lan}`. Hai biểu thức **unifiable** nếu có phép thế làm chúng giống nhau. **MGU** (most general unifier) là phép thế ít ràng buộc nhất vẫn hợp nhất được chúng. (Slides 21–28)

## Ví dụ giải thích thêm

“Mọi người đều chết” viết `∀x (Người(x) ⇒ Chết(x))`; “Socrates là người” viết `Người(Socrates)`. Thế `x := Socrates` vào luật được `Người(Socrates)⇒Chết(Socrates)`, kết hợp tiền đề để suy ra Socrates chết.

Đồng nhất `Người(x)` với `Người(Socrates)` cho MGU `{x/Socrates}`. Nếu cấu trúc hàm không tương thích, như `P(f(A))` và `P(g(A))`, không có phép thế nào làm chúng bằng nhau.

## Dễ nhầm

`∀x∃y Cha(y,x)` có nghĩa mỗi người có thể có một người cha khác nhau; `∃y∀x Cha(y,x)` yêu cầu cùng một người là cha của tất cả. Đổi thứ tự lượng từ có thể đổi hẳn ý nghĩa. Skolem hóa cũng không phải thay mọi `∃` bằng một hằng số tùy ý; phụ thuộc vào các biến phổ quát trước đó.

## Ghi nhớ

1. Predicate mô tả thuộc tính/quan hệ; variable cho phép phát biểu tổng quát.
2. Lượng từ có phạm vi và thứ tự.
3. FOL resolution cần chuẩn hóa biến và unification.

## Nguồn slide

[Topic 09, cú pháp và lượng từ](<../../Topic 09 - Logic bậc nhất.pdf#page=5>) · dạng mệnh đề: slides 16–19 · substitution/unification: slides 21–28.

## Thử thách luyện tập

[Ghép luật với đối tượng](../../lessons/challenge.html?topic=topic-09): Đọc lượng từ và tìm phép thế cho vị từ. Các tình huống và số liệu trong trò chơi là ví dụ diễn giải thêm; kiến thức liên quan: Topic 09 · slides 5–12, 21–28.
