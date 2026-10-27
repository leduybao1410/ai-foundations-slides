---
topic: 07
title: Logic mệnh đề
keywords: [propositional logic, syntax, semantics, truth assignment, model, entailment, validity, satisfiable, inference]
source: ../../Topic 07 - Logic - Logic mệnh đề.pdf
pages: 1-34
---

# Topic 07 — Logic mệnh đề

## Câu hỏi của chương

Làm sao biểu diễn tri thức bằng công thức rõ ràng và kiểm tra xem kết luận có thực sự theo sau từ những điều đã biết không? Logic là ngôn ngữ hình thức gồm cú pháp, ngữ nghĩa và hệ thống chứng minh. (Slides 3–4)

## Khái niệm chính

- **Mệnh đề** là phát biểu có giá trị đúng hoặc sai. Các biến `P`, `Q` có thể kết hợp bằng phủ định `¬`, và `∧`, hoặc `∨`, kéo theo `⇒`, tương đương `⇔`. Cú pháp quy định cách viết biểu thức hợp lệ. (Slides 5–6)
- **Ngữ nghĩa** nói công thức đúng hay sai dưới một cách gán chân trị cụ thể (interpretation/model). Bảng chân trị là cách liệt kê các cách gán và tính giá trị công thức. (Slides 7–12)
- **Thỏa mãn được (satisfiable):** có ít nhất một cách gán làm công thức đúng. **Hợp lệ (valid):** đúng với mọi cách gán.
- **Suy dẫn (entailment): `KB ⊨ α`** nghĩa là mọi cách gán làm toàn bộ cơ sở tri thức `KB` đúng cũng làm `α` đúng. Suy dẫn là quan hệ ngữ nghĩa, không chỉ là một bước biến đổi ký hiệu. (Slides 20–22)
- **Chứng minh** là chuỗi công thức bắt đầu từ tiền đề và dùng luật suy diễn hợp lệ. Modus ponens: từ `P` và `P⇒Q` suy ra `Q`; các luật khác gồm modus tollens, And-introduction và And-elimination. (Slides 23–31)

## Ví dụ giải thích thêm

Cho `P⇒Q` (nếu trời mưa thì đường ướt) và `P` (trời mưa). Ta suy ra `Q` (đường ướt) bằng modus ponens. Trong bảng chân trị, `P⇒Q` chỉ sai khi `P` đúng và `Q` sai; do đó cách gán đó không thể đồng thời là một mô hình của cả hai tiền đề.

## Dễ nhầm

“`α` đúng ở một mô hình” khác “`α` hợp lệ” (đúng ở mọi mô hình). “KB thỏa mãn được” chỉ nói có mô hình chung; “KB suy dẫn α” nói tất cả mô hình của KB đều làm α đúng. Liệt kê bảng chân trị dễ hiểu nhưng với `n` biến có `2^n` cách gán. (Slides 20–24)

## Ghi nhớ

1. Cú pháp là cách viết; ngữ nghĩa là ý nghĩa/chân trị.
2. Suy dẫn xét mọi mô hình thỏa KB.
3. Luật chứng minh giúp tránh liệt kê mọi cách gán.

## Nguồn slide

[Topic 07, cú pháp và ngữ nghĩa](<../../Topic 07 - Logic - Logic mệnh đề.pdf#page=5>) · suy dẫn và chứng minh: slides 20–25 · ví dụ chứng minh: slides 26–34.

## Thử thách luyện tập

[Phòng thí nghiệm mệnh đề](../../lessons/challenge.html?topic=topic-07): Kiểm tra phép kéo theo và rút kết luận từ dữ kiện. Các tình huống và số liệu trong trò chơi là ví dụ diễn giải thêm; kiến thức liên quan: Topic 07 · slides 7–12, 23–25.
