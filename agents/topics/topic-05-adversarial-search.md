---
topic: 05
title: Tìm kiếm đối kháng và trò chơi
keywords: [adversarial search, game tree, MAX, MIN, minimax, alpha-beta pruning, evaluation function]
source: ../../Topic 05 - Tìm kiếm đối kháng.pdf
pages: 1-28
---

# Topic 05 — Tìm kiếm đối kháng

## Câu hỏi của chương

Trong trò chơi có đối thủ, một nước đi tốt phải tính đến phản ứng của người chơi kia. Cây trò chơi mô tả các nước đi luân phiên; giá trị kết quả được lan ngược từ các trạng thái cuối để chọn nước đi. (Slides 3–9)

## Khái niệm chính

- **MAX** là người chơi muốn tối đa hóa điểm tiện ích; **MIN** muốn giảm điểm của MAX. Minimax giả định cả hai đều chơi tối ưu. (Slides 10–14)
- Ở lá, `MINIMAX-VALUE` bằng utility. Ở nút MAX lấy giá trị lớn nhất của các con; ở nút MIN lấy giá trị nhỏ nhất. Sau đó chọn con có giá trị tốt nhất cho người đang đi. (Slides 11–15)
- **Alpha-beta pruning (tỉa nhánh α–β):** bỏ qua nhánh không thể làm thay đổi quyết định cuối cùng. `α` là lựa chọn tốt nhất MAX đã có; `β` là lựa chọn tốt nhất MIN đã có. Tỉa nhánh giữ nguyên kết quả minimax, còn thứ tự xét nước đi ảnh hưởng lượng được tỉa. (Slides 17–23)
- Minimax đầy đủ và tối ưu khi cây hữu hạn và giả định đối thủ tối ưu; nhưng cây trò chơi lớn khiến duyệt hết không thực tế. (Slide 16)
- **Cutoff search** dừng ở độ sâu giới hạn và dùng **hàm lượng giá (evaluation function)** để ước tính trạng thái chưa kết thúc. Hàm thường kết hợp các đặc trưng có trọng số. (Slides 26–27)

## Ví dụ giải thích thêm

MAX có ba nước đi. Sau nước A, MIN có thể buộc kết quả 3; sau B, MIN có thể đưa kết quả xuống 2; sau C, kết quả tối thiểu cũng 2. MAX chọn A vì `max(3,2,2)=3`. Khi duyệt các nhánh theo thứ tự, nếu MIN đã tìm thấy lựa chọn không quá tốt cho MAX so với lựa chọn MAX đã bảo đảm ở nơi khác, phần còn lại có thể bị tỉa.

## Dễ nhầm

Tỉa alpha-beta không phải phỏng đoán hay bỏ qua nhánh tùy ý; nó loại nhánh đã chứng minh không thể đổi quyết định. Hàm lượng giá chỉ ước tính trạng thái giữa ván; utility là kết quả thực ở trạng thái kết thúc.

## Ghi nhớ

1. MAX chọn max, MIN chọn min.
2. Minimax mô hình hóa đối thủ tối ưu.
3. Alpha-beta tiết kiệm lượt duyệt nhưng không đổi đáp án minimax.

## Nguồn slide

[Topic 05, minimax](<../../Topic 05 - Tìm kiếm đối kháng.pdf#page=10>) · alpha-beta: slides 17–23 · cutoff và hàm lượng giá: slides 26–27.
