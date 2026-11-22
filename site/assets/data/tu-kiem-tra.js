/* ==========================================================
   TỰ KIỂM TRA PCCC — sửa file này để đổi câu hỏi, cách chấm, lời nhận xét
   Trang dùng: tu-kiem-tra.html
   ========================================================== */
window.TTN_KIEM_TRA = {

  /* Nhóm câu hỏi. dichVu = mã dịch vụ được chọn sẵn khi khách bấm "Tư vấn" */
  nhom: {
    "pccc":       { ten: "Phòng cháy chữa cháy",      dichVu: "pccc" },
    "atvsld":     { ten: "An toàn vệ sinh lao động",  dichVu: "atvsld" },
    "huan-luyen": { ten: "Huấn luyện & diễn tập",     dichVu: "huan-luyen" }
  },

  /* Câu hỏi. Mỗi câu:
     nhom      : một trong các nhóm ở trên
     ten       : tên ngắn, hiện trong danh sách "cần xem lại" và trong email gửi về
     cauHoi    : câu hỏi khách đọc (trả lời Có / Chưa / Không chắc)
     goiY      : một dòng giải thích vì sao câu này quan trọng
     quanTrong : true = câu trọng yếu, tính điểm gấp đôi; trả lời "Chưa" thì không thể xếp loại Tốt */
  cauHoi: [
    {
      nhom: "pccc", quanTrong: true,
      ten: "Thẩm duyệt & nghiệm thu PCCC",
      cauHoi: "Toàn bộ nhà xưởng đang sử dụng, kể cả phần cải tạo, mở rộng, đã được thẩm duyệt thiết kế và nghiệm thu PCCC?",
      goiY: "Cải tạo, đổi công năng mà chưa thẩm duyệt lại là lỗi thường gặp khi kiểm tra."
    },
    {
      nhom: "pccc", quanTrong: true,
      ten: "Bảo dưỡng báo cháy, chữa cháy tự động",
      cauHoi: "Hệ thống báo cháy và chữa cháy tự động được kiểm tra, bảo dưỡng định kỳ và có ghi nhật ký?",
      goiY: "Đầu báo bám bụi, van khóa nhầm có thể khiến hệ thống không hoạt động khi cần."
    },
    {
      nhom: "pccc", quanTrong: true,
      ten: "Chạy thử máy bơm chữa cháy",
      cauHoi: "Máy bơm chữa cháy (bơm chính, bơm dự phòng) được chạy thử định kỳ và khởi động tốt?",
      goiY: "Bơm không chạy thì cả hệ thống sprinkler và họng nước đều mất tác dụng."
    },
    {
      nhom: "pccc", quanTrong: false,
      ten: "Bình chữa cháy, lối thoát nạn",
      cauHoi: "Bình chữa cháy, lối thoát nạn, đèn EXIT và đèn sự cố được kiểm tra hằng tháng, không bị che chắn?",
      goiY: "Đây là những hạng mục đoàn kiểm tra nhìn thấy đầu tiên."
    },
    {
      nhom: "pccc", quanTrong: false,
      ten: "Hồ sơ quản lý PCCC cơ sở",
      cauHoi: "Cơ sở có hồ sơ quản lý PCCC đầy đủ và được cập nhật trong năm nay?",
      goiY: "Hồ sơ thiếu hoặc cũ thường bị nhắc nhở ngay cả khi thiết bị vẫn tốt."
    },
    {
      nhom: "atvsld", quanTrong: false,
      ten: "Đánh giá rủi ro an toàn lao động",
      cauHoi: "Nhà máy đã đánh giá rủi ro an toàn lao động cho các khu vực sản xuất trong 12 tháng qua?",
      goiY: "Đánh giá rủi ro giúp xử lý mối nguy trước khi tai nạn xảy ra."
    },
    {
      nhom: "atvsld", quanTrong: true,
      ten: "Cấp phép công việc nguy hiểm",
      cauHoi: "Công việc nguy hiểm như hàn cắt, làm việc trên cao, vào không gian hạn chế có quy trình cấp phép bằng văn bản?",
      goiY: "Hàn cắt không kiểm soát là nguyên nhân phổ biến gây cháy trong nhà xưởng."
    },
    {
      nhom: "atvsld", quanTrong: false,
      ten: "Phương tiện bảo vệ cá nhân",
      cauHoi: "Người lao động được cấp và sử dụng đúng phương tiện bảo vệ cá nhân cho từng vị trí?",
      goiY: "Cấp đủ chưa đủ, cần kiểm tra việc sử dụng thực tế."
    },
    {
      nhom: "huan-luyen", quanTrong: false,
      ten: "Huấn luyện an toàn theo nhóm",
      cauHoi: "Người lao động và người quản lý đã được huấn luyện an toàn theo đúng nhóm, chứng nhận còn hạn?",
      goiY: "Chứng nhận hết hạn là lỗi dễ phát hiện khi kiểm tra hồ sơ."
    },
    {
      nhom: "huan-luyen", quanTrong: true,
      ten: "Đội PCCC cơ sở & diễn tập",
      cauHoi: "Đội PCCC cơ sở đã được huấn luyện và nhà máy đã diễn tập phương án chữa cháy trong năm nay?",
      goiY: "Diễn tập cho thấy phương án có chạy được ngoài thực tế hay không."
    }
  ],

  /* Cách chấm: Có = 2 điểm, Không chắc = 1, Chưa = 0 (câu trọng yếu x2), quy về thang 100.
     tot: từ mức điểm này trở lên và không có câu trọng yếu nào "Chưa" → Tốt
     cao: dưới mức điểm này, hoặc có từ 2 câu trọng yếu "Chưa" → Rủi ro cao
     Còn lại → Cần chú ý */
  nguong: { tot: 80, cao: 50 },

  mucDo: {
    "tot":   { ten: "Đang làm tốt",   moTa: "Duy trì kiểm tra định kỳ. Kỹ sư TTN có thể rà soát độc lập trước đợt kiểm tra." },
    "chu-y": { ten: "Cần chú ý",      moTa: "Một số hạng mục cần xử lý sớm để tránh bị nhắc nhở hoặc xử phạt." },
    "cao":   { ten: "Rủi ro cao",     moTa: "Nhiều hạng mục trọng yếu chưa đạt. Nên khảo sát hiện trạng càng sớm càng tốt." }
  }
};
