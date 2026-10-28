---
topic: 05
title: Tìm kiếm đối kháng và trò chơi
keywords: [adversarial search, game tree, MAX, MIN, minimax, alpha-beta pruning, evaluation function]
source: ../../Topic 05 - Tìm kiếm đối kháng.pdf
pages: 1-28
---

# Topic 05 — Tìm kiếm đối kháng

## Onboarding · Định hướng bài học

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

## Câu hỏi của chương

Trong trò chơi có đối thủ, một nước đi tốt phải tính đến phản ứng của người chơi kia. Cây trò chơi mô tả các nước đi luân phiên; giá trị kết quả được lan ngược từ các trạng thái cuối để chọn nước đi. (Slides 3–9)

## Khái niệm chính

- **MAX** là người chơi muốn tối đa hóa điểm tiện ích; **MIN** muốn giảm điểm của MAX. Minimax giả định cả hai đều chơi tối ưu. (Slides 10–14)
- Ở lá, `MINIMAX-VALUE` bằng utility. Ở nút MAX lấy giá trị lớn nhất của các con; ở nút MIN lấy giá trị nhỏ nhất. Sau đó chọn con có giá trị tốt nhất cho người đang đi. (Slides 11–15)
- **Alpha-beta pruning (tỉa nhánh α–β):** bỏ qua nhánh không thể làm thay đổi quyết định cuối cùng. `α` là lựa chọn tốt nhất MAX đã có; `β` là lựa chọn tốt nhất MIN đã có. Tỉa nhánh giữ nguyên kết quả minimax, còn thứ tự xét nước đi ảnh hưởng lượng được tỉa. (Slides 17–23)
- Minimax đầy đủ và tối ưu khi cây hữu hạn và giả định đối thủ tối ưu; nhưng cây trò chơi lớn khiến duyệt hết không thực tế. (Slide 16)
- **Cutoff search** dừng ở độ sâu giới hạn và dùng **hàm lượng giá (evaluation function)** để ước tính trạng thái chưa kết thúc. Hàm thường kết hợp các đặc trưng có trọng số. (Slides 26–27)

## Ví dụ giải thích thêm

MAX có ba nước đi. Sau nước A, MIN có thể buộc kết quả 3; sau B, MIN có thể đưa kết quả xuống 2; sau C, kết quả tối thiểu cũng 2. MAX chọn A vì `max(3,2,2)=3`. Khi duyệt các nhánh theo thứ tự, nếu MIN đã tìm thấy lựa chọn không quá tốt cho MAX so với lựa chọn MAX đã bảo đảm ở nơi khác, phần còn lại có thể bị tỉa.

## Ví dụ 1 · Điểm 12 vẫn có thể thuộc nước đi thua

Ví dụ giải thích thêm · Topic 05 · slides 10–23.

MAX chọn A hoặc B; sau mỗi lựa chọn là lượt MIN. Hai lá dưới A có điểm 4, 9; hai lá dưới B có điểm 2, 12.

1. MIN dưới A chọn min(4,9)=4.
2. MIN dưới B chọn min(2,12)=2, dù B có một lá đạt 12.
3. MAX ở gốc chọn max(4,2)=4, tức nước A.

**Kết luận:** Không thể giả định đối thủ sẽ chọn giúp mình; minimax tối đa hóa điểm được bảo đảm trước phản ứng tối ưu của MIN.

## Ví dụ 2 · Tỉa một lá có điểm rất cao

Ví dụ giải thích thêm · Topic 05 · slides 10–23.

Duyệt cây từ trái sang phải. Nhánh A đã cho MAX giá trị 4. Nhánh B là nút MIN; lá đầu tiên của B có điểm 3, lá còn lại chưa mở.

1. Alpha ở gốc là 4: MAX đã có lựa chọn đạt 4.
2. Tại B, beta hiện tại là 3; giá trị cuối của B không thể lớn hơn 3.
3. Vì beta=3 ≤ alpha=4, bỏ qua lá còn lại của B; kể cả lá đó đạt 100, min(3,100) vẫn là 3.

**Kết luận:** Tỉa nhánh giữ quyết định chọn A; ta không cần biết chính xác giá trị B để chứng minh B không thể thắng A.

## Dễ nhầm

Tỉa alpha-beta không phải phỏng đoán hay bỏ qua nhánh tùy ý; nó loại nhánh đã chứng minh không thể đổi quyết định. Hàm lượng giá chỉ ước tính trạng thái giữa ván; utility là kết quả thực ở trạng thái kết thúc.

## Ghi nhớ

1. MAX chọn max, MIN chọn min.
2. Minimax mô hình hóa đối thủ tối ưu.
3. Alpha-beta tiết kiệm lượt duyệt nhưng không đổi đáp án minimax.

## Nguồn slide

[Topic 05, minimax](<../../Topic 05 - Tìm kiếm đối kháng.pdf#page=10>) · alpha-beta: slides 17–23 · cutoff và hàm lượng giá: slides 26–27.

## Thử thách luyện tập

[Đấu trí minimax](../../lessons/challenge.html?topic=topic-05): Lan truyền giá trị từ lá và nhận biết lúc có thể tỉa nhánh. Các tình huống và số liệu trong trò chơi là ví dụ diễn giải thêm; kiến thức liên quan: Topic 05 · slides 10–23.
