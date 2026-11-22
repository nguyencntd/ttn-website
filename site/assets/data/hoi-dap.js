/* ==========================================================
   HỎI – ĐÁP — mỗi câu là một khối { ... }. Câu mới đặt lên ĐẦU danh sách.
   id      : mã không dấu, không khoảng trắng (dùng làm link: hoi-dap.html#id)
   nhom    : "pccc" | "atvsld" | "huan-luyen" | "chung"
             (câu thuộc nhóm dịch vụ sẽ tự hiện ở trang dịch vụ tương ứng)
   cauHoi  : câu hỏi
   traLoi  : câu trả lời, 1–3 đoạn ngắn, mỗi đoạn trong <p>...</p>
   video   : mã hoặc link YouTube (không bắt buộc), ví dụ "https://youtu.be/xxxxxxxxxxx"

   mau     : true = câu mẫu, chỉ hiện ở chế độ nháp (cheDoNhap: true). Câu thật thì bỏ dòng này.

   LƯU Ý: 4 câu dưới đây là CÂU MẪU để thấy giao diện.
   Người làm nội dung thay bằng câu hỏi thật (từ nhóm Facebook, Zalo, YouTube).
   ========================================================== */
window.TTN_HOI_DAP = [
  {
    mau: true,
    id: "ttn-co-khao-sat-tai-nha-may-khong",
    nhom: "chung",
    cauHoi: "TTN có khảo sát tại nhà máy trước khi tư vấn không?",
    traLoi: "<p>Có. Kỹ sư TTN khảo sát hiện trạng tại công trình trước khi đề xuất giải pháp.</p>",
    video: ""
  },
  {
    mau: true,
    id: "can-chuan-bi-gi-truoc-buoi-khao-sat-pccc",
    nhom: "pccc",
    cauHoi: "Cần chuẩn bị gì trước buổi khảo sát PCCC?",
    traLoi: "<p>Nên chuẩn bị bản vẽ mặt bằng, hồ sơ PCCC hiện có và thông tin công năng từng khu vực.</p><p>Nếu chưa đủ, kỹ sư TTN sẽ hướng dẫn bổ sung.</p>",
    video: ""
  },
  {
    mau: true,
    id: "danh-gia-rui-ro-an-toan-lao-dong-gom-nhung-buoc-nao",
    nhom: "atvsld",
    cauHoi: "Đánh giá rủi ro an toàn lao động gồm những bước nào?",
    traLoi: "<p>Thường gồm: nhận diện mối nguy tại từng khu vực, đánh giá mức độ rủi ro, đề xuất biện pháp kiểm soát và theo dõi việc thực hiện.</p>",
    video: ""
  },
  {
    mau: true,
    id: "bai-tu-kiem-tra-pccc-dung-de-lam-gi",
    nhom: "huan-luyen",
    cauHoi: "Bài tự kiểm tra PCCC trên website dùng để làm gì?",
    traLoi: "<p>Giúp nhà máy rà soát nhanh 10 hạng mục PCCC, an toàn lao động và huấn luyện, biết ngay mục nào cần xem lại.</p><p>Kết quả mang tính tham khảo. <a href=\"tu-kiem-tra.html\">Làm bài kiểm tra</a>.</p>",
    video: ""
  }
];
