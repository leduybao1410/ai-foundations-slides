# AI mô tả tác nhân biết nhận và hành động {#topic-01}

AI nghiên cứu cách một tác nhân nhận biết môi trường, chọn hành động và hướng tới mục tiêu. Ta dùng ví dụ máy điều nhiệt để nối ba khâu ấy.[](source:slides01)

- Tri giác đưa thông tin vào.
- Lập luận chọn phản ứng theo mục tiêu.
- Hành động tác động ngược lại môi trường.

@answer scope="Giới thiệu · tác nhân · mục tiêu hợp lý"
@meta locale=vi
@source slides01 title="Topic 01 · slides 5–9, 13–16, 37–39"

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
