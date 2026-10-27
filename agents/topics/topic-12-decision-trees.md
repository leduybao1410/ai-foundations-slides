---
topic: 12
title: Cây quyết định và học quy nạp
keywords: [decision tree, ID3, entropy, information gain, classification rule, inductive learning, ILA]
source: ../../Topic 12 - Cây quyết định, học quy nạp.pdf
pages: 1-27
---

# Topic 12 — Cây quyết định và học quy nạp

## Câu hỏi của chương

Làm thế nào biến các ví dụ gắn nhãn thành một mô hình dễ đọc, giải thích được quyết định? Cây quyết định kiểm tra thuộc tính theo từng nút, rẽ nhánh theo giá trị thuộc tính và trả lớp ở nút lá. (Slides 2–3)

## Khái niệm chính

- **ID3** xây cây từ dữ liệu huấn luyện bằng cách chọn thuộc tính tách tốt nhất, tạo nhánh cho các giá trị của nó, rồi lặp lại trên tập con. Khi các mẫu trong nhánh cùng lớp hoặc không còn thuộc tính phù hợp, tạo lá. (Slides 4–14)
- **Entropy** đo độ lẫn lộn của nhãn: `H(S) = -p log₂ p - (1-p) log₂(1-p)`, với `p` là tỉ lệ mẫu dương. Nếu tất cả cùng lớp, entropy bằng 0; nếu hai lớp cân bằng, entropy cao hơn. (Slides 5–10)
- ID3 so sánh **entropy trung bình sau khi chia** các nhánh; phần giảm so với entropy trước khi chia là thông tin thu được (information gain). Chọn thuộc tính giúp dữ liệu sau chia thuần hơn. (Slides 8–13)
- Có thể đổi cây thành các luật IF–THEN: mỗi đường từ gốc đến lá tạo một luật phân lớp. (Slides 15–16)
- **ILA (Inductive Learning Algorithm)** cũng rút luật phân lớp từ mẫu bằng cách tách ví dụ theo quyết định rồi khái quát các điều kiện chung của mỗi lớp. (Slides 17–26)
- Nguyên tắc Occam trong slide nhắc ưu tiên cây đơn giản hơn khi các cây giải thích dữ liệu tương đương; cây quá sâu có thể học thuộc dữ liệu. (Slide 3)

## Ví dụ giải thích thêm

Với dữ liệu quyết định “có đi chơi không?”, thuộc tính đầu tiên có thể là Outlook. Nếu tất cả ví dụ `Overcast` đều là “Yes”, nhánh đó trở thành lá ngay. Với nhánh `Rain`, còn lẫn nhãn nên thử thêm thuộc tính như Wind. Đi theo các nhánh cho một ngày mới sẽ cho dự đoán và lý do dễ giải thích.

## Dễ nhầm

Entropy là độ hỗn tạp của nhãn, không phải độ chính xác. ID3 chọn cách chia dựa trên dữ liệu hiện có; nếu dữ liệu ít hoặc nhiễu, cây có thể quá khớp. Cây quyết định và Naïve Bayes đều phân lớp nhưng biểu diễn tri thức khác nhau: quy tắc rẽ nhánh so với điểm xác suất.

## Ghi nhớ

1. Nút kiểm tra thuộc tính; nhánh mang giá trị; lá mang lớp.
2. ID3 chọn thuộc tính giảm entropy nhiều.
3. Đường đi gốc–lá đổi thành luật IF–THEN.

## Nguồn slide

[Topic 12, cây và ID3](<../../Topic 12 - Cây quyết định, học quy nạp.pdf#page=3>) · entropy và ví dụ chọn thuộc tính: slides 5–14 · luật và ILA: slides 15–26.
