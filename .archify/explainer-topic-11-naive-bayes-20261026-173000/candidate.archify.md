# Naïve Bayes chọn lớp có điểm xác suất cao hơn {#topic-11}

Học máy ước lượng quy luật từ ví dụ. Naïve Bayes dùng lớp đã biết để ước lượng xác suất đặc trưng, rồi chấm một mẫu mới cho từng lớp.[](source:slides11)

- Học có giám sát dùng cặp input và nhãn.
- Mục tiêu là tổng quát hóa sang ví dụ mới.
- Naïve Bayes giả định đặc trưng độc lập khi đã biết lớp.

@answer scope="Học máy có giám sát · phân lớp Naïve Bayes · Laplace smoothing"
@meta locale=vi
@source slides11 title="Topic 11 · slides 5–18, 19–30"

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

## Thử thách luyện tập: Phân loại với Naïve Bayes {#challenge-practice}

So sánh điểm chưa chuẩn hóa của hai lớp cho cùng một đặc trưng. Bấm “Chơi thử thách” bên dưới để hoàn thành ba bước và nhận phản hồi. Đây là ví dụ diễn giải thêm; dữ kiện của trò chơi được đặt riêng cho việc luyện tập.
