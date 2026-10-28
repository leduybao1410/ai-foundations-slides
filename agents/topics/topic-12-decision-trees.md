---
topic: 12
title: Cây quyết định và học quy nạp
keywords: [decision tree, ID3, entropy, information gain, classification rule, inductive learning, ILA]
source: ../../Topic 12 - Cây quyết định, học quy nạp.pdf
pages: 1-27
---

# Topic 12 — Cây quyết định và học quy nạp

## Onboarding · Định hướng bài học

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

## Ví dụ 1 · Tính gain từ bốn mẫu

Ví dụ giải thích thêm · Topic 12 · slides 3–16.

Tập S có bốn mẫu: hai Yes và hai No. Thuộc tính A chia thành hai nhánh, một nhánh hai Yes và một nhánh hai No; thuộc tính B chia thành hai nhánh, mỗi nhánh một Yes và một No.

1. Trước chia, p=1/2 nên H(S)=−(1/2)log₂(1/2)−(1/2)log₂(1/2)=1 bit.
2. Với A, hai nhánh đều thuần: entropy trung bình=(2/4)×0+(2/4)×0=0, nên Gain(A)=1−0=1 bit.
3. Với B, mỗi nhánh có entropy 1: entropy trung bình=(2/4)×1+(2/4)×1=1, nên Gain(B)=1−1=0.

**Kết luận:** ID3 chọn A trên bộ dữ kiện này vì A tách nhãn tốt hơn B; phép tính đánh giá cách chia chứ không đo độ chính xác trên mẫu chưa gặp.

## Ví dụ 2 · Dự đoán một ngày mới rồi rút luật

Ví dụ giải thích thêm · Topic 12 · slides 3–16.

Dùng cây thời tiết trong bài: Outlook là tình trạng trời, Humidity là độ ẩm; nhánh Sunny kiểm tra Humidity, Normal đi tới Yes và High đi tới No.

1. Ngày mới có Outlook=Sunny, Humidity=High, Wind=Weak. Từ gốc đi theo Sunny.
2. Ở nút Humidity, đi theo High đến lá No; thuộc tính Wind không được hỏi trên đường này.
3. Viết luật tương ứng: IF Outlook=Sunny AND Humidity=High THEN No.

**Kết luận:** Dự đoán No được giải thích bằng đúng đường gốc–lá; không cần đưa mọi thuộc tính của mẫu vào một luật.

## Dễ nhầm

Entropy là độ hỗn tạp của nhãn, không phải độ chính xác. ID3 chọn cách chia dựa trên dữ liệu hiện có; nếu dữ liệu ít hoặc nhiễu, cây có thể quá khớp. Cây quyết định và Naïve Bayes đều phân lớp nhưng biểu diễn tri thức khác nhau: quy tắc rẽ nhánh so với điểm xác suất.

## Ghi nhớ

1. Nút kiểm tra thuộc tính; nhánh mang giá trị; lá mang lớp.
2. ID3 chọn thuộc tính giảm entropy nhiều.
3. Đường đi gốc–lá đổi thành luật IF–THEN.

## Nguồn slide

[Topic 12, cây và ID3](<../../Topic 12 - Cây quyết định, học quy nạp.pdf#page=3>) · entropy và ví dụ chọn thuộc tính: slides 5–14 · luật và ILA: slides 15–26.

## Thử thách luyện tập

[Xây cây quyết định](../../lessons/challenge.html?topic=topic-12): Đo độ lẫn nhãn rồi chọn cách chia cho ID3. Các tình huống và số liệu trong trò chơi là ví dụ diễn giải thêm; kiến thức liên quan: Topic 12 · slides 5–14.
