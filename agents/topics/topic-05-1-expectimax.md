---
topic: 05.1
title: Expectimax và trò chơi có yếu tố ngẫu nhiên
keywords: [expectimax, chance node, expected utility, random opponent, minimax, expectiminimax]
source: ../../Topic 05.1 - Tìm kiếm đối kháng_Bonus.pdf
pages: 1-52
---

# Topic 05.1 — Expectimax

## Câu hỏi của chương

Minimax giả định đối thủ luôn chọn nước đi tốt nhất cho họ. Nếu hành động của đối thủ hoặc môi trường có tính ngẫu nhiên, phép lấy `min` có thể quá bi quan. Expectimax thay nút đối thủ kiểu MIN bằng nút cơ hội (chance node) để tính giá trị kỳ vọng. (Slides 2–4, 38)

## Khái niệm chính

- MAX vẫn chọn nhánh có giá trị cao nhất.
- Ở **chance node**, tính trung bình có trọng số: `EV = Σ P(i) × V(i)`, trong đó `P(i)` là xác suất kết quả `i`, `V(i)` là giá trị của kết quả đó. Nếu các nhánh đồng xác suất, đây là trung bình cộng. (Slides 4, 10–34)
- Expectimax cần mô hình xác suất hợp lý. Dùng xác suất sai có thể khiến quyết định tệ hơn minimax.
- **Minimax** phù hợp với đối thủ được mô hình là tối ưu và đối kháng; **expectimax** phù hợp khi hành động được mô hình là ngẫu nhiên hoặc có phân phối đã biết. Kết quả thực nghiệm trong slide cho thấy lựa chọn tốt phụ thuộc giả định nào sát với đối thủ thật. (Slides 38–47)
- Việc tỉa giống alpha-beta không áp dụng trực tiếp cho nút kỳ vọng theo cách thông thường, vì một nhánh chưa xét vẫn có thể làm đổi trung bình. (Slide 36)
- **Expectiminimax** mở rộng cây kết hợp nút MAX, MIN và chance. (Slide 51)

## Ví dụ giải thích thêm

Một hành động cho điểm 10 nếu xúc xắc ra mặt thuận lợi (xác suất 1/2), và 0 nếu không (xác suất 1/2). Giá trị kỳ vọng là `0.5×10 + 0.5×0 = 5`. Một lựa chọn chắc chắn được 4 sẽ bị bỏ qua theo expectimax, dù đôi lúc lựa chọn ngẫu nhiên nhận 0. Đây là cách so sánh trung bình, không phải bảo đảm kết quả tốt nhất ở mọi lần chơi.

## Dễ nhầm

Chance node không tự có nghĩa là mọi nhánh đồng xác suất; phải dùng xác suất được mô hình quy định. Minimax tối ưu cho trường hợp xấu nhất; expectimax tối ưu giá trị trung bình theo mô hình xác suất.

## Ghi nhớ

1. Dùng `min` khi mô hình hóa đối thủ tối ưu; dùng kỳ vọng khi mô hình hóa bất định.
2. Expectimax cần xác suất cho các kết quả.
3. Chọn thuật toán theo giả định phù hợp với thế giới thật.

## Nguồn slide

[Topic 05.1, ý tưởng expectimax](<../../Topic 05.1 - Tìm kiếm đối kháng_Bonus.pdf#page=4>) · ví dụ tính kỳ vọng: slides 10–34 · giả định/thực tế: slides 38–47.
