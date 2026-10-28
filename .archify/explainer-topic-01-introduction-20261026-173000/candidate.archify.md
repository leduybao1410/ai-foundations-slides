# AI mô tả tác nhân biết nhận và hành động {#topic-01}

AI nghiên cứu cách một tác nhân nhận biết môi trường, chọn hành động và hướng tới mục tiêu. Ta dùng ví dụ máy điều nhiệt để nối ba khâu ấy.[](source:slides01)

- Tri giác đưa thông tin vào.
- Lập luận chọn phản ứng theo mục tiêu.
- Hành động tác động ngược lại môi trường.

@answer scope="Giới thiệu · tác nhân · mục tiêu hợp lý"
@meta locale=vi
@source slides01 title="Topic 01 · slides 5–9, 13–16, 37–39"

## Onboarding · Định hướng bài học {#onboarding span=12}

**Trước khi bắt đầu**

- Không cần biết lập trình; hãy chọn một thiết bị quen thuộc để quan sát cách nó phản ứng.
- Phân biệt thông tin thiết bị nhận vào, hành động nó làm và mục tiêu cần đạt.

**Điểm cần lưu ý**

- “Hợp lý” được đánh giá theo mục tiêu và thông tin đang có; không đòi hỏi hành động giống con người.
- Một kết quả may mắn chưa đủ để kết luận tác nhân đã chọn hành động hợp lý.

**Sau bài học, bạn có thể**

- Mô tả vòng lặp nhận biết → quyết định → hành động của một tác nhân.
- Phân biệt bốn góc nhìn về AI theo hai trục suy nghĩ/hành động và giống người/hợp lý.
- Giải thích vì sao cùng một quan sát có thể dẫn đến hành động khác nhau khi mục tiêu thay đổi.

Nguồn khái niệm: Topic 01 · slides 5–9. Các tình huống bổ sung bên dưới là ví dụ giải thích, không phải dữ kiện nguyên văn trong slide.

## Máy điều nhiệt làm việc ra sao? {#agent-loop}

@workflow id=agent-flow title="Vòng lặp của một tác nhân"
| sense | Đọc nhiệt độ | backend |
| compare | So với mục tiêu? | backend |
| heat | Bật sưởi | backend |
| hold | Giữ nguyên | backend |
| room | Phòng ấm dần | external |
| sense > compare | nhiệt độ hiện tại | |
| compare > heat | quá lạnh | emphasis |
| compare > hold | đã đủ ấm | |
| heat > room | làm ấm phòng | |
| hold > room | không đổi | |

@steps id=agent-loop-steps
| observe | Nhận biết | Cảm biến cung cấp nhiệt độ hiện tại. | agent-flow | sense |
| decide | Chọn | So nhiệt độ với mức người dùng đặt. | agent-flow | compare |
| act | Hành động | Nếu lạnh thì bật sưởi; nếu đủ ấm thì giữ nguyên. | agent-flow | heat |
| feedback | Quan sát lại | Hành động đổi môi trường, nên tác nhân đo lại. | agent-flow | room |

Ví dụ giải thích thêm: mục tiêu máy là giữ phòng gần mức nhiệt đã đặt; phản ứng hợp lý phụ thuộc mục tiêu đó.

## Bốn cách định nghĩa AI khác nhau thế nào? {#views}

| Góc nhìn | Suy nghĩ hay hành động? | Tiêu chí |
|---|---|---|
| Suy nghĩ như người | Suy nghĩ | Mô phỏng cách nghĩ của con người |
| Suy nghĩ hợp lý | Suy nghĩ | Lập luận theo quy tắc hợp lý |
| Hành động như người | Hành động | Biểu hiện giống người, như trong kiểm tra Turing |
| Hành động hợp lý | Hành động | Chọn việc giúp đạt mục tiêu |

Trong môn học, “hợp lý” là chọn hành động tốt nhất theo tiêu chí, môi trường và thông tin đang có. Hành động ấy không cần giống con người.[](source:slides01)

## Ghi nhớ gì sau chương này? {#recap}

- Tác nhân (agent) nhận thức rồi hành động.
- Mục tiêu quyết định hành động nào phù hợp.
- Tìm kiếm, lập luận và học máy là ba mạch lớn của môn học.

Turing test quan sát hành vi trong trò chơi bắt chước. Đây là một góc nhìn về AI, không phải điều kiện duy nhất cho tác nhân thông minh.[](source:slides01)

## Ví dụ 1 · Robot hút bụi chọn việc cần làm {#worked-example-1}

Ví dụ giải thích thêm · Topic 01 · slides 5–9.

Robot quan sát phòng A bẩn, phòng B sạch và pin đủ để dọn A rồi về sạc. Mục tiêu được đặt là làm sạch phòng bẩn trong khi vẫn đủ pin quay về.

1. Nhận biết: cảm biến báo A bẩn và mức pin còn đủ cho hành trình.
2. Quyết định: chọn dọn A; đi sang B không làm tăng mức sạch vì B đã sạch.
3. Hành động: chạy tới A, hút bụi, rồi đo lại độ bẩn và pin.

**Kết luận:** Tác nhân nối quan sát với hành động qua mục tiêu; ta có thể nhận diện đủ ba khâu mà chưa cần biết mã chương trình.

## Ví dụ 2 · Cùng nhiệt độ, hai mục tiêu {#worked-example-2}

Ví dụ giải thích thêm · Topic 01 · slides 5–9.

Phòng đang 20°C, mức mong muốn là 22°C. Xét hai bộ điều khiển với hai tiêu chí khác nhau.

1. Bộ thứ nhất chỉ ưu tiên đưa nhiệt độ về 22°C: nó bật sưởi khi đang ở 20°C.
2. Bộ thứ hai được đặt chế độ tiết kiệm, cho phép giữ nhiệt độ trong khoảng 19–22°C: tại 20°C nó có thể chờ.
3. Đánh giá từng quyết định bằng đúng tiêu chí đã đặt, thay vì chỉ so xem máy nào bật sưởi trước.

**Kết luận:** Chờ hay bật sưởi đều có thể hợp lý trong những bài toán khác nhau; mục tiêu là một phần của cách mô tả tác nhân.

## Thử thách luyện tập: Điều khiển căn phòng {#challenge-practice}

Giúp máy điều nhiệt trở thành một tác nhân hợp lý. Bấm “Chơi thử thách” bên dưới để hoàn thành ba bước và nhận phản hồi. Đây là ví dụ diễn giải thêm; dữ kiện của trò chơi được đặt riêng cho việc luyện tập.
