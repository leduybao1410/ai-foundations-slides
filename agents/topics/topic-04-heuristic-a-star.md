---
topic: 04
title: Tìm kiếm heuristic và A*
keywords: [heuristic, h(n), g(n), f(n), Greedy Best-First, A*, admissible, IDA*]
source: ../../Topic 04 - Tìm kiếm có thông tin - Astar.pdf
pages: 1-32
---

# Topic 04 — Tìm kiếm heuristic và A*

## Onboarding · Định hướng bài học

**Trước khi bắt đầu**

- Ôn UCS và hàng đợi ưu tiên ở Topic 02_03.
- Gọi g(n) là chi phí đã đi tới n, h(n) là ước lượng còn lại và f(n)=g(n)+h(n) là độ ưu tiên của A\*.

**Điểm cần lưu ý**

- Greedy chỉ so h; A\* so g+h. Không lấy nút có h nhỏ nhất thay cho nút có f nhỏ nhất.
- Admissible nghĩa là h(n) không vượt h\*(n), với h\*(n) là chi phí tối ưu thật còn lại.
- Khi có trạng thái lặp, cần xử lý đường tốt hơn; không dừng ngay lúc vừa sinh đích.

**Sau bài học, bạn có thể**

- Tính g, h, f và chọn nút tiếp theo của Greedy hoặc A\* từ frontier.
- Kiểm tra tính admissible khi đã biết chi phí thật tới đích.
- Giải thích bằng phản ví dụ vì sao heuristic phóng đại có thể làm mất lời giải tối ưu.

Nguồn khái niệm: Topic 04 · slides 15–25. Các tình huống bổ sung bên dưới là ví dụ giải thích, không phải dữ kiện nguyên văn trong slide.

## Câu hỏi của chương

Tìm kiếm mù không biết nhánh nào gần đích, nên có thể mở rộng nhiều trạng thái vô ích. Heuristic đưa vào một ước lượng để ưu tiên những hướng có vẻ hứa hẹn. (Slides 3–5)

## Khái niệm chính

- **Heuristic `h(n)`:** ước lượng chi phí còn lại từ trạng thái `n` đến đích; ví dụ khoảng cách đường chim bay hoặc Manhattan trong 8-puzzle. Đây là ước lượng, không phải chi phí đường đi thật. (Slides 4–12)
- **Greedy Best-First Search:** ưu tiên `h(n)` nhỏ nhất. Có thể hướng nhanh về phía đích, nhưng bỏ qua chi phí đã đi nên dễ chọn đường vòng đắt. (Slides 13–14)
- **A*:** ưu tiên `f(n) = g(n) + h(n)`, trong đó `g(n)` là chi phí đã đi từ điểm đầu và `h(n)` là ước lượng còn lại. A* cân bằng chi phí quá khứ với dự đoán tương lai. (Slides 15–21)
- **Heuristic chấp nhận được (admissible):** không bao giờ ước lượng vượt quá chi phí thật tối ưu còn lại: `h(n) ≤ h*(n)`. Với điều kiện của thuật toán trong slide, điều này giúp A* tìm lời giải tối ưu. (Slides 22–25)
- A* dừng đúng khi trạng thái đích được lấy ra khỏi priority queue, không phải chỉ khi vừa được phát hiện. Nó có thể cần cập nhật đường tốt hơn tới trạng thái đã gặp. (Slides 17–21)
- **IDA*:** tìm kiếm lặp có giới hạn theo `f`, giảm bộ nhớ so với lưu frontier lớn của A*. Đổi lại có thể duyệt lại trạng thái ở các vòng lặp. (Slides 28–29)

## Ví dụ giải thích thêm

Đang chọn đường đến lớp: đường A đã đi 2 km, còn 8 km ước lượng; đường B đã đi 6 km, còn 1 km. Greedy chọn B vì `h=1`; A* so sánh `f`: A có 10 km, B có 7 km. Nếu một đường khác có `g=3, h=3`, A* sẽ ưu tiên tổng 6 km. Chất lượng kết quả còn phụ thuộc độ đáng tin của `h`.

