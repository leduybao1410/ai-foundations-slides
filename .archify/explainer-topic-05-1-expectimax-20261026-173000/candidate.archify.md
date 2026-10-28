# Expectimax tối ưu điểm kỳ vọng theo xác suất {#topic-05-1}

Minimax giả sử đối thủ luôn chọn nước bất lợi nhất cho MAX. Expectimax thay nút đó bằng chance node khi kết quả được mô hình bằng xác suất, rồi chọn hành động có giá trị kỳ vọng cao nhất.[](source:slides051)

- MAX lấy giá trị lớn nhất giữa các hành động.
- Chance lấy tổng `Σ P(i) × V(i)`.
- Xác suất phải phản ánh giả định về thế giới hoặc đối thủ.

@answer scope="So sánh giả định tối ưu xấu nhất với kết quả ngẫu nhiên"
@meta locale=vi
@source slides051 title="Topic 05.1 Bonus · slides 2–4, 10–39, 48–51"

## Onboarding · Định hướng bài học {#onboarding span=12}

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

## Ví dụ 1 · Phần thưởng lớn nhưng ít khi xảy ra {#worked-example-1}

Ví dụ giải thích thêm · Topic 05.1 Bonus · slides 4, 10–14, 36–38.

MAX chọn nhận chắc 5 điểm hoặc chơi một lượt: được 20 điểm với xác suất 0,2, được 0 điểm với xác suất 0,8.

1. Kiểm tra 0,2+0,8=1.
2. Nhánh ngẫu nhiên có EV=0,2×20+0,8×0=4.
3. MAX so 5 với 4 và chọn nhận chắc 5; trung bình cộng (20+0)/2=10 là sai vì hai nhánh không đồng xác suất.

**Kết luận:** Phải tính trung bình có trọng số; điểm cao nhất có thể đạt không quyết định giá trị của chance node.

## Ví dụ 2 · Đổi xác suất làm đổi quyết định {#worked-example-2}

Ví dụ giải thích thêm · Topic 05.1 Bonus · slides 4, 10–14, 36–38.

Giữ các điểm 20, 0 và lựa chọn chắc 5 như ví dụ trước, nhưng xác suất được 20 tăng lên 0,4; xác suất được 0 còn 0,6.

1. Kỳ vọng mới là EV=0,4×20+0,6×0=8.
2. Expectimax chọn nhánh ngẫu nhiên vì 8>5, nhưng một lần chơi vẫn có thể nhận 0.
3. Nếu mô hình hóa bằng MIN, nhánh này có giá trị min(20,0)=0 và MAX vẫn chọn chắc 5.

**Kết luận:** Cùng cây kết quả nhưng mô hình đối thủ/môi trường khác nhau dẫn đến quyết định khác nhau; cần nêu rõ giả định trước khi tính.

## Thử thách luyện tập: Chọn nước đi có may rủi {#challenge-practice}

Tính kỳ vọng ở nút chance rồi để MAX chọn. Bấm “Chơi thử thách” bên dưới để hoàn thành ba bước và nhận phản hồi. Đây là ví dụ diễn giải thêm; dữ kiện của trò chơi được đặt riêng cho việc luyện tập.
