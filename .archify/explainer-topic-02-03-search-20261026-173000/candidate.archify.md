# BFS tìm ít bước, UCS tìm ít chi phí {#topic-02-03}

Ta mô tả bài toán bằng trạng thái, hành động, trạng thái đích và chi phí. Trên cùng một đồ thị, DFS đi sâu trước, BFS tìm đường ít cạnh nhất, còn UCS tìm đường có tổng chi phí thấp nhất.[](source:slides0203)

- Các cạnh: S→A (1), S→B (4), A→C (1), C→G (3), B→G (2).
- DFS và BFS duyệt con theo thứ tự A rồi B.
- Không có heuristic; frontier quyết định nút tiếp theo.

@answer scope="Tìm kiếm mù · chi phí cạnh dương · thứ tự A trước B"
@meta locale=vi
@source slides0203 title="Topic 02_03 · slides 11–18, 24–50, 52–74"

## Onboarding · Định hướng bài học {#onboarding span=12}

**Trước khi bắt đầu**

- Ôn vòng lặp tác nhân ở Topic 01; trong bài này tác nhân tìm một chuỗi hành động trước khi thực hiện.
- Đọc được đồ thị: S là điểm đầu, G là đích, cạnh là hành động và số trên cạnh là chi phí.

**Điểm cần lưu ý**

- BFS tối ưu số cạnh; chỉ tối ưu chi phí khi mọi cạnh có cùng chi phí.
- UCS ưu tiên tổng chi phí đã đi và dừng khi lấy đích khỏi hàng đợi ưu tiên.
- Khi có vòng lặp, cần quản lý trạng thái đã gặp; thứ tự xét các con cũng ảnh hưởng đường DFS tìm thấy.

**Sau bài học, bạn có thể**

- Mô hình hóa trạng thái, hành động, kiểm tra đích và chi phí của một bài toán nhỏ.
- Theo dõi frontier bằng stack, queue hoặc hàng đợi ưu tiên cho DFS, BFS và UCS.
- So sánh số bước và tổng chi phí để giải thích vì sao các thuật toán có thể trả lời khác nhau.

Nguồn khái niệm: Topic 02_03 · slides 11–18, 24–32, 34–50, 52–74. Các tình huống bổ sung bên dưới là ví dụ giải thích, không phải dữ kiện nguyên văn trong slide.

## Bài toán được biểu diễn thế nào? {#model}

`S` là trạng thái bắt đầu, `G` là đích. Cạnh biểu diễn một hành động; số cạnh cạnh đó là chi phí. Lời giải là đường từ `S` đến `G`. Đây là ví dụ giải thích thêm để so sánh chiến lược.

@workflow id=search-map title="Đồ thị trạng thái có trọng số"
| start | S · bắt đầu | external |
| a | A | backend |
| b | B | backend |
| c | C | backend |
| cheap-goal | G · chi phí 5 | external |
| quick-goal | G · chi phí 6 | external |
| start > a | 1 | |
| start > b | 4 | |
| a > c | 1 | |
| c > cheap-goal | 3 | emphasis |
| b > quick-goal | 2 | |

## DFS lần theo nhánh sâu trước {#dfs}

DFS dùng stack: mở S, chọn A trước B, rồi đi tiếp C và G. Nó tìm đường S→A→C→G, chi phí 5. Với đồ thị khác DFS có thể gặp đường dài hoặc vòng lặp; nó không đảm bảo lời giải tối ưu.[](source:slides0203)

@steps id=dfs-steps
| dfs-s | Mở S | Stack: S. Đẩy B rồi A để A nằm trên đỉnh và được lấy trước. | search-map | start |
| dfs-a | Mở A | Đi sâu theo nhánh A→C trước khi quay lui. | search-map | a |
| dfs-c | Mở C | Nhánh sâu tiếp theo dẫn đến G với chi phí 5. | search-map | c |
| dfs-g | G được tìm thấy | Đường tìm được là S→A→C→G, tổng 1+1+3=5. | search-map | cheap-goal |

## BFS lần theo từng tầng {#bfs}

BFS dùng queue: sau S, nó xét A và B ở tầng 1. Khi mở rộng B, nó phát hiện G ở tầng 2 và trả S→B→G. Đây là đường ít cạnh nhất (2 cạnh), nhưng chi phí là 4+2=6.[](source:slides0203)

@steps id=bfs-steps
| bfs-s | Mở S | Queue theo tầng bắt đầu từ S. | search-map | start |
| bfs-a | Tầng 1: A, B | Cả hai cách S đúng một bước; xét A trước B. | search-map | a |
| bfs-b | Mở B | Từ B phát hiện G sau hai cạnh tính từ S. | search-map | b |
| bfs-g | Dừng tại G | Trả đường hai cạnh S→B→G; chi phí 6. | search-map | quick-goal |

