# Tìm kiếm cục bộ cải thiện cấu hình hiện tại {#topic-06}

Tìm kiếm cục bộ tập trung vào cấu hình tốt, không cần giữ cả đường đi. Hill climbing đơn giản nhưng có thể mắc ở cực trị địa phương; các biến thể và genetic algorithm tăng khả năng khám phá.[](source:slides06)

- Hàm đánh giá cho biết cấu hình tốt đến đâu.
- Láng giềng là cấu hình có thể đến bằng một bước đổi.
- Có nhiều trạng thái khởi đầu hoặc nhận bước xấu giúp thoát bẫy.

@answer scope="Tối ưu cấu hình · tìm kiếm cục bộ · genetic algorithm"
@meta locale=vi
@source slides06 title="Topic 06 · slides 4–18, 19–34"

## Onboarding · Định hướng bài học {#onboarding span=12}

**Trước khi bắt đầu**

- Phân biệt tìm một cấu hình tốt với tìm đường đi rẻ nhất ở Topic 02_03–04.
- Xác định láng giềng và chiều tối ưu của hàm đánh giá; các ví dụ trong bài dùng điểm càng cao càng tốt.

**Điểm cần lưu ý**

- Không còn láng giềng tốt hơn chưa có nghĩa đã đạt tối ưu toàn cục.
- Bước xấu hơn có thể được simulated annealing chấp nhận; hill climbing cơ bản không chủ động làm vậy.
- GA cần biểu diễn gene và fitness phù hợp; lai ghép hoặc đột biến không bảo đảm con tốt hơn cha mẹ.

**Sau bài học, bạn có thể**

- Chọn bước leo đồi và nhận diện điểm kẹt trên một tập láng giềng nhỏ.
- Giải thích vai trò của khởi động lại và luyện thép khi bị kẹt.
- Thực hiện một lần lai ghép, đột biến và đánh giá fitness của chuỗi gene đơn giản.

Nguồn khái niệm: Topic 06 · slides 4–6, 14–18, 19–27. Các tình huống bổ sung bên dưới là ví dụ giải thích, không phải dữ kiện nguyên văn trong slide.

## Hill climbing có thể dừng quá sớm {#hill-climb}

Ví dụ giải thích thêm: điểm càng cao càng tốt. Ở S, chọn A đạt 6 thay vì B đạt 5. Tại A không còn bước tốt hơn, nên thuật toán dừng ở cực trị địa phương. Đường qua B có thể tới G với điểm 10.[](source:slides06)

@workflow id=hill-landscape title="Leo đồi dừng ở cực trị địa phương"
| start | S · eval 4 | external |
| local | A · eval 6 | backend |
| other | B · eval 5 | backend |
| plateau | Láng giềng · eval 6 | backend |
| mid | E · eval 8 | backend |
| global | G · eval 10 · mục tiêu | external |
| start > local | chọn láng giềng tốt nhất | emphasis |
| start > other | lựa chọn còn lại | |
| local > plateau | không tốt hơn · dừng | dashed |
| other > mid | cải thiện | |
| mid > global | cải thiện | |

@steps id=hill-steps
| hill-start | Đánh giá S | eval=4; A có 6, B có 5. | hill-landscape | start |
| hill-local | Chọn A | Leo đồi chọn A vì 6 cao hơn 5. | hill-landscape | local |
| hill-stop | Không còn cải thiện | Hàng xóm chỉ đạt 6; thuật toán dừng tại cực trị địa phương. | hill-landscape | plateau |
| restart | Khởi động lại | Nếu bắt đầu ở B, tiếp tục E rồi G với điểm 10. | hill-landscape | other |

## Hai cách thoát điểm kẹt {#alternatives}

Random restart chạy lại từ điểm bắt đầu khác. Local beam giữ `k` trạng thái cùng lúc và chọn `k` trạng thái con tốt nhất. Simulated annealing (luyện thép) đôi khi nhận bước xấu hơn; xác suất nhận giảm dần để có cơ hội thoát bẫy lúc đầu và ổn định về sau.[](source:slides06)

@workflow id=annealing title="Luyện thép chấp nhận bước xấu có kiểm soát"
| current | Cấu hình hiện tại | external |
| candidate | Đánh giá láng giềng | backend |
| better | Tốt hơn? | backend |
| accept-good | Chấp nhận cải thiện | backend |
| maybe | Chấp nhận bước xấu? | backend |
| accept-worse | Chấp nhận ngẫu nhiên | backend |
| reject | Giữ trạng thái cũ | backend |
| current > candidate | thử láng giềng | |
| candidate > better | so sánh Eval | |
| better > accept-good | có · cập nhật | emphasis |
| better > maybe | không · xét nhiệt độ | |
| maybe > accept-worse | có · xác suất giảm dần | dashed |
| maybe > reject | không chấp nhận | |

@steps id=annealing-steps
| anneal-start | Tạo bước mới | Đánh giá láng giềng hiện tại trước khi quyết định. | annealing | current |
| anneal-better | Bước tốt hơn | Nếu Eval tăng, chấp nhận và cập nhật trạng thái. | annealing | accept-good |
| anneal-worse | Bước xấu hơn | Có thể chấp nhận với xác suất phụ thuộc nhiệt độ; sắp xếp ngẫu nhiên là ví dụ minh họa. | annealing | maybe |
| anneal-cool | Nhiệt độ giảm | Khi nhiệt độ giảm, cơ hội nhận bước xấu cũng giảm; nếu từ chối thì giữ trạng thái cũ. | annealing | reject |

