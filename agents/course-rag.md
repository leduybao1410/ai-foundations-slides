# Bản đồ tri thức môn Cơ sở Trí tuệ Nhân tạo

## Môn học nói về gì

Môn học trình bày ba hướng xây dựng tác nhân thông minh: tìm kiếm kế hoạch trong không gian trạng thái, biểu diễn tri thức để suy luận, và học quy luật từ dữ liệu. Học lần lượt từ Topic 01 đến Topic 12; Topic 02_03 là một tài liệu chung, Topic 05.1 là phần bổ sung về trò chơi có yếu tố ngẫu nhiên.

## Định tuyến câu hỏi

| Nếu câu hỏi nhắc đến… | Đọc trước |
|---|---|
| AI là gì, rational agent, Turing test | [Topic 01](topics/topic-01-introduction.md) |
| trạng thái, successor, fringe, DFS/BFS/UCS | [Topic 02_03](topics/topic-02-03-search.md) |
| heuristic, Greedy, A*, h(n), g(n), admissible | [Topic 04](topics/topic-04-heuristic-a-star.md) |
| đối thủ, MAX/MIN, minimax, alpha-beta, game tree | [Topic 05](topics/topic-05-adversarial-search.md) |
| xác suất nước đi, chance node, expectimax | [Topic 05.1](topics/topic-05-1-expectimax.md) |
| local optimum, plateau, simulated annealing, GA | [Topic 06](topics/topic-06-local-search-genetic.md) |
| mệnh đề P/Q, truth assignment, entailment, validity | [Topic 07](topics/topic-07-propositional-logic.md) |
| CNF, resolution, chứng minh phản chứng, Horn rules | [Topic 08](topics/topic-08-propositional-proof.md) |
| predicate, ∀/∃, term, substitution, unification | [Topic 09](topics/topic-09-first-order-logic.md) |
| FOL resolution, hợp giải với biến, forward/backward chaining | [Topic 10](topics/topic-10-first-order-inference.md) |
| training examples, supervised learning, Bayes, smoothing | [Topic 11](topics/topic-11-machine-learning-naive-bayes.md) |
| decision tree, ID3, entropy, information gain, ILA | [Topic 12](topics/topic-12-decision-trees.md) |

## Mạch nối giữa các chủ đề

1. Topic 01 giới thiệu tác nhân và mục tiêu hợp lý.
2. Topic 02_03 và 04 đưa ra cách tác nhân tìm kế hoạch; Topic 06 chuyển sang tối ưu cục bộ khi không cần lưu cả đường đi.
3. Topic 05 và 05.1 mở rộng tìm kiếm khi hành động phụ thuộc vào đối thủ hoặc kết quả ngẫu nhiên.
4. Topic 07–10 chuyển từ biểu diễn sự kiện đơn giản sang quan hệ có biến, rồi trình bày các cách suy luận trên cơ sở tri thức.
5. Topic 11–12 giới thiệu cách học bộ phân lớp từ ví dụ, với Naïve Bayes và cây quyết định là hai mô hình khác nhau.

## Nguyên tắc trả lời

Trước hết giải thích trực giác bằng tiếng Việt, giữ thuật ngữ tiếng Anh trong ngoặc. Khi người học hỏi cách chạy thuật toán, dùng đúng ví dụ nhỏ và thứ tự bước; khi hỏi một định nghĩa, không cần mở rộng sang chủ đề khác. Nêu số trang PDF để họ có thể kiểm tra hình, bảng hoặc phép tính gốc.
