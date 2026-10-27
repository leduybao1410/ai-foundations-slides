# Modus ponens rút Q từ P và P⇒Q {#topic-07}

Logic mệnh đề biểu diễn sự kiện bằng câu đúng/sai, rồi dùng luật suy diễn để rút thông tin mới. Ví dụ, biết P và biết P kéo theo Q thì có thể chứng minh Q.[](source:slides07)

- Cú pháp cho biết công thức nào được viết hợp lệ.
- Ngữ nghĩa xác định chân trị theo một cách gán.
- Suy dẫn xét mọi cách gán thỏa cơ sở tri thức.

@answer scope="Logic mệnh đề · cú pháp · ngữ nghĩa · chứng minh"
@meta locale=vi
@source slides07 title="Topic 07 · slides 4–12, 20–31, 33–34"

## Từ hai tiền đề đến Q {#modus-ponens}

Ví dụ: P = “trời mưa”, Q = “đường ướt”. `P⇒Q` nghĩa là nếu P đúng thì Q đúng. Khi biết P và `P⇒Q`, modus ponens cho phép suy ra Q.[](source:slides07)

@workflow id=mp-proof title="Chứng minh Q bằng modus ponens"
| p | P · Trời mưa | external |
| rule | P⇒Q · Nếu mưa thì đường ướt | backend |
| q | Q · Đường ướt | external |
| p > q | tiền đề | |
| rule > q | modus ponens | emphasis |

@steps id=mp-steps
| premises | Đọc tiền đề | Có P và quy tắc P⇒Q. | mp-proof | p |
| match | Khớp điều kiện | Vế trái P của quy tắc đã đúng. | mp-proof | rule |
| derive | Suy ra Q | Kết luận Q đúng theo modus ponens. | mp-proof | q |

## Đúng trong mô hình hay đúng mọi nơi? {#semantics}

Một **mô hình** là cách gán đúng/sai cho từng biến. Công thức thỏa mãn được nếu có ít nhất một mô hình làm nó đúng; hợp lệ nếu đúng với mọi mô hình. `KB ⊨ Q` nghĩa mọi mô hình làm KB đúng cũng làm Q đúng.[](source:slides07)

| Khái niệm | Câu hỏi cần hỏi |
|---|---|
| Đúng trong mô hình | Với cách gán này, câu có đúng không? |
| Thỏa mãn được | Có cách gán nào làm câu đúng không? |
| Hợp lệ | Mọi cách gán có làm câu đúng không? |
| Suy dẫn | Mọi mô hình của KB có làm kết luận đúng không? |

## Các phép nối có nghĩa gì? {#connectives}

`¬P` phủ định P; `P∧Q` cần cả hai đúng; `P∨Q` cần ít nhất một đúng; `P⇒Q` chỉ sai khi P đúng và Q sai. Dùng ngoặc khi cần loại bỏ nhập nhằng về thứ tự phép nối.[](source:slides07)

Ví dụ giải thích thêm: nếu `P⇒Q` và P đều đúng thì không thể có mô hình của cả hai tiền đề mà Q sai. Đó là trực giác về suy dẫn; modus ponens là cách viết chứng minh cho bước này.

## Ghi nhớ {#recap}

Logic gồm cú pháp, ngữ nghĩa và hệ chứng minh. Bảng chân trị có thể kiểm tra suy dẫn nhưng n biến có `2^n` cách gán; luật chứng minh giúp tránh liệt kê tất cả.[](source:slides07)

## Thử thách luyện tập: Phòng thí nghiệm mệnh đề {#challenge-practice}

Kiểm tra phép kéo theo và rút kết luận từ dữ kiện. Bấm “Chơi thử thách” bên dưới để hoàn thành ba bước và nhận phản hồi. Đây là ví dụ diễn giải thêm; dữ kiện của trò chơi được đặt riêng cho việc luyện tập.
