(function (root, factory) {
  const challenges = factory();
  if (typeof module === 'object' && module.exports) module.exports = challenges;
  else root.LessonChallenges = challenges;
})(typeof globalThis === 'object' ? globalThis : this, function () {
  'use strict';
  return {
    'topic-01': {
      title: 'Điều khiển căn phòng',
      mission: 'Giúp máy điều nhiệt trở thành một tác nhân hợp lý.',
      source: 'Topic 01 · slides 5–9',
      steps: [
        { type: 'order', prompt: 'Sắp xếp vòng lặp khi phòng lạnh hơn mục tiêu.', options: ['Bật máy sưởi', 'Đo nhiệt độ phòng', 'So sánh với nhiệt độ mục tiêu'], answer: [1, 2, 0], explanation: 'Tác nhân nhận biết, quyết định theo mục tiêu rồi hành động.' },
        { type: 'choice', prompt: 'Phòng đã đạt nhiệt độ mục tiêu. Hành động phù hợp nhất là gì?', options: ['Giữ máy sưởi tắt', 'Bật máy sưởi mãi', 'Bỏ qua cảm biến'], answer: 0, explanation: 'Giữ máy sưởi tắt phù hợp với mục tiêu duy trì nhiệt độ.' },
        { type: 'choice', prompt: '“Hành động hợp lý” được đánh giá theo điều gì?', options: ['Máy giống con người đến mức nào', 'Mức độ đạt mục tiêu với thông tin hiện có', 'Máy có hình dáng con người'], answer: 1, explanation: 'Hành động hợp lý phụ thuộc mục tiêu, môi trường và thông tin đang có.' }
      ]
    },
    'topic-02-03': {
      title: 'Điều phối hàng đợi tìm kiếm',
      mission: 'Chọn cách mở rộng và tính chi phí trên một đồ thị nhỏ.',
      source: 'Topic 02_03 · slides 34–35, 52–74',
      steps: [
        { type: 'order', prompt: 'BFS: sau khi mở S, hàng đợi là A, B. Mở A sinh C, B không sinh thêm nút. Chọn thứ tự lấy nút ra.', options: ['C', 'A', 'B'], answer: [1, 2, 0], explanation: 'BFS dùng hàng đợi: A và B đã chờ trước C.' },
        { type: 'number', prompt: 'Hai đường tới G có chi phí S→A→C→G = 1+1+3 và S→B→G = 4+2. UCS trả chi phí nhỏ nhất là bao nhiêu?', answer: 5, explanation: 'UCS chọn chi phí tích lũy nhỏ nhất: 1+1+3 = 5.' },
        { type: 'choice', prompt: 'Khi nào BFS đảm bảo đường ít chi phí nhất?', options: ['Khi mọi bước có cùng chi phí', 'Khi mọi cạnh có chi phí bất kỳ', 'Chỉ khi có heuristic'], answer: 0, explanation: 'BFS tối ưu theo chi phí khi mỗi bước có cùng chi phí.' }
      ]
    },
    'topic-04': {
      title: 'Dẫn đường với A*',
      mission: 'Tính f = g + h và chọn nút tiếp theo trong frontier.',
      source: 'Topic 04 · slides 15–25',
      steps: [
        { type: 'number', prompt: 'Nút A có g(A)=1 và h(A)=3. Giá trị f(A) bằng bao nhiêu?', answer: 4, explanation: 'f(A) = g(A) + h(A) = 1 + 3 = 4.' },
        { type: 'choice', prompt: 'Frontier có A: f=4 và B: f=6. A* mở nút nào trước?', options: ['A', 'B', 'Cả hai luôn cùng lúc'], answer: 0, explanation: 'A* ưu tiên nút có f nhỏ nhất.' },
        { type: 'choice', prompt: 'Theo thuật toán trong slide, A* dừng khi nào?', options: ['Ngay khi sinh ra đích', 'Khi lấy đích ra khỏi hàng đợi ưu tiên', 'Khi heuristic lần đầu bằng 1'], answer: 1, explanation: 'Đích được chấp nhận khi lấy ra khỏi hàng đợi ưu tiên, không chỉ khi được sinh.' }
      ]
    },
    'topic-05': {
      title: 'Đấu trí minimax',
      mission: 'Lan truyền giá trị từ lá và nhận biết lúc có thể tỉa nhánh.',
      source: 'Topic 05 · slides 10–23',
      steps: [
        { type: 'number', prompt: 'Một nút MIN có hai con giá trị 3 và 5. Giá trị của nút là bao nhiêu?', answer: 3, explanation: 'MIN chọn giá trị nhỏ hơn: min(3,5)=3.' },
        { type: 'number', prompt: 'Nút MAX có hai con đã tính giá trị 3 và 4. MAX chọn giá trị bao nhiêu?', answer: 4, explanation: 'MAX chọn giá trị lớn hơn: max(3,4)=4.' },
        { type: 'choice', prompt: 'Trong alpha-beta, khi nào có thể ngừng xét các nhánh còn lại tại một nút?', options: ['Khi alpha ≥ beta', 'Khi alpha < beta', 'Ngay khi thấy một lá bất kỳ'], answer: 0, explanation: 'Khi alpha ≥ beta, nhánh còn lại không thể đổi lựa chọn của tổ tiên liên quan.' }
      ]
    },
    'topic-05-1': {
      title: 'Chọn nước đi có may rủi',
      mission: 'Tính kỳ vọng ở nút chance rồi để MAX chọn.',
      source: 'Topic 05.1 · slides 4, 10–14',
      steps: [
        { type: 'number', prompt: 'Nhánh A có 50% nhận 10 điểm và 50% nhận 4 điểm. Giá trị kỳ vọng là bao nhiêu?', answer: 7, explanation: 'EV(A) = 0,5×10 + 0,5×4 = 7.' },
        { type: 'number', prompt: 'Nhánh B có 25% nhận 12 điểm và 75% nhận 4 điểm. Giá trị kỳ vọng là bao nhiêu?', answer: 6, explanation: 'EV(B) = 0,25×12 + 0,75×4 = 6.' },
        { type: 'choice', prompt: 'MAX chọn giữa A có EV=7 và B có EV=6. Chọn nhánh nào?', options: ['A', 'B', 'Chọn nhánh có kết quả xấu nhất thấp nhất'], answer: 0, explanation: 'MAX chọn kỳ vọng lớn hơn: 7 > 6.' }
      ]
    },
    'topic-06': {
      title: 'Leo đồi và tiến hóa',
      mission: 'Tìm hàng xóm tốt hơn, nhận diện điểm kẹt và sắp xếp vòng tiến hóa.',
      source: 'Topic 06 · slides 4–5, 19–27',
      steps: [
        { type: 'choice', prompt: 'Đang tối thiểu hóa h; trạng thái hiện tại có h=5, hai hàng xóm có h=3 và h=8. Chọn hàng xóm tốt hơn.', options: ['h=3', 'h=8', 'Không thể chọn vì cả hai đều khác 5'], answer: 0, explanation: 'Với mục tiêu giảm h, hàng xóm h=3 cải thiện so với h=5.' },
        { type: 'choice', prompt: 'Không hàng xóm nào tốt hơn trạng thái hiện tại. Thuật giải leo đồi cơ bản gặp tình huống gì?', options: ['Có thể bị kẹt ở cực trị cục bộ hoặc vùng bằng phẳng', 'Chắc chắn đã tìm được tối ưu toàn cục', 'Bắt buộc tìm kiếm theo chiều rộng'], answer: 0, explanation: 'Không có cải thiện cục bộ chưa chứng minh trạng thái là tốt nhất toàn cục.' },
        { type: 'order', prompt: 'Sắp xếp một vòng đơn giản của thuật giải di truyền.', options: ['Lai ghép và đột biến', 'Đánh giá độ thích nghi', 'Chọn cá thể làm cha mẹ'], answer: [1, 2, 0], explanation: 'Đánh giá quần thể, chọn cha mẹ, rồi tạo cá thể mới bằng lai ghép và đột biến.' }
      ]
    },
    'topic-07': {
      title: 'Phòng thí nghiệm mệnh đề',
      mission: 'Kiểm tra phép kéo theo và rút kết luận từ dữ kiện.',
      source: 'Topic 07 · slides 7–12, 23–25',
      steps: [
        { type: 'choice', prompt: 'P đúng, Q sai. Khi đó P ⇒ Q có giá trị gì?', options: ['Sai', 'Đúng'], answer: 0, explanation: 'Kéo theo chỉ sai khi tiền đề đúng và kết luận sai.' },
        { type: 'choice', prompt: 'Biết P và P ⇒ Q. Modus ponens cho phép suy ra gì?', options: ['Q', '¬Q', '¬P'], answer: 0, explanation: 'Từ P và P ⇒ Q, suy ra Q bằng modus ponens.' },
        { type: 'number', prompt: 'Hai biến mệnh đề P và Q có bao nhiêu cách gán đúng/sai?', answer: 4, explanation: 'Mỗi biến có 2 giá trị, nên có 2² = 4 cách gán.' }
      ]
    },
    'topic-08': {
      title: 'Mở khóa bằng hợp giải',
      mission: 'Chuyển luật về clause và tìm mâu thuẫn.',
      source: 'Topic 08 · slides 4–11',
      steps: [
        { type: 'choice', prompt: 'Dạng clause tương đương với P ⇒ Q là gì?', options: ['¬P ∨ Q', 'P ∨ Q', 'P ∧ ¬Q'], answer: 0, explanation: 'Bỏ kéo theo: P ⇒ Q tương đương ¬P ∨ Q.' },
        { type: 'choice', prompt: 'Hợp giải (P ∨ Q) với ¬P theo P tạo ra clause nào?', options: ['Q', '¬Q', 'P ∨ ¬P'], answer: 0, explanation: 'Khử hai literal đối nhau P và ¬P, còn lại Q.' },
        { type: 'order', prompt: 'Sắp xếp các bước chứng minh phản chứng sau khi đã đổi KB sang CNF.', options: ['Nhận clause rỗng (mâu thuẫn)', 'Thêm phủ định của kết luận vào KB', 'Hợp giải Q với ¬Q'], answer: [1, 2, 0], explanation: 'Thêm phủ định kết luận; khi hợp giải Q với ¬Q, ta nhận clause rỗng và chứng minh được kết luận.' }
      ]
    },
    'topic-09': {
      title: 'Ghép luật với đối tượng',
      mission: 'Đọc lượng từ và tìm phép thế cho vị từ.',
      source: 'Topic 09 · slides 5–12, 21–28',
      steps: [
        { type: 'order', prompt: 'Ghép theo thứ tự các phần của công thức “Mọi sinh viên đều học”.', options: ['Hoc(x))', '∀x (', 'SinhVien(x) ⇒'], answer: [1, 2, 0], explanation: 'Ta được ∀x (SinhVien(x) ⇒ Hoc(x)): nếu x là sinh viên thì x học.' },
        { type: 'choice', prompt: 'Để đồng nhất Người(x) với Người(Lan), dùng phép thế nào?', options: ['x := Lan', 'Lan := x', 'x := Người'], answer: 0, explanation: 'Thay biến x bằng hằng Lan làm hai vị từ giống nhau.' },
        { type: 'choice', prompt: 'P(f(A)) và P(g(A)) có đồng nhất được khi f và g là hai ký hiệu hàm khác nhau?', options: ['Không', 'Có, bằng cách thay A', 'Có, bằng cách thay P'], answer: 0, explanation: 'Hai ký hiệu hàm f và g khác nhau nên cấu trúc không thể khớp bằng phép thế biến.' }
      ]
    },
    'topic-10': {
      title: 'Truy tìm kết luận',
      mission: 'Áp dụng phép thế và suy diễn tiến trên luật Horn.',
      source: 'Topic 10 · slides 3–4, 11–20',
      steps: [
        { type: 'choice', prompt: 'Có P(A) và luật ∀x (P(x) ⇒ Q(x)). Phép thế nào làm tiền đề khớp dữ kiện?', options: ['x := A', 'x := Q', 'A := P'], answer: 0, explanation: 'Thay x bằng A tạo ra tiền đề P(A), khớp dữ kiện.' },
        { type: 'choice', prompt: 'Sau khi khớp P(A), luật P(x) ⇒ Q(x) sinh ra fact nào?', options: ['Q(A)', 'Q(x) cho mọi x', '¬Q(A)'], answer: 0, explanation: 'Cùng phép thế x := A được áp dụng vào kết luận, tạo Q(A).' },
        { type: 'order', prompt: 'Sắp xếp các bước suy diễn tiến với luật trên.', options: ['Thêm Q(A)', 'Khớp P(x) với P(A)', 'Áp dụng x := A vào kết luận'], answer: [1, 2, 0], explanation: 'Khớp tiền đề, áp dụng phép thế rồi thêm fact kết luận.' }
      ]
    },
    'topic-11': {
      title: 'Phân loại với Naïve Bayes',
      mission: 'So sánh điểm chưa chuẩn hóa của hai lớp cho cùng một đặc trưng.',
      source: 'Topic 11 · slides 19–27',
      steps: [
        { type: 'number', prompt: 'Lớp A có P(A)=0,6 và P(từ|A)=0,5. Điểm A = P(A)×P(từ|A) là bao nhiêu? Dùng dấu chấm thập phân.', answer: 0.3, explanation: 'Điểm A = 0,6 × 0,5 = 0,3.' },
        { type: 'number', prompt: 'Lớp B có P(B)=0,4 và P(từ|B)=0,25. Điểm B bằng bao nhiêu? Dùng dấu chấm thập phân.', answer: 0.1, explanation: 'Điểm B = 0,4 × 0,25 = 0,1.' },
        { type: 'choice', prompt: 'Điểm chưa chuẩn hóa là A=0,3 và B=0,1. Dự đoán lớp nào?', options: ['A', 'B', 'Không thể so sánh trước khi chuẩn hóa'], answer: 0, explanation: 'Hệ số chuẩn hóa chung không đổi thứ tự, nên chọn A có điểm cao hơn.' }
      ]
    },
    'topic-12': {
      title: 'Xây cây quyết định',
      mission: 'Đo độ lẫn nhãn rồi chọn cách chia cho ID3.',
      source: 'Topic 12 · slides 5–14',
      steps: [
        { type: 'number', prompt: 'Một tập gồm 4 mẫu cùng nhãn. Entropy của tập bằng bao nhiêu?', answer: 0, explanation: 'Tập thuần một nhãn có entropy bằng 0.' },
        { type: 'number', prompt: 'Một tập có hai lớp cân bằng 50% và 50%. Entropy tính theo log₂ bằng bao nhiêu bit?', answer: 1, explanation: 'Entropy = −0,5 log₂(0,5) − 0,5 log₂(0,5) = 1 bit.' },
        { type: 'choice', prompt: 'Cùng tập ban đầu, thuộc tính A cho entropy trung bình sau chia 0,2; B cho 0,6. ID3 chọn thuộc tính nào?', options: ['A', 'B', 'Cả hai luôn tương đương'], answer: 0, explanation: 'Cùng entropy ban đầu, entropy sau chia nhỏ hơn cho information gain lớn hơn.' }
      ]
    }
  };
});
