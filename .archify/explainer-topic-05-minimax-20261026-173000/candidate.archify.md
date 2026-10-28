# Minimax chọn nước tốt nhất trước đối thủ tối ưu {#topic-05}

Trong trò chơi đối kháng, MAX muốn điểm cao còn MIN muốn điểm thấp. Minimax truyền giá trị từ lá lên cây bằng max ở lượt MAX và min ở lượt MIN.[](source:slides05)

- Giá trị lá là utility kết thúc.
- Alpha-beta bỏ nhánh không thể đổi quyết định.
- Khi cây quá sâu, dùng cutoff và hàm lượng giá.

@answer scope="Trò chơi hai người · MAX và MIN tối ưu"
@meta locale=vi
@source slides05 title="Topic 05 · slides 10–23, 26–28"

## Onboarding · Định hướng bài học {#onboarding span=12}

**Trước khi bắt đầu**

- Ôn cây tìm kiếm; trong cây trò chơi cần biết nút đang đến lượt MAX hay MIN.
- Utility là điểm kết thúc nhìn từ MAX: MAX muốn tăng điểm, MIN muốn giảm điểm.

**Điểm cần lưu ý**

- Tính từ lá lên gốc; không chọn ngay lá lớn nhất của toàn cây.
- Alpha-beta chỉ tỉa khi đã chứng minh nhánh không thể cải thiện quyết định; thứ tự duyệt ảnh hưởng số lá được tỉa.
- Điểm evaluation ở nút cắt độ sâu là ước lượng, khác utility của ván đã kết thúc.

**Sau bài học, bạn có thể**

- Lan truyền min và max để chọn nước đi trên một cây nhỏ.
- Chỉ ra một thời điểm có thể tỉa nhánh mà không đổi giá trị minimax ở gốc.
- Nêu giả định đối thủ tối ưu và giới hạn của tìm kiếm cắt độ sâu.

Nguồn khái niệm: Topic 05 · slides 10–23. Các tình huống bổ sung bên dưới là ví dụ giải thích, không phải dữ kiện nguyên văn trong slide.

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

## Ví dụ 1 · Điểm 12 vẫn có thể thuộc nước đi thua {#worked-example-1}

Ví dụ giải thích thêm · Topic 05 · slides 10–23.

MAX chọn A hoặc B; sau mỗi lựa chọn là lượt MIN. Hai lá dưới A có điểm 4, 9; hai lá dưới B có điểm 2, 12.

1. MIN dưới A chọn min(4,9)=4.
2. MIN dưới B chọn min(2,12)=2, dù B có một lá đạt 12.
3. MAX ở gốc chọn max(4,2)=4, tức nước A.

**Kết luận:** Không thể giả định đối thủ sẽ chọn giúp mình; minimax tối đa hóa điểm được bảo đảm trước phản ứng tối ưu của MIN.

## Ví dụ 2 · Tỉa một lá có điểm rất cao {#worked-example-2}

Ví dụ giải thích thêm · Topic 05 · slides 10–23.

Duyệt cây từ trái sang phải. Nhánh A đã cho MAX giá trị 4. Nhánh B là nút MIN; lá đầu tiên của B có điểm 3, lá còn lại chưa mở.

1. Alpha ở gốc là 4: MAX đã có lựa chọn đạt 4.
2. Tại B, beta hiện tại là 3; giá trị cuối của B không thể lớn hơn 3.
3. Vì beta=3 ≤ alpha=4, bỏ qua lá còn lại của B; kể cả lá đó đạt 100, min(3,100) vẫn là 3.

**Kết luận:** Tỉa nhánh giữ quyết định chọn A; ta không cần biết chính xác giá trị B để chứng minh B không thể thắng A.

## Thử thách luyện tập: Đấu trí minimax {#challenge-practice}

Lan truyền giá trị từ lá và nhận biết lúc có thể tỉa nhánh. Bấm “Chơi thử thách” bên dưới để hoàn thành ba bước và nhận phản hồi. Đây là ví dụ diễn giải thêm; dữ kiện của trò chơi được đặt riêng cho việc luyện tập.
