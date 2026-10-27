# Logic bậc nhất biểu diễn đối tượng và quan hệ {#topic-09}

Logic mệnh đề xem mỗi câu như một khối đúng/sai. Logic bậc nhất thêm đối tượng, biến, vị từ và lượng từ để diễn đạt quy luật như “mọi người đều chết”.[](source:slides09)

- Term là hằng, biến hoặc biểu thức hàm.
- Predicate nêu thuộc tính hay quan hệ giữa term.
- `∀` nói mọi đối tượng; `∃` nói có ít nhất một đối tượng.

@answer scope="First-Order Logic · terms · predicates · quantifiers · unification"
@meta locale=vi
@source slides09 title="Topic 09 · slides 3–12, 15–19, 21–29"

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
