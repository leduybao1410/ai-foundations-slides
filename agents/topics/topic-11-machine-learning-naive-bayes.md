---
topic: 11
title: Giới thiệu học máy và Naïve Bayes
keywords: [machine learning, supervised learning, unsupervised learning, generalization, classifier, Bayes, Naive Bayes, Laplace smoothing]
source: ../../Topic 11 - Giới thiệu học máy, Naive Bayes.pdf
pages: 1-31
---

# Topic 11 — Học máy và Naïve Bayes

## Câu hỏi của chương

Thay vì viết sẵn toàn bộ quy tắc, ta có thể cho chương trình xem ví dụ để học mối liên hệ giữa đầu vào và kết quả. Học tốt nghĩa là không chỉ nhớ mẫu cũ mà còn dự đoán được mẫu mới. (Slides 3–8)

## Khái niệm chính

- **Học có giám sát:** mỗi ví dụ có input và nhãn/output; học hàm dự đoán nhãn mới. **Học không giám sát:** dữ liệu không có nhãn mục tiêu, hệ thống tìm cấu trúc hoặc nhóm. (Slide 5)
- Các cách xử lý mẫu gồm ghi nhớ, lấy trung bình và tổng quát hóa. Ghi nhớ dữ liệu huấn luyện chưa chắc dự đoán tốt; tổng quát hóa là mục tiêu quan trọng. (Slides 7–18)
- **Naïve Bayes:** dùng định lý Bayes để tính xác suất mỗi lớp khi biết bằng chứng/đặc trưng, rồi chọn lớp có điểm xác suất lớn nhất. “Naïve” là giả định các đặc trưng độc lập có điều kiện khi đã biết lớp. (Slides 19–25)
- Với lớp `y` và đặc trưng `x1…xn`, điểm lớp tỉ lệ với `P(y) × Π P(xj|y)`. Vì nhân nhiều xác suất nhỏ dễ gặp số rất nhỏ, tính tổng log thường ổn định hơn. (Slides 24–27)
- **Laplace smoothing:** cộng một lượng nhỏ vào số đếm để tránh xác suất bằng 0 khi tổ hợp đặc trưng chưa xuất hiện trong dữ liệu. (Slides 28–30)

## Ví dụ giải thích thêm

Muốn phân loại email là thư rác hay bình thường. Từ dữ liệu gắn nhãn, ước lượng tỉ lệ thư rác và xác suất mỗi từ trong thư xuất hiện dưới từng lớp. Với email mới, tính điểm của hai lớp bằng prior × xác suất từ; chọn điểm lớn hơn. Nếu một từ chưa hề gặp trong lớp “thư rác”, Laplace smoothing ngăn nó làm toàn bộ điểm của lớp thành 0.

## Dễ nhầm

Naïve Bayes không nói các đặc trưng độc lập hoàn toàn trong đời thực; đó là giả định đơn giản hóa khi điều kiện theo lớp. Điểm lớn nhất đủ để phân lớp dù khi so sánh có thể bỏ hệ số chuẩn hóa chung; nó không đồng nghĩa mô hình luôn hiệu chỉnh xác suất hoàn hảo.

## Ghi nhớ

1. Học máy tìm quy luật từ dữ liệu; tổng quát hóa mới là mục tiêu.
2. Naïve Bayes so điểm xác suất giữa các lớp.
3. Log tránh tích nhiều số nhỏ; Laplace tránh xác suất 0.

## Nguồn slide

[Topic 11, loại học và tổng quát hóa](<../../Topic 11 - Giới thiệu học máy, Naive Bayes.pdf#page=5>) · Naïve Bayes: slides 19–27 · Laplace smoothing: slides 28–30.

## Thử thách luyện tập

[Phân loại với Naïve Bayes](../../lessons/challenge.html?topic=topic-11): So sánh điểm chưa chuẩn hóa của hai lớp cho cùng một đặc trưng. Các tình huống và số liệu trong trò chơi là ví dụ diễn giải thêm; kiến thức liên quan: Topic 11 · slides 19–27.
