---
topic: 09
title: Logic bậc nhất
keywords: [first-order logic, predicate, term, constant, variable, function, quantifier, substitution, unification, MGU, Skolemization]
source: ../../Topic 09 - Logic bậc nhất.pdf
pages: 1-29
---

# Topic 09 — Logic bậc nhất

## Onboarding · Định hướng bài học

**Trước khi bắt đầu**

- Ôn logic mệnh đề và phép kéo theo ở Topic 07.
- Hằng gọi tên một đối tượng, biến đại diện đối tượng; vị từ diễn đạt thuộc tính/quan hệ, ∀ là với mọi và ∃ là tồn tại.

**Điểm cần lưu ý**

- Nêu miền đối tượng trước khi dịch câu; thứ tự và phạm vi lượng từ có thể đổi nghĩa.
- Không thay một hằng bằng hằng khác để ép unification thành công.
- Phép thế phải dùng nhất quán ở mọi vị trí xuất hiện của cùng biến.

**Sau bài học, bạn có thể**

- Viết câu về đối tượng và quan hệ bằng vị từ và lượng từ.
- Phân biệt “mỗi người có một người hướng dẫn” với “có một người hướng dẫn tất cả”.
- Tìm phép thế đồng nhất cho ví dụ đơn giản hoặc chỉ ra xung đột.

Nguồn khái niệm: Topic 09 · slides 5–12, 21–28. Các tình huống bổ sung bên dưới là ví dụ giải thích, không phải dữ kiện nguyên văn trong slide.

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

## Ví dụ 1 · Mỗi sinh viên có thể có người hướng dẫn riêng

Ví dụ giải thích thêm · Topic 09 · slides 5–12, 21–28.

Miền gồm người; SV(x) nghĩa x là sinh viên, HD(y,x) nghĩa y hướng dẫn x. Lan, Minh là sinh viên; An hướng dẫn Lan, Bình hướng dẫn Minh.

1. “Mỗi sinh viên có ít nhất một người hướng dẫn” viết ∀x (SV(x)⇒∃y HD(y,x)).
2. “Có một người hướng dẫn mọi sinh viên” viết ∃y ∀x (SV(x)⇒HD(y,x)).
3. Xét mô hình chỉ có hai quan hệ HD(An,Lan), HD(Bình,Minh), với An và Bình là hai người khác nhau: câu thứ nhất đúng, câu thứ hai sai.

**Kết luận:** Người làm chứng cho ∃y có thể phụ thuộc x ở câu đầu; câu sau đòi hỏi một y dùng chung cho tất cả sinh viên.

## Ví dụ 2 · Một biến phải nhận cùng một giá trị

Ví dụ giải thích thêm · Topic 09 · slides 5–12, 21–28.

Gọi Hoc(a,b) là quan hệ người a học môn b. Cần khớp Hoc(x,AI) với Hoc(Lan,y), trong đó Lan và AI là hằng, x và y là biến.

1. Dùng phép thế θ={x/Lan, y/AI}, nghĩa là thay x bằng Lan và y bằng AI.
2. Sau thế, cả hai biểu thức đều là Hoc(Lan,AI).
3. Ngược lại, P(x,x) không khớp P(Lan,Minh) khi Lan và Minh là hai hằng khác nhau: vị trí đầu buộc x=Lan, vị trí sau lại buộc x=Minh.

**Kết luận:** Unification ràng buộc biến nhất quán; nó không chỉ so tên vị từ hay khớp từng vị trí một cách độc lập.

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
