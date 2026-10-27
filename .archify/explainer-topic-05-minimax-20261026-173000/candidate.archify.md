# Minimax chọn nước tốt nhất trước đối thủ tối ưu {#topic-05}

Trong trò chơi đối kháng, MAX muốn điểm cao còn MIN muốn điểm thấp. Minimax truyền giá trị từ lá lên cây bằng max ở lượt MAX và min ở lượt MIN.[](source:slides05)

- Giá trị lá là utility kết thúc.
- Alpha-beta bỏ nhánh không thể đổi quyết định.
- Khi cây quá sâu, dùng cutoff và hàm lượng giá.

@answer scope="Trò chơi hai người · MAX và MIN tối ưu"
@meta locale=vi
@source slides05 title="Topic 05 · slides 10–23, 26–28"

## Tính giá trị minimax ra sao? {#game-tree}

Lá là điểm số cuối. Mỗi nút MIN lấy điểm nhỏ nhất của con; mỗi nút MAX lấy điểm lớn nhất. Trên ví dụ, các lựa chọn gốc có kết quả tốt nhất cho MAX lần lượt là 3, 2 và 2, nên MAX chọn A.[](source:slides05)

@workflow id=minimax-tree title="Lá → MIN → MAX"
| max | MAX · chọn cao nhất | backend |
| a | A · MIN = 3 | backend |
| b | B · MIN ≤ 2 | backend |
| c | C · MIN = 2 | backend |
| a3 | 3 | external |
| a12 | 12 | external |
| a8 | 8 | external |
| b2 | 2 | external |
| b4 | 4 · bỏ qua | external |
| b6 | 6 · bỏ qua | external |
| c14 | 14 | external |
| c5 | 5 | external |
| c2 | 2 | external |
| max > a | nước A | |
| max > b | nước B | |
| max > c | nước C | |
| a > a3 | lá | |
| a > a12 | lá | |
| a > a8 | lá | |
| b > b2 | đầu tiên | emphasis |
| b > b4 | đã tỉa · chưa mở | dashed |
| b > b6 | đã tỉa · chưa mở | dashed |
| c > c14 | lá | |
| c > c5 | lá | |
| c > c2 | lá | |

@steps id=minimax-steps
| leaves | Đọc utility | Ba lá dưới A là 3, 12, 8. | minimax-tree | a3 |
| mins | Lượt MIN | Giá trị A=min(3,12,8)=3; B≤2; C=min(14,5,2)=2. | minimax-tree | a |
| max-choice | Lượt MAX | MAX chọn max(3,≤2,2)=3, tức nước A. | minimax-tree | max |

## Alpha-beta tỉa mà vẫn giữ đáp án {#pruning}

Sau A, MAX đã bảo đảm điểm 3. MIN xét B và thấy lá đầu tiên có giá trị 2. B không thể vượt 2, nên không cần xem các lá còn lại. Alpha-beta giữ đáp án minimax; lượng tỉa tùy thứ tự duyệt.[](source:slides05)

@steps id=alpha-beta-steps
| alpha | Đặt alpha | MAX đã có lựa chọn A với giá trị 3. | minimax-tree | a |
| beta | MIN tìm được 2 | Ở B, MIN có thể ép giá trị xuống tối đa 2. | minimax-tree | b2 |
| prune | Cắt nhánh | 2 không vượt alpha=3; B4 và B6 chưa cần mở rộng. | minimax-tree | b4 |
| decision | Quyết định giữ nguyên | MAX chọn A; các giá trị nhánh chưa mở không làm đổi kết quả. | minimax-tree | max |

## Khi không thể tìm đến lá? {#cutoff}

Cờ vua có cây quá lớn để đi đến mọi trạng thái kết thúc trong thời gian thực. Tìm kiếm cắt độ sâu rồi dùng hàm lượng giá để ước tính trạng thái giữa ván; đây là ước lượng, không phải utility cuối cùng.[](source:slides05)

| Khái niệm | Vai trò |
|---|---|
| Utility | Điểm ở trạng thái kết thúc |
| Evaluation | Ước tính trạng thái chưa kết thúc |
| Alpha-beta | Giảm nhánh, giữ nguyên giá trị minimax |

MAX/MIN giả định đối thủ tối ưu. Nếu hành động đối thủ có tính ngẫu nhiên, cần cân nhắc mô hình kỳ vọng ở Topic 05.1.[](source:slides05)
