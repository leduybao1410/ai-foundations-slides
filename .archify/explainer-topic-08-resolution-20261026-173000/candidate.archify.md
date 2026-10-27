# Resolution chứng minh hệ quả bằng phản chứng {#topic-08}

Resolution làm việc trên CNF. Ta thêm ¬R để chứng minh R. Nếu hợp giải sinh mâu thuẫn, giả định ¬R sai và R được chứng minh.[](source:slides08)

- Clause là các literal nối OR; các clause nối AND.
- Resolution khử cặp literal đối nhau.
- Forward chaining đi từ facts; backward chaining đi từ truy vấn.

@answer scope="CNF · resolution · chứng minh phản chứng · Horn chaining"
@meta locale=vi
@source slides08 title="Topic 08 · slides 3–14, 23–35"

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

## Thử thách luyện tập: Mở khóa bằng hợp giải {#challenge-practice}

Chuyển luật về clause và tìm mâu thuẫn. Bấm “Chơi thử thách” bên dưới để hoàn thành ba bước và nhận phản hồi. Đây là ví dụ diễn giải thêm; dữ kiện của trò chơi được đặt riêng cho việc luyện tập.
