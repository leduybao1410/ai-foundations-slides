---
topic: 06
title: Tìm kiếm cục bộ và thuật giải di truyền
keywords: [hill climbing, local search, local optimum, plateau, random restart, local beam, simulated annealing, genetic algorithm, fitness]
source: ../../Topic 06 - Tìm kiếm leo đồi và các dạng khác.pdf
pages: 1-35
---

# Topic 06 — Tìm kiếm cục bộ và thuật giải di truyền

## Onboarding · Định hướng bài học

**Trước khi bắt đầu**

- Phân biệt tìm một cấu hình tốt với tìm đường đi rẻ nhất ở Topic 02_03–04.
- Xác định láng giềng và chiều tối ưu của hàm đánh giá; các ví dụ trong bài dùng điểm càng cao càng tốt.

**Điểm cần lưu ý**

- Không còn láng giềng tốt hơn chưa có nghĩa đã đạt tối ưu toàn cục.
- Bước xấu hơn có thể được simulated annealing chấp nhận; hill climbing cơ bản không chủ động làm vậy.
- GA cần biểu diễn gene và fitness phù hợp; lai ghép hoặc đột biến không bảo đảm con tốt hơn cha mẹ.

**Sau bài học, bạn có thể**

- Chọn bước leo đồi và nhận diện điểm kẹt trên một tập láng giềng nhỏ.
- Giải thích vai trò của khởi động lại và luyện thép khi bị kẹt.
- Thực hiện một lần lai ghép, đột biến và đánh giá fitness của chuỗi gene đơn giản.

Nguồn khái niệm: Topic 06 · slides 4–6, 14–18, 19–27. Các tình huống bổ sung bên dưới là ví dụ giải thích, không phải dữ kiện nguyên văn trong slide.

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

## Ví dụ 1 · Xếp lịch tốt hơn nhưng vẫn bị kẹt

Ví dụ giải thích thêm · Topic 06 · slides 4–6, 14–18, 19–27.

Một lịch học có điểm 8. Hai láng giềng trực tiếp đạt 9 và 7; lịch điểm 9 chỉ có láng giềng đạt 8 hoặc 7. Ở một vùng khác có lịch đạt 12.

1. Hill climbing chọn lịch điểm 9 vì đây là cải thiện lớn nhất từ 8.
2. Tại lịch điểm 9, không có láng giềng tốt hơn nên dừng.
3. Khởi động lại ở vùng khác có thể tìm lịch 12; không có bảo đảm một lần khởi động lại sẽ trúng vùng đó.

**Kết luận:** Điểm 9 là cực đại địa phương theo moveset đã cho, không phải tối ưu toàn cục; cách định nghĩa láng giềng ảnh hưởng nơi bị kẹt.

## Ví dụ 2 · Lai ghép hai chuỗi bốn bit

Ví dụ giải thích thêm · Topic 06 · slides 4–6, 14–18, 19–27.

Mỗi cá thể là chuỗi bốn bit, fitness bằng số bit 1. Hai cha mẹ được chọn là 1100 và 0011; cắt sau bit thứ hai.

1. Tách cha mẹ thành 11/00 và 00/11 rồi trao đổi phần đuôi.
2. Hai con là 1111 có fitness 4 và 0000 có fitness 0; hai cha mẹ đều có fitness 2.
3. Nếu một lần đột biến lật bit thứ ba của 0000 từ 0 thành 1, con trở thành 0010 với fitness 1.

**Kết luận:** Lai ghép có thể tạo cả con tốt hơn và con kém hơn; đột biến tạo biến thể mới. Đây là biểu diễn đồ chơi, không phải mã hóa bài toán 8 hậu.

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

## Phòng thí nghiệm tương tác

[Khám phá địa hình điểm số](../../.archify/explainer-topic-06-local-search-20261026-173000/topic-06.html#interactive-lab): Di chuyển trên lưới điểm 7×7 được biểu diễn bằng mặt 3D hoặc bản đồ 2D. So sánh leo đồi, năm lần khởi động lại và luyện thép. Ví dụ tối đa hóa Eval: với Δ = Eval(mới) − Eval(hiện tại) < 0, xác suất nhận là exp(Δ/T); T là nhiệt độ. Ở Δ=−2, T=4, xác suất khoảng 0,607 nên mẫu u=0,4 được chấp nhận.

Đây là ví dụ diễn giải thêm, không phải dữ kiện nguyên văn trong slide; nguồn khái niệm: Topic 06 · slides 4–6, 14–18. Chế độ hướng dẫn có ba mốc dự đoán; hoàn thành lượt hướng dẫn mở chế độ tự khám phá. localStorage giữ vị trí bước, thiết lập, dữ kiện và huy hiệu để tiếp tục trên cùng trình duyệt.
