---
topic: 02_03
title: Bài toán tìm kiếm và tìm kiếm mù
keywords: [problem-solving agent, search problem, state space, successor, DFS, BFS, UCS, fringe, uninformed search]
source: ../../Topic 02_03 - Bài toán tìm kiếm - Tìm kiếm mù.pdf
pages: 1-86
---

# Topic 02_03 — Bài toán tìm kiếm và tìm kiếm mù

## Onboarding · Định hướng bài học

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

## Câu hỏi của chương

Khi tác nhân có thể suy nghĩ trước khi hành động, làm sao mô tả một mục tiêu và tìm chuỗi hành động dẫn đến mục tiêu đó? Bài toán tìm kiếm mô hình hóa thế giới thành các trạng thái và hành động, rồi duyệt các khả năng theo một chiến lược. (Slides 5–18)

## Khái niệm chính

- **Trạng thái bắt đầu**, **hành động/successor**, **kiểm tra đích** và **chi phí đường đi** mô tả bài toán. Lời giải là chuỗi hành động đưa trạng thái ban đầu đến trạng thái đích. (Slides 11–16)
- **Đồ thị trạng thái** mô tả trạng thái thật của bài toán. **Cây tìm kiếm** mô tả các đường đi đang được khám phá; hai nút cây có thể ứng với cùng trạng thái nếu đến đó bằng những đường khác nhau. (Slides 16–19)
- **Fringe/frontier** là các đường đi hoặc nút biên đang chờ mở rộng. Tìm kiếm mù (uninformed/blind search) không dùng ước lượng còn cách đích bao xa. (Slides 21–23)
- **DFS:** chọn nút sâu nhất, thường dùng stack. Có thể đi sâu vào nhánh dài/vòng lặp; không đảm bảo lời giải tối ưu. (Slides 24–32)
- **BFS:** chọn nút nông nhất, thường dùng queue. Với phân nhánh hữu hạn, tìm được lời giải nếu tồn tại; tối ưu khi mỗi bước có chi phí như nhau. Tốn bộ nhớ vì phải giữ cả tầng biên. (Slides 34–50)
- **UCS:** chọn nút có tổng chi phí từ đầu nhỏ nhất, thường dùng hàng đợi ưu tiên. Phù hợp khi chi phí bước khác nhau; với chi phí dương, lời giải đầu tiên lấy ra khỏi hàng đợi là tối ưu. (Slides 52–74)
- Các biến thể gồm depth-limited, iterative deepening và bidirectional search. Đánh giá thuật toán bằng tính đầy đủ, tối ưu, thời gian và bộ nhớ. (Slides 75–81)

## Ví dụ giải thích thêm

Muốn đi đến trường bằng các con đường. Nếu mọi đoạn đường tính là “một bước”, BFS tìm đường có ít đoạn nhất. Nếu một đoạn dài hơn hoặc tốn phí hơn đoạn khác, ít bước chưa chắc rẻ nhất; UCS cộng dồn chi phí và mở rộng tuyến rẻ nhất hiện tại. DFS thì cứ theo một nhánh sâu trước, nên có thể tìm thấy đường nhưng bỏ qua đường ngắn hơn.

## Ví dụ 1 · Một chặng chưa chắc rẻ hơn hai chặng

Ví dụ giải thích thêm · Topic 02_03 · slides 11–18, 24–32, 34–50, 52–74.

Xe giao hàng có các cạnh S→G chi phí 12, S→A chi phí 2 và A→G chi phí 2. Mọi chi phí đều dương.

1. BFS tìm G ở độ sâu 1 nên trả S→G: một cạnh, chi phí 12.
2. UCS mở S rồi lấy A với chi phí 2, tạo đường tới G có chi phí 4.
3. UCS cập nhật đường tốt hơn tới G; khi lấy G với chi phí 4, nó trả S→A→G.

**Kết luận:** BFS thắng theo số chặng (1), còn UCS thắng theo chi phí (4); phải nêu tiêu chí khi nói “đường tốt nhất”.

## Ví dụ 2 · Vì sao DFS cần xử lý vòng lặp?

Ví dụ giải thích thêm · Topic 02_03 · slides 11–18, 24–32, 34–50, 52–74.

Đồ thị có S→A, A→S, S→B và B→G. Giả sử ở S, DFS ưu tiên A trước B.

1. Nếu không kiểm tra trạng thái lặp, DFS có thể đi S→A→S→A mãi.
2. Với tập đã thăm, sau khi đến A, bỏ cạnh quay về S vì S đã được thăm.
3. Quay lui về S, xét B rồi G; đường trả về là S→B→G.

**Kết luận:** Cấu trúc stack quyết định thứ tự đi sâu; kiểm tra trạng thái lặp giúp tránh mắc trong vòng S–A trên đồ thị hữu hạn này.

## Dễ nhầm

BFS ưu tiên **số bước**; UCS ưu tiên **tổng chi phí**. Chúng chỉ tương đương khi mọi bước có cùng chi phí. DFS và BFS không dùng heuristic; lựa chọn của chúng đến từ cấu trúc fringe, không phải hiểu biết về vị trí đích.

## Ghi nhớ

1. Trước khi chọn thuật toán, mô tả rõ trạng thái, hành động, đích và chi phí.
2. DFS đi sâu; BFS đi theo tầng; UCS đi theo chi phí tích lũy.
3. Cây tìm kiếm chứa đường đi, không chỉ chứa trạng thái.

## Nguồn slide

[Topic 02_03, bài toán và biểu diễn](<../../Topic 02_03 - Bài toán tìm kiếm - Tìm kiếm mù.pdf#page=11>) · DFS: slides 24–32 · BFS: slides 34–50 · UCS: slides 52–74 · đánh giá: slides 80–82.

## Thử thách luyện tập

[Điều phối hàng đợi tìm kiếm](../../lessons/challenge.html?topic=topic-02-03): Chọn cách mở rộng và tính chi phí trên một đồ thị nhỏ. Các tình huống và số liệu trong trò chơi là ví dụ diễn giải thêm; kiến thức liên quan: Topic 02_03 · slides 34–35, 52–74.

## Phòng thí nghiệm tương tác

[Tự điều phối frontier](../../.archify/explainer-topic-02-03-search-20261026-173000/topic-02-03.html#interactive-lab): Quan sát DFS, BFS và UCS trên cùng đồ thị; xem từng lần lấy nút, sinh láng giềng và cập nhật frontier. Thử bốn bộ dữ kiện: chi phí khác nhau, cùng chi phí, vòng lặp và đích không thể tới. Ba câu hỏi dự đoán giúp phân biệt số bước, tổng chi phí và thời điểm dừng UCS.

Đây là ví dụ diễn giải thêm, không phải dữ kiện nguyên văn trong slide; nguồn khái niệm: Topic 02_03 · slides 34–50, 52–74. Chế độ hướng dẫn có ba mốc dự đoán; hoàn thành lượt hướng dẫn mở chế độ tự khám phá. localStorage giữ vị trí bước, thiết lập, dữ kiện và huy hiệu để tiếp tục trên cùng trình duyệt.
