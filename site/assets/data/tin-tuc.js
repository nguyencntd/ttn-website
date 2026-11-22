/* ==========================================================
   TIN TỨC — mỗi bài là một khối { ... }. Bài mới đặt lên ĐẦU danh sách.
   id      : mã bài, viết không dấu, nối bằng gạch ngang (dùng trong đường dẫn)
   nhom    : "pccc" | "atvsld" | "huan-luyen"
   tieuDe  : tiêu đề bài
   tomTat  : 1 câu tóm tắt
   ngay    : ngày đăng, ví dụ "22/11/2026" (để trống nếu chưa cần)
   anh     : đường dẫn ảnh, ví dụ "assets/img/anh/tin-tuc/bai-1.jpg" (để trống sẽ hiện khung chờ ảnh)
   video   : (không bắt buộc) link hoặc mã YouTube, ví dụ video: "https://youtu.be/xxxxxxxxxxx"
             Có video thì bài hiện trình phát ở đầu bài, thẻ bài có biểu tượng ▶,
             và bài xuất hiện khi lọc "Video". Chưa có ảnh thì tự dùng ảnh của video.
             Mẹo: mỗi video YouTube "Hỏi trả lời PCCC" có thể thành một bài ngắn kèm tóm tắt.
   noiDung : nội dung HTML, đặt giữa hai dấu ` `
   ========================================================== */
window.TTN_TIN_TUC = [
  {
    id: "kiem-tra-binh-chua-chay-hang-thang",
    nhom: "pccc",
    tieuDe: "5 điểm cần kiểm tra trên bình chữa cháy mỗi tháng",
    tomTat: "Vài phút kiểm tra định kỳ giúp bình luôn sẵn sàng khi có sự cố.",
    ngay: "",
    anh: "assets/img/anh/tin-tuc/binh-chua-chay.jpg",
    noiDung: `
      <p>Bình chữa cháy chỉ hữu ích khi dùng được ngay. Hãy kiểm tra nhanh 5 điểm sau.</p>
      <h2>1. Đồng hồ áp suất</h2>
      <p>Kim phải nằm trong vùng xanh. Lệch khỏi vùng xanh cần nạp lại hoặc thay bình.</p>
      <p>Bình CO2 không có đồng hồ, cần kiểm tra bằng cách cân khối lượng.</p>
      <h2>2. Chốt an toàn và niêm phong</h2>
      <p>Chốt còn nguyên vị trí, niêm phong không bị đứt.</p>
      <h2>3. Vòi và loa phun</h2>
      <p>Không nứt, không gãy, không bị bụi bẩn làm tắc.</p>
      <h2>4. Thân bình</h2>
      <p>Không móp, không rỉ sét, nhãn hướng dẫn còn đọc rõ.</p>
      <h2>5. Vị trí đặt bình</h2>
      <p>Dễ thấy, dễ lấy, không bị hàng hóa che khuất.</p>
      <p>Cần danh mục kiểm tra riêng cho nhà máy? <a href="tu-van.html">Liên hệ TTN</a>.</p>
    `
  },
  {
    id: "chuan-bi-dien-tap-phuong-an-chua-chay",
    nhom: "huan-luyen",
    tieuDe: "Chuẩn bị gì cho một buổi diễn tập phương án chữa cháy",
    tomTat: "Diễn tập hiệu quả bắt đầu từ kịch bản rõ ràng và phân công cụ thể.",
    ngay: "",
    anh: "assets/img/anh/tin-tuc/dien-tap.jpg",
    noiDung: `
      <p>Một buổi diễn tập tốt giúp mọi người biết chính xác phải làm gì khi có cháy.</p>
      <h2>1. Xây dựng kịch bản</h2>
      <p>Xác định vị trí giả định đám cháy, quy mô và thời điểm diễn tập.</p>
      <h2>2. Phân công lực lượng</h2>
      <ul>
        <li>Người phát hiện và báo động</li>
        <li>Đội chữa cháy ban đầu</li>
        <li>Người hướng dẫn thoát nạn</li>
        <li>Người sơ cứu và kiểm đếm quân số</li>
      </ul>
      <h2>3. Kiểm tra phương tiện</h2>
      <p>Bơm chữa cháy, họng nước, bình chữa cháy và đèn chỉ dẫn thoát nạn phải hoạt động tốt.</p>
      <h2>4. Thông báo trước</h2>
      <p>Báo cho người lao động và các đơn vị liên quan để tránh hoảng loạn.</p>
      <h2>5. Đánh giá sau diễn tập</h2>
      <p>Ghi nhận thời gian thoát nạn và những điểm cần cải thiện.</p>
      <p>TTN hỗ trợ xây dựng kế hoạch ứng phó sự cố và tổ chức diễn tập. <a href="tu-van.html?dv=huan-luyen">Đăng ký tư vấn</a>.</p>
    `
  },
  {
    id: "danh-gia-rui-ro-an-toan-lao-dong-bat-dau-tu-dau",
    nhom: "atvsld",
    tieuDe: "Đánh giá rủi ro an toàn lao động bắt đầu từ đâu?",
    tomTat: "Bốn bước cơ bản để nhận diện và kiểm soát mối nguy tại nơi làm việc.",
    ngay: "",
    anh: "assets/img/anh/tin-tuc/danh-gia-rui-ro.jpg",
    noiDung: `
      <p>Đánh giá rủi ro giúp doanh nghiệp xử lý mối nguy trước khi tai nạn xảy ra.</p>
      <h2>1. Nhận diện mối nguy</h2>
      <p>Đi khảo sát từng khu vực: máy móc, điện, hóa chất, làm việc trên cao.</p>
      <h2>2. Đánh giá mức độ rủi ro</h2>
      <p>Xem xét khả năng xảy ra và mức độ nghiêm trọng của từng mối nguy.</p>
      <h2>3. Áp dụng biện pháp kiểm soát</h2>
      <p>Ưu tiên theo thứ tự: loại bỏ, thay thế, giải pháp kỹ thuật, quy trình, rồi mới đến bảo hộ cá nhân.</p>
      <h2>4. Ghi nhận và rà soát</h2>
      <p>Lưu kết quả và đánh giá lại khi thay đổi máy móc, quy trình hoặc sau sự cố.</p>
      <p>Cần khảo sát thực tế tại nhà máy? <a href="tu-van.html?dv=atvsld">Liên hệ TTN</a>.</p>
    `
  }
];