## Ví dụ 1 · Chọn nút từ một frontier cụ thể

Ví dụ giải thích thêm · Topic 04 · slides 15–25.

Frontier có ba nút A, B, C. Các cặp (g,h) lần lượt là A=(2,6), B=(5,1), C=(3,2); các đại lượng dùng cùng đơn vị chi phí.

1. Tính f(A)=2+6=8, f(B)=5+1=6 và f(C)=3+2=5.
2. Greedy chọn B vì h(B)=1 là nhỏ nhất.
3. A\* chọn C vì f(C)=5 là nhỏ nhất; B đứng kế tiếp nếu frontier không đổi.

**Kết luận:** Ưu tiên mở rộng khác nhau dù cùng nhìn một frontier. Chỉ các số này chưa đủ kết luận đường cuối cùng có tối ưu hay không.

## Ví dụ 2 · Heuristic quá lớn che mất đường rẻ

Ví dụ giải thích thêm · Topic 04 · slides 15–25.

Có S→A chi phí 1, A→G chi phí 1 và S→G chi phí 3. Chọn h(A)=5, h(G)=0; chi phí thật từ A tới G chỉ là 1.

1. Sau khi mở S, A có f=1+5=6, còn đường trực tiếp tới G có f=3+0=3.
2. A\* lấy G trước A và trả đường trực tiếp có chi phí 3.
3. Nhưng S→A→G chỉ tốn 2; h(A)=5 đã vượt h\*(A)=1.

**Kết luận:** Dừng đúng lúc lấy đích vẫn không cứu được heuristic phóng đại; điều kiện về h là thiết yếu cho bảo đảm tối ưu.

## Dễ nhầm

Greedy chỉ dùng `h`, còn A* dùng `g+h`. “Chấp nhận được” không có nghĩa là dự đoán chính xác; chỉ cần không phóng đại chi phí còn lại. Heuristic mạnh hơn thường khám phá ít hơn, nhưng vẫn phải giữ tính hợp lệ cần thiết để đảm bảo tối ưu.

## Ghi nhớ

1. `g` = chi phí đã trả; `h` = ước lượng còn lại; `f=g+h`.
2. Heuristic dẫn hướng nhưng có thể sai.
3. A* có thể tốn rất nhiều bộ nhớ; IDA* đổi việc lưu trữ lấy việc lặp tìm kiếm.

## Nguồn slide

[Topic 04, heuristic và A*](<../../Topic 04 - Tìm kiếm có thông tin - Astar.pdf#page=4>) · admissibility: slides 22–25 · IDA*: slide 29.

## Thử thách luyện tập

[Dẫn đường với A*](../../lessons/challenge.html?topic=topic-04): Tính f = g + h và chọn nút tiếp theo trong frontier. Các tình huống và số liệu trong trò chơi là ví dụ diễn giải thêm; kiến thức liên quan: Topic 04 · slides 15–25.

## Phòng thí nghiệm tương tác

[Đối chiếu Greedy và A*](../../.archify/explainer-topic-04-astar-20261026-173000/topic-04.html#interactive-lab): Theo dõi g(n), h(n), f(n) và chạy hai thuật toán theo từng lượt lấy nút. Tự chỉnh chi phí cạnh, heuristic; đối chiếu h với chi phí thật h* và quan sát điều kiện chấp nhận được, tính nhất quán. Lượt phát có thể quay lui, phát lại và tiếp tục từ vị trí đã lưu.

Đây là ví dụ diễn giải thêm, không phải dữ kiện nguyên văn trong slide; nguồn khái niệm: Topic 04 · slides 15–25. Chế độ hướng dẫn có ba mốc dự đoán; hoàn thành lượt hướng dẫn mở chế độ tự khám phá. localStorage giữ vị trí bước, thiết lập, dữ kiện và huy hiệu để tiếp tục trên cùng trình duyệt.
