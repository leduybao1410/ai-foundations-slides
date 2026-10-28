# Resolution chứng minh hệ quả bằng phản chứng {#topic-08}

Resolution làm việc trên CNF. Ta thêm ¬R để chứng minh R. Nếu hợp giải sinh mâu thuẫn, giả định ¬R sai và R được chứng minh.[](source:slides08)

- Clause là các literal nối OR; các clause nối AND.
- Resolution khử cặp literal đối nhau.
- Forward chaining đi từ facts; backward chaining đi từ truy vấn.

@answer scope="CNF · resolution · chứng minh phản chứng · Horn chaining"
@meta locale=vi
@source slides08 title="Topic 08 · slides 3–14, 23–35"

## Onboarding · Định hướng bài học {#onboarding span=12}

**Trước khi bắt đầu**

- Ôn các phép nối, suy dẫn và modus ponens ở Topic 07.
- Literal là biến mệnh đề hoặc phủ định của nó; clause là OR các literal; CNF là AND các clause.

**Điểm cần lưu ý**

- Để chứng minh R bằng phản chứng, thêm ¬R chứ không thêm R vào KB.
- Hợp giải khử cặp literal đối nhau, không xóa hai literal chỉ vì chúng giống nhau.
- Clause rỗng biểu thị mâu thuẫn; forward/backward chaining trong bài dùng luật Horn.

**Sau bài học, bạn có thể**

- Đổi một luật kéo theo đơn giản sang CNF.
- Viết các bước hợp giải dẫn tới clause rỗng để chứng minh kết luận.
- Theo dõi cùng một bộ luật theo cả hướng tiến và hướng lùi.

Nguồn khái niệm: Topic 08 · slides 4–11, 13–22, 23–35. Các tình huống bổ sung bên dưới là ví dụ giải thích, không phải dữ kiện nguyên văn trong slide.

## Ví dụ tạo ra mâu thuẫn {#resolution-flow}

KB: `P∨Q`, `P⇒R`, `Q⇒R`. Đổi luật kéo theo thành `¬P∨R` và `¬Q∨R`; thêm `¬R`. Hợp giải từng cặp đối nhau sẽ tạo ra rỗng clause.[](source:slides08)

@workflow id=resolution-proof title="Resolution từ KB và phủ định kết luận"
| c1 | P∨Q | external |
| c2 | ¬P∨R | external |
| c3 | ¬Q∨R | external |
| c4 | ¬R | external |
| r1 | ¬P | backend |
| r2 | Q | backend |
| r3 | R | backend |
| empty | ⊥ · mâu thuẫn | external |
| c2 > r1 | resolve R, ¬R | |
| c4 > r1 | resolve | |
| c1 > r2 | resolve P, ¬P | |
| r1 > r2 | resolve | |
| c3 > r3 | resolve ¬Q, Q | |
| r2 > r3 | resolve | |
| c4 > empty | resolve R, ¬R | emphasis |
| r3 > empty | resolve | |

@steps id=resolution-steps
| negate | Phủ định kết luận | Thêm ¬R vào KB để chứng minh bằng phản chứng. | resolution-proof | c4 |
| cancel-r | Khử R | Từ ¬P∨R và ¬R suy ra ¬P. | resolution-proof | r1 |
| cancel-p | Khử P | Từ P∨Q và ¬P suy ra Q. | resolution-proof | r2 |
| derive-r | Sinh R | Từ ¬Q∨R và Q suy ra R. | resolution-proof | r3 |
| contradiction | Mâu thuẫn | R và ¬R tạo clause rỗng; vậy KB ⊨ R. | resolution-proof | empty |

## Chuyển công thức sang CNF {#cnf}

1. Bỏ `⇒` và `⇔` theo định nghĩa.
2. Đẩy `¬` vào trong bằng luật De Morgan.
3. Phân phối OR lên AND để thu được AND của các clause.

Mọi công thức mệnh đề đều đổi được sang CNF. Độ dài có thể tăng mạnh.[](source:slides08)

## Forward và backward chaining {#chaining}

| Phương pháp | Điểm bắt đầu | Cách làm |
|---|---|---|
| Forward chaining | Facts đã biết | Kích hoạt luật đủ tiền đề, thêm kết luận, lặp |
| Backward chaining | Truy vấn cần chứng minh | Tìm luật kết luận ra truy vấn, rồi chứng minh tiền đề |

Hai phương pháp này được trình bày cho luật Horn. Forward có thể sinh facts không liên quan câu hỏi; backward tập trung vào mục tiêu nhưng cần tránh vòng lặp và tính lại cùng mục tiêu.[](source:slides08)

## Ví dụ 1 · Từ quy tắc báo cháy tới clause rỗng {#worked-example-1}

Ví dụ giải thích thêm · Topic 08 · slides 4–11, 13–22, 23–35.

Gọi K là “có khói”, B là “chuông báo”. KB chứa K và K⇒B; cần chứng minh B. Ký hiệu ⊥ chỉ clause rỗng.

1. Đổi K⇒B thành ¬K∨B; thêm phủ định kết luận ¬B.
2. Hợp giải K với ¬K∨B, khử K và ¬K để nhận B.
3. Hợp giải B với ¬B nhận ⊥; KB cùng ¬B không thể đồng thời đúng.

**Kết luận:** KB suy dẫn B. Clause rỗng xuất hiện từ KB và phủ định kết luận là chứng cứ của phép phản chứng.

## Ví dụ 2 · Cùng bộ luật, hai hướng suy diễn {#worked-example-2}

Ví dụ giải thích thêm · Topic 08 · slides 4–11, 13–22, 23–35.

Gọi D là “đã đăng ký”, H là “đã đóng học phí”, V là “được vào lớp”. Facts là D, H; luật là D∧H⇒V; truy vấn là V.

1. Forward chaining bắt đầu ở D và H, thấy đủ hai tiền đề nên sinh V.
2. Backward chaining bắt đầu ở V, chọn luật rồi tạo hai mục tiêu con D và H.
3. Cả hai mục tiêu con đều có trong facts nên chứng minh được V; nếu chỉ có D thì luật này chưa đủ để suy ra V.

**Kết luận:** Hướng suy diễn khác nhau, nhưng cả hai phải thỏa đầy đủ tiền đề; thiếu chứng minh V cũng chưa có nghĩa đã chứng minh ¬V.

## Thử thách luyện tập: Mở khóa bằng hợp giải {#challenge-practice}

Chuyển luật về clause và tìm mâu thuẫn. Bấm “Chơi thử thách” bên dưới để hoàn thành ba bước và nhận phản hồi. Đây là ví dụ diễn giải thêm; dữ kiện của trò chơi được đặt riêng cho việc luyện tập.
