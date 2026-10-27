# A-star cộng chi phí đã đi và ước lượng còn lại {#topic-04}

Greedy chỉ nhìn `h(n)`, còn `A*` xét `f(n)=g(n)+h(n)`. Dùng lại đồ thị Topic 02_03: Greedy chọn đường gần đích; `A*` cũng tính chi phí đã đi.[](source:slides04)

- `g(n)`: chi phí từ S đến n.
- `h(n)`: ước lượng chi phí còn lại.
- Ví dụ minh họa dùng heuristic admissible: không vượt chi phí thật còn lại.

@answer scope="Heuristic · Greedy · A-star · heuristic không phóng đại chi phí"
@meta locale=vi
@source slides04 title="Topic 04 · slides 4–12, 15–25, 28–30"
@source slides0203 title="Topic 02_03 · đồ thị trạng thái và UCS"

## Heuristic dẫn hướng tìm kiếm {#heuristic}

`h(n)` là ước lượng từ trạng thái `n` đến đích. Trong ví dụ, S→A (1), S→B (4), A→C (1), C→G (3), B→G (2). Giá trị thật tối ưu còn lại là 5, 4, 2 và 3 tại S, A, B và C; chọn `h(S)=4`, `h(A)=3`, `h(B)=2`, `h(C)=2`, `h(G)=0` đều không vượt giá trị thật.[](source:slides04)

@workflow id=astar-map title="Đồ thị và heuristic h(n)"
| start | S · h=4 | external |
| a | A · h=3 | backend |
| b | B · h=2 | backend |
| c | C · h=2 | backend |
| cheap-goal | G · h=0 | external |
| quick-goal | G · h=0 | external |
| start > a | cost 1 | |
| start > b | cost 4 | |
| a > c | cost 1 | |
| c > cheap-goal | cost 3 | emphasis |
| b > quick-goal | cost 2 | |

## Greedy chọn gì? {#greedy}

Ở S, Greedy so `h(A)=3` với `h(B)=2`, chọn B rồi đến G. Đường S→B→G có hai cạnh nhưng tổng chi phí 6. Chỉ nhìn `h` có thể bỏ qua chi phí đã trả.[](source:slides04)

@steps id=greedy-steps
| greedy-s | Xét S | Frontier: A có h=3, B có h=2. | astar-map | start |
| greedy-b | Chọn B | h(B)=2 nhỏ hơn h(A)=3. | astar-map | b |
| greedy-g | Đến G | Trả đường qua B, tổng chi phí 4+2=6. | astar-map | quick-goal |

## A-star so `f=g+h` ở mỗi bước {#astar}

`A*` ưu tiên `f(n)=g(n)+h(n)`. Từ S, `f(A)=1+3=4`, `f(B)=4+2=6`; nó mở A rồi C. G được sinh với `f(G)=5+0=5`. Khi lấy G khỏi hàng đợi, `A*` trả đường S→A→C→G, chi phí 5.[](source:slides04)

@steps id=astar-steps
| astar-s | Mở S | A có f=4; B có f=6. | astar-map | start |
| astar-a | Mở A | g=1, h=3 nên f=4. | astar-map | a |
| astar-c | Mở C | g=2, h=2 nên f=4. | astar-map | c |
| astar-g | Lấy G khỏi queue | g=5, h=0 nên f=5; dừng và trả đường tối ưu. | astar-map | cheap-goal |

## Khi nào được bảo đảm tối ưu? {#admissible}

Heuristic admissible thỏa `h(n) ≤ h*(n)`: ước lượng không vượt chi phí thật còn lại. Khi điều kiện được giữ, `A*` tìm đường tối ưu trên cây. Với trạng thái lặp, cần cập nhật đường tốt hơn. Không dừng khi chỉ sinh G; slide yêu cầu lấy G khỏi priority queue.[](source:slides04)

| Cách chọn | Giá trị ưu tiên | Rủi ro/điểm mạnh |
|---|---|---|
| Greedy | `h(n)` | Nhanh hướng đích, có thể chọn đường đắt |
| A-star | `g(n)+h(n)` | Có thể tối ưu với heuristic phù hợp; tốn bộ nhớ |

`IDA*` giảm bộ nhớ bằng cách lặp tìm kiếm DFS với ngưỡng `f`; nó có thể duyệt lại trạng thái ở vòng sau.[](source:slides04)
