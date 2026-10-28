---
topic: 11
title: Giới thiệu học máy và Naïve Bayes
keywords: [machine learning, supervised learning, unsupervised learning, generalization, classifier, Bayes, Naive Bayes, Laplace smoothing]
source: ../../Topic 11 - Giới thiệu học máy, Naive Bayes.pdf
pages: 1-31
---

# Topic 11 — Học máy và Naïve Bayes

## Onboarding · Định hướng bài học

**Trước khi bắt đầu**

- Ôn xác suất có điều kiện: P(a|b) là xác suất a khi đã biết b; prior là xác suất lớp trước khi đọc đặc trưng.
- Đọc bảng năm email trong bài; mỗi đặc trưng free/deal bằng 1 nếu có từ, bằng 0 nếu không có.

**Điểm cần lưu ý**

- Giả định naïve là độc lập có điều kiện theo lớp, không phải độc lập hoàn toàn.
- Điểm prior × tích xác suất đặc trưng chưa chuẩn hóa không tự có tổng bằng 1.
- Với Bernoulli, phải xét cả đặc trưng bằng 0. Ví dụ này giữ prior thực nghiệm và chỉ làm mượt đặc trưng; slide 28 còn trình bày làm mượt prior.

**Sau bài học, bạn có thể**

- Phân biệt học từ ví dụ gắn nhãn với mục tiêu tổng quát hóa sang mẫu mới.
- Tính điểm các lớp cho email có cả đặc trưng xuất hiện và không xuất hiện.
- Áp dụng Laplace cho đặc trưng nhị phân và phân biệt điểm lớp với xác suất đã chuẩn hóa.

Nguồn khái niệm: Topic 11 · slides 5–18, 19–30. Các tình huống bổ sung bên dưới là ví dụ giải thích, không phải dữ kiện nguyên văn trong slide.

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

## Ví dụ 1 · Email không chứa cả hai từ

Ví dụ giải thích thêm · Topic 11 · slides 5–18, 19–30.

Dùng bảng năm email và xác suất đặc trưng sau Laplace trong bài: Spam có prior 3/5, P(free=1|Spam)=P(deal=1|Spam)=3/5; Thường có prior 2/5, hai xác suất tương ứng 1/4 và 1/2. Email mới là (free=0,deal=0).

1. Lấy xác suất phần bù: với Spam, hai xác suất bằng 0 đều là 2/5; với Thường, lần lượt là 3/4 và 1/2.
2. Điểm Spam=(3/5)×(2/5)×(2/5)=12/125=0,096.
3. Điểm Thường=(2/5)×(3/4)×(1/2)=3/20=0,15; chọn Thường.

**Kết luận:** Không có từ cũng là bằng chứng trong Bernoulli Naïve Bayes; bỏ qua các đặc trưng bằng 0 sẽ làm thay đổi cách chấm điểm.

## Ví dụ 2 · Đổi điểm thành xác suất trong mô hình

Ví dụ giải thích thêm · Topic 11 · slides 5–18, 19–30.

Với email (free=1,deal=1), bài đã tính điểm Spam=27/125=0,216 và Thường=1/20=0,05. Các điểm đều dùng prior thực nghiệm và đặc trưng đã làm mượt.

1. Tổng hai điểm là 0,216+0,05=0,266.
2. Chuẩn hóa: P(Spam|email)=0,216/0,266=108/133≈0,812; P(Thường|email)=25/133≈0,188.
3. Hai giá trị sau chuẩn hóa cộng thành 1; lớp dự đoán vẫn là Spam vì thứ tự điểm không đổi.

**Kết luận:** Điểm 0,216 không phải xác suất hậu nghiệm 21,6%; chuẩn hóa cho khoảng 81,2% theo mô hình này, không phải bảo đảm độ chính xác thực tế.

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
