# Tìm kiếm cục bộ cải thiện cấu hình hiện tại {#topic-06}

Tìm kiếm cục bộ tập trung vào cấu hình tốt, không cần giữ cả đường đi. Hill climbing đơn giản nhưng có thể mắc ở cực trị địa phương; các biến thể và genetic algorithm tăng khả năng khám phá.[](source:slides06)

- Hàm đánh giá cho biết cấu hình tốt đến đâu.
- Láng giềng là cấu hình có thể đến bằng một bước đổi.
- Có nhiều trạng thái khởi đầu hoặc nhận bước xấu giúp thoát bẫy.

@answer scope="Tối ưu cấu hình · tìm kiếm cục bộ · genetic algorithm"
@meta locale=vi
@source slides06 title="Topic 06 · slides 4–18, 19–34"

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

## Thử thách luyện tập: Leo đồi và tiến hóa {#challenge-practice}

Tìm hàng xóm tốt hơn, nhận diện điểm kẹt và sắp xếp vòng tiến hóa. Bấm “Chơi thử thách” bên dưới để hoàn thành ba bước và nhận phản hồi. Đây là ví dụ diễn giải thêm; dữ kiện của trò chơi được đặt riêng cho việc luyện tập.
