# Suy diễn FOL truyền phép thế qua luật {#topic-10}

Trong logic bậc nhất, luật có biến phải được khớp với dữ kiện. Forward chaining sinh các hệ quả mới; backward chaining bắt đầu ở truy vấn và lần về những tiền đề cần chứng minh.[](source:slides10)

- Dùng unification để khớp vị từ.
- Ghi phép thế xuyên suốt chuỗi chứng minh.
- Luật Horn hỗ trợ hai dạng chaining trong slide.

@answer scope="Hợp giải FOL · unification · forward/backward chaining"
@meta locale=vi
@source slides10 title="Topic 10 · slides 3–20"

## Ví dụ quan hệ gia đình {#family}

Facts: `Cha(Art,Bob)` và `Cha(Bob,Coe)`. Luật: `Cha(x,y)∧Cha(y,z)⇒Ong(x,z)`. Truy vấn `Ong(Art,?)` tìm một giá trị z phù hợp.[](source:slides10)

## Forward chaining sinh hệ quả từ dữ kiện {#forward}

Đối chiếu facts với tiền đề luật. Hai quan hệ Cha khớp với `x=Art`, `y=Bob`, `z=Coe`; hệ thống sinh `Ong(Art,Coe)`. Lặp quá trình với facts mới cho đến khi tìm thấy truy vấn hoặc không còn điều gì mới.[](source:slides10)

@workflow id=forward-family title="Forward chaining từ facts đến truy vấn"
| f1 | Cha(Art,Bob) | external |
| f2 | Cha(Bob,Coe) | external |
| match | Khớp x=Art, y=Bob, z=Coe | backend |
| rule | Cha(x,y) ∧ Cha(y,z) ⇒ Ong(x,z) | backend |
| result | Ong(Art,Coe) | external |
| f1 > match | gán x,y | |
| f2 > match | gán y,z | |
| rule > result | thế vào luật | emphasis |
| match > result | sinh fact mới | |

@steps id=forward-steps
| facts | Bắt đầu bằng facts | Có hai cạnh quan hệ Cha. | forward-family | f1 |
| substitution | Tìm phép thế | Cặp facts thỏa luật với Art, Bob, Coe. | forward-family | match |
| derive | Sinh hệ quả | Luật tạo Ong(Art,Coe); truy vấn đã được chứng minh. | forward-family | result |

## Backward chaining lần ngược từ truy vấn {#backward}

Bắt đầu với `Ong(Art,?)`. Tìm luật có kết luận `Ong(x,z)`, thế `x=Art`; hai mục tiêu con trở thành `Cha(Art,y)` và `Cha(y,z)`. Facts khớp lần lượt cho `y=Bob`, `z=Coe`.[](source:slides10)

@workflow id=backward-family title="Backward chaining từ truy vấn về facts"
| query | Ong(Art,?) | external |
| goal1 | Tìm Cha(Art,y) | backend |
| goal2 | Tìm Cha(y,z) | backend |
| known1 | Cha(Art,Bob) | external |
| known2 | Cha(Bob,Coe) | external |
| answer | z=Coe | external |
| query > goal1 | áp dụng luật | |
| query > goal2 | áp dụng luật | |
| goal1 > known1 | khớp y=Bob | |
| goal2 > known2 | thế y=Bob | |
| known2 > answer | thế z=Coe | emphasis |

@steps id=backward-steps
| ask | Bắt đầu bằng câu hỏi | Mục tiêu ban đầu là tìm z sao cho Ong(Art,z). | backward-family | query |
| split | Mở rộng bằng luật | Muốn có ông, cần hai quan hệ Cha liên tiếp. | backward-family | goal1 |
| match1 | Khớp quan hệ đầu | Cha(Art,Bob) cho y=Bob. | backward-family | known1 |
| match2 | Khớp quan hệ tiếp | Cha(Bob,Coe) cho z=Coe. | backward-family | known2 |
| answer-step | Trả lời truy vấn | Coe là cháu của Art theo dữ kiện đã cho. | backward-family | answer |

## Dễ nhầm {#compare}

| Hướng | Nơi bắt đầu | Rủi ro thường gặp |
|---|---|---|
| Forward | Facts | Sinh quá nhiều kết luận không liên quan |
| Backward | Truy vấn | Vòng lặp hoặc lặp lại mục tiêu con |

Theo dõi mục tiêu trong stack để tránh vòng lặp, và ghi nhớ mục tiêu đã giải quyết để tránh tính lại. Mỗi lần dùng một luật, đổi tên biến luật để tránh nhầm với biến đang có trong truy vấn.[](source:slides10)

## Thử thách luyện tập: Truy tìm kết luận {#challenge-practice}

Áp dụng phép thế và suy diễn tiến trên luật Horn. Bấm “Chơi thử thách” bên dưới để hoàn thành ba bước và nhận phản hồi. Đây là ví dụ diễn giải thêm; dữ kiện của trò chơi được đặt riêng cho việc luyện tập.
