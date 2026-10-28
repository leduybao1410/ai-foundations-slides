# Logic bậc nhất biểu diễn đối tượng và quan hệ {#topic-09}

Logic mệnh đề xem mỗi câu như một khối đúng/sai. Logic bậc nhất thêm đối tượng, biến, vị từ và lượng từ để diễn đạt quy luật như “mọi người đều chết”.[](source:slides09)

- Term là hằng, biến hoặc biểu thức hàm.
- Predicate nêu thuộc tính hay quan hệ giữa term.
- `∀` nói mọi đối tượng; `∃` nói có ít nhất một đối tượng.

@answer scope="First-Order Logic · terms · predicates · quantifiers · unification"
@meta locale=vi
@source slides09 title="Topic 09 · slides 3–12, 15–19, 21–29"

## Onboarding · Định hướng bài học {#onboarding span=12}

**Trước khi bắt đầu**

- Ôn logic mệnh đề và phép kéo theo ở Topic 07.
- Hằng gọi tên một đối tượng, biến đại diện đối tượng; vị từ diễn đạt thuộc tính/quan hệ, ∀ là với mọi và ∃ là tồn tại.

**Điểm cần lưu ý**

- Nêu miền đối tượng trước khi dịch câu; thứ tự và phạm vi lượng từ có thể đổi nghĩa.
- Không thay một hằng bằng hằng khác để ép unification thành công.
- Phép thế phải dùng nhất quán ở mọi vị trí xuất hiện của cùng biến.

**Sau bài học, bạn có thể**

- Viết câu về đối tượng và quan hệ bằng vị từ và lượng từ.
- Phân biệt “mỗi người có một người hướng dẫn” với “có một người hướng dẫn tất cả”.
- Tìm phép thế đồng nhất cho ví dụ đơn giản hoặc chỉ ra xung đột.

Nguồn khái niệm: Topic 09 · slides 5–12, 21–28. Các tình huống bổ sung bên dưới là ví dụ giải thích, không phải dữ kiện nguyên văn trong slide.

## Câu tổng quát được biểu diễn ra sao? {#representation}

Ví dụ giải thích thêm: “Mọi người đều chết” là `∀x (Người(x)⇒Chết(x))`; “Socrates là người” là `Người(Socrates)`. Luật dùng biến nên áp dụng được cho mọi cá thể.[](source:slides09)

@workflow id=fol-model title="Từ câu tự nhiên đến FOL"
| sentence | Mọi người đều chết | external |
| variable | Chọn đối tượng x | backend |
| predicate | Người(x), Chết(x) | backend |
| quantify | Với mọi x | backend |
| rule | ∀x (Người(x)⇒Chết(x)) | external |
| sentence > variable | lượng từ ràng buộc | |
| variable > predicate | mô tả thuộc tính | |
| predicate > quantify | mở rộng cho mọi đối tượng | |
| quantify > rule | công thức tổng quát | emphasis |

@steps id=fol-steps
| terms | Xác định term | Socrates là hằng; x là biến đại diện đối tượng. | fol-model | variable |
| predicates | Viết thuộc tính | Người(x), Chết(x) là các vị từ có thể đúng/sai theo x. | fol-model | predicate |
| forall | Thêm lượng từ | `∀x` nói quy tắc áp dụng với mọi đối tượng. | fol-model | quantify |
| instance | Thay bằng Socrates | Từ Người(Socrates) và luật suy ra Chết(Socrates). | fol-model | rule |

## Phạm vi lượng từ làm đổi nghĩa {#quantifiers}

| Công thức | Cách đọc |
|---|---|
| `∀x ∃y Cha(y,x)` | Mỗi người có thể có một người cha riêng |
| `∃y ∀x Cha(y,x)` | Có cùng một người là cha của mọi người |

Đổi thứ tự `∀` và `∃` không phải đổi cách viết cho đẹp; nó đổi phát biểu. Hãy xác định một đối tượng `y` có được chọn riêng cho từng `x` hay dùng chung.[](source:slides09)

## Unification tìm phép thế phù hợp {#unification}

Unification tìm phép thế biến khiến hai biểu thức giống nhau. Ví dụ `Knows(John,x)` và `Knows(y,z)` đồng nhất với `{y/John, x/z}`. MGU (most general unifier) giữ phép thế ít ràng buộc nhất.[](source:slides09)

@workflow id=unification-diagram title="Khớp hai vị từ bằng MGU"
| left | Knows(John,x) | external |
| right | Knows(y,z) | external |
| bind | y := John | backend |
| unify | x := z | backend |
| same | Knows(John,z) | external |
| left > bind | khớp hằng | |
| right > bind | thay y | |
| bind > unify | giữ biến chung | |
| unify > same | hai biểu thức giống nhau | emphasis |

## Ghi nhớ {#recap}

FOL biểu diễn sự kiện và quan hệ có biến, nhưng suy dẫn phức tạp hơn do có nhiều thể hiện. Hợp giải FOL cần chuẩn hóa về clausal form, thay biến đúng cách và unification.[](source:slides09)

## Ví dụ 1 · Mỗi sinh viên có thể có người hướng dẫn riêng {#worked-example-1}

Ví dụ giải thích thêm · Topic 09 · slides 5–12, 21–28.

Miền gồm người; SV(x) nghĩa x là sinh viên, HD(y,x) nghĩa y hướng dẫn x. Lan, Minh là sinh viên; An hướng dẫn Lan, Bình hướng dẫn Minh.

1. “Mỗi sinh viên có ít nhất một người hướng dẫn” viết ∀x (SV(x)⇒∃y HD(y,x)).
2. “Có một người hướng dẫn mọi sinh viên” viết ∃y ∀x (SV(x)⇒HD(y,x)).
3. Xét mô hình chỉ có hai quan hệ HD(An,Lan), HD(Bình,Minh), với An và Bình là hai người khác nhau: câu thứ nhất đúng, câu thứ hai sai.

**Kết luận:** Người làm chứng cho ∃y có thể phụ thuộc x ở câu đầu; câu sau đòi hỏi một y dùng chung cho tất cả sinh viên.

## Ví dụ 2 · Một biến phải nhận cùng một giá trị {#worked-example-2}

Ví dụ giải thích thêm · Topic 09 · slides 5–12, 21–28.

Gọi Hoc(a,b) là quan hệ người a học môn b. Cần khớp Hoc(x,AI) với Hoc(Lan,y), trong đó Lan và AI là hằng, x và y là biến.

1. Dùng phép thế θ={x/Lan, y/AI}, nghĩa là thay x bằng Lan và y bằng AI.
2. Sau thế, cả hai biểu thức đều là Hoc(Lan,AI).
3. Ngược lại, P(x,x) không khớp P(Lan,Minh) khi Lan và Minh là hai hằng khác nhau: vị trí đầu buộc x=Lan, vị trí sau lại buộc x=Minh.

**Kết luận:** Unification ràng buộc biến nhất quán; nó không chỉ so tên vị từ hay khớp từng vị trí một cách độc lập.

## Thử thách luyện tập: Ghép luật với đối tượng {#challenge-practice}

Đọc lượng từ và tìm phép thế cho vị từ. Bấm “Chơi thử thách” bên dưới để hoàn thành ba bước và nhận phản hồi. Đây là ví dụ diễn giải thêm; dữ kiện của trò chơi được đặt riêng cho việc luyện tập.