## UCS lần theo chi phí đã đi {#ucs}

UCS lấy khỏi hàng đợi ưu tiên trạng thái có chi phí tích lũy nhỏ nhất. Nó mở A (1), C (2), rồi B (4) trước khi lấy G (5) ra khỏi frontier. B sinh đường đến G tốn 6, không cải thiện đường chi phí 5 đã biết. G qua B tốn 6 nên không thắng.[](source:slides0203)

@steps id=ucs-steps
| ucs-s | Bắt đầu | Ưu tiên S với chi phí 0. | search-map | start |
| ucs-a | Chi phí 1 | A là trạng thái rẻ nhất đang chờ. | search-map | a |
| ucs-c | Chi phí 2 | C rẻ hơn B (4), nên mở rộng C. | search-map | c |
| ucs-b | Chi phí 4 | B phải được mở trước G; đường B→G tốn 6 nên không cải thiện chi phí 5. | search-map | b |
| ucs-g | Chi phí 5 | G lấy ra trước phiên bản qua B có chi phí 6. | search-map | cheap-goal |

## Điểm dễ nhầm {#compare}

| Thuật toán | Ưu tiên | Kết quả trên ví dụ |
|---|---|---|
| DFS | Nhánh sâu nhất | 3 cạnh, chi phí 5 |
| BFS | Ít cạnh nhất | 2 cạnh, chi phí 6 |
| UCS | Chi phí tích lũy thấp nhất | 3 cạnh, chi phí 5 |

BFS tối ưu khi mọi bước cùng chi phí; khi chi phí khác nhau, UCS tối ưu theo tổng chi phí. Luôn kiểm tra tiêu chí trước khi gọi một lời giải là tối ưu.[](source:slides0203)

## Ví dụ 1 · Một chặng chưa chắc rẻ hơn hai chặng {#worked-example-1}

Ví dụ giải thích thêm · Topic 02_03 · slides 11–18, 24–32, 34–50, 52–74.

Xe giao hàng có các cạnh S→G chi phí 12, S→A chi phí 2 và A→G chi phí 2. Mọi chi phí đều dương.

1. BFS tìm G ở độ sâu 1 nên trả S→G: một cạnh, chi phí 12.
2. UCS mở S rồi lấy A với chi phí 2, tạo đường tới G có chi phí 4.
3. UCS cập nhật đường tốt hơn tới G; khi lấy G với chi phí 4, nó trả S→A→G.

**Kết luận:** BFS thắng theo số chặng (1), còn UCS thắng theo chi phí (4); phải nêu tiêu chí khi nói “đường tốt nhất”.

## Ví dụ 2 · Vì sao DFS cần xử lý vòng lặp? {#worked-example-2}

Ví dụ giải thích thêm · Topic 02_03 · slides 11–18, 24–32, 34–50, 52–74.

Đồ thị có S→A, A→S, S→B và B→G. Giả sử ở S, DFS ưu tiên A trước B.

1. Nếu không kiểm tra trạng thái lặp, DFS có thể đi S→A→S→A mãi.
2. Với tập đã thăm, sau khi đến A, bỏ cạnh quay về S vì S đã được thăm.
3. Quay lui về S, xét B rồi G; đường trả về là S→B→G.

**Kết luận:** Cấu trúc stack quyết định thứ tự đi sâu; kiểm tra trạng thái lặp giúp tránh mắc trong vòng S–A trên đồ thị hữu hạn này.

## Thử thách luyện tập: Điều phối hàng đợi tìm kiếm {#challenge-practice}

Chọn cách mở rộng và tính chi phí trên một đồ thị nhỏ. Bấm “Chơi thử thách” bên dưới để hoàn thành ba bước và nhận phản hồi. Đây là ví dụ diễn giải thêm; dữ kiện của trò chơi được đặt riêng cho việc luyện tập.

## Phòng thí nghiệm: Tự điều phối frontier {#lab-guide}

Quan sát DFS, BFS và UCS trên cùng đồ thị; xem từng lần lấy nút, sinh láng giềng và cập nhật frontier. Thử bốn bộ dữ kiện: chi phí khác nhau, cùng chi phí, vòng lặp và đích không thể tới. Ba câu hỏi dự đoán giúp phân biệt số bước, tổng chi phí và thời điểm dừng UCS.

Mở phòng thí nghiệm được đặt ở đầu trang để bắt đầu tương tác. Dữ kiện là ví dụ diễn giải thêm để luyện tập; kiến thức liên quan: Topic 02_03 · slides 34–50, 52–74. Tiến độ, câu trả lời đã đạt, dữ kiện tự chỉnh và huy hiệu được lưu trên trình duyệt bằng localStorage; có thể đóng trang rồi tiếp tục. Điểm thử thách vẫn được lưu riêng.
