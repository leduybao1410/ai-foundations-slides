---
topic: 05.1
title: Expectimax và trò chơi có yếu tố ngẫu nhiên
keywords: [expectimax, chance node, expected utility, random opponent, minimax, expectiminimax]
source: ../../Topic 05.1 - Tìm kiếm đối kháng_Bonus.pdf
pages: 1-52
---

# Topic 05.1 — Expectimax

## Onboarding · Định hướng bài học

**Trước khi bắt đầu**

- Ôn MAX/MIN và cách tính cây từ lá lên ở Topic 05.
- Gọi P(i) là xác suất của kết quả i, V(i) là điểm của kết quả đó; kỳ vọng EV bằng tổng P(i)×V(i).

**Điểm cần lưu ý**

- Xác suất các kết quả tại cùng chance node phải không âm và có tổng bằng 1.
- Chỉ lấy trung bình cộng khi các nhánh đồng xác suất; kỳ vọng không bảo đảm điểm của từng lần chơi.
- Không áp dụng nguyên trạng cách tỉa alpha-beta của MIN cho chance node.

**Sau bài học, bạn có thể**

- Tính kỳ vọng với các nhánh có xác suất khác nhau.
- Lan truyền kỳ vọng qua chance node rồi chọn giá trị lớn nhất ở MAX.
- Giải thích vì sao đổi giả định xác suất có thể đổi hành động được chọn.

Nguồn khái niệm: Topic 05.1 Bonus · slides 4, 10–14, 36–38. Các tình huống bổ sung bên dưới là ví dụ giải thích, không phải dữ kiện nguyên văn trong slide.

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

## Ví dụ 1 · Phần thưởng lớn nhưng ít khi xảy ra

Ví dụ giải thích thêm · Topic 05.1 Bonus · slides 4, 10–14, 36–38.

MAX chọn nhận chắc 5 điểm hoặc chơi một lượt: được 20 điểm với xác suất 0,2, được 0 điểm với xác suất 0,8.

1. Kiểm tra 0,2+0,8=1.
2. Nhánh ngẫu nhiên có EV=0,2×20+0,8×0=4.
3. MAX so 5 với 4 và chọn nhận chắc 5; trung bình cộng (20+0)/2=10 là sai vì hai nhánh không đồng xác suất.

**Kết luận:** Phải tính trung bình có trọng số; điểm cao nhất có thể đạt không quyết định giá trị của chance node.

## Ví dụ 2 · Đổi xác suất làm đổi quyết định

Ví dụ giải thích thêm · Topic 05.1 Bonus · slides 4, 10–14, 36–38.

Giữ các điểm 20, 0 và lựa chọn chắc 5 như ví dụ trước, nhưng xác suất được 20 tăng lên 0,4; xác suất được 0 còn 0,6.

1. Kỳ vọng mới là EV=0,4×20+0,6×0=8.
2. Expectimax chọn nhánh ngẫu nhiên vì 8>5, nhưng một lần chơi vẫn có thể nhận 0.
3. Nếu mô hình hóa bằng MIN, nhánh này có giá trị min(20,0)=0 và MAX vẫn chọn chắc 5.

**Kết luận:** Cùng cây kết quả nhưng mô hình đối thủ/môi trường khác nhau dẫn đến quyết định khác nhau; cần nêu rõ giả định trước khi tính.

## Dễ nhầm

Chance node không tự có nghĩa là mọi nhánh đồng xác suất; phải dùng xác suất được mô hình quy định. Minimax tối ưu cho trường hợp xấu nhất; expectimax tối ưu giá trị trung bình theo mô hình xác suất.

## Ghi nhớ

1. Dùng `min` khi mô hình hóa đối thủ tối ưu; dùng kỳ vọng khi mô hình hóa bất định.
2. Expectimax cần xác suất cho các kết quả.
3. Chọn thuật toán theo giả định phù hợp với thế giới thật.

## Nguồn slide

[Topic 05.1, ý tưởng expectimax](<../../Topic 05.1 - Tìm kiếm đối kháng_Bonus.pdf#page=4>) · ví dụ tính kỳ vọng: slides 10–34 · giả định/thực tế: slides 38–47.

## Thử thách luyện tập

[Chọn nước đi có may rủi](../../lessons/challenge.html?topic=topic-05-1): Tính kỳ vọng ở nút chance rồi để MAX chọn. Các tình huống và số liệu trong trò chơi là ví dụ diễn giải thêm; kiến thức liên quan: Topic 05.1 · slides 4, 10–14.
