# ID3 chọn thuộc tính giảm entropy nhiều nhất {#topic-12}

Cây quyết định kiểm tra thuộc tính ở nút trong, chọn nhánh theo giá trị thuộc tính và gán lớp ở lá. ID3 so sánh mức entropy sau mỗi cách chia rồi chọn thuộc tính giảm độ lẫn nhãn nhiều nhất.[](source:slides12)

- Entropy đo độ lẫn nhãn trong tập mẫu.
- Chia tốt làm các nhánh thuần hơn.
- Mỗi đường từ gốc tới lá có thể viết thành luật.

@answer scope="Cây quyết định · entropy · ID3 · luật IF–THEN"
@meta locale=vi
@source slides12 title="Topic 12 · slides 3–16, 17–26"

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
