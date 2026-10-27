# BFS tìm ít bước, UCS tìm ít chi phí {#topic-02-03}

Ta mô tả bài toán bằng trạng thái, hành động, trạng thái đích và chi phí. Trên cùng một đồ thị, DFS đi sâu trước, BFS tìm đường ít cạnh nhất, còn UCS tìm đường có tổng chi phí thấp nhất.[](source:slides0203)

- Các cạnh: S→A (1), S→B (4), A→C (1), C→G (3), B→G (2).
- DFS và BFS duyệt con theo thứ tự A rồi B.
- Không có heuristic; frontier quyết định nút tiếp theo.

@answer scope="Tìm kiếm mù · chi phí cạnh dương · thứ tự A trước B"
@meta locale=vi
@source slides0203 title="Topic 02_03 · slides 11–18, 24–50, 52–74"

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

UCS lấy khỏi hàng đợi ưu tiên trạng thái có chi phí tích lũy nhỏ nhất. Nó mở A (1), C (2), rồi tìm G qua C với tổng chi phí 5. G qua B tốn 6 nên không thắng.[](source:slides0203)

@steps id=ucs-steps
| ucs-s | Bắt đầu | Ưu tiên S với chi phí 0. | search-map | start |
| ucs-a | Chi phí 1 | A là trạng thái rẻ nhất đang chờ. | search-map | a |
| ucs-c | Chi phí 2 | C rẻ hơn B (4), nên mở rộng C. | search-map | c |
| ucs-g | Chi phí 5 | G lấy ra trước phiên bản qua B có chi phí 6. | search-map | cheap-goal |

## Điểm dễ nhầm {#compare}

| Thuật toán | Ưu tiên | Kết quả trên ví dụ |
|---|---|---|
| DFS | Nhánh sâu nhất | 3 cạnh, chi phí 5 |
| BFS | Ít cạnh nhất | 2 cạnh, chi phí 6 |
| UCS | Chi phí tích lũy thấp nhất | 3 cạnh, chi phí 5 |

BFS tối ưu khi mọi bước cùng chi phí; khi chi phí khác nhau, UCS tối ưu theo tổng chi phí. Luôn kiểm tra tiêu chí trước khi gọi một lời giải là tối ưu.[](source:slides0203)
