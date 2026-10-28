# ID3 chọn thuộc tính giảm entropy nhiều nhất {#topic-12}

Cây quyết định kiểm tra thuộc tính ở nút trong, chọn nhánh theo giá trị thuộc tính và gán lớp ở lá. ID3 so sánh mức entropy sau mỗi cách chia rồi chọn thuộc tính giảm độ lẫn nhãn nhiều nhất.[](source:slides12)

- Entropy đo độ lẫn nhãn trong tập mẫu.
- Chia tốt làm các nhánh thuần hơn.
- Mỗi đường từ gốc tới lá có thể viết thành luật.

@answer scope="Cây quyết định · entropy · ID3 · luật IF–THEN"
@meta locale=vi
@source slides12 title="Topic 12 · slides 3–16, 17–26"

## Onboarding · Định hướng bài học {#onboarding span=12}

**Trước khi bắt đầu**

- Ôn dữ liệu có nhãn và tổng quát hóa ở Topic 11; không cần dùng Naïve Bayes để xây cây.
- Gọi S là tập mẫu, p là tỉ lệ nhãn dương trong S; entropy H đo độ lẫn nhãn, dùng log cơ số 2.

**Điểm cần lưu ý**

- Entropy bằng 0 nghĩa tập thuần nhãn, không có nghĩa mô hình đúng trên mọi dữ liệu mới.
- Entropy sau chia phải lấy trung bình có trọng số theo số mẫu của từng nhánh.
- ID3 chọn information gain lớn nhất ở từng bước; cây khớp dữ liệu huấn luyện chưa chắc tổng quát hóa tốt.

**Sau bài học, bạn có thể**

- Tính entropy của tập nhãn nhỏ và information gain của một cách chia.
- Chọn thuộc tính theo ID3 và giải thích vì sao một nhánh trở thành lá.
- Dùng cây dự đoán mẫu mới và viết đường gốc–lá thành luật IF–THEN.

Nguồn khái niệm: Topic 12 · slides 3–16. Các tình huống bổ sung bên dưới là ví dụ giải thích, không phải dữ kiện nguyên văn trong slide.

## Entropy trước khi chia {#entropy}

Dùng các số trong ví dụ ID3 trên slide: 14 ngày chơi gồm 9 Yes và 5 No. `H(S) = −p log₂p − (1−p)log₂(1−p)`, với `p=9/14`, cho `H(S)≈0.940` bit. Entropy bằng 0 khi tập chỉ có một lớp.[](source:slides12)

## Outlook là phép chia tốt nhất {#gain}

| Thuộc tính | Entropy trung bình sau chia | Information gain |
|---|---:|---:|
| Outlook | 0.694 | 0.246 |
| Humidity | 0.788 | 0.152 |
| Wind | 0.892 | 0.048 |
| Temperature | 0.911 | 0.029 |

`Information gain = H(S) − entropy trung bình sau chia`. Với bộ số trên, Outlook giảm độ lẫn nhãn nhiều nhất, nên ID3 đặt Outlook ở gốc. Overcast thuần Yes; Rain và Sunny cần xét thêm thuộc tính.[](source:slides12)

@workflow id=id3-tree title="Một cây ID3 từ ví dụ thời tiết"
| outlook | Outlook? | backend |
| overcast | Yes | external |
| rain | Wind? | backend |
| sunny | Humidity? | backend |
| weak | Yes | external |
| strong | No | external |
| normal | Yes | external |
| high | No | external |
| outlook > overcast | Overcast | emphasis |
| outlook > rain | Rain | |
| outlook > sunny | Sunny | |
| rain > weak | Weak | |
| rain > strong | Strong | |
| sunny > normal | Normal | |
| sunny > high | High | |

@steps id=id3-steps
| root | Chọn gốc | Outlook có gain lớn nhất 0.246. | id3-tree | outlook |
| pure | Nhánh Overcast | Các mẫu cùng Yes nên dừng ở lá. | id3-tree | overcast |
| split-rain | Nhánh Rain | Xét Wind: Weak→Yes, Strong→No. | id3-tree | rain |
| split-sunny | Nhánh Sunny | Xét Humidity: Normal→Yes, High→No. | id3-tree | sunny |

## Đọc cây thành luật {#rules}

Mỗi đường từ gốc tới lá cho một luật: `IF Outlook=Overcast THEN Yes`; `IF Outlook=Rain AND Wind=Weak THEN Yes`; `IF Outlook=Rain AND Wind=Strong THEN No`; `IF Outlook=Sunny AND Humidity=Normal THEN Yes`; `IF Outlook=Sunny AND Humidity=High THEN No`.[](source:slides12)

Cây giải thích được quyết định, nhưng cây quá sâu có thể học chi tiết tập huấn luyện thay vì quy luật tổng quát. Nguyên tắc Occam trong slide ưu tiên mô hình đơn giản hơn khi khả năng giải thích tương đương.[](source:slides12)

## Ví dụ 1 · Tính gain từ bốn mẫu {#worked-example-1}

Ví dụ giải thích thêm · Topic 12 · slides 3–16.

Tập S có bốn mẫu: hai Yes và hai No. Thuộc tính A chia thành hai nhánh, một nhánh hai Yes và một nhánh hai No; thuộc tính B chia thành hai nhánh, mỗi nhánh một Yes và một No.

1. Trước chia, p=1/2 nên H(S)=−(1/2)log₂(1/2)−(1/2)log₂(1/2)=1 bit.
2. Với A, hai nhánh đều thuần: entropy trung bình=(2/4)×0+(2/4)×0=0, nên Gain(A)=1−0=1 bit.
3. Với B, mỗi nhánh có entropy 1: entropy trung bình=(2/4)×1+(2/4)×1=1, nên Gain(B)=1−1=0.

**Kết luận:** ID3 chọn A trên bộ dữ kiện này vì A tách nhãn tốt hơn B; phép tính đánh giá cách chia chứ không đo độ chính xác trên mẫu chưa gặp.

## Ví dụ 2 · Dự đoán một ngày mới rồi rút luật {#worked-example-2}

Ví dụ giải thích thêm · Topic 12 · slides 3–16.

Dùng cây thời tiết trong bài: Outlook là tình trạng trời, Humidity là độ ẩm; nhánh Sunny kiểm tra Humidity, Normal đi tới Yes và High đi tới No.

1. Ngày mới có Outlook=Sunny, Humidity=High, Wind=Weak. Từ gốc đi theo Sunny.
2. Ở nút Humidity, đi theo High đến lá No; thuộc tính Wind không được hỏi trên đường này.
3. Viết luật tương ứng: IF Outlook=Sunny AND Humidity=High THEN No.

**Kết luận:** Dự đoán No được giải thích bằng đúng đường gốc–lá; không cần đưa mọi thuộc tính của mẫu vào một luật.

## Thử thách luyện tập: Xây cây quyết định {#challenge-practice}

Đo độ lẫn nhãn rồi chọn cách chia cho ID3. Bấm “Chơi thử thách” bên dưới để hoàn thành ba bước và nhận phản hồi. Đây là ví dụ diễn giải thêm; dữ kiện của trò chơi được đặt riêng cho việc luyện tập.
