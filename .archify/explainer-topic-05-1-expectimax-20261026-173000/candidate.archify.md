# Expectimax tối ưu điểm kỳ vọng theo xác suất {#topic-05-1}

Minimax giả sử đối thủ luôn chọn nước bất lợi nhất cho MAX. Expectimax thay nút đó bằng chance node khi kết quả được mô hình bằng xác suất, rồi chọn hành động có giá trị kỳ vọng cao nhất.[](source:slides051)

- MAX lấy giá trị lớn nhất giữa các hành động.
- Chance lấy tổng `Σ P(i) × V(i)`.
- Xác suất phải phản ánh giả định về thế giới hoặc đối thủ.

@answer scope="So sánh giả định tối ưu xấu nhất với kết quả ngẫu nhiên"
@meta locale=vi
@source slides051 title="Topic 05.1 Bonus · slides 2–4, 10–39, 48–51"

## Tính giá trị chance node {#chance-tree}

Ví dụ giải thích thêm: hành động rủi ro cho 10 điểm với xác suất 1/2 và 0 điểm với xác suất 1/2. Kỳ vọng là `0.5×10 + 0.5×0 = 5`. Một hành động chắc chắn được 4 có kỳ vọng 4, nên MAX chọn nhánh ngẫu nhiên theo mô hình này.[](source:slides051)

@workflow id=expectimax-tree title="MAX so sánh một nhánh chắc chắn và một nhánh ngẫu nhiên"
| max | MAX | backend |
| safe | Chắc chắn · 4 | external |
| chance | Chance · EV = 5 | backend |
| ten | 10 · p=0.5 | external |
| zero | 0 · p=0.5 | external |
| max > safe | giá trị 4 | |
| max > chance | giá trị kỳ vọng 5 | emphasis |
| chance > ten | p=0.5 | |
| chance > zero | p=0.5 | |

@steps id=expectimax-steps
| outcomes | Liệt kê kết quả | Nút chance có điểm 10 hoặc 0; mỗi kết quả xác suất 0.5. | expectimax-tree | chance |
| expectation | Tính trung bình | EV = 0.5×10 + 0.5×0 = 5. | expectimax-tree | ten |
| choose | MAX chọn | So 5 với 4 chắc chắn; theo kỳ vọng, MAX chọn chance. | expectimax-tree | max |

## Minimax và expectimax dự đoán khác nhau thế nào? {#assumptions}

| Phương pháp | Nút dưới tác động đối thủ/môi trường | Mục tiêu |
|---|---|---|
| Minimax | MIN lấy kết quả thấp nhất | Bảo vệ trước đối thủ tối ưu |
| Expectimax | Chance tính trung bình có trọng số | Tối đa hóa kỳ vọng |

Minimax có thể bi quan nếu đối thủ không chơi tối ưu. Expectimax dựa vào xác suất đã nêu. Vì vậy dự đoán phụ thuộc mô hình xác suất.[](source:slides051)

## Vì sao khó tỉa chance node? {#pruning}

Ở MIN node, một kết quả đủ thấp có thể chứng minh phần còn lại không đổi quyết định MAX. Ở chance node, nhánh chưa xét vẫn có thể làm thay đổi trung bình, nên alpha-beta không áp dụng nguyên trạng. Cây có cả MAX, MIN và chance được gọi là expectiminimax.[](source:slides051)

**Điều cần nhớ:** `min` mô hình hóa đối thủ tối ưu; phép kỳ vọng mô hình hóa kết quả ngẫu nhiên đã biết xác suất.
