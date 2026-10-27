---
topic: 04
title: Tìm kiếm heuristic và A*
keywords: [heuristic, h(n), g(n), f(n), Greedy Best-First, A*, admissible, IDA*]
source: ../../Topic 04 - Tìm kiếm có thông tin - Astar.pdf
pages: 1-32
---

# Topic 04 — Tìm kiếm heuristic và A*

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

## Dễ nhầm

Greedy chỉ dùng `h`, còn A* dùng `g+h`. “Chấp nhận được” không có nghĩa là dự đoán chính xác; chỉ cần không phóng đại chi phí còn lại. Heuristic mạnh hơn thường khám phá ít hơn, nhưng vẫn phải giữ tính hợp lệ cần thiết để đảm bảo tối ưu.

## Ghi nhớ

1. `g` = chi phí đã trả; `h` = ước lượng còn lại; `f=g+h`.
2. Heuristic dẫn hướng nhưng có thể sai.
3. A* có thể tốn rất nhiều bộ nhớ; IDA* đổi việc lưu trữ lấy việc lặp tìm kiếm.

## Nguồn slide

[Topic 04, heuristic và A*](<../../Topic 04 - Tìm kiếm có thông tin - Astar.pdf#page=4>) · admissibility: slides 22–25 · IDA*: slide 29.
