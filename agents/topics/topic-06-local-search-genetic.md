---
topic: 06
title: Tìm kiếm cục bộ và thuật giải di truyền
keywords: [hill climbing, local search, local optimum, plateau, random restart, local beam, simulated annealing, genetic algorithm, fitness]
source: ../../Topic 06 - Tìm kiếm leo đồi và các dạng khác.pdf
pages: 1-35
---

# Topic 06 — Tìm kiếm cục bộ và thuật giải di truyền

## Câu hỏi của chương

Khi mục tiêu là tìm một cấu hình tốt (ví dụ cách xếp hậu), không nhất thiết cần biết toàn bộ đường đi đã dẫn đến đó. Tìm kiếm cục bộ giữ một vài cấu hình hiện tại và cải thiện chúng theo hàm đánh giá. (Slides 3–10)

## Khái niệm chính

- **Hill climbing (leo đồi):** bắt đầu ở cấu hình hiện tại, xem các láng giềng rồi chuyển sang láng giềng tốt hơn. Kết thúc khi không còn bước cải thiện. (Slides 4–6)
- Dễ mắc ở **cực trị địa phương** (tốt hơn hàng xóm nhưng chưa tốt nhất toàn cục) hoặc vùng phẳng **plateau**. Random restart chạy nhiều điểm bắt đầu; **local beam** giữ `k` cấu hình và chọn `k` con tốt nhất qua mỗi vòng. (Slides 14–16)
- **Simulated annealing (luyện thép):** thường nhận bước tốt hơn, đôi lúc nhận bước xấu hơn với xác suất giảm dần. Bước lùi tạm thời giúp thoát bẫy; về cuối thuật toán thận trọng hơn. (Slides 17–18)
- **Genetic algorithm (GA):** mã hóa lời giải thành cá thể/nhiễm sắc thể, chấm bằng fitness, chọn cha mẹ, lai ghép tạo con và đột biến một số gene. Lặp qua các thế hệ đến điều kiện dừng. (Slides 19–27)
- Biểu diễn gene, hàm mục tiêu và ánh xạ sang fitness phải phù hợp với bài toán. Đột biến giúp khám phá biến thể mới; lai ghép kết hợp phần của hai lời giải. (Slides 21–27)

## Ví dụ giải thích thêm

Với bài toán 8 hậu, mỗi cấu hình đặt hậu là một trạng thái; hàm đánh giá có thể là số cặp hậu đang ăn nhau và mục tiêu là làm số đó bằng 0. Leo đồi chỉ chuyển sang cấu hình giảm xung đột. Nếu mọi láng giềng đều không tốt hơn nhưng còn xung đột, ta mắc ở cực trị địa phương. Random restart bắt đầu lại; GA duy trì nhiều cách xếp và kết hợp chúng.

## Dễ nhầm

Tìm kiếm cục bộ tối ưu **trạng thái cuối**, không tối ưu đường đi. Hill climbing không cố ý nhận bước tệ hơn; simulated annealing có thể nhận để thoát bẫy. GA tiến hóa một quần thể, không chỉ một cấu hình.

## Ghi nhớ

1. Xác định cấu hình, láng giềng và hàm đánh giá trước.
2. Cực trị địa phương là điểm yếu chính của leo đồi.
3. Random restart, annealing và GA tăng khả năng khám phá theo các cách khác nhau.

## Nguồn slide

[Topic 06, hill climbing](<../../Topic 06 - Tìm kiếm leo đồi và các dạng khác.pdf#page=4>) · local search: slides 14–18 · GA: slides 19–34.

## Thử thách luyện tập

[Leo đồi và tiến hóa](../../lessons/challenge.html?topic=topic-06): Tìm hàng xóm tốt hơn, nhận diện điểm kẹt và sắp xếp vòng tiến hóa. Các tình huống và số liệu trong trò chơi là ví dụ diễn giải thêm; kiến thức liên quan: Topic 06 · slides 4–5, 19–27.