## Genetic algorithm kết hợp nhiều lời giải {#genetic}

GA giữ một quần thể lời giải. Mỗi vòng đánh giá fitness, chọn cha mẹ, lai ghép tạo con và đột biến một gene với xác suất nhỏ; lặp cho đến điều kiện kết thúc.[](source:slides06)

@workflow id=ga-cycle title="Một thế hệ của thuật giải di truyền"
| population | Quần thể lời giải | external |
| fitness | Tính fitness | backend |
| selection | Chọn cha mẹ | backend |
| crossover | Lai ghép | backend |
| mutation | Đột biến nhỏ | backend |
| next | Thế hệ kế tiếp | backend |
| done | Đạt điều kiện dừng? | backend |
| population > fitness | đánh giá | |
| fitness > selection | cá thể tốt có cơ hội cao | emphasis |
| selection > crossover | kết hợp gene | |
| crossover > mutation | xác suất nhỏ | |
| mutation > next | tạo đa dạng | |
| next > done | kiểm tra | |
| done > fitness | tiếp tục | dashed |

## Dễ nhầm {#compare}

Hill climbing đi đến láng giềng tốt hơn và dừng khi bị kẹt. Simulated annealing có thể nhận bước xấu. Genetic algorithm tiến hóa quần thể thay vì một cấu hình đơn. Các phương pháp này tìm cấu hình tốt; đường đi đến đó không phải mục tiêu.[](source:slides06)

## Ví dụ 1 · Xếp lịch tốt hơn nhưng vẫn bị kẹt {#worked-example-1}

Ví dụ giải thích thêm · Topic 06 · slides 4–6, 14–18, 19–27.

Một lịch học có điểm 8. Hai láng giềng trực tiếp đạt 9 và 7; lịch điểm 9 chỉ có láng giềng đạt 8 hoặc 7. Ở một vùng khác có lịch đạt 12.

1. Hill climbing chọn lịch điểm 9 vì đây là cải thiện lớn nhất từ 8.
2. Tại lịch điểm 9, không có láng giềng tốt hơn nên dừng.
3. Khởi động lại ở vùng khác có thể tìm lịch 12; không có bảo đảm một lần khởi động lại sẽ trúng vùng đó.

**Kết luận:** Điểm 9 là cực đại địa phương theo moveset đã cho, không phải tối ưu toàn cục; cách định nghĩa láng giềng ảnh hưởng nơi bị kẹt.

## Ví dụ 2 · Lai ghép hai chuỗi bốn bit {#worked-example-2}

Ví dụ giải thích thêm · Topic 06 · slides 4–6, 14–18, 19–27.

Mỗi cá thể là chuỗi bốn bit, fitness bằng số bit 1. Hai cha mẹ được chọn là 1100 và 0011; cắt sau bit thứ hai.

1. Tách cha mẹ thành 11/00 và 00/11 rồi trao đổi phần đuôi.
2. Hai con là 1111 có fitness 4 và 0000 có fitness 0; hai cha mẹ đều có fitness 2.
3. Nếu một lần đột biến lật bit thứ ba của 0000 từ 0 thành 1, con trở thành 0010 với fitness 1.

**Kết luận:** Lai ghép có thể tạo cả con tốt hơn và con kém hơn; đột biến tạo biến thể mới. Đây là biểu diễn đồ chơi, không phải mã hóa bài toán 8 hậu.

## Thử thách luyện tập: Leo đồi và tiến hóa {#challenge-practice}

Tìm hàng xóm tốt hơn, nhận diện điểm kẹt và sắp xếp vòng tiến hóa. Bấm “Chơi thử thách” bên dưới để hoàn thành ba bước và nhận phản hồi. Đây là ví dụ diễn giải thêm; dữ kiện của trò chơi được đặt riêng cho việc luyện tập.

## Phòng thí nghiệm: Khám phá địa hình điểm số {#lab-guide}

Di chuyển trên lưới điểm 7×7 được biểu diễn bằng mặt 3D hoặc bản đồ 2D. So sánh leo đồi, năm lần khởi động lại và luyện thép. Ví dụ tối đa hóa Eval: với Δ = Eval(mới) − Eval(hiện tại) < 0, xác suất nhận là exp(Δ/T); T là nhiệt độ. Ở Δ=−2, T=4, xác suất khoảng 0,607 nên mẫu u=0,4 được chấp nhận.

Mở phòng thí nghiệm được đặt ở đầu trang để bắt đầu tương tác. Dữ kiện là ví dụ diễn giải thêm để luyện tập; kiến thức liên quan: Topic 06 · slides 4–6, 14–18. Tiến độ, câu trả lời đã đạt, dữ kiện tự chỉnh và huy hiệu được lưu trên trình duyệt bằng localStorage; có thể đóng trang rồi tiếp tục. Điểm thử thách vẫn được lưu riêng.
