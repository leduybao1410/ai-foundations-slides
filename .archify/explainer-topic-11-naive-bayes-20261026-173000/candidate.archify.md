# Naïve Bayes chọn lớp có điểm xác suất cao hơn {#topic-11}

Học máy ước lượng quy luật từ ví dụ. Naïve Bayes dùng lớp đã biết để ước lượng xác suất đặc trưng, rồi chấm một mẫu mới cho từng lớp.[](source:slides11)

- Học có giám sát dùng cặp input và nhãn.
- Mục tiêu là tổng quát hóa sang ví dụ mới.
- Naïve Bayes giả định đặc trưng độc lập khi đã biết lớp.

@answer scope="Học máy có giám sát · phân lớp Naïve Bayes · Laplace smoothing"
@meta locale=vi
@source slides11 title="Topic 11 · slides 5–18, 19–30"

## Onboarding · Định hướng bài học {#onboarding span=12}

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

## Học từ mẫu gắn nhãn {#training}

| Mẫu | Từ “free” | Từ “deal” | Lớp |
|---|---:|---:|---|
| 1 | 1 | 1 | Spam |
| 2 | 1 | 0 | Spam |
| 3 | 0 | 1 | Spam |
| 4 | 0 | 0 | Thường |
| 5 | 0 | 1 | Thường |

Các ví dụ trên là bộ dữ liệu minh họa tự tạo. Ta muốn phân lớp email mới có `(free=1, deal=1)`.[](source:slides11)

## Tính điểm lớp trước và sau smoothing {#scores}

Với Bernoulli Naïve Bayes, điểm chưa chuẩn hóa là `P(lớp)×P(free=1|lớp)×P(deal=1|lớp)`. Không cộng hai lớp lại bằng 1 ở đây; chỉ so sánh điểm.[](source:slides11)

| Thành phần | Spam | Thường |
|---|---:|---:|
| Prior | 3/5 | 2/5 |
| P(free=1 \| lớp) | 2/3 | 0/2 = 0 |
| P(deal=1 \| lớp) | 2/3 | 1/2 |
| Điểm chưa làm mượt | (3/5)(2/3)(2/3)=4/15 | 0 |
| Laplace α=1 cho free | 3/5 | 1/4 |
| Laplace α=1 cho deal | 3/5 | 1/2 |
| Điểm sau làm mượt | (3/5)(3/5)(3/5)=27/125 | (2/5)(1/4)(1/2)=1/20 |

Không làm mượt, một xác suất bằng 0 khiến cả điểm lớp “Thường” bằng 0. Với đặc trưng nhị phân và α=1, ước lượng là `(số lần có đặc trưng +1)/(số mẫu lớp +2)`. Sau làm mượt, Spam vẫn có điểm cao hơn.[](source:slides11)

@workflow id=bayes-pipeline title="Huấn luyện rồi dự đoán lớp"
| examples | Ví dụ và nhãn | external |
| estimate | Ước lượng xác suất đặc trưng | backend |
| sample | Email mới · free=1, deal=1 | external |
| score | Nhân điểm từng lớp | backend |
| compare | Spam lớn hơn Thường | backend |
| output | Dự đoán Spam | external |
| examples > estimate | đếm theo lớp | |
| estimate > score | xác suất đặc trưng | |
| sample > score | lấy bằng chứng | |
| score > compare | so điểm | emphasis |
| compare > output | chọn lớp cao nhất | |

@steps id=bayes-steps
| fit | Ước lượng | Từ năm mẫu, prior Spam=3/5 và Thường=2/5. | bayes-pipeline | estimate |
| observe | Đọc mẫu mới | Hai đặc trưng đầu vào đều bằng 1. | bayes-pipeline | sample |
| multiply | Nhân xác suất | Tính một điểm cho Spam và một điểm cho Thường. | bayes-pipeline | score |
| predict | Chọn lớp | So điểm sau smoothing: 27/125 > 1/20, dự đoán Spam. | bayes-pipeline | output |

## Điểm dễ nhầm {#caveats}

Giả định “naïve” là độc lập có điều kiện theo lớp; dữ liệu thật không nhất thiết độc lập hoàn toàn. Mô hình vẫn có thể phân lớp tốt dù giả định đơn giản. Dùng log biến tích thành tổng để tránh số quá nhỏ; Laplace smoothing ngăn xác suất bằng 0.[](source:slides11)

## Ví dụ 1 · Email không chứa cả hai từ {#worked-example-1}

Ví dụ giải thích thêm · Topic 11 · slides 5–18, 19–30.

Dùng bảng năm email và xác suất đặc trưng sau Laplace trong bài: Spam có prior 3/5, P(free=1|Spam)=P(deal=1|Spam)=3/5; Thường có prior 2/5, hai xác suất tương ứng 1/4 và 1/2. Email mới là (free=0,deal=0).

1. Lấy xác suất phần bù: với Spam, hai xác suất bằng 0 đều là 2/5; với Thường, lần lượt là 3/4 và 1/2.
2. Điểm Spam=(3/5)×(2/5)×(2/5)=12/125=0,096.
3. Điểm Thường=(2/5)×(3/4)×(1/2)=3/20=0,15; chọn Thường.

**Kết luận:** Không có từ cũng là bằng chứng trong Bernoulli Naïve Bayes; bỏ qua các đặc trưng bằng 0 sẽ làm thay đổi cách chấm điểm.

## Ví dụ 2 · Đổi điểm thành xác suất trong mô hình {#worked-example-2}

Ví dụ giải thích thêm · Topic 11 · slides 5–18, 19–30.

Với email (free=1,deal=1), bài đã tính điểm Spam=27/125=0,216 và Thường=1/20=0,05. Các điểm đều dùng prior thực nghiệm và đặc trưng đã làm mượt.

1. Tổng hai điểm là 0,216+0,05=0,266.
2. Chuẩn hóa: P(Spam|email)=0,216/0,266=108/133≈0,812; P(Thường|email)=25/133≈0,188.
3. Hai giá trị sau chuẩn hóa cộng thành 1; lớp dự đoán vẫn là Spam vì thứ tự điểm không đổi.

**Kết luận:** Điểm 0,216 không phải xác suất hậu nghiệm 21,6%; chuẩn hóa cho khoảng 81,2% theo mô hình này, không phải bảo đảm độ chính xác thực tế.

## Thử thách luyện tập: Phân loại với Naïve Bayes {#challenge-practice}

So sánh điểm chưa chuẩn hóa của hai lớp cho cùng một đặc trưng. Bấm “Chơi thử thách” bên dưới để hoàn thành ba bước và nhận phản hồi. Đây là ví dụ diễn giải thêm; dữ kiện của trò chơi được đặt riêng cho việc luyện tập.
